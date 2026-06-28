import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth, type UserRole } from '@/contexts/auth';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleRegister = async () => {
    if (!selectedRole) return;
    await register(name || 'New User', email || 'user@example.com', password || 'password', selectedRole);
    if (selectedRole === 'provider') {
      router.replace('/(provider)');
    } else {
      router.replace('/(homeowner)');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Icon size={24} name="chevron-left" color={colors.text} />
      </Pressable>

      <Text style={[styles.title, { color: colors.text }]}>Join KaAyos</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>Create your account</Text>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          placeholder="Full Name"
          placeholderTextColor={colors.muted}
          value={name}
          onChangeText={setName}
        />
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

        <Text style={[styles.roleLabel, { color: colors.text }]}>I want to join as:</Text>
        <View style={styles.roleOptions}>
          {[
            { role: 'homeowner' as const, icon: 'user', label: 'Homeowner', desc: 'Find service providers' },
            { role: 'provider' as const, icon: 'wrench', label: 'Service Provider', desc: 'Offer your services' },
          ].map((opt) => (
            <Pressable
              key={opt.role}
              style={[
                styles.roleCard,
                {
                  backgroundColor: colors.card,
                  borderColor: selectedRole === opt.role ? colors.tint : colors.border,
                },
              ]}
              onPress={() => setSelectedRole(opt.role)}
            >
              <Icon size={28} name={opt.icon} color={selectedRole === opt.role ? colors.tint : colors.muted} />
              <Text style={[styles.roleName, { color: selectedRole === opt.role ? colors.tint : colors.text }]}>
                {opt.label}
              </Text>
              <Text style={[styles.roleDesc, { color: colors.muted }]}>{opt.desc}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.registerBtn,
            { backgroundColor: selectedRole ? colors.tint : colors.muted, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={handleRegister}
          disabled={!selectedRole}
        >
          <Text style={styles.registerBtnText}>Create Account</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.muted }]}>Already have an account? </Text>
        <Pressable onPress={() => router.push('/login')}>
          <Text style={[styles.footerLink, { color: colors.tint }]}>Sign In</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    top: 56,
    left: 20,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 28,
  },
  form: {
    gap: 14,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
  roleLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
  roleOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  roleCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    gap: 6,
  },
  roleName: {
    fontSize: 14,
    fontWeight: '700',
  },
  roleDesc: {
    fontSize: 11,
    textAlign: 'center',
  },
  registerBtn: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  registerBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
