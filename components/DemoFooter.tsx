import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DemoFooter = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>
      This is a demo app. Some features may not be fully functional. Thank you for your understanding!
    </Text>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    position: 'relative',
    bottom: 0,
    left: 0,
    zIndex: 999,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default DemoFooter;
