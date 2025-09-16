// app/(main)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MainLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#FF6B6B',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
      }
    }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="messages" 
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="create" 
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              overflow: 'hidden',
              marginTop: -10,
            }}>
              <LinearGradient
                colors={focused ? ['#FF6B6B', '#FF8E53'] : ['#FF6B6B', '#FF8E53']}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="add" size={28} color="white" />
              </LinearGradient>
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="reels" 
        options={{
          title: 'Reels',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}