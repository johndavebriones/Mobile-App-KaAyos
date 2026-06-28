import { useContext } from 'react';
import { ThemeContext } from '@/contexts/theme';

export function useColorScheme(): 'light' | 'dark' {
  const context = useContext(ThemeContext);
  if (context) return context.colorScheme;
  return 'light';
}
