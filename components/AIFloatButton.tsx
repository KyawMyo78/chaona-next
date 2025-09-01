import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const AIFloatButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.fab} onPress={() => router.push({ pathname: '/(tabs)/chaona_buddy' } as any)} activeOpacity={0.85}>
      <View style={styles.content}>
        <FontAwesome name="comments" size={24} color="#fff" />
        <Text style={styles.text}>Chaona Buddy</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#15803d',
    borderRadius: 32,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AIFloatButton;
