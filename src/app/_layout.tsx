import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';
import { AuthProvider, useAuth } from '@/providers/auth-provider';

void SplashScreen.preventAutoHideAsync();

function SessionRoutes() {
  const { admin, loading } = useAuth();
  const theme = useTheme();
  useEffect(() => { if (!loading) void SplashScreen.hideAsync(); }, [loading]);
  if (loading) return <View style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.background }}>
    <ActivityIndicator accessibilityLabel="Đang kiểm tra phiên đăng nhập" color={theme.accent} />
  </View>;
  return <Stack screenOptions={{ contentStyle: { backgroundColor: theme.background }, headerTintColor: theme.text,
    headerStyle: { backgroundColor: theme.backgroundElement }, headerShadowVisible: false }}>
    <Stack.Protected guard={!admin}><Stack.Screen name="sign-in" options={{ title: 'MemberDesk · Đăng nhập' }} /></Stack.Protected>
    <Stack.Protected guard={admin}><Stack.Screen name="index" options={{ title: 'MemberDesk' }} /></Stack.Protected>
  </Stack>;
}

export default function RootLayout() {
  const scheme = useColorScheme();
  return <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
    <AuthProvider><StatusBar style="auto" /><SessionRoutes /></AuthProvider>
  </ThemeProvider>;
}
