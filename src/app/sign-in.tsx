import { Eye, EyeOff, LockKeyhole, LogIn, Mail, UsersRound } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';

import { ActionButton, FormField } from '@/components/form-controls';
import { ControlHeight, Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/providers/auth-provider';

export default function SignInScreen() {
  const theme = useTheme();
  const { logIn, error: sessionError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit() {
    if (busy) return;
    if (!email.trim() || !password) { setError('Nhập email và mật khẩu.'); return; }
    setError(''); setBusy(true);
    try { await logIn(email, password); }
    catch (failure) { setError((failure as Error).message); }
    finally { setBusy(false); }
  }

  return <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: Spacing.four, paddingBottom: Spacing.five }}>
      <View style={{ width: '100%', maxWidth: 400, alignSelf: 'center', gap: Spacing.five }}>
        <View style={{ alignItems: 'center', gap: Spacing.three }}>
          <View style={{ width: 56, height: 56, borderRadius: Radius.control, backgroundColor: theme.accent,
            alignItems: 'center', justifyContent: 'center' }}><UsersRound size={28} color={theme.onAccent} accessible={false} /></View>
          <Text accessibilityRole="header" style={{ color: theme.text, fontWeight: '700', fontSize: TypeSize.section }}>MemberDesk</Text>
          <Text style={{ color: theme.textSecondary, fontSize: TypeSize.body }}>Quản lý thành viên</Text>
        </View>
        <View style={{ backgroundColor: theme.backgroundElement, padding: Spacing.four, borderRadius: Radius.surface,
          borderWidth: 1, borderColor: theme.border, gap: Spacing.four }}>
          <Text accessibilityRole="header" style={{ color: theme.text, fontSize: TypeSize.section, fontWeight: '600' }}>Đăng nhập</Text>
          <FormField label="Email" icon={Mail} value={email} onChangeText={setEmail} placeholder="Email quản trị"
            keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" editable={!busy} maxLength={254} />
          <FormField label="Mật khẩu" icon={LockKeyhole} value={password} onChangeText={setPassword} secureTextEntry={!visible}
            autoCapitalize="none" autoCorrect={false} autoComplete="current-password" editable={!busy} maxLength={128}
            onSubmitEditing={() => void submit()} returnKeyType="go"
            trailing={<Pressable accessibilityRole="button" accessibilityLabel={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              onPress={() => setVisible(!visible)} style={{ minWidth: 44, minHeight: ControlHeight, justifyContent: 'center', alignItems: 'flex-end' }}>
              {visible ? <EyeOff size={20} color={theme.textSecondary} /> : <Eye size={20} color={theme.textSecondary} />}
            </Pressable>} />
          {(error || sessionError) ? <Text selectable accessibilityRole="alert" style={{ color: theme.danger, lineHeight: 22 }}>{error || sessionError}</Text> : null}
          <ActionButton title={busy ? 'Đang đăng nhập…' : 'Đăng nhập'} icon={LogIn} busy={busy} onPress={() => void submit()} />
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>;
}
