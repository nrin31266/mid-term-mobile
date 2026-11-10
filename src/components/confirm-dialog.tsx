import { Modal, Text, View } from 'react-native';

import { ActionButton } from '@/components/form-controls';
import { Radius, Spacing, TypeSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ConfirmDialog({ visible, title, message, confirmTitle, onCancel, onConfirm }: {
  visible: boolean; title: string; message: string; confirmTitle: string; onCancel: () => void; onConfirm: () => void;
}) {
  const theme = useTheme();
  return <Modal visible={visible} transparent onRequestClose={onCancel} animationType="fade">
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: Spacing.four }}>
      <View accessibilityViewIsModal style={{ width: '100%', maxWidth: 400, backgroundColor: theme.backgroundElement,
        borderRadius: Radius.surface, padding: Spacing.four, gap: Spacing.four }}>
        <Text accessibilityRole="header" style={{ color: theme.text, fontSize: TypeSize.section, fontWeight: '600' }}>{title}</Text>
        <Text style={{ color: theme.textSecondary, fontSize: TypeSize.body, lineHeight: 24 }}>{message}</Text>
        <ActionButton title={confirmTitle} onPress={onConfirm} />
        <ActionButton title="Hủy" secondary onPress={onCancel} />
      </View>
    </View>
  </Modal>;
}
