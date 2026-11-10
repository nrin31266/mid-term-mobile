import assert from 'node:assert/strict';
import test from 'node:test';
import { hashPassword, isPasswordHash, memberId, profile, validateMember } from '../server/member-validation.mjs';
import { parseImageUrl } from '../server/member-images.mjs';

const input = { email: ' An@Example.com ', matkhau: 'demo-password', hoten: ' Nguyễn An ', hinhanh: '' };
test('member schema normalizes identity and rejects extra/missing/invalid fields', () => {
  const normalized = validateMember(input);
  assert.equal(normalized.email, 'an@example.com'); assert.equal(normalized.hoten, 'Nguyễn An');
  assert.equal(memberId(normalized.email).length, 64);
  for (const invalid of [{ ...input, role: 'admin' }, { ...input, hinhanh: null }, { ...input, email: 'invalid' },
    { ...input, hoten: ' ' }, { ...input, hoten: 'x'.repeat(101) }, { email: input.email }]) {
    assert.throws(() => validateMember(invalid), { status: 400 });
  }
});
test('passwords use random salts and profile responses never reveal hashes', async () => {
  const first = await hashPassword(input.matkhau); const second = await hashPassword(input.matkhau);
  assert.ok(isPasswordHash(first)); assert.notEqual(first, second);
  assert.equal(first.includes(input.matkhau), false);
  await assert.rejects(hashPassword('short'), { status: 400 });
  const result = profile({ id: 'external-id', data: () => ({ ...input, matkhau: first }) });
  assert.deepEqual(Object.keys(result).sort(), ['email', 'hasPassword', 'hinhanh', 'hoten', 'id']);
  assert.equal(JSON.stringify(result).includes(first), false);
});
test('image URL cannot escape the scoped bucket and UUID path', () => {
  const path = 'midterm-mobile/avatars/11111111-1111-4111-8111-111111111111.jpg';
  const url = `https://firebasestorage.googleapis.com/v0/b/bucket/o/${encodeURIComponent(path)}?alt=media&token=demo`;
  assert.equal(parseImageUrl(url, 'bucket', 'cloud').path, path);
  assert.equal(parseImageUrl('', 'bucket', 'cloud'), null);
  for (const bad of [url.replace('bucket/o/', 'other/o/'), url.replace('https:', 'http:'),
    url.replace('firebasestorage.googleapis.com', 'attacker.example'), url.replace('token=demo', 'token='),
    url.replace('midterm-mobile', 'old-app'), `${url}&other=value`]) {
    assert.throws(() => parseImageUrl(bad, 'bucket', 'cloud'), { status: 400 });
  }
});
