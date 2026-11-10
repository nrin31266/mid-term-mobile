import { ApiError } from './access.mjs';
import { hashPassword, maxMembers, memberId, profile, validateMember } from './member-validation.mjs';
import { validateImage } from './member-images.mjs';

export function createMemberStore(database, bucket, mode) {
  const collection = database.collection('midterm_users');
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
      await validateImage(member.hinhanh, bucket, mode);
      const id = memberId(member.email);
      const ref = collection.doc(id);
      await database.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(collection.limit(maxMembers + 1));
        if (snapshot.docs.some((document) => document.id === id)) throw new ApiError(409, 'Email này đã có trong danh sách.');
        if (snapshot.size >= maxMembers) throw new ApiError(409, 'Đã đủ 200 hồ sơ. Hãy xóa hồ sơ không cần trước khi thêm.');
        transaction.create(ref, member);
      });
      return { id, email: member.email, hoten: member.hoten, hinhanh: member.hinhanh, hasPassword: true };
    },
  };
}
