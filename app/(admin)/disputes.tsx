import { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, Alert } from 'react-native';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Dispute {
  id: string;
  bookingId: string;
  homeowner: string;
  provider: string;
  issue: string;
  status: 'open' | 'resolved' | 'escalated';
  date: string;
}

const initialDisputes: Dispute[] = [
  { id: 'd1', bookingId: 'b15', homeowner: 'Ana Lopez', provider: 'Jun de Guzman', issue: 'AC repair incomplete, unit still not cooling properly', status: 'open', date: 'Jun 27' },
  { id: 'd2', bookingId: 'b12', homeowner: 'Carlos Mendez', provider: 'Manuel Rivera', issue: 'Painting job has uneven finish, requested rework', status: 'open', date: 'Jun 25' },
  { id: 'd3', bookingId: 'b8', homeowner: 'Liza Mercado', provider: 'Ricky Torres', issue: 'Item damaged during moving', status: 'escalated', date: 'Jun 20' },
];

export default function DisputesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [disputes, setDisputes] = useState(initialDisputes);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={disputes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardTop}>
              <Text style={[styles.bookingId, { color: colors.muted }]}>Booking #{item.bookingId}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: item.status === 'open' ? colors.warning + '20' : item.status === 'escalated' ? colors.error + '20' : colors.success + '20' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: item.status === 'open' ? colors.warning : item.status === 'escalated' ? colors.error : colors.success }
                ]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.parties}>
              <View style={styles.party}>
                <Text style={[styles.partyLabel, { color: colors.muted }]}>Homeowner</Text>
                <Text style={[styles.partyName, { color: colors.text }]}>{item.homeowner}</Text>
              </View>
              <Icon size={16} name="arrow-right" color={colors.muted} />
              <View style={styles.party}>
                <Text style={[styles.partyLabel, { color: colors.muted }]}>Provider</Text>
                <Text style={[styles.partyName, { color: colors.text }]}>{item.provider}</Text>
              </View>
            </View>

            <Text style={[styles.issue, { color: colors.text }]}>{item.issue}</Text>
            <Text style={[styles.date, { color: colors.muted }]}>{item.date}</Text>

            {item.status !== 'resolved' && (
              <View style={styles.actions}>
                <Pressable
                  style={({ pressed }) => [styles.actionBtn, { backgroundColor: colors.success, opacity: pressed ? 0.85 : 1 }]}
                  onPress={() => {
                    setDisputes((prev) => prev.map((x) => x.id === item.id ? { ...x, status: 'resolved' as const } : x));
                    Alert.alert('Resolved', 'Dispute has been marked as resolved.');
                  }}
                >
                  <Text style={styles.btnText}>Resolve</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [styles.actionBtn, { backgroundColor: colors.error, opacity: pressed ? 0.85 : 1 }]}
                  onPress={() => {
                    setDisputes((prev) => prev.map((x) => x.id === item.id ? { ...x, status: 'escalated' as const } : x));
                    Alert.alert('Escalated', 'Dispute has been escalated.');
                  }}
                >
                  <Text style={styles.btnText}>Escalate</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Disputes</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              {disputes.filter((d) => d.status === 'open').length} open cases
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon size={48} name="thumbs-up" color={colors.success} />
            <Text style={[styles.emptyText, { color: colors.muted }]}>No disputes</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 14, marginTop: 2 },
  empty: { alignItems: 'center', paddingTop: 100, gap: 12 },
  emptyText: { fontSize: 16 },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bookingId: { fontSize: 12 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '600' },
  parties: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  party: { gap: 2 },
  partyLabel: { fontSize: 11 },
  partyName: { fontSize: 14, fontWeight: '600' },
  issue: { fontSize: 14, lineHeight: 19 },
  date: { fontSize: 12 },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
