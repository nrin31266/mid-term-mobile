import { Image } from 'expo-image';
import { UserRound } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function MemberAvatar({ uri, name, size = 52 }: { uri: string; name: string; size?: number }) {
  const theme = useTheme();
  const [failedUri, setFailedUri] = useState('');
  return <View style={{ width: size, height: size, borderRadius: size > 80 ? Radius.surface : Radius.control,
    backgroundColor: theme.backgroundSelected, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
    {uri && failedUri !== uri ? <Image source={{ uri }} accessibilityLabel={`Ảnh ${name}`} style={{ width: size, height: size }}
      contentFit="cover" onError={() => setFailedUri(uri)} /> : <UserRound size={size * 0.45} color={theme.textSecondary} accessible={false} />}
  </View>;
}
