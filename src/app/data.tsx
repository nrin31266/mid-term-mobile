import { router, Stack } from 'expo-router';
import { ChevronLeft, Download, FileJson, Upload } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { ActionButton } from '@/components/form-controls';
import { Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { pickMemberJson, saveMemberJson } from '@/services/member-files';
import { importMembers, previewMembers, type ImportPreview } from '@/services/members';

export default function DataScreen() {
  const theme = useTheme(); const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState(false); const working = useRef(false);
  const [error, setError] = useState(''); const [message, setMessage] = useState('');
  const [file, setFile] = useState<{ name: string; data: unknown } | null>(null);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [confirm, setConfirm] = useState<'export' | 'import' | null>(null);

  async function choose() {
    if (working.current) return;
    working.current = true; setBusy(true); setError(''); setMessage('');
    try {
      const selected = await pickMemberJson();
      if (selected) { setFile(null); setPreview(null); const checked = await previewMembers(selected.data); setFile(selected); setPreview(checked); }
    } catch (failure) { setError((failure as Error).message); }
    finally { working.current = false; setBusy(false); }
  }

  async function apply() {
    if (working.current) return;
    const action = confirm; working.current = true; setBusy(true); setError(''); setMessage('');
    try {
      if (action === 'export') { const count = await saveMemberJson(); setMessage(`Đã chuẩn bị file ${count} hồ sơ.`); }
      if (action === 'import' && file && preview?.canImport) {
        const result = await importMembers(file.data);
        setMessage(`Đã thêm ${result.added} hồ sơ, bỏ qua ${result.skipped} hồ sơ đã có.`);
        setPreview(null); setFile(null);
      }
    } catch (failure) { setError((failure as Error).message); }
    finally { working.current = false; setBusy(false); setConfirm(null); }
  }

  return <>
    <Stack.Screen options={{ title: 'Dữ liệu JSON', headerLeft: () => <Pressable accessibilityRole="button" accessibilityLabel="Quay lại"
      disabled={busy} onPress={() => router.canGoBack() ? router.back() : router.replace('/')}
      style={{ minWidth: 44, minHeight: 44, justifyContent: 'center' }}><ChevronLeft size={24} color={theme.text} /></Pressable> }} />
    <FlatList data={preview?.rows ?? []} keyExtractor={(item) => String(item.row)} contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ width: '100%', maxWidth: 760, alignSelf: 'center', padding: Spacing.four, gap: Spacing.three, paddingBottom: Math.max(insets.bottom, Spacing.four) }}
      ListHeaderComponent={<View style={{ gap: Spacing.four, paddingBottom: Spacing.two }}>
        <View style={{ flexDirection: 'row', gap: Spacing.three, alignItems: 'center' }}><FileJson size={24} color={theme.accent} />
          <Text accessibilityRole="header" style={{ color: theme.text, fontSize: TypeSize.section, fontWeight: '700' }}>Sao lưu và nhập dữ liệu</Text></View>
        <Text style={{ color: theme.textSecondary, lineHeight: 22 }}>File JSON chứa bốn trường, gồm mật khẩu đã băm. Chỉ dùng dữ liệu minh họa cho bài nộp.</Text>
        <View style={{ flexDirection: 'row', gap: Spacing.three }}>
          <View style={{ flex: 1 }}><ActionButton title="Xuất JSON" icon={Download} secondary disabled={busy} onPress={() => setConfirm('export')} /></View>
          <View style={{ flex: 1 }}><ActionButton title="Chọn file" icon={Upload} busy={busy && !confirm} disabled={busy} onPress={() => void choose()} /></View>
        </View>
        {error ? <Text accessibilityRole="alert" style={{ color: theme.danger, lineHeight: 22 }}>{error}</Text> : null}
        {message ? <Text accessibilityLiveRegion="polite" style={{ color: theme.accent, lineHeight: 22 }}>{message}</Text> : null}
        {file && preview && <View style={{ gap: Spacing.three }}>
          <Text style={{ color: theme.text, fontWeight: '600' }}>{file.name}</Text>
          <Text style={{ color: theme.textSecondary, lineHeight: 22 }}>{preview.newCount} mới · {preview.existingCount} đã có · {preview.invalidCount} lỗi</Text>
          {preview.invalidCount > 0 && <Text accessibilityRole="alert" style={{ color: theme.danger }}>File còn lỗi. Chưa nhập hồ sơ nào.</Text>}
          {preview.capacityExceeded && <Text accessibilityRole="alert" style={{ color: theme.danger }}>Nhập file này sẽ vượt 200 hồ sơ.</Text>}
          <ActionButton title="Nhập dữ liệu" icon={Upload} disabled={!preview.canImport || busy} onPress={() => setConfirm('import')} />
        </View>}
      </View>}
      renderItem={({ item }) => <View style={{ padding: Spacing.three, gap: Spacing.two, borderWidth: 1, borderColor: theme.border,
        backgroundColor: theme.backgroundElement, borderRadius: Radius.control }}>
        <Text style={{ color: theme.text, fontWeight: '600' }}>Dòng {item.row}{item.hoten ? ` · ${item.hoten}` : ''}</Text>
        {item.email && <Text style={{ color: theme.textSecondary }}>{item.email}</Text>}
        <Text style={{ color: item.status === 'error' ? theme.danger : theme.textSecondary }}>{item.status === 'error' ? item.error : item.status === 'existing' ? 'Đã có · bỏ qua' : 'Sẽ thêm'}</Text>
      </View>} />
    <ConfirmDialog visible={!!confirm} busy={busy} title={confirm === 'export' ? 'Xuất dữ liệu?' : 'Nhập dữ liệu?'}
      message={confirm === 'export' ? 'File có mật khẩu đã băm. Lưu ở nơi riêng và chỉ nộp dữ liệu minh họa.' : `${preview?.newCount ?? 0} hồ sơ mới. Hồ sơ đã có sẽ được bỏ qua; dữ liệu được kiểm tra lại trước khi ghi.`}
      confirmTitle={confirm === 'export' ? 'Xuất JSON' : 'Nhập dữ liệu'} onCancel={() => setConfirm(null)} onConfirm={() => void apply()} />
  </>;
}
