import sharp from 'sharp';
import { ApiError } from './access.mjs';
import { imagePattern } from './member-validation.mjs';

export function parseImageUrl(value, bucketName, mode) {
  if (!value) return null;
  let url;
  try { url = new URL(value); } catch { throw new ApiError(400, 'Địa chỉ ảnh chưa hợp lệ.'); }
  const emulator = mode === 'emulator';
  if (url.origin !== (emulator ? 'http://127.0.0.1:9199' : 'https://firebasestorage.googleapis.com') || url.hash || url.username || url.password) {
    throw new ApiError(400, 'Ảnh phải nằm trong Storage của bài.');
  }
  const prefix = `/v0/b/${bucketName}/o/`;
  let path;
  try { path = decodeURIComponent(url.pathname.slice(prefix.length)); } catch { throw new ApiError(400, 'Đường dẫn ảnh chưa hợp lệ.'); }
  const token = url.searchParams.get('token');
  if (!url.pathname.startsWith(prefix) || !imagePattern.test(path) ||
      url.searchParams.get('alt') !== 'media' || !token || token.length > 128 ||
      [...url.searchParams.keys()].some((key) => !['alt', 'token'].includes(key))) {
    throw new ApiError(400, 'Ảnh phải dùng đường dẫn avatar mới và URL tải hợp lệ.');
  }
  return { path, token };
}

export async function validateImage(value, bucket, mode) {
  const image = parseImageUrl(value, bucket.name, mode);
  if (!image) return;
  try {
    const file = bucket.file(image.path);
    const [metadata] = await file.getMetadata();
    const tokens = metadata.metadata?.firebaseStorageDownloadTokens?.split(',') ?? [];
    if (metadata.contentType !== 'image/jpeg' || Number(metadata.size) < 1 || Number(metadata.size) > 500 * 1024 || !tokens.includes(image.token)) {
      throw new Error('Invalid image metadata');
    }
    const [bytes] = await file.download({ validation: 'crc32c' });
    const decoder = sharp(bytes, { limitInputPixels: 512 * 512 });
    const info = await decoder.metadata();
    if (bytes.length > 500 * 1024 || info.format !== 'jpeg' || !info.width || !info.height ||
        info.width > 512 || info.height > 512 || info.width !== info.height || (info.pages ?? 1) > 1) throw new Error('Invalid JPEG dimensions');
    // Giải mã thật để không nhận file hỏng chỉ có header JPEG.
    await decoder.raw().toBuffer();
  } catch {
    throw new ApiError(400, 'Ảnh chưa tải xong hoặc không phải JPEG vuông tối đa 512 px, 500 KiB. Hãy chọn và tải lại.');
  }
}
