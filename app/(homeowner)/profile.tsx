import { View, Text, Pressable, ScrollView, StyleSheet, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/contexts/auth';
import { useTheme } from '@/contexts/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const { colorScheme, toggleTheme } = useTheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const menuItems = [
    { icon: 'user', label: 'Personal Information' },
    { icon: 'location-dot', label: 'Saved Addresses' },
    { icon: 'bell', label: 'Notifications' },
    { icon: 'circle-question', label: 'Help & Support' },
    { icon: 'gear', label: 'Settings' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        </View>

        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.profileAvatar, { backgroundColor: colors.tint + '30' }]}>
            <Icon size={36} name="user" color={colors.tint} />
          </View>
          <Text style={[styles.profileName, { color: colors.text }]}>{user?.name || 'Juan Dela Cruz'}</Text>
          <Text style={[styles.profileEmail, { color: colors.muted }]}>{user?.email || 'juan@example.com'}</Text>
          <View style={[styles.roleBadge, { backgroundColor: colors.tint + '20' }]}>
            <Text style={[styles.roleText, { color: colors.tint }]}>Homeowner</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <View style={[styles.themeRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.themeLeft}>
              <Icon size={22} name={isDark ? 'moon' : 'sun'} color={colors.tint} />
              <Text style={[styles.themeLabel, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.tint + '60' }}
              thumbColor={isDark ? colors.tint : colors.muted}
            />
          </View>

          {menuItems.map((item) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.menuItem,
                { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
              ]}
              onPress={() => Alert.alert(item.label, 'This feature is coming soon.')}
            >
              <Icon size={22} name={item.icon} color={colors.tint} />
              <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
              <Icon size={16} name="chevron-right" color={colors.muted} style={styles.chevron} />
            </Pressable>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutBtn,
            { borderColor: colors.error, opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => {
            logout();
            router.replace('/');
          }}
        >
          <Icon size={20} name="circle-arrow-left" color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '800' },
  profileCard: {
    marginHorizontal: 16,
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    gap: 8,
  },
  profileAvatar: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center' },
  profileName: { fontSize: 20, fontWeight: '700' },
  profileEmail: { fontSize: 14 },
  roleBadge: { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 12 },
  roleText: { fontSize: 13, fontWeight: '600' },
  menuSection: { paddingHorizontal: 16, gap: 8, marginBottom: 24 },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeLabel: { fontSize: 15, fontWeight: '500' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  menuLabel: { fontSize: 15, flex: 1 },
  chevron: { marginLeft: 'auto' },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 40,
  },
  logoutText: { fontSize: 15, fontWeight: '600' },
});
