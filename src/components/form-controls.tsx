import { type LucideIcon } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { ControlHeight, Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ActionButton({ title, onPress, busy = false, secondary = false, disabled = false, danger = false, icon: Icon }: {
  title: string; onPress: () => void; busy?: boolean; secondary?: boolean; disabled?: boolean; danger?: boolean; icon?: LucideIcon;
}) {
  const theme = useTheme();
  const color = secondary ? danger ? theme.danger : theme.text : theme.onAccent;
  return <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityState={{ disabled: disabled || busy, busy }}
    disabled={disabled || busy} onPress={onPress} style={({ pressed }) => [styles.button,
      { backgroundColor: secondary ? theme.backgroundSelected : danger ? theme.danger : theme.accent, opacity: disabled || busy ? 0.6 : pressed ? 0.8 : 1 }]}>
    {busy && <ActivityIndicator color={color} />}
    {!busy && Icon && <Icon size={20} color={color} accessible={false} />}
    <Text style={{ color, fontSize: TypeSize.body, fontWeight: '600', flexShrink: 1 }}>{title}</Text>
  </Pressable>;
}

export function FormField({ label, icon: Icon, trailing, ...props }: TextInputProps & { label: string; icon?: LucideIcon; trailing?: ReactNode }) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  return <View style={{ gap: Spacing.two }}>
    <Text style={{ color: theme.text, fontWeight: '600', fontSize: TypeSize.label }}>{label}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: Radius.control,
      borderColor: focused ? theme.accent : theme.border, backgroundColor: theme.backgroundElement, paddingHorizontal: Spacing.three }}>
      {Icon && <Icon size={20} color={theme.textSecondary} accessible={false} />}
      <TextInput {...props} accessibilityLabel={label} placeholderTextColor={theme.textSecondary}
      onFocus={(event) => { setFocused(true); props.onFocus?.(event); }}
      onBlur={(event) => { setFocused(false); props.onBlur?.(event); }}
      style={[styles.input, { color: theme.text }, props.style]} />
      {trailing}
    </View>
  </View>;
}

const styles = StyleSheet.create({
  button: { minHeight: ControlHeight, padding: Spacing.three, borderRadius: Radius.control,
    flexDirection: 'row', gap: Spacing.two, justifyContent: 'center', alignItems: 'center' },
  input: { flex: 1, minWidth: 0, minHeight: ControlHeight, padding: Spacing.three,
    fontSize: TypeSize.body },
});
