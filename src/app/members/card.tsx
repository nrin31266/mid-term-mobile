import { Stack, useLocalSearchParams } from 'expo-router';
import { Printer } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, Text, View } from 'react-native';

import { ActionButton } from '@/components/form-controls';
import { MemberCard } from '@/components/member-card';
import { Spacing } from '@/constants/theme';
import { useRemoteData } from '@/hooks/use-remote-data';
import { useTheme } from '@/hooks/use-theme';
import { getMember } from '@/services/members';

export default function CardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); const theme = useTheme();
  const load = useCallback(() => getMember(id), [id]);
  const { data: member, busy, error, reload } = useRemoteData(load);
  const [printing, setPrinting] = useState(false);
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    document.body.classList.add('member-card-page');
    return () => document.body.classList.remove('member-card-page');
  }, []);

  async function printCard() {
    if (Platform.OS !== 'web' || printing) return;
    setPrinting(true);
    try {
      await document.fonts?.ready;
      await Promise.all(Array.from(document.querySelectorAll('[data-testid="printable-member-card"] img')).map((image) =>
        (image as HTMLImageElement).decode().catch(() => undefined)));
      window.print();
    } finally { setPrinting(false); }
  }

  return <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: Spacing.four }}>
    <Stack.Screen options={{ title: 'Thẻ thành viên' }} />
    <View style={{ width: '100%', maxWidth: 520, alignSelf: 'center', gap: Spacing.four }}>
      {busy ? <ActivityIndicator color={theme.accent} accessibilityLabel="Đang tải thẻ" />
        : error || !member ? <><Text accessibilityRole="alert" style={{ color: theme.danger }}>{error || 'Không tìm thấy thành viên.'}</Text>
          <ActionButton title="Thử lại" onPress={() => void reload()} /></>
        : <View testID="printable-member-card"><MemberCard member={member} /></View>}
      {Platform.OS === 'web' && member && !busy && !error && <View testID="card-actions">
        <ActionButton title="In / Lưu PDF" icon={Printer} busy={printing} onPress={() => void printCard()} />
      </View>}
    </View>
  </ScrollView>;
}
