import { readFile } from 'node:fs/promises';
import { after, before, test } from 'node:test';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

let environment;
const projectId = 'demo-memberdesk';
const avatar = 'midterm-mobile/avatars/11111111-1111-4111-8111-111111111111.jpg';
const member = { email: 'demo@example.com', matkhau: 'test-hash', hoten: 'Nguyễn An', hinhanh: '' };

before(async () => {
  environment = await initializeTestEnvironment({
    projectId,
    firestore: { rules: await readFile('firestore.rules', 'utf8') },
    storage: { rules: await readFile('storage.rules', 'utf8') },
  });
  await environment.withSecurityRulesDisabled(async (context) => {
    await context.firestore().doc('midterm_users/member').set(member);
    await context.firestore().doc('midterm_users/member/private/child').set(member);
    await context.storage().ref(avatar).put(new Uint8Array([255, 216, 255, 217]), { contentType: 'image/jpeg' });
  });
});
after(async () => { await environment?.cleanup(); });

for (const identity of ['guest', 'member', 'admin']) {
  test(`Firestore: ${identity} cannot access member hashes or nested data`, async () => {
    const context = identity === 'guest' ? environment.unauthenticatedContext()
      : environment.authenticatedContext(identity, { admin: identity === 'admin' });
    const database = context.firestore();
    const document = database.doc('midterm_users/member');
    await assertFails(document.get());
    await assertFails(database.collection('midterm_users').get());
    await assertFails(database.collectionGroup('private').get());
    await assertFails(database.doc('midterm_users/new').set(member));
    await assertFails(document.update({ admin: true, hoten: 1 }));
    await assertFails(document.delete());
    await assertFails(database.doc('midterm_users/member/private/child').get());
    await assertFails(database.doc('midterm_users/missing/private/child').set(member));
    await assertFails(database.doc('memberdesk_internal/image_cleanup').set({}));
    await assertFails(database.doc('memberdesk_internal/image_cleanup').get());
    await assertFails(database.doc('memberdesk_internal/image_cleanup').delete());
  });
}

test('Firestore: legacy collection access remains as before', async () => {
  const document = environment.unauthenticatedContext().firestore().doc('legacy_test_fixture/demo');
  await assertSucceeds(document.set({ name: 'Legacy fixture' }));
  await assertSucceeds(document.get());
  await assertSucceeds(document.update({ name: 'Updated' }));
  await assertSucceeds(document.delete());
});

for (const identity of ['guest', 'member']) {
  test(`Storage: ${identity} cannot read or upload avatars`, async () => {
    const context = identity === 'guest' ? environment.unauthenticatedContext()
      : environment.authenticatedContext(identity, { admin: false });
    await assertFails(context.storage().ref(avatar).getMetadata());
    await assertFails(context.storage().ref(avatar.replace('11111111', '22222222')).put(
      new Uint8Array([255, 216, 255, 217]), { contentType: 'image/jpeg' }));
  });
}

test('Storage: admin can create a scoped JPEG but cannot overwrite/delete/list', async () => {
  const storage = environment.authenticatedContext('admin', { admin: true }).storage();
  const reference = storage.ref(avatar.replace('11111111', '33333333'));
  await assertSucceeds(reference.put(new Uint8Array([255, 216, 255, 217]), { contentType: 'image/jpeg' }));
  await assertSucceeds(reference.getMetadata());
  await assertFails(reference.put(new Uint8Array([255, 216, 1, 255, 217]), { contentType: 'image/jpeg' }));
  await assertFails(reference.updateMetadata({ contentType: 'text/html' }));
  await assertFails(reference.delete());
  await assertFails(storage.ref('midterm-mobile/avatars').listAll());
});

test('Storage: admin cannot bypass file size, type, UUID or prefix', async () => {
  const storage = environment.authenticatedContext('admin', { admin: true }).storage();
  const path = avatar.replace('11111111', '44444444');
  await assertFails(storage.ref(path).put(new Uint8Array(500 * 1024 + 1), { contentType: 'image/jpeg' }));
  await assertFails(storage.ref(path).put(new Uint8Array([1]), { contentType: 'image/png' }));
  await assertFails(storage.ref(path).put(new Uint8Array(0), { contentType: 'image/jpeg' }));
  await assertFails(storage.ref('midterm-mobile/avatars/not-a-uuid.jpg').put(new Uint8Array([1]), { contentType: 'image/jpeg' }));
  await assertFails(storage.ref('other-app/private.jpg').put(new Uint8Array([1]), { contentType: 'image/jpeg' }));
});
