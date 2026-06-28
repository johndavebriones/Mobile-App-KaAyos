import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ModalScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>About KaAyos</Text>
        <Pressable onPress={() => router.back()}>
          <Icon size={24} name="circle-xmark" color={colors.muted} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={[styles.logoContainer, { backgroundColor: colors.tint }]}>
          <Icon size={40} name="house-flag" color="#fff" />
        </View>
        <Text style={[styles.appName, { color: colors.text }]}>KaAyos</Text>
        <Text style={[styles.version, { color: colors.muted }]}>Version 1.0.0</Text>
        <Text style={[styles.description, { color: colors.muted }]}>
          A Web-Based Service Providing System with AI Assisted Matching and Geospatial Clustering
        </Text>
        <Text style={[styles.author, { color: colors.muted }]}>
          A Capstone Project by Briones, Formentos, & Salanguit
        </Text>
        <Text style={[styles.author, { color: colors.muted }]}>
          Batangas State University - ARASOF Nasugbu
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: { fontSize: 20, fontWeight: '700' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 12 },
  logoContainer: { width: 80, height: 80, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  appName: { fontSize: 28, fontWeight: '800' },
  version: { fontSize: 14 },
  description: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginTop: 8 },
  author: { fontSize: 12, textAlign: 'center', marginTop: 4 },
});
