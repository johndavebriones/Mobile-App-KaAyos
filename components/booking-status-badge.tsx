import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { BookingStatus } from '@/data/bookings';

const statusConfig: Record<BookingStatus, { label: string; color: keyof typeof Colors.light }> = {
  pending: { label: 'Pending', color: 'warning' },
  confirmed: { label: 'Confirmed', color: 'tint' },
  in_progress: { label: 'In Progress', color: 'secondary' },
  completed: { label: 'Completed', color: 'success' },
  cancelled: { label: 'Cancelled', color: 'error' },
  disputed: { label: 'Disputed', color: 'error' },
};

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const config = statusConfig[status];

  return (
    <View style={[styles.badge, { backgroundColor: (colors as any)[config.color] + '20' }]}>
      <Text style={[styles.text, { color: (colors as any)[config.color] }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
