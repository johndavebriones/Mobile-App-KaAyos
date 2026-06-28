import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function WelcomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.hero}>
        <View style={[styles.logoContainer, { backgroundColor: colors.tint }]}>
          <Icon size={48} name="house-flag" color="#fff" />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>KaAyos</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Your trusted home service platform
        </Text>
      </View>

      <View style={styles.features}>
        {[
          { icon: 'user-shield', label: 'Verified Workers' },
          { icon: 'map-pin', label: 'Nearby Services' },
          { icon: 'star', label: 'Ratings & Reviews' },
          { icon: 'message', label: 'Real-time Chat' },
        ].map((f) => (
          <View key={f.label} style={styles.featureRow}>
            <Icon size={20} name={f.icon} color={colors.tint} />
            <Text style={[styles.featureText, { color: colors.text }]}>{f.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryBtn,
            { backgroundColor: colors.tint, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.primaryBtnText}>Get Started</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.secondaryBtn,
            { borderColor: colors.tint, opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => router.push('/register')}
        >
          <Text style={[styles.secondaryBtnText, { color: colors.tint }]}>
            Create Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 6,
  },
  features: {
    gap: 16,
    marginBottom: 48,
    paddingHorizontal: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
  },
  buttons: {
    gap: 12,
  },
  primaryBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  secondaryBtnText: {
    fontSize: 17,
    fontWeight: '700',
  },
});
