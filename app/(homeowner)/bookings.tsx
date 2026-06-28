import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { BookingStatusBadge } from '@/components/booking-status-badge';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { homeownerBookings } from '@/data/bookings';

export default function BookingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={homeownerBookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PressableBooking
            booking={item}
            colors={colors}
            onPress={() => router.push(`/booking/${item.id}`)}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>My Bookings</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.muted }]}>No bookings yet</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

function PressableBooking({ booking, colors, onPress }: any) {
  const { Pressable } = require('react-native');
  return (
    <Pressable
      style={({ pressed }: any) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.workerName, { color: colors.text }]}>{booking.workerName}</Text>
        <BookingStatusBadge status={booking.status} />
      </View>
      <Text style={[styles.serviceName, { color: colors.muted }]}>{booking.serviceName}</Text>
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.muted }]}>Date</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{booking.scheduledDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.muted }]}>Time</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{booking.scheduledTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.muted }]}>Price</Text>
          <Text style={[styles.detailValue, { color: colors.tint, fontWeight: '700' }]}>₱{booking.price}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '800' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  emptyText: { fontSize: 16 },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workerName: { fontSize: 16, fontWeight: '700' },
  serviceName: { fontSize: 14 },
  cardDetails: { gap: 6 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: { fontSize: 13 },
  detailValue: { fontSize: 13, fontWeight: '600' },
});
