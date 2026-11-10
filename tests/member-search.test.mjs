import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeSearch, selectMembers } from '../src/utils/member-search.ts';

const members = Array.from({ length: 36 }, (_, index) => ({ id: String(index), hoten: `Nguyễn An ${String(index).padStart(2, '0')}`,
  email: `member${String(index).padStart(2, '0')}@example.com`, hinhanh: index % 2 ? '' : 'image', hasPassword: true }));
members[0].hoten = 'Nguyễn Văn Rin'; members[1].hoten = 'Đỗ Quỳnh Chi';
test('Vietnamese lookup combines words, email, photo filter and deterministic sorting without changing source', () => {
  assert.equal(normalizeSearch(' ĐỖ QUỲNH '), 'do quynh');
  const before = structuredClone(members);
  assert.deepEqual(selectMembers(members, 'NGUYEN rin', 'with', 'name-asc', 4).members.map((m) => m.id), ['0']);
  assert.equal(selectMembers(members, 'quynh', 'without', 'name-asc', 1).members[0].hoten, 'Đỗ Quỳnh Chi');
  assert.equal(selectMembers(members, 'MEMBER01@', 'with', 'name-asc', 1).total, 0);
  assert.equal(selectMembers(members, '', 'with', 'email-desc', 1).members[0].email, 'member34@example.com');
  assert.equal(selectMembers(members, '', 'without', 'email-asc', 1).total, 18);
  const asc = selectMembers(members, '', 'all', 'name-asc', 1).members[0];
  const desc = selectMembers(members, '', 'all', 'name-desc', 4).members.at(-1);
  assert.equal(asc.id, desc.id); assert.deepEqual(members, before);
});
test('36 members occupy four pages, clamp stale page numbers and return an empty search cleanly', () => {
  const seen = new Set();
  for (let page = 1; page <= 4; page++) {
    const result = selectMembers(members, '', 'all', 'email-asc', page);
    assert.equal(result.pageCount, 4); assert.equal(result.members.length, page === 4 ? 6 : 10);
    result.members.forEach((member) => seen.add(member.id));
  }
  assert.equal(seen.size, 36);
  assert.equal(selectMembers(members, 'rin', 'all', 'email-asc', 4).page, 1);
  assert.equal(selectMembers(members, '', 'all', 'email-asc', -1).page, 1);
  const empty = selectMembers(members, 'khong-co-ten', 'all', 'email-asc', 4);
  assert.equal(empty.total, 0); assert.equal(empty.members.length, 0); assert.equal(empty.page, 1);
});
