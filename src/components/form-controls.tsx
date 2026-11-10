import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { ControlHeight, Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ActionButton({ title, onPress, busy = false, secondary = false, disabled = false }: {
  title: string; onPress: () => void; busy?: boolean; secondary?: boolean; disabled?: boolean;
}) {
  const theme = useTheme();
  return <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityState={{ disabled: disabled || busy, busy }}
    disabled={disabled || busy} onPress={onPress} style={({ pressed }) => [styles.button,
      { backgroundColor: secondary ? theme.backgroundSelected : theme.accent, opacity: disabled || busy ? 0.6 : pressed ? 0.8 : 1 }]}>
    {busy && <ActivityIndicator color={secondary ? theme.text : theme.onAccent} />}
    <Text style={{ color: secondary ? theme.text : theme.onAccent, fontSize: TypeSize.body, fontWeight: '600' }}>{title}</Text>
  </Pressable>;
}

export function FormField({ label, ...props }: TextInputProps & { label: string }) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  return <View style={{ gap: Spacing.two }}>
    <Text style={{ color: theme.text, fontWeight: '600', fontSize: TypeSize.label }}>{label}</Text>
    <TextInput {...props} accessibilityLabel={label} placeholderTextColor={theme.textSecondary}
      onFocus={(event) => { setFocused(true); props.onFocus?.(event); }}
      onBlur={(event) => { setFocused(false); props.onBlur?.(event); }}
      style={[styles.input, { color: theme.text, borderColor: focused ? theme.accent : theme.border,
        backgroundColor: theme.backgroundElement }, props.style]} />
  </View>;
}

const styles = StyleSheet.create({
  button: { minHeight: ControlHeight, padding: Spacing.three, borderRadius: Radius.control,
    flexDirection: 'row', gap: Spacing.two, justifyContent: 'center', alignItems: 'center' },
  input: { minHeight: ControlHeight, padding: Spacing.three, borderWidth: 1,
    borderRadius: Radius.control, fontSize: TypeSize.body },
});
