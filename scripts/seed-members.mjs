import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { deleteApp, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { readFile } from 'node:fs/promises';
import { hashPassword } from '../server/member-validation.mjs';

const sharp = createRequire(new URL('../server/package.json', import.meta.url))('sharp');
process.loadEnvFile('.env.local');
assert.equal(process.env.MEMBERDESK_ENV, 'cloud');
const app = initializeApp({ apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  projectId: 'crested-mercury-452707-e8', storageBucket: 'crested-mercury-452707-e8.firebasestorage.app' }, 'seed-members');
const names = [
  ['Nguyễn Văn Rin', 'rin'], ['Nguyễn Minh Anh', 'minhanh'], ['Lê Bảo Trân', 'baotran'],
  ['Trần Gia Huy', 'giahuy'], ['Đỗ Quỳnh Chi', 'quynhchi'], ['Phạm Khánh Linh', 'khanhlinh'],
  ['Võ Hoàng Nam', 'hoangnam'], ['Bùi Ngọc Mai', 'ngocmai'], ['Hoàng Đức Anh', 'ducanh'],
  ['Đặng Thu Hà', 'thuha'], ['Nguyễn Hải Đăng', 'haidang'], ['Trần Thảo Nguyên', 'thaonguyen'],
  ['Lê Minh Khang', 'minhkhang'], ['Phan Yến Nhi', 'yennhi'], ['Vũ Tuấn Kiệt', 'tuankiet'],
  ['Hồ Phương Anh', 'phuonganh'], ['Đinh Nhật Minh', 'nhatminh'], ['Đoàn Bảo Ngọc', 'baongoc'],
  ['Nguyễn Thanh Tùng', 'thanhtung'], ['Trương Hà My', 'hamy'], ['Dương Quang Huy', 'quanghuy'],
  ['Mai Ánh Dương', 'anhduong'], ['Lý Quốc Bảo', 'quocbao'], ['Tạ Hồng Nhung', 'hongnhung'],
  ['Cao Minh Quân', 'minhquan'], ['Đỗ Khánh Vy', 'khanhvy'], ['Lâm Thiên Phúc', 'thienphuc'],
  ['Ngô Bích Ngọc', 'bichngoc'], ['Huỳnh Gia Bảo', 'giabao'], ['Tôn Diệu Linh', 'dieulinh'],
  ['Nguyễn Đức Phúc', 'ducphuc'], ['Trịnh Ngọc Hân', 'ngochan'], ['Đinh Phúc An', 'phucan'],
  ['Lê Hoài An', 'hoaian'], ['Võ Mỹ Duyên', 'myduyen'], ['Trần Thành Đạt', 'thanhdat'],
];
try {
  const credentials = JSON.parse(await readFile('docs/private/cloud-admin.json', 'utf8'));
  const { user } = await signInWithEmailAndPassword(getAuth(app), credentials.email, credentials.password);
  const token = await user.getIdToken();
  const api = async (path, method = 'GET', body) => {
    const response = await fetch(`https://memberdesk-801885728284.web.app/api${path}`, {
      method, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) throw new Error(`API ${path}: ${response.status}`);
    return response.json();
  };
  const existing = await api('/members');
  const wanted = names.filter(([, email]) => !existing.members.some((member) => member.email === `${email}@example.com`));
  const images = [];
  if (wanted.length) for (const filename of ['member-minh-anh.jpg', 'member-gia-huy.jpg', 'hoi-an-riverside.jpg']) {
    const bytes = await sharp(`docs/submition/demo-assets/${filename}`).resize(512, 512, { fit: 'cover' }).jpeg({ quality: 82 }).toBuffer();
    const object = ref(getStorage(app), `midterm-mobile/avatars/${randomUUID()}.jpg`);
    await uploadBytes(object, bytes, { contentType: 'image/jpeg' }); images.push(await getDownloadURL(object));
  }
  const input = [];
  for (const [index, [hoten, email]] of wanted.entries()) input.push({ hoten, email: `${email}@example.com`,
    matkhau: await hashPassword(randomUUID()), hinhanh: index % 3 === 0 ? '' : images[Math.floor(index / 3) % images.length] });
  const result = input.length ? await api('/members/import', 'POST', input) : { added: 0, skipped: names.length };
  const after = await api('/members');
  assert.ok(names.every(([, email]) => after.members.some((member) => member.email === `${email}@example.com`)));
  const receipt = { checkedAt: new Date().toISOString(), added: result.added, total: after.members.length,
    withImage: after.members.filter((member) => member.hinhanh).length, withoutImage: after.members.filter((member) => !member.hinhanh).length,
    includesNguyenVanRin: after.members.some((member) => member.hoten === 'Nguyễn Văn Rin'), fictionalEmails: after.members.every((member) => member.email.endsWith('@example.com')) };
  await writeFile('docs/submition/evidence/demo-members-seed.json', JSON.stringify(receipt, null, 2) + '\n');
  console.info(`Đã thêm ${result.added} hồ sơ; tổng ${receipt.total}, có ảnh ${receipt.withImage}, thiếu ảnh ${receipt.withoutImage}.`);
} finally { await deleteApp(app); }
