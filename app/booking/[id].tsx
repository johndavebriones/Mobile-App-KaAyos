import { View, Text, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { BookingStatusBadge } from '@/components/booking-status-badge';
import { RatingStars } from '@/components/rating-stars';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { homeownerBookings } from '@/data/bookings';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const booking = homeownerBookings.find((b) => b.id === id) || homeownerBookings[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Icon size={24} name="chevron-left" color={colors.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Booking Details</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={[styles.statusCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <BookingStatusBadge status={booking.status} />
          <Text style={[styles.statusService, { color: colors.text }]}>{booking.serviceName}</Text>
          <Text style={[styles.statusWorker, { color: colors.muted }]}>with {booking.workerName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Schedule</Text>
          <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.detailRow}>
              <Icon size={18} name="calendar" color={colors.muted} />
              <View>
                <Text style={[styles.detailLabel, { color: colors.muted }]}>Date</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{booking.scheduledDate}</Text>
              </View>
            </View>
            <View style={[styles.detailDivider, { backgroundColor: colors.border }]} />
            <View style={styles.detailRow}>
              <Icon size={18} name="clock" color={colors.muted} />
              <View>
                <Text style={[styles.detailLabel, { color: colors.muted }]}>Time</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{booking.scheduledTime}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Location</Text>
          <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.detailRow}>
              <Icon size={18} name="location-dot" color={colors.muted} />
              <Text style={[styles.detailValue, { color: colors.text }]}>{booking.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment</Text>
          <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.muted }]}>Service Fee</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>₱{booking.price}</Text>
            </View>
          </View>
        </View>

        {booking.notes && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Notes</Text>
            <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.notesText, { color: colors.muted }]}>{booking.notes}</Text>
            </View>
          </View>
        )}

        {booking.status === 'completed' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Rate Your Service</Text>
            <View style={[styles.rateCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <RatingStars rating={0} size={28} showEmpty />
              <Pressable
                style={({ pressed }) => [styles.rateBtn, { backgroundColor: colors.tint, opacity: pressed ? 0.85 : 1 }]}
                onPress={() => Alert.alert('Review', 'Thank you for your feedback!')}
              >
                <Text style={styles.rateBtnText}>Submit Review</Text>
              </Pressable>
            </View>
          </View>
        )}

        {booking.status !== 'completed' && booking.status !== 'cancelled' && (
          <Pressable
            style={({ pressed }) => [styles.cancelBtn, { borderColor: colors.error, opacity: pressed ? 0.7 : 1 }]}
            onPress={() => Alert.alert('Cancel Booking', 'Are you sure you want to cancel?', [
              { text: 'No', style: 'cancel' },
              { text: 'Yes, Cancel', style: 'destructive', onPress: () => router.back() },
            ])}
          >
            <Text style={[styles.cancelText, { color: colors.error }]}>Cancel Booking</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  statusCard: {
    marginHorizontal: 16,
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    marginBottom: 24,
  },
  statusService: { fontSize: 18, fontWeight: '700' },
  statusWorker: { fontSize: 14 },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  detailCard: { borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  detailRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  detailLabel: { fontSize: 12 },
  detailValue: { fontSize: 14, fontWeight: '500' },
  detailDivider: { height: 1, marginHorizontal: 14 },
  notesText: { fontSize: 14, lineHeight: 19, padding: 14 },
  rateCard: { padding: 20, borderRadius: 12, borderWidth: 1, alignItems: 'center', gap: 14 },
  rateBtn: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 10 },
  rateBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  cancelBtn: { marginHorizontal: 16, padding: 14, borderRadius: 10, borderWidth: 1.5, alignItems: 'center', marginBottom: 40 },
  cancelText: { fontSize: 15, fontWeight: '600' },
});
