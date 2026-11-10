import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { ActionButton } from '@/components/form-controls';
import { MaxContentWidth, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/providers/auth-provider';
import { apiRequest } from '@/services/api';

export default function HomeScreen() {
  const theme = useTheme();
  const { logOut } = useAuth();
  const [session, setSession] = useState<{ email: string } | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    apiRequest<{ email: string }>('/session').then((result) => {
      if (active) { setSession(result); setError(''); }
    }).catch((failure) => { if (active) setError(failure.message); })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, [attempt]);

  async function leave() {
    try { await logOut(); } catch { setError('Chưa đăng xuất được. Vui lòng thử lại.'); }
  }

  return <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: Spacing.four }}>
    <View style={{ width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', gap: Spacing.four }}>
      <Text accessibilityRole="header" style={{ color: theme.text, fontSize: TypeSize.section, fontWeight: '700' }}>Không gian quản trị</Text>
      {busy ? <ActivityIndicator accessibilityLabel="Đang xác minh quyền truy cập" color={theme.accent} /> : error ? <>
        <Text selectable accessibilityRole="alert" style={{ color: theme.danger }}>{error}</Text>
        <ActionButton title="Thử lại" onPress={() => { setBusy(true); setAttempt(attempt + 1); }} />
      </> : <>
        <Text style={{ color: theme.text, fontSize: TypeSize.body }}>Bạn đã đăng nhập với quyền quản trị.</Text>
        <Text selectable style={{ color: theme.textSecondary, fontSize: TypeSize.body }}>{session?.email}</Text>
      </>}
      <ActionButton title="Đăng xuất" secondary onPress={() => void leave()} />
    </View>
  </ScrollView>;
}
