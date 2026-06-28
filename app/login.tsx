import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/contexts/auth';

export default function LoginScreen() {
  const router = useRouter();
  const { login, register } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login(email || 'juan@example.com', password || 'password');
    router.replace('/(homeowner)');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Icon size={24} name="chevron-left" color={colors.text} />
      </Pressable>

      <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Sign in to your account</Text>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          placeholder="Email"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          placeholder="Password"
          placeholderTextColor={colors.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable
          style={({ pressed }) => [styles.loginBtn, { backgroundColor: colors.tint, opacity: pressed ? 0.85 : 1 }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginBtnText}>Sign In</Text>
        </Pressable>
      </View>

      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: colors.muted }]}>Quick Access (Prototype)</Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      <View style={styles.quickButtons}>
        <Pressable
          style={({ pressed }) => [styles.quickBtn, { borderColor: colors.tint, opacity: pressed ? 0.7 : 1 }]}
          onPress={async () => {
            await login('juan@example.com', 'password');
            router.replace('/(homeowner)');
          }}
        >
          <Icon size={18} name="user" color={colors.tint} />
          <Text style={[styles.quickBtnText, { color: colors.tint }]}>Homeowner</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.quickBtn, { borderColor: colors.secondary, opacity: pressed ? 0.7 : 1 }]}
          onPress={async () => {
            await register('Mang Pedring', 'pedring@example.com', 'pass', 'provider');
            router.replace('/(provider)');
          }}
        >
          <Icon size={18} name="wrench" color={colors.secondary} />
          <Text style={[styles.quickBtnText, { color: colors.secondary }]}>Provider</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.quickBtn, { borderColor: colors.error, opacity: pressed ? 0.7 : 1 }]}
          onPress={async () => {
            await login('admin@kaayos.com', 'password');
            router.replace('/(admin)');
          }}
        >
          <Icon size={18} name="shield" color={colors.error} />
          <Text style={[styles.quickBtnText, { color: colors.error }]}>Admin</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.muted }]}>Don't have an account? </Text>
        <Pressable onPress={() => router.push('/register')}>
          <Text style={[styles.footerLink, { color: colors.tint }]}>Sign Up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 28, justifyContent: 'center' },
  back: { position: 'absolute', top: 56, left: 20, padding: 8 },
  title: { fontSize: 32, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 15, marginBottom: 32 },
  form: { gap: 14, marginBottom: 24 },
  input: { paddingHorizontal: 16, paddingVertical: 14, borderRadius: 10, borderWidth: 1, fontSize: 16 },
  loginBtn: { paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginTop: 4 },
  loginBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 12 },
  quickButtons: { flexDirection: 'row', gap: 10, marginBottom: 32 },
  quickBtn: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: 12, borderRadius: 10, borderWidth: 1.5 },
  quickBtnText: { fontSize: 12, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: 14 },
  footerLink: { fontSize: 14, fontWeight: '600' },
});
