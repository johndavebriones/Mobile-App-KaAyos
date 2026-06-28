import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { WorkerCard } from '@/components/worker-card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { workers } from '@/data/workers';

export default function ProviderDashboardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const me = workers[0];

  const stats = [
    { label: 'Total Earnings', value: '₱24,500', icon: 'peso-sign', color: colors.success },
    { label: 'Jobs Completed', value: '42', icon: 'circle-check', color: colors.tint },
    { label: 'Rating', value: '4.8', icon: 'star', color: colors.secondary },
    { label: 'Completion', value: '97%', icon: 'chart-bar', color: '#8E24AA' },
  ];

  const recentEarnings = [
    { client: 'Maria Reyes', service: 'Pipe Repair', amount: 750, date: 'Jun 20' },
    { client: 'Josefa V.', service: 'Faucet Install', amount: 500, date: 'Jun 18' },
    { client: 'Pedro Gomez', service: 'Water Heater', amount: 1200, date: 'Jun 15' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Dashboard</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Icon size={24} name={s.icon as any} color={s.color} />
              <Text style={[styles.statValue, { color: colors.text }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Profile</Text>
        </View>
        <View style={styles.workerWrapper}>
          <WorkerCard worker={me} onPress={() => {}} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Earnings</Text>
        </View>

        {recentEarnings.map((e, i) => (
          <View key={i} style={[styles.earningRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View>
              <Text style={[styles.earningClient, { color: colors.text }]}>{e.client}</Text>
              <Text style={[styles.earningService, { color: colors.muted }]}>{e.service}</Text>
            </View>
            <View style={styles.earningRight}>
              <Text style={[styles.earningAmount, { color: colors.success }]}>₱{e.amount}</Text>
              <Text style={[styles.earningDate, { color: colors.muted }]}>{e.date}</Text>
            </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 13 },
  sectionHeader: { paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  workerWrapper: { paddingHorizontal: 16, marginBottom: 20 },
  earningRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  earningClient: { fontSize: 14, fontWeight: '600' },
  earningService: { fontSize: 12 },
  earningRight: { alignItems: 'flex-end' },
  earningAmount: { fontSize: 16, fontWeight: '700' },
  earningDate: { fontSize: 12 },
});
