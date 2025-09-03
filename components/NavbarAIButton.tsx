import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useFloatingButton } from '@/contexts/FloatingButtonContext';

const NavbarAIButton = () => {
  const router = useRouter();
  const { isFloatingButtonVisible, showFloatingButton } = useFloatingButton();

  // Only show in navbar when floating button is hidden
  if (isFloatingButtonVisible) {
    return null;
  }

  const handlePress = () => {
    // Option 1: Navigate directly to chat
    router.push({ pathname: '/(tabs)/chaona_buddy' } as any);
    
    // Option 2: Show floating button again (uncomment if preferred)
    // showFloatingButton();
  };

  return (
    <TouchableOpacity 
      style={styles.navbarButton}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image 
        source={require('../assets/images/chaona_buddy.jpeg')} 
        style={styles.navbarMascotImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navbarButton: {
    width: 40, // or your preferred size
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 8,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbarMascotImage: {
    width: 82,
    height: 82,
    borderRadius: 16,
  },
});

export default NavbarAIButton;
