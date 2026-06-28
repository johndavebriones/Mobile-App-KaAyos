import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface VerificationBadgeProps {
  verified: boolean;
  size?: number;
}

export function VerificationBadge({ verified, size = 14 }: VerificationBadgeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  if (!verified) return null;

  return (
    <View style={[styles.badge, { backgroundColor: colors.verified + '20' }]}>
      <Icon size={size} name="certificate" color={colors.verified} />
      <Text style={[styles.text, { color: colors.verified, fontSize: size - 2 }]}>Verified</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  text: {
    fontWeight: '600',
  },
});
