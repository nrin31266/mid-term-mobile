import { useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { ActionButton } from '@/components/form-controls';
import { MemberForm } from '@/components/member-form';
import { Spacing } from '@/constants/theme';
import { useRemoteData } from '@/hooks/use-remote-data';
import { useTheme } from '@/hooks/use-theme';
import { getMember } from '@/services/members';

export default function EditMemberScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const load = useCallback(() => getMember(id), [id]);
  const { data: member, busy, error, reload } = useRemoteData(load);
  if (busy) return <ActivityIndicator color={theme.accent} accessibilityLabel="Đang tải hồ sơ" style={{ padding: Spacing.four }} />;
  if (error || !member) return <View style={{ padding: Spacing.four, gap: Spacing.three }}>
    <Text accessibilityRole="alert" style={{ color: theme.danger }}>{error || 'Không tìm thấy thành viên.'}</Text>
    <ActionButton title="Thử lại" onPress={() => void reload()} />
  </View>;
  return <MemberForm key={member.id} member={member} />;
}
