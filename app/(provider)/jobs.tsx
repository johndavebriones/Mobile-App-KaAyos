import { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { JobRequestCard } from '@/components/job-request-card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { providerJobRequests } from '@/data/bookings';

export default function JobsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [jobs, setJobs] = useState(providerJobRequests);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={jobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <JobRequestCard
            job={item}
            onPress={() => router.push(`/chat/${item.homeownerId}`)}
            onAccept={() => {
              setJobs((prev) => prev.map((j) => j.id === item.id ? { ...j, status: 'accepted' as const } : j));
              Alert.alert('Accepted', 'You have accepted this job request.');
            }}
            onDecline={() => {
              setJobs((prev) => prev.map((j) => j.id === item.id ? { ...j, status: 'declined' as const } : j));
              Alert.alert('Declined', 'You have declined this job request.');
            }}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Job Requests</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              {jobs.filter((j) => j.status === 'pending').length} new requests
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon size={48} name="inbox" color={colors.muted} />
            <Text style={[styles.emptyText, { color: colors.muted }]}>No job requests yet</Text>
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
  subtitle: { fontSize: 14, marginTop: 4 },
  list: { paddingHorizontal: 16 },
  empty: { alignItems: 'center', paddingTop: 100, gap: 12 },
  emptyText: { fontSize: 16 },
});
