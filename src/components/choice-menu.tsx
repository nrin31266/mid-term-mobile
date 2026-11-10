import { Check, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Text, View } from 'react-native';

import { ActionButton } from '@/components/form-controls';
import { Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ChoiceMenu({ label, value, options, onChange }: {
  label: string; value: string; options: readonly { value: string; label: string }[]; onChange: (value: string) => void;
}) {
  const theme = useTheme(); const [open, setOpen] = useState(false);
  return <>
    <ActionButton title={options.find((item) => item.value === value)?.label ?? label} icon={ChevronDown} secondary onPress={() => setOpen(true)} />
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: Spacing.four }}>
        <View accessibilityViewIsModal style={{ width: '100%', maxWidth: 400, backgroundColor: theme.backgroundElement,
          borderRadius: Radius.surface, padding: Spacing.four, gap: Spacing.three }}>
          <Text accessibilityRole="header" style={{ color: theme.text, fontSize: TypeSize.section, fontWeight: '600' }}>{label}</Text>
          {options.map((item) => <ActionButton key={item.value} title={item.label} secondary={item.value !== value}
            icon={item.value === value ? Check : undefined} onPress={() => { onChange(item.value); setOpen(false); }} />)}
          <ActionButton title="Đóng" secondary onPress={() => setOpen(false)} />
        </View>
      </View>
    </Modal>
  </>;
}
