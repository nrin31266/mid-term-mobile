import assert from 'node:assert/strict';
import { once } from 'node:events';
import { randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
import test from 'node:test';
import { createApi } from '../server/api.mjs';
import { backendBucket, backendDatabase } from '../server/firebase.mjs';
import { createMemberStore } from '../server/members.mjs';
import { memberFields } from '../server/member-validation.mjs';

const { default: sharp } = await import(createRequire(new URL('../server/package.json', import.meta.url)).resolve('sharp'));

test('member API persists exact fields, rejects duplicates atomically and validates real images', async (context) => {
  assert.equal(process.env.MEMBERDESK_ENV, 'emulator');
  const database = backendDatabase(); const bucket = backendBucket();
  const collection = database.collection('midterm_users');
  const clear = async () => {
    const snapshot = await collection.get(); const batch = database.batch();
    snapshot.docs.forEach((document) => batch.delete(document.ref)); await batch.commit();
  };
  await clear();
  const store = createMemberStore(database, bucket, 'emulator');
  const server = createApi({ verifyIdToken: async () => ({ uid: 'test-admin', admin: true }) }, undefined, store);
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (body) => fetch(`${base}/members`, { method: 'POST', headers: {
    Authorization: 'Bearer test-admin', 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const input = { email: 'one@example.com', hoten: 'Nguyễn An', matkhau: 'demo-password', hinhanh: '' };
  const paths = [];
  context.after(async () => { await clear(); for (const path of paths) await bucket.file(path).delete({ ignoreNotFound: true });
    await new Promise((resolve) => server.close(resolve)); });

  await context.test('concurrent duplicate requests create just one exact document', async () => {
    const responses = await Promise.all(Array.from({ length: 5 }, () => post(input)));
    assert.equal(responses.filter((response) => response.status === 201).length, 1);
    assert.equal(responses.filter((response) => response.status === 409).length, 4);
    const snapshot = await collection.get(); assert.equal(snapshot.size, 1);
    assert.deepEqual(Object.keys(snapshot.docs[0].data()).sort(), memberFields);
    assert.notEqual(snapshot.docs[0].data().matkhau, input.matkhau);
    const result = await (await fetch(`${base}/members`, { headers: { Authorization: 'Bearer test-admin' } })).json();
    assert.equal(result.members.length, 1); assert.equal('matkhau' in result.members[0], false);
    const detail = await (await fetch(`${base}/members/${snapshot.docs[0].id}`, { headers: { Authorization: 'Bearer test-admin' } })).json();
    assert.equal(detail.hoten, input.hoten); assert.equal('matkhau' in detail, false);
    assert.equal((await post({ ...input, email: 'other@example.com', role: 'admin' })).status, 400);
    assert.equal((await collection.get()).size, 1);
  });
  await context.test('valid JPEG is saved, fake JPEG and wrong dimensions are rejected', async () => {
    for (const [index, bytes, expected] of [
      [0, await sharp({ create: { width: 32, height: 32, channels: 3, background: 'white' } }).jpeg().toBuffer(), 201],
      [1, Buffer.from([255, 216, 255, 217]), 400],
      [2, await sharp({ create: { width: 513, height: 513, channels: 3, background: 'white' } }).jpeg().toBuffer(), 400],
    ]) {
      const path = `midterm-mobile/avatars/${randomUUID()}.jpg`; paths.push(path); const token = randomUUID();
      await bucket.file(path).save(bytes, { metadata: { contentType: 'image/jpeg', metadata: { firebaseStorageDownloadTokens: token } } });
      const url = `http://127.0.0.1:9199/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
      const response = await post({ ...input, email: `image${index}@example.com`, hinhanh: url });
      assert.equal(response.status, expected, await response.text());
    }
    assert.equal((await collection.get()).size, 2);
  });
  await context.test('concurrent writes cannot exceed the 200 member cap', async () => {
    await clear(); const batch = database.batch();
    const hash = 'scrypt$v1$16384$8$1$' + '0'.repeat(32) + '$' + '0'.repeat(64);
    for (let i = 0; i < 199; i++) batch.create(collection.doc(`fixture-${i}`), { ...input, email: `seed${i}@example.com`, matkhau: hash });
    await batch.commit();
    const responses = await Promise.all([post({ ...input, email: 'last1@example.com' }), post({ ...input, email: 'last2@example.com' })]);
    assert.deepEqual(responses.map((response) => response.status).sort(), [201, 409]);
    assert.equal((await collection.get()).size, 200);
  });
});
