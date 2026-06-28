import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { WorkerCard } from '@/components/worker-card';
import { AiChatFab } from '@/components/ai-chat-fab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { serviceCategories, type ServiceCategory } from '@/data/services';
import { workers } from '@/data/workers';

export default function SearchScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory
    ? workers.filter((w) => w.skills.some((s) =>
        s.toLowerCase().includes(selectedCategory.toLowerCase())
      ))
    : search
      ? workers.filter((w) =>
          w.name.toLowerCase().includes(search.toLowerCase()) ||
          w.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
        )
      : workers;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.workerWrapper}>
            <WorkerCard worker={item} onPress={() => router.push(`/worker/${item.id}`)} />
          </View>
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>Find a Worker</Text>
            </View>

            <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Icon size={18} name="magnifying-glass" color={colors.muted} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search services or workers..."
                placeholderTextColor={colors.muted}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
            >
              {serviceCategories.map((cat) => (
                <Pressable
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: selectedCategory === cat.name ? colors.tint : colors.card,
                      borderColor: selectedCategory === cat.name ? colors.tint : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                >
                  <Icon size={16} name={cat.icon as any} color={selectedCategory === cat.name ? '#fff' : colors.tint} />
                  <Text
                    style={[
                      styles.categoryChipText,
                      { color: selectedCategory === cat.name ? '#fff' : colors.text },
                    ]}
                  >
                    {cat.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.resultsHeader}>
              <Text style={[styles.resultsCount, { color: colors.muted }]}>
                {filtered.length} worker{filtered.length !== 1 ? 's' : ''} found
              </Text>
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <AiChatFab
        onPress={() => Alert.alert(
          'AI Assistant',
          'Tell me what you need! For example: "Find a plumber near me" or "I need my house cleaned this weekend"'
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: '800' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    gap: 8,
    marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 15 },
  categories: { paddingHorizontal: 20, gap: 8, marginBottom: 20 },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryChipText: { fontSize: 13, fontWeight: '600' },
  resultsHeader: { paddingHorizontal: 20, marginBottom: 8 },
  resultsCount: { fontSize: 13 },
  workerWrapper: { paddingHorizontal: 16 },
});
