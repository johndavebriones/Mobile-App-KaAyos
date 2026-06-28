import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/haptic-tab';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AdminLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.error,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Icon size={26} name="grid-2" color={color} />,
        }}
      />
      <Tabs.Screen
        name="verifications"
        options={{
          title: 'Verify',
          tabBarIcon: ({ color }) => <Icon size={26} name="certificate" color={color} />,
        }}
      />
      <Tabs.Screen
        name="disputes"
        options={{
          title: 'Disputes',
          tabBarIcon: ({ color }) => <Icon size={26} name="circle-exclamation" color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) => <Icon size={26} name="users" color={color} />,
        }}
      />
    </Tabs>
  );
}
