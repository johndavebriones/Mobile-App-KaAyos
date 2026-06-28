import { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, Alert } from 'react-native';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface PendingVerification {
  id: string;
  name: string;
  skills: string;
  submittedDate: string;
  docs: string[];
}

const initialVerifications: PendingVerification[] = [
  { id: 'v1', name: 'Ricky Torres', skills: 'Moving & Hauling', submittedDate: 'Jun 27', docs: ['Driver\'s License', 'Barangay Clearance'] },
  { id: 'v2', name: 'Karding Flores', skills: 'Gardening', submittedDate: 'Jun 26', docs: ['Passport', 'NBI Clearance'] },
  { id: 'v3', name: 'Totoy Mendoza', skills: 'Carpentry', submittedDate: 'Jun 25', docs: ['UMID', 'Barangay Clearance'] },
  { id: 'v4', name: 'Ramon Santos', skills: 'Plumbing', submittedDate: 'Jun 24', docs: ['Driver\'s License'] },
];

export default function VerificationsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [verifications, setVerifications] = useState(initialVerifications);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={verifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.avatar, { backgroundColor: colors.tint + '30' }]}>
                <Icon size={20} name="user" color={colors.tint} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.skills, { color: colors.muted }]}>{item.skills}</Text>
              </View>
              <Text style={[styles.date, { color: colors.muted }]}>{item.submittedDate}</Text>
            </View>

            <View style={styles.docs}>
              {item.docs.map((doc) => (
                <View key={doc} style={[styles.docTag, { backgroundColor: colors.tint + '15' }]}>
                  <Icon size={12} name="file-lines" color={colors.tint} />
                  <Text style={[styles.docText, { color: colors.tint }]}>{doc}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actions}>
              <Pressable
                style={({ pressed }) => [styles.approveBtn, { backgroundColor: colors.success, opacity: pressed ? 0.85 : 1 }]}
                onPress={() => {
                  setVerifications((prev) => prev.filter((x) => x.id !== item.id));
                  Alert.alert('Verified', `${item.name} has been verified.`);
                }}
              >
                <Text style={styles.btnText}>Approve</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.rejectBtn, { borderColor: colors.error, opacity: pressed ? 0.7 : 1 }]}
                onPress={() => {
                  setVerifications((prev) => prev.filter((x) => x.id !== item.id));
                  Alert.alert('Rejected', `${item.name}'s verification has been rejected.`);
                }}
              >
                <Text style={[styles.rejectText, { color: colors.error }]}>Reject</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Verifications</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              {verifications.length} pending review{verifications.length !== 1 ? 's' : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon size={48} name="certificate" color={colors.success} />
            <Text style={[styles.emptyText, { color: colors.muted }]}>All caught up!</Text>
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
  cardHeader: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  cardInfo: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600' },
  skills: { fontSize: 12 },
  date: { fontSize: 12 },
  docs: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  docTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  docText: { fontSize: 12, fontWeight: '500' },
  actions: { flexDirection: 'row', gap: 10 },
  approveBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  rejectBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center', borderWidth: 1.5 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  rejectText: { fontWeight: '600', fontSize: 14 },
});
