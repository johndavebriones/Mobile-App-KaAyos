import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const conversations = [
  { id: 'c1', name: 'Mang Pedring Santos', lastMsg: 'Sige po, punta po ako bukas ng umaga.', time: '10:32 AM', unread: 2, workerId: 'w1' },
  { id: 'c2', name: 'Aling Nena Cruz', lastMsg: 'Maraming salamat po sa pag-book!', time: 'Yesterday', unread: 0, workerId: 'w3' },
  { id: 'c3', name: 'Jun de Guzman', lastMsg: 'Yes, available po ako this Saturday.', time: 'Yesterday', unread: 1, workerId: 'w6' },
];

export default function InboxScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.convCard,
              { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={() => router.push(`/chat/${item.workerId}`)}
          >
            <View style={[styles.avatar, { backgroundColor: colors.tint + '30' }]}>
              <Icon size={22} name="user" color={colors.tint} />
            </View>
            <View style={styles.convInfo}>
              <View style={styles.convHeader}>
                <Text style={[styles.convName, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.convTime, { color: colors.muted }]}>{item.time}</Text>
              </View>
              <View style={styles.convPreview}>
                <Text style={[styles.convMsg, { color: colors.muted }]} numberOfLines={1}>
                  {item.lastMsg}
                </Text>
                {item.unread > 0 && (
                  <View style={[styles.unreadBadge, { backgroundColor: colors.tint }]}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Messages</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '800' },
  convCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  convInfo: { flex: 1, gap: 4 },
  convHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  convName: { fontSize: 15, fontWeight: '600' },
  convTime: { fontSize: 12 },
  convPreview: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  convMsg: { fontSize: 13, flex: 1 },
  unreadBadge: { width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  unreadText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
