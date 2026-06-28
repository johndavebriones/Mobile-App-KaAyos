import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { ChatBubble } from '@/components/chat-bubble';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const mockMessages = [
  { id: 'm1', text: 'Good day! I need help with my kitchen sink.', time: '9:00 AM', isMine: true },
  { id: 'm2', text: 'Good day po! Ano po problema ng sink niyo?', time: '9:05 AM', isMine: false },
  { id: 'm3', text: 'Tumutulo po yung pipe sa ilalim.', time: '9:07 AM', isMine: true },
  { id: 'm4', text: 'Okay po, kaya po yan. Pwede po ako pumunta bukas ng umaga?', time: '9:10 AM', isMine: false },
  { id: 'm5', text: 'Sige po, mga 9AM po?', time: '9:12 AM', isMine: true },
  { id: 'm6', text: 'Sige po, kita tayo bukas. I-send ko po quotation.', time: '9:15 AM', isMine: false },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [messages] = useState(mockMessages);
  const [input, setInput] = useState('');

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()}>
          <Icon size={24} name="chevron-left" color={colors.text} />
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={[styles.headerName, { color: colors.text }]}>Mang Pedring Santos</Text>
          <Text style={[styles.headerStatus, { color: colors.success }]}>Online</Text>
        </View>
        <Icon size={22} name="phone" color={colors.tint} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBubble message={item.text} time={item.time} isMine={item.isMine} />
        )}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
      />

      <View style={[styles.inputBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TextInput
          style={[styles.inputField, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          placeholder="Type a message..."
          placeholderTextColor={colors.muted}
          value={input}
          onChangeText={setInput}
        />
        <Pressable style={[styles.sendBtn, { backgroundColor: colors.tint }]}>
          <Icon size={20} name="circle-up" color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 16, fontWeight: '700' },
  headerStatus: { fontSize: 12 },
  chatList: { padding: 16, paddingBottom: 16 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    gap: 8,
  },
  inputField: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 15,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
