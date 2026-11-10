import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { deleteApp, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { backendDatabase } from '../server/firebase.mjs';
import { memberFields, memberId } from '../server/member-validation.mjs';

process.loadEnvFile('.env.local');
assert.equal(process.env.MEMBERDESK_ENV, 'cloud');
const app = initializeApp({ apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  projectId: 'crested-mercury-452707-e8' }, 'crud-check');
const database = backendDatabase();
const input = { email: `crud-check-${randomUUID()}@example.com`, hoten: 'Hồ sơ kiểm tra', matkhau: randomUUID(), hinhanh: '' };
let currentId;
let request;
try {
  const credentials = JSON.parse(await readFile('docs/private/cloud-admin.json', 'utf8'));
  const { user } = await signInWithEmailAndPassword(getAuth(app), credentials.email, credentials.password);
  const token = await user.getIdToken();
  request = (path, method = 'GET', body) => fetch(`https://memberdesk-801885728284.web.app/api${path}`, {
    method, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const created = await request('/members', 'POST', input);
  assert.equal(created.status, 201); currentId = (await created.json()).id;
  const before = (await database.collection('midterm_users').doc(currentId).get()).data();
  const next = { ...input, hoten: 'Đặng Minh Khang', email: `renamed-${input.email}`, matkhau: '' };
  const edited = await request(`/members/${currentId}`, 'PATCH', next);
  assert.equal(edited.status, 200);
  const previousId = currentId; currentId = (await edited.json()).id;
  let stored = (await database.collection('midterm_users').doc(currentId).get()).data();
  assert.equal(stored.matkhau, before.matkhau);
  assert.deepEqual(Object.keys(stored).sort(), memberFields);
  assert.equal((await request(`/members/${previousId}`)).status, 404);
  assert.equal((await request(`/members/${currentId}`, 'PATCH', { ...next, email: 'rin@example.com' })).status, 409);
  assert.deepEqual((await database.collection('midterm_users').doc(currentId).get()).data(), stored);
  assert.equal((await request(`/members/${currentId}`, 'PATCH', { ...next, matkhau: randomUUID() })).status, 200);
  stored = (await database.collection('midterm_users').doc(currentId).get()).data();
  assert.notEqual(stored.matkhau, before.matkhau);
  assert.equal('matkhau' in await (await request(`/members/${currentId}`)).json(), false);
  assert.equal((await request(`/members/${currentId}`, 'DELETE')).status, 200);
  assert.equal((await request(`/members/${currentId}`)).status, 404);
  assert.equal((await request(`/members/${currentId}`, 'DELETE')).status, 404);
  currentId = null;
  await writeFile('docs/submition/evidence/cloud-crud-api-check.json', JSON.stringify({
    checkedAt: new Date().toISOString(), projectId: 'crested-mercury-452707-e8',
    create: 201, rename: 200, duplicateRename: 409, blankPasswordPreserved: true,
    passwordReplaced: true, exactFourFields: true, profileOmitsHash: true,
    delete: 200, deletedProfile: 404, repeatedDelete: 404, fixtureRemoved: true,
  }, null, 2) + '\n');
  console.info('Cloud CRUD: tạo/đổi email/giữ và đặt mật khẩu/chặn trùng/xóa đều đạt; hồ sơ kiểm tra đã dọn.');
} finally {
  // Chỉ dọn đúng hồ sơ kiểm tra do lần chạy này tạo.
  for (const id of new Set([currentId, memberId(input.email), memberId(`renamed-${input.email}`)].filter(Boolean))) {
    const document = database.collection('midterm_users').doc(id);
    if ((await document.get()).exists && request) await request(`/members/${id}`, 'DELETE');
  }
  await deleteApp(app);
}
