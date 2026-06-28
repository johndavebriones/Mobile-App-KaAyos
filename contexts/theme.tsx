import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { getItem, setItem } from '@/utils/storage';

const THEME_KEY = '@kaayos/theme-mode';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  colorScheme: 'light' | 'dark';
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getItem(THEME_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeMode(stored);
      }
    }).finally(() => setReady(true));
  }, []);

  const persistThemeMode = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
    setItem(THEME_KEY, mode);
  }, []);

  const colorScheme = useMemo(() => {
    if (themeMode === 'system') return systemScheme ?? 'light';
    return themeMode;
  }, [themeMode, systemScheme]);

  const toggleTheme = useCallback(() => {
    persistThemeMode(
      themeMode === 'system' ? 'dark' : themeMode === 'dark' ? 'light' : 'system'
    );
  }, [themeMode, persistThemeMode]);

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={{ colorScheme, themeMode, setThemeMode: persistThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
