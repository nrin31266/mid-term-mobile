import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export default function MembersLayout() {
  const theme = useTheme();
  return <Stack screenOptions={{ headerStyle: { backgroundColor: theme.backgroundElement }, headerTintColor: theme.text,
    headerShadowVisible: false, contentStyle: { backgroundColor: theme.background },
    headerLeft: () => <Pressable accessibilityRole="button" accessibilityLabel="Quay lại"
      onPress={() => router.canGoBack() ? router.back() : router.replace('/')}
      style={{ minWidth: 44, minHeight: 44, justifyContent: 'center' }}><ChevronLeft size={24} color={theme.text} /></Pressable> }}>
    <Stack.Screen name="new" options={{ title: 'Thêm thành viên' }} />
    <Stack.Screen name="[id]" options={{ title: 'Hồ sơ thành viên' }} />
    <Stack.Screen name="edit" options={{ title: 'Sửa thành viên' }} />
  </Stack>;
}
