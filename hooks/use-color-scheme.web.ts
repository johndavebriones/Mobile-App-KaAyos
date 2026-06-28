import { useEffect, useState, useContext } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { ThemeContext } from '@/contexts/theme';

export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const context = useContext(ThemeContext);
  if (context && hasHydrated) return context.colorScheme;
  if (hasHydrated) return useRNColorScheme() ?? 'light';
  return 'light';
}
