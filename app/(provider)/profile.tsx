import { View, Text, Pressable, ScrollView, StyleSheet, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { VerificationBadge } from '@/components/verification-badge';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/contexts/auth';
import { useTheme } from '@/contexts/theme';

export default function ProviderProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { colorScheme, toggleTheme } = useTheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const menuItems = [
    { icon: 'user', label: 'My Portfolio', desc: 'Showcase your work' },
    { icon: 'map-pin', label: 'Service Area', desc: 'Tuy, Batangas' },
    { icon: 'file-lines', label: 'Verification Status', desc: 'Documents submitted' },
    { icon: 'clock', label: 'Availability', desc: 'Set your schedule' },
    { icon: 'gear', label: 'Settings' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>My Profile</Text>
        </View>

        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: colors.secondary + '30' }]}>
            <Icon size={40} name="user" color={colors.secondary} />
          </View>
          <VerificationBadge verified size={16} />
          <Text style={[styles.name, { color: colors.text }]}>Mang Pedring Santos</Text>
          <Text style={[styles.profession, { color: colors.muted }]}>Plumber • 12 years exp.</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.text }]}>4.8</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Rating</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.text }]}>230</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Jobs</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.text }]}>97%</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Rate</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <View style={[styles.themeRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.themeLeft}>
              <Icon size={22} name={isDark ? 'moon' : 'sun'} color={colors.secondary} />
              <Text style={[styles.themeLabel, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.secondary + '60' }}
              thumbColor={isDark ? colors.secondary : colors.muted}
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
              <Icon size={22} name={item.icon} color={colors.secondary} />
              <View style={styles.menuContent}>
                <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                {item.desc && <Text style={[styles.menuDesc, { color: colors.muted }]}>{item.desc}</Text>}
              </View>
              <Icon size={16} name="chevron-right" color={colors.muted} />
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
  avatar: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  profession: { fontSize: 14 },
  stats: { flexDirection: 'row', marginTop: 12, gap: 24 },
  stat: { alignItems: 'center', gap: 2 },
  statValue: { fontSize: 18, fontWeight: '700' },
  statLabel: { fontSize: 12 },
  statDivider: { width: 1 },
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
  menuContent: { flex: 1, gap: 2 },
  menuLabel: { fontSize: 15, fontWeight: '500' },
  menuDesc: { fontSize: 12 },
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
