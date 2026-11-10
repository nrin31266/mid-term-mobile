import { router } from 'expo-router';
import { ChevronRight, LogOut, Plus, RefreshCw, UsersRound } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/form-controls';
import { MemberAvatar } from '@/components/member-avatar';
import { ControlHeight, Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRemoteData } from '@/hooks/use-remote-data';
import { useAuth } from '@/providers/auth-provider';
import { listMembers } from '@/services/members';

export default function HomeScreen() {
  const theme = useTheme(); const { logOut } = useAuth(); const insets = useSafeAreaInsets();
  const wide = useWindowDimensions().width >= 900;
  const { data, error: loadError, busy, reload } = useRemoteData(listMembers);
  const members = data?.members ?? [];
  const [actionError, setError] = useState('');
  const error = actionError || loadError;

  async function leave() {
    try { await logOut(); } catch { setError('Chưa đăng xuất được. Hãy thử lại.'); }
  }

  return <FlatList data={error || busy ? [] : members} keyExtractor={(member) => member.id}
    contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" refreshing={busy}
    onRefresh={() => void reload()}
    contentContainerStyle={{ padding: Spacing.four, paddingBottom: Math.max(insets.bottom, Spacing.four),
      width: '100%', maxWidth: 1100, alignSelf: 'center', gap: Spacing.three }}
    ListHeaderComponent={<View style={{ gap: Spacing.four, paddingBottom: Spacing.two }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Spacing.three }}>
        <View style={{ gap: Spacing.two, flex: 1 }}>
          <Text accessibilityRole="header" style={{ color: theme.text, fontSize: wide ? TypeSize.hero : TypeSize.section, fontWeight: '700' }}>Thành viên</Text>
          {!busy && !error && <Text style={{ color: theme.textSecondary, fontSize: TypeSize.label }}>{members.length} hồ sơ</Text>}
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Đăng xuất" onPress={() => void leave()}
          style={{ minWidth: ControlHeight, minHeight: ControlHeight, alignItems: 'center', justifyContent: 'center' }}>
          <LogOut size={22} color={theme.textSecondary} />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', gap: Spacing.two }}>
        <View style={{ flex: 1 }}><ActionButton title="Thêm thành viên" icon={Plus} onPress={() => router.push('/members/new')} /></View>
        <Pressable accessibilityRole="button" accessibilityLabel="Làm mới danh sách" disabled={busy} onPress={() => { setError(''); void reload(); }}
          style={{ minWidth: 52, minHeight: ControlHeight, borderRadius: Radius.control, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.backgroundSelected }}>
          <RefreshCw size={20} color={theme.accent} />
        </Pressable>
      </View>
      {wide && !busy && !error && members.length > 0 && <View style={{ flexDirection: 'row', paddingHorizontal: Spacing.three, paddingTop: Spacing.three }}>
        <Text style={{ flex: 1, color: theme.textSecondary, fontSize: TypeSize.label }}>Họ và tên</Text>
        <Text style={{ flex: 1, color: theme.textSecondary, fontSize: TypeSize.label }}>Email</Text>
        <Text style={{ width: 110, textAlign: 'right', color: theme.textSecondary, fontSize: TypeSize.label }}>Hồ sơ</Text>
      </View>}
    </View>}
    ListEmptyComponent={busy ? <ActivityIndicator color={theme.accent} accessibilityLabel="Đang tải thành viên" style={{ padding: Spacing.five }} />
      : error ? <View style={{ gap: Spacing.three, padding: Spacing.four }}><Text accessibilityRole="alert" style={{ color: theme.danger }}>{error}</Text>
        <ActionButton title="Thử lại" secondary onPress={() => { setError(''); void reload(); }} /></View>
      : <View style={{ alignItems: 'center', gap: Spacing.three, padding: Spacing.five }}>
        <UsersRound size={40} color={theme.textSecondary} accessible={false} />
        <Text style={{ color: theme.text, fontSize: TypeSize.body, fontWeight: '600' }}>Chưa có thành viên</Text>
      </View>}
    renderItem={({ item }) => <Pressable accessibilityRole="button" accessibilityLabel={`Xem hồ sơ ${item.hoten}, ${item.email}`}
      onPress={() => router.push({ pathname: '/members/[id]', params: { id: item.id } })}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', padding: Spacing.three, gap: Spacing.three,
        borderWidth: 1, borderColor: theme.border, borderRadius: Radius.control, backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement })}>
      <View style={{ flex: 1, flexDirection: 'row', gap: Spacing.three, alignItems: 'center', minWidth: 0 }}>
        <MemberAvatar uri={item.hinhanh} name={item.hoten} />
        <View style={{ flex: 1, gap: Spacing.two }}><Text numberOfLines={2} style={{ color: theme.text, fontSize: TypeSize.body, fontWeight: '600' }}>{item.hoten}</Text>
          {!wide && <Text numberOfLines={1} style={{ color: theme.textSecondary, fontSize: TypeSize.label }}>{item.email}</Text>}
        </View>
      </View>
      {wide && <Text numberOfLines={2} style={{ flex: 1, color: theme.textSecondary, fontSize: TypeSize.body }}>{item.email}</Text>}
      <View style={{ width: wide ? 110 : undefined, alignItems: 'flex-end' }}><ChevronRight size={20} color={theme.textSecondary} accessible={false} /></View>
    </Pressable>} />;
}
