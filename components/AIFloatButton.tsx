import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFloatingButton } from '@/contexts/FloatingButtonContext';
import Svg, { Path, Text as SvgText, TextPath, Defs } from 'react-native-svg';

const BUTTON_SIZE = 64;
const ARC_RADIUS = BUTTON_SIZE / 2 + 8; // 8px gap for visibility
const SVG_SIZE = ARC_RADIUS * 2 + 16; // extra padding
const CENTER = SVG_SIZE / 2;
const ARC_START_X = CENTER - ARC_RADIUS;
const ARC_START_Y = CENTER;
const ARC_END_X = CENTER + ARC_RADIUS;
const ARC_END_Y = CENTER;

const AIFloatButton = () => {
  const router = useRouter();
  const { isFloatingButtonVisible, hideFloatingButton } = useFloatingButton();

  if (!isFloatingButtonVisible) {
    return null;
  }

  return (
    <View style={[styles.container, { width: SVG_SIZE, height: SVG_SIZE + BUTTON_SIZE / 2 }]}> 
      {/* SVG for the curved text above the button */}
      <Svg
        width={SVG_SIZE}
        height={SVG_SIZE}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1002,
          pointerEvents: 'none',
          transform: [{ rotate: '-40deg' }],
        }}
      >
        <Defs>
          <Path
            id="curved-path"
            d={`M ${ARC_START_X} ${ARC_START_Y} a ${ARC_RADIUS} ${ARC_RADIUS} 0 0 1 ${ARC_RADIUS * 2} 0`}
            fill="transparent"
          />
        </Defs>
        <SvgText fill="#15803d" fontSize="11" fontWeight="bold">
          <TextPath href="#curved-path" startOffset="50%" textAnchor="middle">
            Ask Chaona Buddy
          </TextPath>
        </SvgText>
      </Svg>
      {/* Main Button - centered at bottom of SVG */}
      <TouchableOpacity
        style={[styles.fab, { position: 'absolute', top: SVG_SIZE / 2 - BUTTON_SIZE / 2, left: SVG_SIZE / 2 - BUTTON_SIZE / 2 }]}
        onPress={() => router.push({ pathname: '/(tabs)/chaona_buddy' } as any)}
        activeOpacity={0.85}
      >
        <Image
          source={require('../assets/images/chaona_buddy.jpeg')}
          style={styles.mascotImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
      {/* Close Button - absolutely positioned top right above the text */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2000,
          backgroundColor: '#f3f4f6',
          borderRadius: 10,
          width: 20,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
        onPress={hideFloatingButton}
        activeOpacity={0.7}
      >
        <FontAwesome name="times" size={12} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 8,
    bottom: 60,
    alignItems: 'center',
    zIndex: 1000,
    width: 80,
  },
  fab: {
    backgroundColor: '#15803d',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    overflow: 'hidden',
  },
  mascotImage: {
    width: 130,
    height: 130,
    borderRadius: 32,
  },
});

export default AIFloatButton;
