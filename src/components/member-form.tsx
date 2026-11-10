import { router, usePreventRemove } from 'expo-router';
import { Camera, Check, Eye, EyeOff, ImagePlus, LockKeyhole, Mail, UserRound } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { ActionButton, FormField } from '@/components/form-controls';
import { MemberAvatar } from '@/components/member-avatar';
import { ControlHeight, Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { pickAvatar, uploadAvatar, type PreparedAvatar } from '@/services/avatars';
import { createMember, type Member } from '@/services/members';

export function MemberForm() {
  const theme = useTheme(); const insets = useSafeAreaInsets();
  const [hoten, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false); const [avatar, setAvatar] = useState<PreparedAvatar | null>(null);
  const [uploaded, setUploaded] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const [progress, setProgress] = useState<number | null>(null); const [created, setCreated] = useState<Member | null>(null);
  const [discard, setDiscard] = useState(false); const [leave, setLeave] = useState<(() => void) | null>(null);
  const submitting = useRef(false);
  const dirty = !!(hoten || email || password || avatar);
  const disablePrevention = usePreventRemove((dirty || busy) && !created && !discard, ({ repeat }) => {
    if (!busy) setLeave(() => repeat);
  });
  useEffect(() => { if (discard) leave?.(); }, [discard, leave]);
  useEffect(() => {
    if (created) { disablePrevention(); router.replace({ pathname: '/members/[id]', params: { id: created.id } }); }
  }, [created, disablePrevention]);

  async function choose(camera: boolean) {
    if (submitting.current) return;
    submitting.current = true; setBusy(true); setError('');
    try {
      const selected = await pickAvatar(camera);
      if (selected) { setAvatar(selected); setUploaded(''); }
    } catch (failure) { setError((failure as Error).message || 'Chưa đọc được ảnh. Hãy chọn ảnh khác.'); }
    finally { submitting.current = false; setBusy(false); }
  }

  async function save() {
    if (submitting.current) return;
    if (!hoten.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || password.length < 8) {
      setError('Nhập họ tên, email hợp lệ và mật khẩu từ 8 ký tự.'); return;
    }
    submitting.current = true; setBusy(true); setError('');
    try {
      let url = uploaded;
      if (avatar && !url) { setProgress(0); url = await uploadAvatar(avatar, setProgress); setUploaded(url); }
      setProgress(null);
      setCreated(await createMember({ email, hoten, matkhau: password, hinhanh: url }));
      setPassword('');
    } catch (failure) { setError((failure as Error).message); }
    finally { submitting.current = false; setBusy(false); setProgress(null); }
  }

  return <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: Spacing.four, paddingBottom: Math.max(insets.bottom, Spacing.four) }}>
      <View style={{ width: '100%', maxWidth: 560, alignSelf: 'center', gap: Spacing.four }}>
        <View style={{ backgroundColor: theme.backgroundElement, borderRadius: Radius.surface,
          padding: Spacing.four, borderWidth: 1, borderColor: theme.border, gap: Spacing.four }}>
          <View style={{ alignItems: 'center', gap: Spacing.three }}>
            <MemberAvatar uri={avatar?.uri ?? ''} name={hoten || 'thành viên'} size={104} />
            {avatar && <Text style={{ color: theme.textSecondary, fontSize: TypeSize.caption }}>
              {avatar.width} × {avatar.height} · {Math.ceil(avatar.bytes.length / 1024)} KiB
            </Text>}
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two }}>
            <View style={{ flex: 1, minWidth: 140 }}><ActionButton title="Chọn ảnh" icon={ImagePlus} secondary disabled={busy} onPress={() => void choose(false)} /></View>
            {Platform.OS !== 'web' && <View style={{ flex: 1, minWidth: 140 }}><ActionButton title="Chụp ảnh" icon={Camera} secondary disabled={busy} onPress={() => void choose(true)} /></View>}
          </View>
          <FormField label="Họ và tên" icon={UserRound} value={hoten} onChangeText={setName} maxLength={100} autoCapitalize="words" editable={!busy} />
          <FormField label="Email" icon={Mail} value={email} onChangeText={setEmail} maxLength={254} autoCapitalize="none"
            autoCorrect={false} keyboardType="email-address" editable={!busy} />
          <FormField label="Mật khẩu" icon={LockKeyhole} value={password} onChangeText={setPassword} maxLength={128}
            placeholder="Từ 8 ký tự" secureTextEntry={!visible} autoCapitalize="none" autoCorrect={false} editable={!busy}
            trailing={<Pressable accessibilityRole="button" accessibilityLabel={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} onPress={() => setVisible(!visible)}
              style={{ minWidth: 44, minHeight: ControlHeight, justifyContent: 'center', alignItems: 'flex-end' }}>
              {visible ? <EyeOff size={20} color={theme.textSecondary} /> : <Eye size={20} color={theme.textSecondary} />}
            </Pressable>} />
        </View>
        {error ? <Text selectable accessibilityRole="alert" style={{ color: theme.danger, lineHeight: 22 }}>{error}</Text> : null}
        {progress !== null && <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: progress }}
          accessibilityLabel="Tải ảnh" style={{ gap: Spacing.two }}><Text style={{ color: theme.textSecondary }}>Đang tải ảnh {progress}%</Text>
          <View style={{ height: 4, backgroundColor: theme.backgroundSelected, borderRadius: Radius.control }}>
            <View style={{ height: 4, width: `${progress}%`, backgroundColor: theme.accent, borderRadius: Radius.control }} />
          </View></View>}
        <ActionButton title={busy ? 'Đang xử lý…' : 'Lưu thành viên'} icon={Check} busy={busy} onPress={() => void save()} />
      </View>
    </ScrollView>
    <ConfirmDialog visible={!!leave && !discard} title="Bỏ thay đổi?" message="Thông tin chưa lưu sẽ bị mất."
      confirmTitle="Bỏ thay đổi" onCancel={() => setLeave(null)} onConfirm={() => setDiscard(true)} />
  </KeyboardAvoidingView>;
}
