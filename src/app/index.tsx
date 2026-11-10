import { router } from 'expo-router';
import { ChevronLeft, ChevronRight, Database, LogOut, Plus, RefreshCw, Search, UsersRound } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionButton, FormField } from '@/components/form-controls';
import { ChoiceMenu } from '@/components/choice-menu';
import { MemberAvatar } from '@/components/member-avatar';
import { ControlHeight, Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRemoteData } from '@/hooks/use-remote-data';
import { useAuth } from '@/providers/auth-provider';
import { listMembers } from '@/services/members';
import { selectMembers, type MemberSort, type PhotoFilter } from '@/utils/member-search';

const photoOptions = [{ value: 'all', label: 'Tất cả ảnh' }, { value: 'with', label: 'Có ảnh' }, { value: 'without', label: 'Chưa có ảnh' }] as const;
const sortOptions = [{ value: 'name-asc', label: 'Tên A–Z' }, { value: 'name-desc', label: 'Tên Z–A' },
  { value: 'email-asc', label: 'Email A–Z' }, { value: 'email-desc', label: 'Email Z–A' }] as const;

export default function HomeScreen() {
  const theme = useTheme(); const { logOut } = useAuth(); const insets = useSafeAreaInsets();
  const wide = useWindowDimensions().width >= 900;
  const { data, error: loadError, busy, reload } = useRemoteData(listMembers);
  const members = data?.members ?? [];
  const [actionError, setError] = useState('');
  const [query, setQuery] = useState(''); const [photo, setPhoto] = useState<PhotoFilter>('all');
  const [sort, setSort] = useState<MemberSort>('name-asc'); const [page, setPage] = useState(1);
  const result = selectMembers(members, query, photo, sort, page);
  const list = useRef<FlatList>(null);
  const error = actionError || loadError;

  async function leave() {
    try { await logOut(); } catch { setError('Chưa đăng xuất được. Hãy thử lại.'); }
  }

  function changePage(next: number) { setPage(next); list.current?.scrollToOffset({ offset: 0, animated: false }); }

  return <FlatList ref={list} data={error || busy ? [] : result.members} keyExtractor={(member) => member.id}
    contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" refreshing={busy}
    onRefresh={() => void reload()}
    contentContainerStyle={{ padding: Spacing.four, paddingBottom: Math.max(insets.bottom, Spacing.four),
      width: '100%', maxWidth: 1100, alignSelf: 'center', gap: Spacing.three }}
    ListHeaderComponent={<View style={{ gap: Spacing.four, paddingBottom: Spacing.two }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Spacing.three }}>
        <View style={{ gap: Spacing.two, flex: 1 }}>
          <Text accessibilityRole="header" style={{ color: theme.text, fontSize: wide ? TypeSize.hero : TypeSize.section, fontWeight: '700' }}>Thành viên</Text>
          {!busy && !error && <Text style={{ color: theme.textSecondary, fontSize: TypeSize.label }}>
            {query || photo !== 'all' ? `${result.total} kết quả · ` : ''}{members.length}/{data?.limit ?? 200} hồ sơ
          </Text>}
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Dữ liệu JSON" onPress={() => router.push('/data')}
          style={{ minWidth: ControlHeight, minHeight: ControlHeight, alignItems: 'center', justifyContent: 'center' }}>
          <Database size={22} color={theme.textSecondary} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Đăng xuất" onPress={() => void leave()}
          style={{ minWidth: ControlHeight, minHeight: ControlHeight, alignItems: 'center', justifyContent: 'center' }}>
          <LogOut size={22} color={theme.textSecondary} />
        </Pressable>
      </View>
      <FormField label="Tìm thành viên" icon={Search} value={query} placeholder="Tên hoặc email" autoCapitalize="none" autoCorrect={false}
        onChangeText={(value) => { setQuery(value); setPage(1); }} />
      <View style={{ flexDirection: 'row', gap: Spacing.two }}>
        <View style={{ flex: 1 }}><ChoiceMenu label="Lọc ảnh" value={photo} options={photoOptions}
          onChange={(value) => { setPhoto(value as PhotoFilter); setPage(1); }} /></View>
        <View style={{ flex: 1 }}><ChoiceMenu label="Sắp xếp" value={sort} options={sortOptions}
          onChange={(value) => { setSort(value as MemberSort); setPage(1); }} /></View>
      </View>
      <View style={{ flexDirection: 'row', gap: Spacing.two }}>
        <View style={{ flex: 1 }}><ActionButton title="Thêm thành viên" icon={Plus} onPress={() => router.push('/members/new')} /></View>
        <Pressable accessibilityRole="button" accessibilityLabel="Làm mới danh sách" disabled={busy} onPress={() => { setError(''); void reload(); }}
          style={{ minWidth: 52, minHeight: ControlHeight, borderRadius: Radius.control, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.backgroundSelected }}>
          <RefreshCw size={20} color={theme.accent} />
        </Pressable>
      </View>
      {wide && !busy && !error && result.total > 0 && <View style={{ flexDirection: 'row', paddingHorizontal: Spacing.three, paddingTop: Spacing.three }}>
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
        <Text style={{ color: theme.text, fontSize: TypeSize.body, fontWeight: '600' }}>{members.length ? 'Không tìm thấy thành viên' : 'Chưa có thành viên'}</Text>
      </View>}
    ListFooterComponent={!busy && !error && result.total > 0 ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.four, paddingVertical: Spacing.three }}>
      <Pressable accessibilityRole="button" accessibilityLabel="Trang trước" disabled={result.page === 1}
        accessibilityState={{ disabled: result.page === 1 }} onPress={() => changePage(result.page - 1)}
        style={{ minWidth: ControlHeight, minHeight: ControlHeight, alignItems: 'center', justifyContent: 'center', opacity: result.page === 1 ? 0.3 : 1 }}>
        <ChevronLeft size={24} color={theme.accent} />
      </Pressable>
      <Text accessibilityLiveRegion="polite" style={{ color: theme.text, fontSize: TypeSize.label }}>Trang {result.page} / {result.pageCount}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Trang sau" disabled={result.page === result.pageCount}
        accessibilityState={{ disabled: result.page === result.pageCount }} onPress={() => changePage(result.page + 1)}
        style={{ minWidth: ControlHeight, minHeight: ControlHeight, alignItems: 'center', justifyContent: 'center', opacity: result.page === result.pageCount ? 0.3 : 1 }}>
        <ChevronRight size={24} color={theme.accent} />
      </Pressable>
    </View> : undefined}
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
