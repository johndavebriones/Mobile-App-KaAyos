import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { JobRequest } from '@/data/bookings';

interface JobRequestCardProps {
  job: JobRequest;
  onAccept?: () => void;
  onDecline?: () => void;
  onPress?: () => void;
}

export function JobRequestCard({ job, onAccept, onDecline, onPress }: JobRequestCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.clientInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.tint + '30' }]}>
            <Icon size={20} name="user" color={colors.tint} />
          </View>
          <View>
            <Text style={[styles.clientName, { color: colors.text }]}>{job.homeownerName}</Text>
            <Text style={[styles.address, { color: colors.muted }]}>{job.homeownerAddress}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, {
          backgroundColor: job.status === 'pending' ? colors.warning + '20' :
            job.status === 'accepted' ? colors.success + '20' : colors.error + '20'
        }]}>
          <Text style={[styles.statusText, {
            color: job.status === 'pending' ? colors.warning :
              job.status === 'accepted' ? colors.success : colors.error
          }]}>
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </Text>
        </View>
      </View>

      <Text style={[styles.service, { color: colors.text }]}>{job.serviceName}</Text>
      <Text style={[styles.desc, { color: colors.muted }]} numberOfLines={2}>{job.description}</Text>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Icon size={14} name="calendar" color={colors.muted} />
          <Text style={[styles.detailText, { color: colors.muted }]}>{job.scheduledDate}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon size={14} name="clock" color={colors.muted} />
          <Text style={[styles.detailText, { color: colors.muted }]}>{job.scheduledTime}</Text>
        </View>
        <Text style={[styles.price, { color: colors.tint }]}>₱{job.proposedPrice}</Text>
      </View>

      {job.status === 'pending' && onAccept && onDecline && (
        <View style={styles.actions}>
          <Pressable
            style={[styles.actionBtn, { backgroundColor: colors.success }]}
            onPress={onAccept}
          >
            <Text style={styles.actionText}>Accept</Text>
          </Pressable>
          <Pressable
            style={[styles.actionBtn, styles.declineBtn, { backgroundColor: colors.error + '15' }]}
            onPress={onDecline}
          >
            <Text style={[styles.actionText, { color: colors.error }]}>Decline</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  clientInfo: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientName: {
    fontSize: 15,
    fontWeight: '600',
  },
  address: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  service: {
    fontSize: 14,
    fontWeight: '600',
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 'auto',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  declineBtn: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
