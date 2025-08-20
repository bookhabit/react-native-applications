import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // application과 game의 메인 화면에서만 헤더 표시
        headerShown: route.name === 'application' || route.name === 'game',
        drawerActiveTintColor: Colors.light.tint,
        drawerInactiveTintColor: Colors.light.text,
        drawerStyle: {
          backgroundColor: Colors.light.background,
        },
      })}>
      <Drawer.Screen
        name="application"
        options={{
          title: 'Application',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="apps" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="game"
        options={{
          title: 'Game',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
