import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { backendBucket, backendDatabase } from '../server/firebase.mjs';
import { createMemberStore } from '../server/members.mjs';
import { imagePattern, isPasswordHash, memberFields, validateMember } from '../server/member-validation.mjs';
import { parseImageUrl, validateImage } from '../server/member-images.mjs';

const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const portablePattern = /^images\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.jpg$/;

export async function exportBackup(database, bucket, mode, directory) {
  const members = await createMemberStore(database, bucket, mode).exportJson();
  assert.ok(members.length > 0, 'Không có hồ sơ để xuất.');
  assert.ok(members.every((member) => member.email.endsWith('@example.com')), 'Gói nộp chỉ nhận hồ sơ minh họa @example.com.');
  await mkdir(directory); await mkdir(join(directory, 'images'));
  const portable = []; const files = new Map();
  for (const member of members) {
    const image = parseImageUrl(member.hinhanh, bucket.name, mode);
    let path = '';
    if (image) {
      await validateImage(member.hinhanh, bucket, mode);
      path = `images/${image.path.split('/').at(-1)}`;
      if (!files.has(path)) {
        const [bytes] = await bucket.file(image.path).download({ validation: 'crc32c' });
        await writeFile(join(directory, path), bytes, { flag: 'wx' });
        files.set(path, { path, bytes: bytes.length, sha256: digest(bytes) });
      }
    }
    portable.push({ ...member, hinhanh: path });
  }
  for (const [name, rows] of [['users.json', members], ['users-portable.json', portable]]) {
    await writeFile(join(directory, name), JSON.stringify(rows, null, 2) + '\n', { flag: 'wx' });
  }
  const manifest = { exportedAt: new Date().toISOString(), projectId: database.projectId,
    members: members.length, images: [...files.values()] };
  await writeFile(join(directory, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
  return { members: members.length, images: files.size };
}

export async function restoreBackup(database, bucket, directory) {
  assert.equal(database.projectId, 'demo-memberdesk', 'Chỉ khôi phục vào project Emulator của bài.');
  assert.equal(bucket.name, 'demo-memberdesk.appspot.com');
  const root = await realpath(directory);
  const rows = JSON.parse(await readFile(join(root, 'users-portable.json'), 'utf8'));
  assert.ok(Array.isArray(rows) && rows.length > 0 && rows.length <= 200, 'Gói cần 1–200 hồ sơ.');
  const members = rows.map(validateMember); const images = new Map(); const emails = new Set();
  // Kiểm tra cấu trúc và checksum trước khi tải ảnh; không lấy file ngoài gói.
  for (const member of members) {
    assert.ok(isPasswordHash(member.matkhau), 'Hash mật khẩu sai.');
    assert.ok(!emails.has(member.email), 'Email trùng trong gói.'); emails.add(member.email);
    if (!member.hinhanh) continue;
    assert.match(member.hinhanh, portablePattern, 'Đường dẫn ảnh sai.');
    if (!images.has(member.hinhanh)) {
      const path = await realpath(join(root, member.hinhanh));
      assert.ok(path.startsWith(root + sep), 'Ảnh nằm ngoài gói.');
      const bytes = await readFile(path); assert.ok(bytes.length > 0 && bytes.length <= 500 * 1024, 'Dung lượng ảnh sai.');
      images.set(member.hinhanh, bytes);
    }
  }
  const manifest = JSON.parse(await readFile(join(root, 'manifest.json'), 'utf8'));
  assert.equal(manifest.members, members.length);
  assert.equal(manifest.images.length, images.size);
  for (const [path, bytes] of images) {
    const expected = manifest.images.find((image) => image.path === path);
    assert.ok(expected && expected.bytes === bytes.length && expected.sha256 === digest(bytes), 'Ảnh không khớp manifest.');
  }
  const store = createMemberStore(database, bucket, 'emulator');
  const existing = new Set((await store.exportJson()).map((member) => member.email));
  const needed = new Set(members.filter((member) => !existing.has(member.email)).map((member) => member.hinhanh));
  const urls = new Map();
  for (const [path, bytes] of images) {
    if (!needed.has(path)) continue;
    const objectPath = `midterm-mobile/avatars/${randomUUID()}.jpg`; assert.match(objectPath, imagePattern);
    const token = randomUUID(); const file = bucket.file(objectPath);
    await file.save(bytes, { resumable: false, preconditionOpts: { ifGenerationMatch: 0 },
      metadata: { contentType: 'image/jpeg', metadata: { firebaseStorageDownloadTokens: token } } });
    urls.set(path, `http://127.0.0.1:9199/v0/b/${bucket.name}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`);
  }
  const restored = members.map((member) => ({ ...member, hinhanh: urls.get(member.hinhanh) ?? '' }));
  const result = await store.importJson(restored);
  const exported = await store.exportJson();
  for (const member of restored) {
    const saved = exported.find((value) => value.email === member.email);
    assert.ok(saved); assert.deepEqual(Object.keys(saved).sort(), memberFields);
    if (!result.skipped) assert.deepEqual(saved, member);
    await validateImage(saved.hinhanh, bucket, 'emulator');
  }
  return { ...result, members: exported.length, images: images.size, exactFourFields: true, imageContentVerified: true };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [action, target] = process.argv.slice(2);
  assert.ok(target && ['export', 'restore'].includes(action), 'Dùng: node scripts/member-backup.mjs export|restore <thư mục>');
  const mode = process.env.MEMBERDESK_ENV;
  if (action === 'restore') assert.equal(mode, 'emulator', 'Công cụ khôi phục chỉ chạy trong Emulator.');
  const database = backendDatabase(); const bucket = backendBucket();
  const result = action === 'export' ? await exportBackup(database, bucket, mode, resolve(target))
    : await restoreBackup(database, bucket, resolve(target));
  console.info(JSON.stringify({ action, ...result }, null, 2));
}
