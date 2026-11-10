import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

export default function MembersLayout() {
  const theme = useTheme();
  return <Stack screenOptions={{ headerStyle: { backgroundColor: theme.backgroundElement }, headerTintColor: theme.text,
    headerShadowVisible: false, contentStyle: { backgroundColor: theme.background } }}>
    <Stack.Screen name="new" options={{ title: 'Thêm thành viên' }} />
    <Stack.Screen name="[id]" options={{ title: 'Hồ sơ thành viên' }} />
  </Stack>;
}
