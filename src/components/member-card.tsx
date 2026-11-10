import { UsersRound } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Colors, Radius, Spacing, TypeSize } from '@/constants/theme';
import type { Member } from '@/services/members';
import { MemberAvatar } from '@/components/member-avatar';

export function MemberCard({ member }: { member: Member }) {
  const theme = Colors.light;
  return <View style={{ backgroundColor: theme.backgroundElement, borderWidth: 1, borderColor: theme.border,
    borderRadius: Radius.surface, overflow: 'hidden', width: '100%', maxWidth: 520 }}>
    <View style={{ backgroundColor: theme.accent, flexDirection: 'row', alignItems: 'center', gap: Spacing.two, padding: Spacing.three }}>
      <UsersRound size={22} color={theme.onAccent} accessible={false} />
      <Text style={{ color: theme.onAccent, fontWeight: '700', fontSize: TypeSize.body }}>MemberDesk</Text>
      <Text style={{ color: theme.onAccent, fontSize: TypeSize.caption, textAlign: 'right', flex: 1 }}>THẺ THÀNH VIÊN</Text>
    </View>
    <View style={{ padding: Spacing.four, gap: Spacing.three, alignItems: 'center' }}>
      <MemberAvatar uri={member.hinhanh} name={member.hoten} size={112} />
      <Text selectable style={{ color: theme.text, fontSize: TypeSize.section, fontWeight: '700', textAlign: 'center' }}>{member.hoten}</Text>
      <Text selectable style={{ color: theme.textSecondary, fontSize: TypeSize.label, textAlign: 'center' }}>{member.email}</Text>
    </View>
  </View>;
}
