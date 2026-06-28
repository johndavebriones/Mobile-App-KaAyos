import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ChatBubbleProps {
  message: string;
  time: string;
  isMine: boolean;
}

export function ChatBubble({ message, time, isMine }: ChatBubbleProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, isMine ? styles.mine : styles.theirs]}>
      <View
        style={[
          styles.bubble,
          isMine
            ? { backgroundColor: colors.tint, borderBottomRightRadius: 4 }
            : { backgroundColor: colors.card, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.message, { color: isMine ? '#fff' : colors.text }]}>{message}</Text>
        <Text style={[styles.time, { color: isMine ? 'rgba(255,255,255,0.7)' : colors.muted }]}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  mine: {
    justifyContent: 'flex-end',
  },
  theirs: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '78%',
    padding: 12,
    borderRadius: 16,
    gap: 4,
  },
  message: {
    fontSize: 15,
    lineHeight: 20,
  },
  time: {
    fontSize: 11,
    textAlign: 'right',
  },
});
