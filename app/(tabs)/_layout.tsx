import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              style={{ marginBottom: -3 }}
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
