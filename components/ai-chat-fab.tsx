import { Pressable, Text, StyleSheet } from 'react-native';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface AiChatFabProps {
  onPress: () => void;
  label?: string;
}

export function AiChatFab({ onPress, label = 'AI Assistant' }: AiChatFabProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.fab,
        { backgroundColor: colors.tint, opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={onPress}
    >
      <Icon size={20} name="wand-magic-sparkles" color="#fff" />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 100,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
