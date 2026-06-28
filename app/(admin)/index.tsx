import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AdminDashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const stats = [
    { label: 'Total Users', value: '1,247', icon: 'users', color: colors.tint },
    { label: 'Active Workers', value: '86', icon: 'wrench', color: colors.secondary },
    { label: 'Total Bookings', value: '523', icon: 'calendar-check', color: '#8E24AA' },
    { label: 'Pending Verifications', value: '12', icon: 'clock', color: colors.warning },
    { label: 'Open Disputes', value: '3', icon: 'triangle-exclamation', color: colors.error },
    { label: 'Revenue (Est.)', value: '₱156K', icon: 'peso-sign', color: colors.success },
  ];

  const recentActivity = [
    { action: 'New user registered', detail: 'Maria Santos - Homeowner', time: '5 min ago' },
    { action: 'Verification submitted', detail: 'Ricky Torres uploaded documents', time: '1 hr ago' },
    { action: 'Booking completed', detail: 'Pipe Repair by M. Pedring', time: '3 hrs ago' },
    { action: 'Dispute filed', detail: 'Booking #b15 - Service issue', time: '5 hrs ago' },
    { action: 'New worker registered', detail: 'Karding Flores - Gardener', time: '1 day ago' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Admin</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>Platform Overview</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Icon size={22} name={s.icon as any} color={s.color} />
              <Text style={[styles.statValue, { color: colors.text }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        </View>

        {recentActivity.map((a, i) => (
          <View key={i} style={[styles.activityRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.activityDot, { backgroundColor: colors.tint }]} />
            <View style={styles.activityContent}>
              <Text style={[styles.activityAction, { color: colors.text }]}>{a.action}</Text>
              <Text style={[styles.activityDetail, { color: colors.muted }]}>{a.detail}</Text>
            </View>
            <Text style={[styles.activityTime, { color: colors.muted }]}>{a.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 14, marginTop: 2 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 24,
  },
  statCard: {
    width: '31%',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
    alignItems: 'center',
  },
  statValue: { fontSize: 18, fontWeight: '800' },
  statLabel: { fontSize: 10, textAlign: 'center' },
  sectionHeader: { paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
    gap: 10,
  },
  activityDot: { width: 8, height: 8, borderRadius: 4 },
  activityContent: { flex: 1, gap: 2 },
  activityAction: { fontSize: 14, fontWeight: '500' },
  activityDetail: { fontSize: 12 },
  activityTime: { fontSize: 11 },
});
