import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function WorkerVerificationScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Icon size={24} name="chevron-left" color={colors.text} />
      </Pressable>

      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.tint + '20' }]}>
          <Icon size={48} name="user-shield" color={colors.tint} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Verify Your Identity</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          To start receiving job requests, please submit your valid ID and government clearances.
        </Text>

        <View style={styles.requirements}>
          {[
            'Valid Government ID (Passport, Driver\'s License, UMID)',
            'Barangay Clearance',
            'NBI Clearance (optional)',
            'Professional license (if applicable)',
          ].map((req) => (
            <View key={req} style={styles.reqRow}>
              <Icon size={16} name="file-lines" color={colors.tint} />
              <Text style={[styles.reqText, { color: colors.text }]}>{req}</Text>
            </View>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.uploadBtn,
            { backgroundColor: colors.tint, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => {
            router.replace('/(provider)');
          }}
        >
          <Icon size={20} name="cloud-arrow-up" color="#fff" />
          <Text style={styles.uploadBtnText}>Upload Documents</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.skipBtn, { opacity: pressed ? 0.7 : 1 }]}
          onPress={() => router.replace('/(provider)')}
        >
          <Text style={[styles.skipText, { color: colors.muted }]}>Skip for now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    position: 'absolute',
    top: 56,
    left: 20,
    padding: 8,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  requirements: {
    width: '100%',
    gap: 14,
    marginBottom: 32,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reqText: {
    fontSize: 14,
    flex: 1,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  uploadBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  skipBtn: {
    marginTop: 16,
    padding: 8,
  },
  skipText: {
    fontSize: 14,
  },
});
