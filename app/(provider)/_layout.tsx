import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/haptic-tab';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProviderLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.secondary,
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
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <Icon size={26} name="briefcase" color={color} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <Icon size={26} name="message" color={color} />,
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ color }) => <Icon size={26} name="peso-sign" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Icon size={26} name="circle-user" color={color} />,
        }}
      />
    </Tabs>
  );
}
