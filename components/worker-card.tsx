import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Avatar } from '@/components/avatar';
import { RatingStars } from '@/components/rating-stars';
import { VerificationBadge } from '@/components/verification-badge';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Worker } from '@/data/workers';

interface WorkerCardProps {
  worker: Worker;
  onPress: () => void;
  compact?: boolean;
}

export function WorkerCard({ worker, onPress, compact }: WorkerCardProps) {
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
      <View style={styles.avatarContainer}>
        <Avatar uri={worker.avatar} name={worker.name} size={52} />
        {!compact && worker.available && (
          <View style={[styles.onlineDot, { backgroundColor: colors.success }]} />
        )}
      </View>
      <View style={[styles.info, compact && styles.infoCompact]}>
        <View style={styles.nameRow}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {worker.name}
          </Text>
          <VerificationBadge verified={worker.verified} size={12} />
        </View>
        <View style={styles.ratingRow}>
          <RatingStars rating={worker.rating} size={12} />
          <Text style={[styles.ratingText, { color: colors.muted }]}>
            {worker.rating} ({worker.reviewCount})
          </Text>
        </View>
        <View style={styles.skillsRow}>
          {worker.skills.slice(0, 2).map((skill) => (
            <View key={skill} style={[styles.skillBadge, { backgroundColor: colors.tint + '15' }]}>
              <Text style={[styles.skillText, { color: colors.tint }]}>{skill}</Text>
            </View>
          ))}
        </View>
        {!compact && (
          <Text style={[styles.rate, { color: colors.tint }]}>
            ₱{worker.hourlyRate}/hr
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    marginBottom: 10,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  infoCompact: {
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 12,
  },
  skillsRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  skillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  skillText: {
    fontSize: 11,
    fontWeight: '500',
  },
  rate: {
    fontSize: 13,
    fontWeight: '600',
  },
});
