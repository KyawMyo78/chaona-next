import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { View } from '@/components/Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NotificationBell from '@/components/NotificationBell';
import Navbar from '@/components/Navbar';

export default function NotificationsScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Navbar isLargeScreen={isLargeScreen} activeTab="notifications" />
      
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <NotificationBell isLargeScreen={isLargeScreen} isFullPage={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
