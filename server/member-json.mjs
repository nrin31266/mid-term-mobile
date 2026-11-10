import { ApiError } from './access.mjs';
import { isPasswordHash, maxMembers, validateMember } from './member-validation.mjs';
import { parseImageUrl, validateImage } from './member-images.mjs';

export async function inspectImport(input, bucket, mode) {
  if (!Array.isArray(input) || input.length < 1 || input.length > maxMembers) {
    throw new ApiError(400, 'File cần là mảng JSON từ 1 đến 200 hồ sơ.');
  }
  const members = []; const errors = []; const emails = new Set();
  input.forEach((value, index) => {
    try {
      const member = validateMember(value);
      if (!isPasswordHash(member.matkhau)) throw new ApiError(400, 'Mật khẩu phải là hash scrypt đúng định dạng của bản xuất.');
      parseImageUrl(member.hinhanh, bucket.name, mode);
      if (emails.has(member.email)) throw new ApiError(400, 'Email lặp trong file.');
      emails.add(member.email); members.push({ row: index + 1, member });
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      errors.push({ row: index + 1, error: error.message });
    }
  });
  const images = new Map(); const failed = new Set();
  // Giới hạn giải mã đồng thời và dùng lại kết quả khi nhiều hồ sơ chung ảnh.
  for (let start = 0; start < members.length; start += 5) await Promise.all(members.slice(start, start + 5).map(async ({ row, member }) => {
    if (!images.has(member.hinhanh)) images.set(member.hinhanh,
      validateImage(member.hinhanh, bucket, mode).then(() => '', (error) => error.message));
    const error = await images.get(member.hinhanh);
    if (error) { errors.push({ row, error }); failed.add(row); }
  }));
  return { members: members.filter(({ row }) => !failed.has(row)), errors: errors.sort((a, b) => a.row - b.row) };
}

export function importPreview(input, inspected, existing) {
  const stored = new Set(existing.docs.map((document) => document.data().email));
  const rows = input.map((_, index) => {
    const row = index + 1; const invalid = inspected.errors.find((item) => item.row === row);
    if (invalid) return { row, status: 'error', error: invalid.error };
    const { member } = inspected.members.find((item) => item.row === row);
    return { row, status: stored.has(member.email) ? 'existing' : 'new', email: member.email, hoten: member.hoten };
  });
  const newCount = rows.filter((row) => row.status === 'new').length;
  const existingCount = rows.filter((row) => row.status === 'existing').length;
  return { rows, newCount, existingCount, invalidCount: inspected.errors.length, validCount: inspected.members.length,
    canImport: !inspected.errors.length && existing.size + newCount <= maxMembers,
    capacityExceeded: existing.size + newCount > maxMembers };
}
