import React from 'react';
import { useSegments } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import AIFloatButton from '@/components/AIFloatButton';
import DemoFooter from '@/components/DemoFooter';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/contexts/AuthContext';

// Initialize i18n
import '@/i18n';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function Layout() {
  const colorScheme = useColorScheme();
  const segments: string[] = useSegments();
  // Hide the AI button on the chaona_buddy page (match file name)
  const showAIBtn = !segments.includes('chaona_buddy');
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: { display: 'none' },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />, 
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="login"
          options={{
            title: 'Login',
            tabBarIcon: ({ color }) => <TabBarIcon name="sign-in" color={color} />, 
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="submit-waste"
          options={{
            title: 'Submit Waste',
            tabBarIcon: ({ color }) => <TabBarIcon name="recycle" color={color} />, 
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="marketplace"
          options={{
            title: 'Marketplace',
            tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />, 
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={color} />, 
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />, 
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />, 
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="help"
          options={{
            title: 'Help',
            tabBarIcon: ({ color }) => <TabBarIcon name="question-circle" color={color} />, 
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />, 
            headerShown: false,
          }}
        />
              <Tabs.Screen
                name="chaona_buddy"
                options={{
                  title: '',
                  headerTitle: '',
                  headerShown: false,
                  headerTransparent: true,
                  headerStyle: { 
                    height: 0,
                    backgroundColor: 'transparent',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  },
                  headerTitleStyle: { 
                    display: 'none',
                    fontSize: 0,
                    height: 0,
                  },
                  tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />, 
                }}
              />
      </Tabs>
      {showAIBtn && <AIFloatButton />}
      <DemoFooter />
    </>
  );
}
