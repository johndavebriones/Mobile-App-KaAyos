import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ReviewScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const criteria = ['Quality of Work', 'Professionalism', 'Timeliness', 'Value for Money'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Icon size={24} name="chevron-left" color={colors.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Write a Review</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.workerInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.tint + '30' }]}>
            <Icon size={32} name="user" color={colors.tint} />
          </View>
          <Text style={[styles.workerName, { color: colors.text }]}>Mang Pedring Santos</Text>
          <Text style={[styles.serviceName, { color: colors.muted }]}>Plumbing - Pipe Repair</Text>
        </View>

        <View style={styles.starsSection}>
          <Text style={[styles.starsLabel, { color: colors.text }]}>Overall Rating</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => setRating(star)}>
                <Icon
                  size={36}
                  name="star"
                  iconStyle={star <= rating ? 'solid' : 'regular'}
                  color={star <= rating ? colors.secondary : colors.muted}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.criteriaSection}>
          {criteria.map((c) => (
            <View key={c} style={styles.criteriaRow}>
              <Text style={[styles.criteriaLabel, { color: colors.text }]}>{c}</Text>
              <View style={styles.criteriaStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Pressable key={star}>
                    <Icon
                      size={20}
                      name="star"
                      iconStyle={star <= 4 ? 'solid' : 'regular'}
                      color={star <= 4 ? colors.secondary : colors.muted}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.reviewSection}>
          <Text style={[styles.reviewLabel, { color: colors.text }]}>Share your experience</Text>
          <TextInput
            style={[styles.reviewInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
            placeholder="Describe your experience with this service provider..."
            placeholderTextColor={colors.muted}
            value={review}
            onChangeText={setReview}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.submitBtn,
            { backgroundColor: rating > 0 ? colors.tint : colors.muted, opacity: pressed ? 0.85 : 1 },
          ]}
          disabled={rating === 0}
          onPress={() => {
            Alert.alert('Thank You!', 'Your review has been submitted.', [
              { text: 'OK', onPress: () => router.back() },
            ]);
          }}
        >
          <Text style={styles.submitText}>Submit Review</Text>
        </Pressable>
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
  workerInfo: { alignItems: 'center', padding: 20, gap: 6 },
  avatar: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center' },
  workerName: { fontSize: 18, fontWeight: '700' },
  serviceName: { fontSize: 14 },
  starsSection: { alignItems: 'center', padding: 20, gap: 12 },
  starsLabel: { fontSize: 16, fontWeight: '600' },
  starsRow: { flexDirection: 'row', gap: 8 },
  criteriaSection: { paddingHorizontal: 20, gap: 14, marginBottom: 24 },
  criteriaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  criteriaLabel: { fontSize: 14, fontWeight: '500' },
  criteriaStars: { flexDirection: 'row', gap: 4 },
  reviewSection: { paddingHorizontal: 20, marginBottom: 24 },
  reviewLabel: { fontSize: 14, fontWeight: '600', marginBottom: 10 },
  reviewInput: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
    minHeight: 120,
    lineHeight: 20,
  },
  submitBtn: { marginHorizontal: 20, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 40 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
