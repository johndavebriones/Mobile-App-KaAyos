import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const allUsers = [
  { id: 'u1', name: 'Juan Dela Cruz', role: 'Homeowner', status: 'Active', joinDate: 'Jun 2026' },
  { id: 'u2', name: 'Mang Pedring Santos', role: 'Provider', status: 'Active', joinDate: 'May 2026' },
  { id: 'u3', name: 'Aling Nena Cruz', role: 'Provider', status: 'Active', joinDate: 'May 2026' },
  { id: 'u4', name: 'Ka Rolly Mercado', role: 'Provider', status: 'Active', joinDate: 'Jun 2026' },
  { id: 'u5', name: 'Maria Reyes', role: 'Homeowner', status: 'Active', joinDate: 'Jun 2026' },
  { id: 'u6', name: 'Ricky Torres', role: 'Provider', status: 'Pending', joinDate: 'Jun 2026' },
  { id: 'u7', name: 'Totoy Mendoza', role: 'Provider', status: 'Pending', joinDate: 'Jun 2026' },
  { id: 'u8', name: 'Josefa Villanueva', role: 'Homeowner', status: 'Active', joinDate: 'May 2026' },
];

export default function UsersScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [search, setSearch] = useState('');

  const filtered = search
    ? allUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    : allUsers;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.userRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.avatar, { backgroundColor: item.role === 'Provider' ? colors.secondary + '30' : colors.tint + '30' }]}>
              <Icon size={18} name="user" color={item.role === 'Provider' ? colors.secondary : colors.tint} />
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.userRole, { color: colors.muted }]}>{item.role} • Joined {item.joinDate}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: item.status === 'Active' ? colors.success + '20' : colors.warning + '20' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: item.status === 'Active' ? colors.success : colors.warning }
              ]}>
                {item.status}
              </Text>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>Users</Text>
            </View>

            <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Icon size={18} name="magnifying-glass" color={colors.muted} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search users..."
                placeholderTextColor={colors.muted}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <View style={styles.countRow}>
              <Text style={[styles.countText, { color: colors.muted }]}>
                {filtered.length} user{filtered.length !== 1 ? 's' : ''}
              </Text>
              <View style={styles.filterChips}>
                <View style={[styles.filterChip, { backgroundColor: colors.tint + '20' }]}>
                  <Text style={[styles.filterChipText, { color: colors.tint }]}>All</Text>
                </View>
                <View style={[styles.filterChip, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Text style={[styles.filterChipText, { color: colors.muted }]}>Homeowners</Text>
                </View>
                <View style={[styles.filterChip, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Text style={[styles.filterChipText, { color: colors.muted }]}>Providers</Text>
                </View>
              </View>
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '800' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    height: 46,
    gap: 8,
    marginBottom: 12,
  },
  searchInput: { flex: 1, fontSize: 15 },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  countText: { fontSize: 13 },
  filterChips: { flexDirection: 'row', gap: 6 },
  filterChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: 'transparent' },
  filterChipText: { fontSize: 12, fontWeight: '500' },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
    gap: 12,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  userInfo: { flex: 1, gap: 2 },
  userName: { fontSize: 14, fontWeight: '600' },
  userRole: { fontSize: 12 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600' },
});
