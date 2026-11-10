import { randomUUID } from 'expo-crypto';
import { File } from 'expo-file-system';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Platform } from 'react-native';

import { getFirebase } from './firebase';

export type PreparedAvatar = { uri: string; bytes: Uint8Array; width: number; height: number; originalBytes?: number; originalWidth: number; originalHeight: number };

export async function pickAvatar(camera: boolean): Promise<PreparedAvatar | null> {
  if (camera && !(await ImagePicker.requestCameraPermissionsAsync()).granted) {
    throw new Error('Chưa có quyền camera. Bạn có thể chọn ảnh từ thư viện hoặc bật quyền trong Cài đặt.');
  }
  const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: Platform.OS !== 'web', aspect: [1, 1], quality: 1 };
  const result = camera ? await ImagePicker.launchCameraAsync(options) : await ImagePicker.launchImageLibraryAsync(options);
  if (result.canceled) return null;
  const asset = result.assets[0];
  if ((asset.fileSize ?? 0) > 20 * 1024 * 1024) throw new Error('Ảnh gốc vượt 20 MiB. Hãy chọn ảnh nhỏ hơn.');
  const sourceContext = ImageManipulator.manipulate(asset.uri, { maxWidth: 1024, maxHeight: 1024 });
  const source = await sourceContext.renderAsync();
  const side = Math.min(source.width, source.height);
  const context = ImageManipulator.manipulate(source);
  context.crop({ originX: Math.floor((source.width - side) / 2), originY: Math.floor((source.height - side) / 2), width: side, height: side });
  context.resize({ width: Math.min(side, 512), height: Math.min(side, 512) });
  const image = await context.renderAsync();
  try {
    for (const compress of [0.82, 0.65, 0.45]) {
      const output = await image.saveAsync({ format: SaveFormat.JPEG, compress });
      const bytes = Platform.OS === 'web' ? new Uint8Array(await (await fetch(output.uri)).arrayBuffer()) : await new File(output.uri).bytes();
      if (bytes.length <= 200 * 1024 || (compress === 0.45 && bytes.length <= 500 * 1024)) {
        return { uri: output.uri, bytes, width: output.width, height: output.height, originalBytes: asset.fileSize, originalWidth: asset.width, originalHeight: asset.height };
      }
    }
    throw new Error('Ảnh sau xử lý vẫn vượt 500 KiB. Hãy chọn ảnh khác.');
  } finally { image.release(); source.release(); context.release(); sourceContext.release(); }
}

export async function uploadAvatar(avatar: PreparedAvatar, progress: (value: number) => void) {
  const object = ref(getFirebase().storage, `midterm-mobile/avatars/${randomUUID()}.jpg`);
  // XHR đọc Blob native, tránh lỗi Uint8Array và URI cache có ký tự mã hóa trong Expo Go.
  const body = Platform.OS === 'web' ? avatar.bytes : await new Promise<Blob>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', avatar.uri);
    request.responseType = 'blob'; request.timeout = 15_000;
    request.onload = () => {
      const blob = request.response as Blob;
      if (blob?.size === avatar.bytes.length) resolve(blob);
      else reject(new Error('Chưa đọc được file ảnh. Hãy chọn lại ảnh.'));
    };
    request.onerror = request.ontimeout = request.onabort = () => reject(new Error('Chưa đọc được file ảnh. Hãy chọn lại ảnh.'));
    request.send();
  });
  const task = uploadBytesResumable(object, body, { contentType: 'image/jpeg' });
  const timeout = setTimeout(() => task.cancel(), 60_000);
  try {
    await new Promise<void>((resolve, reject) => task.on('state_changed', (snapshot) =>
      progress(Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)), reject, resolve));
    return await getDownloadURL(object);
  } catch { throw new Error('Chưa tải ảnh lên được. Kiểm tra mạng rồi bấm lưu để thử lại.'); }
  finally { clearTimeout(timeout); }
}
