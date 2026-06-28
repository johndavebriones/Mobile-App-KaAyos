import { View, Text, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Avatar } from '@/components/avatar';
import { Icon } from '@/components/icon';
import { RatingStars } from '@/components/rating-stars';
import { VerificationBadge } from '@/components/verification-badge';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { workers } from '@/data/workers';

export default function WorkerDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const worker = workers.find((w) => w.id === id) || workers[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Icon size={24} name="chevron-left" color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.profile}>
          <Avatar uri={worker.avatar} name={worker.name} size={96} />
          <VerificationBadge verified={worker.verified} size={16} />
          <Text style={[styles.name, { color: colors.text }]}>{worker.name}</Text>
          <Text style={[styles.experience, { color: colors.muted }]}>{worker.experience} experience</Text>

          <View style={styles.ratingRow}>
            <RatingStars rating={worker.rating} size={18} />
            <Text style={[styles.ratingText, { color: colors.muted }]}>
              {worker.rating} ({worker.reviewCount} reviews)
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{worker.completedJobs}</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Jobs Done</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>₱{worker.hourlyRate}</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Per Hour</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: worker.available ? colors.success : colors.error }]}>
                {worker.available ? 'Available' : 'Busy'}
              </Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Status</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          <Text style={[styles.bio, { color: colors.muted }]}>{worker.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Skills</Text>
          <View style={styles.skillsGrid}>
            {worker.skills.map((skill) => (
              <View key={skill} style={[styles.skillTag, { backgroundColor: colors.tint + '15' }]}>
                <Text style={[styles.skillText, { color: colors.tint }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Service Area</Text>
          <View style={styles.areaRow}>
            <Icon size={18} name="map-pin" color={colors.muted} />
            <Text style={[styles.areaText, { color: colors.muted }]}>{worker.serviceArea}</Text>
          </View>
        </View>

        <View style={styles.reviews}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Reviews</Text>
          {[
            { user: 'Maria R.', rating: 5, text: 'Napakahusay! Mabilis at maayos ang trabaho.', date: '2 days ago' },
            { user: 'Pedro G.', rating: 5, text: 'Sulit ang bayad. Maasahan at magalang.', date: '1 week ago' },
            { user: 'Liza M.', rating: 4, text: 'Okay naman, on-time dumating.', date: '2 weeks ago' },
          ].map((r, i) => (
            <View key={i} style={[styles.reviewCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.reviewHeader}>
                <Text style={[styles.reviewUser, { color: colors.text }]}>{r.user}</Text>
                <RatingStars rating={r.rating} size={12} />
              </View>
              <Text style={[styles.reviewText, { color: colors.muted }]}>{r.text}</Text>
              <Text style={[styles.reviewDate, { color: colors.muted }]}>{r.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <Text style={[styles.priceLabel, { color: colors.muted }]}>Rate</Text>
        <Text style={[styles.priceValue, { color: colors.tint }]}>₱{worker.hourlyRate}/hr</Text>
        <Pressable
          style={({ pressed }) => [styles.bookBtn, { backgroundColor: colors.tint, opacity: pressed ? 0.85 : 1 }]}
          onPress={() => Alert.alert('Book Service', 'Booking feature coming soon!')}
        >
          <Text style={styles.bookBtnText}>Book Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 8 },
  profile: { alignItems: 'center', paddingHorizontal: 20, gap: 8, marginBottom: 24 },
  avatar: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 24, fontWeight: '800', marginTop: 4 },
  experience: { fontSize: 14 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ratingText: { fontSize: 14 },
  statsRow: { flexDirection: 'row', marginTop: 12, gap: 24 },
  statItem: { alignItems: 'center', gap: 2 },
  statValue: { fontSize: 16, fontWeight: '700' },
  statLabel: { fontSize: 12 },
  statDivider: { width: 1 },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  bio: { fontSize: 14, lineHeight: 20 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillTag: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10 },
  skillText: { fontSize: 13, fontWeight: '500' },
  areaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  areaText: { fontSize: 14 },
  reviews: { paddingHorizontal: 20, marginBottom: 100 },
  reviewCard: { padding: 14, borderRadius: 10, borderWidth: 1, marginBottom: 8, gap: 6 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reviewUser: { fontSize: 14, fontWeight: '600' },
  reviewText: { fontSize: 13, lineHeight: 18 },
  reviewDate: { fontSize: 11 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    gap: 8,
  },
  priceLabel: { fontSize: 12 },
  priceValue: { fontSize: 16, fontWeight: '700', marginRight: 'auto' },
  bookBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  bookBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
