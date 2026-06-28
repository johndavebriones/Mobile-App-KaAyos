import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function EarningsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const transactions = [
    { id: 't1', client: 'Maria Reyes', service: 'Pipe Repair', amount: 750, date: 'Jun 20', status: 'completed' },
    { id: 't2', client: 'Josefa Villanueva', service: 'Faucet Installation', amount: 500, date: 'Jun 18', status: 'completed' },
    { id: 't3', client: 'Pedro Gomez', service: 'Water Heater Repair', amount: 1200, date: 'Jun 15', status: 'completed' },
    { id: 't4', client: 'Liza Mercado', service: 'Drain Cleaning', amount: 600, date: 'Jun 12', status: 'completed' },
    { id: 't5', client: 'Ramon Santos', service: 'Pipe Inspection', amount: 400, date: 'Jun 10', status: 'completed' },
  ];

  const totalEarnings = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Earnings</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Icon size={32} name="peso-sign" color={colors.success} />
          <Text style={[styles.totalLabel, { color: colors.muted }]}>Total Earnings (This Month)</Text>
          <Text style={[styles.totalAmount, { color: colors.text }]}>₱{totalEarnings.toLocaleString()}</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={[styles.statValue, { color: colors.text }]}>42</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Jobs Done</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
            <View style={styles.summaryStat}>
              <Text style={[styles.statValue, { color: colors.text }]}>₱583</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Avg. per Job</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
            <View style={styles.summaryStat}>
              <Text style={[styles.statValue, { color: colors.text }]}>97%</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Completion</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Transaction History</Text>
        </View>

        {transactions.map((t) => (
          <View key={t.id} style={[styles.transactionRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.txLeft}>
              <Text style={[styles.txClient, { color: colors.text }]}>{t.client}</Text>
              <Text style={[styles.txService, { color: colors.muted }]}>{t.service} • {t.date}</Text>
            </View>
            <Text style={[styles.txAmount, { color: colors.success }]}>+₱{t.amount}</Text>
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
  summaryCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  totalLabel: { fontSize: 14 },
  totalAmount: { fontSize: 36, fontWeight: '800' },
  summaryStats: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 20,
  },
  summaryStat: { alignItems: 'center', gap: 2 },
  summaryDivider: { width: 1 },
  statValue: { fontSize: 18, fontWeight: '700' },
  statLabel: { fontSize: 12 },
  sectionHeader: { paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  txLeft: { gap: 2 },
  txClient: { fontSize: 14, fontWeight: '600' },
  txService: { fontSize: 12 },
  txAmount: { fontSize: 16, fontWeight: '700' },
});
