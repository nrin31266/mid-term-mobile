import { ApiError } from './access.mjs';
import { parseImageUrl } from './member-images.mjs';
import { imagePattern, maxMembers, validateMember } from './member-validation.mjs';

export const imageCleanupLockPath = 'memberdesk_internal/image_cleanup';

export async function cleanupAvatars(database, bucket, mode, { apply = false, minimumAgeMs = 24 * 60 * 60 * 1000 } = {}) {
  if (!Number.isFinite(minimumAgeMs) || minimumAgeMs < 0) throw new Error('Invalid minimum image age');
  const lock = database.doc(imageCleanupLockPath);
  const cutoff = Date.now() - minimumAgeMs;
  if (apply) await lock.create({});
  try {
    const snapshot = await database.collection('midterm_users').limit(maxMembers + 1).get();
    if (snapshot.size > maxMembers) throw new ApiError(409, 'Cần rà lại dữ liệu trước khi dọn ảnh.');
    const referenced = new Set(snapshot.docs.map((document) =>
      parseImageUrl(validateMember(document.data()).hinhanh, bucket.name, mode)?.path).filter(Boolean));
    const [files, nextPage] = await bucket.getFiles({ prefix: 'midterm-mobile/avatars/', autoPaginate: false, maxResults: 2000 });
    if (nextPage) throw new Error('Có hơn 2.000 ảnh; cần kiểm tra riêng trước khi dọn.');
    const candidates = files.filter((file) => imagePattern.test(file.name) && !referenced.has(file.name) &&
      Number.isFinite(Date.parse(file.metadata.timeCreated)) && Date.parse(file.metadata.timeCreated) <= cutoff);
    let deleted = 0;
    if (apply) for (const file of candidates) {
      // Khóa ghi hồ sơ và generation ngăn xóa nhầm ảnh vừa được thay đổi.
      await file.delete({ ifGenerationMatch: file.metadata.generation }); deleted++;
    }
    return { scanned: files.length, referenced: referenced.size, candidates: candidates.length, deleted, minimumAgeMs, applied: apply };
  } finally { if (apply) await lock.delete(); }
}
