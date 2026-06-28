import { View, StyleSheet } from 'react-native';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showEmpty?: boolean;
}

export function RatingStars({ rating, size = 14, showEmpty = true }: RatingStarsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= fullStars;
        const half = star === fullStars + 1 && hasHalf;
        if (!filled && !half && !showEmpty) return null;
        return (
          <Icon
            key={star}
            size={size}
            name={filled ? 'star' : half ? 'star-half-stroke' : 'star'}
            iconStyle={filled ? 'solid' : half ? 'solid' : 'regular'}
            color={filled || half ? colors.secondary : colors.muted}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
