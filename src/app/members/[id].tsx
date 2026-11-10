import { router, useLocalSearchParams } from 'expo-router';
import { ContactRound, LockKeyhole, Mail, Pencil, Trash2 } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/form-controls';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { MemberAvatar } from '@/components/member-avatar';
import { Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRemoteData } from '@/hooks/use-remote-data';
import { deleteMember, getMember } from '@/services/members';

export default function MemberScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme(); const insets = useSafeAreaInsets();
  const load = useCallback(() => getMember(id), [id]);
  const { data: member, error, busy, reload } = useRemoteData(load);
  const [confirm, setConfirm] = useState(false); const [removing, setRemoving] = useState(false); const [actionError, setActionError] = useState('');
  const deleting = useRef(false);

  async function remove() {
    if (deleting.current || !member) return;
    deleting.current = true; setRemoving(true); setActionError('');
    try { await deleteMember(member.id); router.replace('/'); }
    catch (failure) { setActionError((failure as Error).message); setConfirm(false); }
    finally { deleting.current = false; setRemoving(false); }
  }

  return <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: Spacing.four, paddingBottom: Math.max(insets.bottom, Spacing.four) }}>
    <View style={{ width: '100%', maxWidth: 560, alignSelf: 'center', gap: Spacing.four }}>
      {busy ? <ActivityIndicator color={theme.accent} accessibilityLabel="Đang tải hồ sơ" /> : error ? <>
        <Text accessibilityRole="alert" style={{ color: theme.danger }}>{error}</Text>
        <ActionButton title="Thử lại" onPress={() => void reload()} />
      </> : member && <View style={{ padding: Spacing.five, backgroundColor: theme.backgroundElement,
        borderRadius: Radius.surface, borderWidth: 1, borderColor: theme.border, gap: Spacing.four, alignItems: 'center' }}>
        <MemberAvatar uri={member.hinhanh} name={member.hoten} size={120} />
        <Text selectable accessibilityRole="header" style={{ color: theme.text, fontSize: TypeSize.section, fontWeight: '700', textAlign: 'center' }}>{member.hoten}</Text>
        <View style={{ width: '100%', borderTopWidth: 1, borderTopColor: theme.border, paddingTop: Spacing.four, gap: Spacing.four }}>
          <View style={{ flexDirection: 'row', gap: Spacing.three, alignItems: 'center' }}><Mail size={20} color={theme.textSecondary} accessible={false} />
            <Text selectable style={{ flex: 1, color: theme.text, fontSize: TypeSize.body }}>{member.email}</Text></View>
          <View style={{ flexDirection: 'row', gap: Spacing.three, alignItems: 'center' }}><LockKeyhole size={20} color={theme.textSecondary} accessible={false} />
            <Text style={{ color: theme.textSecondary, fontSize: TypeSize.label }}>Mật khẩu đã đặt</Text></View>
        </View>
      </View>}
      {!busy && !error && member && <>
        <ActionButton title="Thẻ thành viên" icon={ContactRound} secondary
          onPress={() => router.push({ pathname: '/members/card', params: { id: member.id } })} />
        <View style={{ flexDirection: 'row', gap: Spacing.three }}>
          <View style={{ flex: 1 }}><ActionButton title="Sửa hồ sơ" icon={Pencil} disabled={removing}
            onPress={() => router.push({ pathname: '/members/edit', params: { id: member.id } })} /></View>
          <ActionButton title="Xóa" icon={Trash2} secondary danger disabled={removing} onPress={() => setConfirm(true)} />
        </View>
        {actionError ? <Text accessibilityRole="alert" style={{ color: theme.danger }}>{actionError}</Text> : null}
        <ConfirmDialog visible={confirm} title="Xóa thành viên?" message={`${member.hoten}\n${member.email}`} confirmTitle="Xóa thành viên"
          danger busy={removing} onCancel={() => setConfirm(false)} onConfirm={() => void remove()} />
      </>}
    </View>
  </ScrollView>;
}
