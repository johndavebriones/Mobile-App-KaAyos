import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
}

function initials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ uri, name, size = 48 }: AvatarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  if (!uri) {
    return (
      <View
        style={[
          styles.fallback,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.tint + '30',
          },
        ]}
      >
        <Text style={[styles.initials, { color: colors.tint, fontSize: size * 0.4 }]}>
          {initials(name)}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      cachePolicy="disk"
      transition={200}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontWeight: '700',
  },
});
