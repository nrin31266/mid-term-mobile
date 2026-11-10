import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

import { exportMembers } from './members';

export async function pickMemberJson() {
  let name: string; let text: string;
  if (Platform.OS === 'web') {
    const selected = await DocumentPicker.getDocumentAsync({ type: ['application/json', 'text/plain'] });
    if (selected.canceled) return null;
    const asset = selected.assets[0];
    if (!asset.file) throw new Error('Không đọc được file đã chọn.');
    if (asset.file.size > 2 * 1024 * 1024) throw new Error('File vượt 2 MiB.');
    name = asset.name; text = await asset.file.text();
  } else {
    // Dùng URI được hệ thống cấp quyền, tránh cache DocumentPicker ngoài sandbox Expo Go.
    const selected = await File.pickFileAsync({ mimeTypes: ['application/json', 'text/plain'] });
    if (selected.canceled) return null;
    if (selected.result.size > 2 * 1024 * 1024) throw new Error('File vượt 2 MiB.');
    name = 'File JSON đã chọn'; text = await selected.result.text();
  }
  if (new TextEncoder().encode(text).length > 2 * 1024 * 1024) throw new Error('File vượt 2 MiB.');
  let data: unknown;
  try { data = JSON.parse(text); } catch { throw new Error('Không đọc được JSON. Kiểm tra nội dung file.'); }
  return { name, data };
}

export async function saveMemberJson() {
  const members = await exportMembers();
  const text = JSON.stringify(members, null, 2) + '\n';
  if (Platform.OS === 'web') {
    const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'users.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } else {
    if (!(await Sharing.isAvailableAsync())) throw new Error('Thiết bị chưa hỗ trợ lưu/chia sẻ file.');
    const file = new File(Paths.cache, 'users.json'); await file.write(text);
    await Sharing.shareAsync(file.uri, { mimeType: 'application/json', UTI: 'public.json', dialogTitle: 'Lưu dữ liệu thành viên' });
  }
  return members.length;
}
