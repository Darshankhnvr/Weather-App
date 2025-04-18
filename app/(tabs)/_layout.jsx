import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import "../../global.css"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="search-location" size={24} color={focused ? "#00FFFF" : "#aaa"} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Your Cities",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="weather-night-partly-cloudy"
              size={28}
              color={focused ? "#00FFFF" : "#aaa"} // 👈 custom active/inactive color
            />
          ),
        }}
      />
    </Tabs>
  );
}
