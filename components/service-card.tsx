import { Pressable, Text, StyleSheet } from 'react-native';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { ServiceCategory } from '@/data/services';

interface ServiceCardProps {
  service: ServiceCategory;
  onPress: () => void;
}

export function ServiceCard({ service, onPress }: ServiceCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
      onPress={onPress}
    >
      <Icon size={32} name={service.icon as any} color={colors.tint} />
      <Text style={[styles.name, { color: colors.text }]}>{service.name}</Text>
      <Text style={[styles.count, { color: colors.muted }]}>{service.count} providers</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  count: {
    fontSize: 11,
    textAlign: 'center',
  },
});
