import { createHash, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { ApiError } from './access.mjs';

const derive = promisify(scrypt);
export const memberFields = ['email', 'hinhanh', 'hoten', 'matkhau'];
export const maxMembers = 200;
export const imagePattern = /^midterm-mobile\/avatars\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.jpg$/;

export function validateMember(input) {
  if (!input || Array.isArray(input) || typeof input !== 'object' ||
      Object.keys(input).sort().join(',') !== memberFields.join(',') ||
      memberFields.some((key) => typeof input[key] !== 'string')) {
    throw new ApiError(400, 'Hồ sơ cần đúng bốn trường email, matkhau, hoten, hinhanh dạng chuỗi.');
  }
  const email = input.email.trim().toLowerCase();
  const hoten = input.hoten.trim();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ApiError(400, 'Email chưa hợp lệ.');
  }
  if (!hoten || hoten.length > 100 || /[\u0000-\u001f\u007f]/.test(hoten)) {
    throw new ApiError(400, 'Họ tên cần từ 1 đến 100 ký tự, không chứa ký tự điều khiển.');
  }
  if (input.hinhanh.length > 2048) throw new ApiError(400, 'Địa chỉ ảnh quá dài.');
  return { email, hoten, hinhanh: input.hinhanh, matkhau: input.matkhau };
}

export function memberId(email) { return createHash('sha256').update(email).digest('hex'); }

export async function hashPassword(password) {
  if (password.length < 8 || password.length > 128) throw new ApiError(400, 'Mật khẩu cần từ 8 đến 128 ký tự.');
  const salt = randomBytes(16).toString('hex');
  const hash = await derive(password, salt, 32, { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 });
  return `scrypt$v1$16384$8$1$${salt}$${hash.toString('hex')}`;
}

export function isPasswordHash(value) {
  return /^scrypt\$v1\$16384\$8\$1\$[a-f0-9]{32}\$[a-f0-9]{64}$/.test(value);
}

export function profile(document) {
  const { email, hoten, hinhanh, matkhau } = validateMember(document.data());
  if (!isPasswordHash(matkhau)) throw new Error('Invalid stored password hash');
  return { id: document.id, email, hoten, hinhanh, hasPassword: true };
}
