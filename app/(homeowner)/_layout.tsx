import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/haptic-tab';
import { Icon } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeownerLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon size={26} name="house" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Icon size={26} name="magnifying-glass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <Icon size={26} name="calendar-check" color={color} />,
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
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Icon size={26} name="circle-user" color={color} />,
        }}
      />
    </Tabs>
  );
}
