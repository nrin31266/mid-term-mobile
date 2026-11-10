import { signOut } from 'firebase/auth';

import { getFirebase } from './firebase';

export class ApiRequestError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { auth } = getFirebase();
  const user = auth.currentUser;
  if (!user) throw new ApiRequestError(401, 'Vui lòng đăng nhập lại.');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:3001'}${path}`, {
      ...options, signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...options.headers, Authorization: `Bearer ${await user.getIdToken()}` },
    });
    const body = await response.json();
    if (response.status === 401) await signOut(auth);
    if (!response.ok) throw new ApiRequestError(response.status, body.error ?? 'Không thực hiện được thao tác.');
    return body;
  } catch (error) {
    if (error instanceof ApiRequestError) throw error;
    throw new Error('Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.');
  } finally { clearTimeout(timer); }
}
