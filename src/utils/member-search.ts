import type { Member } from '../services/members';

export type PhotoFilter = 'all' | 'with' | 'without';
export type MemberSort = 'name-asc' | 'name-desc' | 'email-asc' | 'email-desc';
export const pageSize = 10;

export function normalizeSearch(value: string) {
  return value.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
}

export function selectMembers(members: Member[], query: string, photo: PhotoFilter, sort: MemberSort, requestedPage: number) {
  const words = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const selected = members.filter((member) => (photo === 'all' || (photo === 'with' ? !!member.hinhanh : !member.hinhanh)) &&
    words.every((word) => normalizeSearch(`${member.hoten} ${member.email}`).includes(word)));
  const field = sort.startsWith('name') ? 'hoten' : 'email';
  const direction = sort.endsWith('asc') ? 1 : -1;
  selected.sort((a, b) => direction * (a[field].localeCompare(b[field], 'vi', { sensitivity: 'base' }) || a.email.localeCompare(b.email)));
  const pageCount = Math.max(1, Math.ceil(selected.length / pageSize));
  const page = Math.min(Math.max(1, Math.trunc(requestedPage) || 1), pageCount);
  return { members: selected.slice((page - 1) * pageSize, page * pageSize), total: selected.length, page, pageCount };
}
