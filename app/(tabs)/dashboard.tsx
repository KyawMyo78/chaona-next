import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import DashboardContent from '@/components/DashboardContent';

export default function DashboardPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DashboardContent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
});
