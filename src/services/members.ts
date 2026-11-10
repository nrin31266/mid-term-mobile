import { apiRequest } from './api';

export type Member = { id: string; email: string; hoten: string; hinhanh: string; hasPassword: boolean };
export type MemberInput = { email: string; hoten: string; matkhau: string; hinhanh: string };
export const listMembers = () => apiRequest<{ members: Member[]; limit: number }>('/members');
export const getMember = (id: string) => apiRequest<Member>(`/members/${encodeURIComponent(id)}`);
export const createMember = (input: MemberInput) => apiRequest<Member>('/members', { method: 'POST', body: JSON.stringify(input) });
export const updateMember = (id: string, input: MemberInput) => apiRequest<Member>(`/members/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(input) });
export const deleteMember = (id: string) => apiRequest<{ deleted: boolean }>(`/members/${encodeURIComponent(id)}`, { method: 'DELETE' });
