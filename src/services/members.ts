import { apiRequest } from './api';

export type Member = { id: string; email: string; hoten: string; hinhanh: string; hasPassword: boolean };
export type MemberInput = { email: string; hoten: string; matkhau: string; hinhanh: string };
export const listMembers = () => apiRequest<{ members: Member[]; limit: number }>('/members');
export const getMember = (id: string) => apiRequest<Member>(`/members/${encodeURIComponent(id)}`);
export const createMember = (input: MemberInput) => apiRequest<Member>('/members', { method: 'POST', body: JSON.stringify(input) });
