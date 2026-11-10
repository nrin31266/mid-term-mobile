import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { ActionButton, FormField } from '@/components/form-controls';
import { ControlHeight, Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/providers/auth-provider';

export default function SignInScreen() {
  const theme = useTheme();
  const { logIn, error: sessionError } = useAuth();
  const wide = useWindowDimensions().width >= 900;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit() {
    if (busy) return;
    if (!email.trim() || !password) { setError('Nhập email và mật khẩu để tiếp tục.'); return; }
    setError(''); setBusy(true);
    try { await logIn(email, password); }
    catch (failure) { setError((failure as Error).message); }
    finally { setBusy(false); }
  }

  return <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
      <View style={[styles.content, { flexDirection: wide ? 'row' : 'column', gap: wide ? Spacing.six : Spacing.four }]}>
        <View style={[styles.intro, { flex: wide ? 1 : undefined }]}>
          <View style={[styles.monogram, { backgroundColor: theme.accent }]}>
            <Text style={{ color: theme.onAccent, fontSize: TypeSize.section, fontWeight: '700' }}>MD</Text>
          </View>
          <Text style={{ color: theme.accent, fontWeight: '700', fontSize: TypeSize.label, letterSpacing: 2 }}>MEMBERDESK</Text>
          <Text accessibilityRole="header" style={{ color: theme.text, fontWeight: '700', fontSize: wide ? TypeSize.hero : TypeSize.section }}>
            Gắn kết từ{wide ? '\n' : ' '}mỗi thành viên.
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: TypeSize.body, lineHeight: 26, maxWidth: 380 }}>
            Hồ sơ gọn gàng, ảnh luôn bên cạnh. Quản lý câu lạc bộ từ máy tính hoặc điện thoại.
          </Text>
        </View>
        <View style={[styles.form, { backgroundColor: theme.backgroundElement, width: wide ? 420 : '100%' }]}>
          <View style={{ gap: Spacing.two }}>
            <Text accessibilityRole="header" style={{ color: theme.text, fontSize: TypeSize.section, fontWeight: '700' }}>Chào bạn trở lại</Text>
            <Text style={{ color: theme.textSecondary, fontSize: TypeSize.body, lineHeight: 24 }}>Đăng nhập bằng tài khoản quản trị.</Text>
          </View>
          <FormField label="Email" value={email} onChangeText={setEmail} placeholder="ten@caulacbo.vn" keyboardType="email-address"
            autoCapitalize="none" autoCorrect={false} autoComplete="email" editable={!busy} maxLength={254} />
          <View>
            <FormField label="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry={!visible}
              autoCapitalize="none" autoCorrect={false} autoComplete="current-password" editable={!busy} maxLength={128}
              onSubmitEditing={() => void submit()} returnKeyType="go" />
            <Pressable accessibilityRole="button" accessibilityLabel={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              onPress={() => setVisible(!visible)} style={styles.reveal}>
              <Text style={{ color: theme.accent, fontSize: TypeSize.label, fontWeight: '600' }}>{visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}</Text>
            </Pressable>
          </View>
          {(error || sessionError) ? <Text selectable accessibilityRole="alert" style={{ color: theme.danger, lineHeight: 22 }}>{error || sessionError}</Text> : null}
          <ActionButton title={busy ? 'Đang đăng nhập…' : 'Đăng nhập'} busy={busy} onPress={() => void submit()} />
          <Text style={{ color: theme.textSecondary, fontSize: TypeSize.label, lineHeight: 22 }}>
            Cần tài khoản? Liên hệ người phụ trách câu lạc bộ để được cấp quyền.
          </Text>
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, justifyContent: 'center', padding: Spacing.four, paddingBottom: Spacing.five },
  content: { width: '100%', maxWidth: 1100, alignSelf: 'center', alignItems: 'center' },
  intro: { width: '100%', gap: Spacing.three },
  monogram: { width: 64, height: 64, borderRadius: Radius.control, justifyContent: 'center', alignItems: 'center' },
  form: { padding: Spacing.five, borderRadius: Radius.surface, gap: Spacing.four },
  reveal: { minHeight: ControlHeight, alignSelf: 'flex-end', justifyContent: 'center', paddingHorizontal: Spacing.two },
});
