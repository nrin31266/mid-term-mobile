import { ApiError } from './access.mjs';
import { hashPassword, maxMembers, memberId, profile, validateMember } from './member-validation.mjs';
import { validateImage } from './member-images.mjs';
import { imageCleanupLockPath } from './image-cleanup.mjs';

export function createMemberStore(database, bucket, mode) {
  const collection = database.collection('midterm_users');
  async function ensureWritable(transaction) {
    if ((await transaction.get(database.doc(imageCleanupLockPath))).exists) {
      throw new ApiError(503, 'Đang dọn ảnh. Chờ một chút rồi lưu lại.');
    }
  }
  return {
    async list() {
      const snapshot = await collection.limit(maxMembers + 1).get();
      if (snapshot.size > maxMembers) throw new ApiError(409, 'Dữ liệu vượt giới hạn 200 hồ sơ. Liên hệ người quản trị.');
      return { members: snapshot.docs.map(profile), limit: maxMembers };
    },
    async get(id) {
      if (!/^[a-f0-9]{64}$/.test(id)) throw new ApiError(404, 'Không tìm thấy thành viên.');
      const document = await collection.doc(id).get();
      if (!document.exists) throw new ApiError(404, 'Không tìm thấy thành viên.');
      return profile(document);
    },
    async create(input) {
      const member = validateMember(input);
      member.matkhau = await hashPassword(member.matkhau);
      const id = memberId(member.email);
      const ref = collection.doc(id);
      await database.runTransaction(async (transaction) => {
        await ensureWritable(transaction);
        await validateImage(member.hinhanh, bucket, mode);
        const snapshot = await transaction.get(collection.limit(maxMembers + 1));
        if (snapshot.docs.some((document) => document.id === id)) throw new ApiError(409, 'Email này đã có trong danh sách.');
        if (snapshot.size >= maxMembers) throw new ApiError(409, 'Đã đủ 200 hồ sơ. Hãy xóa hồ sơ không cần trước khi thêm.');
        transaction.create(ref, member);
      });
      return { id, email: member.email, hoten: member.hoten, hinhanh: member.hinhanh, hasPassword: true };
    },
    async update(id, input) {
      if (!/^[a-f0-9]{64}$/.test(id)) throw new ApiError(404, 'Không tìm thấy thành viên.');
      const member = validateMember(input);
      const hash = member.matkhau ? await hashPassword(member.matkhau) : null;
      const nextId = memberId(member.email);
      const currentRef = collection.doc(id); const nextRef = collection.doc(nextId);
      await database.runTransaction(async (transaction) => {
        await ensureWritable(transaction);
        await validateImage(member.hinhanh, bucket, mode);
        const [current, destination] = await transaction.getAll(currentRef, nextRef);
        if (!current.exists) throw new ApiError(404, 'Không tìm thấy thành viên.');
        if (nextId !== id && destination.exists) throw new ApiError(409, 'Email này đã có trong danh sách.');
        // Đọc hash mới nhất trong transaction khi người sửa không đặt mật khẩu mới.
        transaction.set(nextRef, { ...member, matkhau: hash ?? current.data().matkhau });
        if (nextId !== id) transaction.delete(currentRef);
      });
      return { id: nextId, email: member.email, hoten: member.hoten, hinhanh: member.hinhanh, hasPassword: true };
    },
    async remove(id) {
      if (!/^[a-f0-9]{64}$/.test(id)) throw new ApiError(404, 'Không tìm thấy thành viên.');
      await database.runTransaction(async (transaction) => {
        await ensureWritable(transaction);
        const ref = collection.doc(id); const current = await transaction.get(ref);
        if (!current.exists) throw new ApiError(404, 'Không tìm thấy thành viên.');
        transaction.delete(ref);
      });
      return { deleted: true };
    },
  };
}
