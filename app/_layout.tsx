import { Suspense } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/contexts/auth';
import { ThemeProvider } from '@/contexts/theme';

export const unstable_settings = {
  anchor: '(homeowner)',
};

function LoadingFallback() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#0D7C66" />
    </View>
  );
}

export default function RootLayout() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthProvider>
        <ThemeProvider>
          <RootLayoutInner />
        </ThemeProvider>
      </AuthProvider>
    </Suspense>
  );
}

function RootLayoutInner() {
  const colorScheme = useColorScheme();
  return (
    <NavThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="worker-verification" />
        <Stack.Screen name="(homeowner)" />
        <Stack.Screen name="(provider)" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="chat/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="worker/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="booking/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="review/[id]" options={{ presentation: 'card' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </NavThemeProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
