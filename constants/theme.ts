import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1A1A1A',
    background: '#F5F5F0',
    tint: '#0D7C66',
    secondary: '#E8B04B',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0D7C66',
    card: '#FFFFFF',
    border: '#E0E0D8',
    success: '#2E7D32',
    error: '#C62828',
    warning: '#E8B04B',
    muted: '#9E9E96',
    surface: '#FFFFFF',
    verified: '#0D7C66',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#0D7C66',
    secondary: '#E8B04B',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#0D7C66',
    card: '#1E2022',
    border: '#2C2E30',
    success: '#4CAF50',
    error: '#EF5350',
    warning: '#E8B04B',
    muted: '#6B6F74',
    surface: '#1E2022',
    verified: '#4DB6AC',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
