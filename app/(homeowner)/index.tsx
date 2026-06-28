import { View, Text, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { ServiceCard } from '@/components/service-card';
import { WorkerCard } from '@/components/worker-card';
import { AiChatFab } from '@/components/ai-chat-fab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { serviceCategories } from '@/data/services';
import { workers } from '@/data/workers';

export default function HomeownerHomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const featured = workers.slice(0, 3);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.muted }]}>Good morning,</Text>
            <Text style={[styles.name, { color: colors.text }]}>Juan!</Text>
          </View>
          <Pressable style={[styles.notifBtn, { backgroundColor: colors.card }]}>
            <Icon size={22} name="bell" color={colors.tint} />
          </Pressable>
        </View>

        <View style={[styles.banner, { backgroundColor: colors.tint }]}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Need a repair?</Text>
            <Text style={styles.bannerSubtitle}>Find verified workers near you</Text>
            <Pressable
              style={styles.bannerBtn}
              onPress={() => router.push('/(homeowner)/explore')}
            >
              <Text style={styles.bannerBtnText}>Browse Services</Text>
            </Pressable>
          </View>
          <Icon size={72} name="screwdriver-wrench" color="rgba(255,255,255,0.2)" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Services</Text>
          <Pressable onPress={() => router.push('/(homeowner)/explore')}>
            <Text style={[styles.viewAll, { color: colors.tint }]}>View All</Text>
          </Pressable>
        </View>

        <View style={styles.servicesGrid}>
          {serviceCategories.slice(0, 6).map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              onPress={() => {
                router.push('/(homeowner)/explore');
              }}
            />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Workers</Text>
        </View>

        {featured.map((w) => (
          <WorkerCard
            key={w.id}
            worker={w}
            onPress={() => router.push(`/worker/${w.id}`)}
          />
        ))}
      </ScrollView>

      <AiChatFab onPress={() => Alert.alert('AI Assistant', 'How can I help you find a service? Try: "I need a plumber" or "Fix my sink"')} />
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
    paddingTop: 60,
    paddingBottom: 16,
  },
  greeting: { fontSize: 14 },
  name: { fontSize: 22, fontWeight: '800' },
  notifBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  banner: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  bannerContent: { flex: 1, gap: 4 },
  bannerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  bannerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 10 },
  bannerBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  viewAll: { fontSize: 14, fontWeight: '600' },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: '2%',
    marginBottom: 24,
  },
});
