import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { deleteApp, initializeApp } from 'firebase/app';
import { getAuth, getIdTokenResult, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { backendBucket, backendDatabase } from '../server/firebase.mjs';

process.loadEnvFile('.env.local');
assert.equal(process.env.MEMBERDESK_ENV, 'cloud');
assert.ok(process.env.EXPO_PUBLIC_FIREBASE_API_KEY, 'Thiếu API key trong .env.local.');
const projectId = 'crested-mercury-452707-e8';
const api = 'https://memberdesk-801885728284.web.app/api';
const config = { apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY, projectId,
  authDomain: `${projectId}.firebaseapp.com`, storageBucket: `${projectId}.firebasestorage.app` };
const app = initializeApp(config, 'cloud-check');
const auth = getAuth(app);
const objectPath = `midterm-mobile/avatars/${randomUUID()}.jpg`;
let uploaded = false;
let receipt;
try {
  const credentials = JSON.parse(await readFile('docs/private/cloud-admin.json', 'utf8'));
  const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  assert.equal((await getIdTokenResult(result.user)).claims.admin, true);
  const response = await fetch(`${api}/session`, { headers: { Authorization: `Bearer ${await result.user.getIdToken()}` } });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).uid, result.user.uid);
  assert.equal((await fetch(`${api}/session`)).status, 401);
  await assert.rejects(getDocs(collection(getFirestore(app), 'midterm_users')), { code: 'permission-denied' });
  await assert.rejects(getDoc(doc(getFirestore(app), 'memberdesk_internal/image_cleanup')), { code: 'permission-denied' });
  const bytes = await readFile('docs/submition/evidence/storage-upload-check.jpg');
  const storage = getStorage(app);
  const image = ref(storage, objectPath);
  await uploadBytes(image, bytes, { contentType: 'image/jpeg' }); uploaded = true;
  const url = await getDownloadURL(image);
  const downloaded = await fetch(url);
  assert.equal(downloaded.status, 200);
  assert.deepEqual(Buffer.from(await downloaded.arrayBuffer()), bytes);
  await assert.rejects(uploadBytes(image, bytes, { contentType: 'image/jpeg' }), { code: 'storage/unauthorized' });
  await signOut(auth);
  await assert.rejects(uploadBytes(ref(storage, `midterm-mobile/avatars/${randomUUID()}.jpg`), bytes,
    { contentType: 'image/jpeg' }), { code: 'storage/unauthorized' });
  receipt = { checkedAt: new Date().toISOString(), projectId, api,
    adminLogin: true, adminApi: 200, missingTokenApi: 401, directFirestoreDenied: true, cleanupLockDenied: true,
    sdkUploadBytes: bytes.length, sdkDownloadMatches: true, overwriteDenied: true, guestUploadDenied: true,
    fixture: 'JPEG giả, file kiểm tra được dọn sau khi kiểm tra tham chiếu; chưa phải ảnh hồ sơ trong app.' };
} finally {
  if (uploaded) {
    const database = backendDatabase();
    const snapshot = await database.collection('midterm_users').limit(201).get();
    assert.ok(snapshot.size <= 200, 'Cần rà toàn bộ tham chiếu trước khi dọn fixture.');
    assert.ok(snapshot.docs.every((document) => !document.data().hinhanh?.includes(encodeURIComponent(objectPath))), 'Không dọn ảnh còn tham chiếu.');
    await backendBucket().file(objectPath).delete();
  }
  await deleteApp(app);
}
await writeFile('docs/submition/evidence/cloud-access-check.json', `${JSON.stringify(receipt, null, 2)}\n`);
console.info('Cloud: Auth admin, API HTTPS, Firestore deny, Storage SDK upload/download và chặn ghi đè/khách đều đạt. Fixture đã dọn.');
