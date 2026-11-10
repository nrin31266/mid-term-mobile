import assert from 'node:assert/strict';
import { once } from 'node:events';
import { test } from 'node:test';
import { createApi } from '../server/api.mjs';
import { backendOptions } from '../server/firebase.mjs';

test('backend refuses implicit cloud access and mixed emulator credentials', () => {
  assert.throws(() => backendOptions({}));
  assert.throws(() => backendOptions({ MEMBERDESK_ENV: 'cloud', FIREBASE_AUTH_EMULATOR_HOST: '127.0.0.1:9099' }));
  assert.throws(() => backendOptions({ MEMBERDESK_ENV: 'emulator', FIREBASE_AUTH_EMULATOR_HOST: '127.0.0.1:9099' }));
  assert.equal(backendOptions({ MEMBERDESK_ENV: 'emulator', FIREBASE_AUTH_EMULATOR_HOST: '127.0.0.1:9099',
    FIRESTORE_EMULATOR_HOST: '127.0.0.1:8080', FIREBASE_STORAGE_EMULATOR_HOST: '127.0.0.1:9199' }).projectId, 'demo-memberdesk');
});

test('API rejects missing/invalid/revoked/non-admin tokens and untrusted origins', async (context) => {
  const server = createApi({ verifyIdToken: async (token, revoked) => {
    assert.equal(revoked, true);
    if (token === 'invalid') throw Object.assign(new Error('private diagnostic'), { code: 'auth/id-token-revoked' });
    if (token === 'unavailable') throw new Error('private credential');
    return { uid: 'demo', admin: token === 'admin', email: 'admin@example.test' };
  } });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  context.after(() => new Promise((resolve) => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const [authorization, status] of [[undefined, 401], ['Bearer invalid', 401], ['Bearer unavailable', 503],
    ['Basic admin', 401], ['Bearer member', 403], ['Bearer admin', 200]]) {
    const response = await fetch(`${base}/session`, { headers: authorization ? { Authorization: authorization } : {} });
    assert.equal(response.status, status);
    const body = await response.json();
    assert.ok(!JSON.stringify(body).includes('private'));
    if (status === 200) assert.equal(body.uid, 'demo');
  }
  assert.equal((await fetch(`${base}/session`, { headers: { Origin: 'https://untrusted.example', Authorization: 'Bearer admin' } })).status, 403);
  const allowed = await fetch(`${base}/session`, { headers: { Origin: 'http://localhost:8081', Authorization: 'Bearer admin' } });
  assert.equal(allowed.headers.get('Access-Control-Allow-Origin'), 'http://localhost:8081');
});
