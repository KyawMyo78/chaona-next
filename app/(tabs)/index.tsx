import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Platform, Animated, View as RNView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import Navbar from '@/components/Navbar';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  
  // Animation values - all sections start visible on Android
  const scrollY = useRef(new Animated.Value(0)).current;
  const heroOpacity = useRef(new Animated.Value(1)).current;
  const section1Opacity = useRef(new Animated.Value(1)).current;
  const section1TranslateY = useRef(new Animated.Value(0)).current;
  const section2Opacity = useRef(new Animated.Value(Platform.OS === 'web' ? 0 : 1)).current;
  const section2TranslateY = useRef(new Animated.Value(Platform.OS === 'web' ? 50 : 0)).current;
  const section3Opacity = useRef(new Animated.Value(Platform.OS === 'web' ? 0 : 1)).current;
  const section3TranslateY = useRef(new Animated.Value(Platform.OS === 'web' ? 50 : 0)).current;
  const ctaOpacity = useRef(new Animated.Value(Platform.OS === 'web' ? 0 : 1)).current;
  const ctaTranslateY = useRef(new Animated.Value(Platform.OS === 'web' ? 50 : 0)).current;

  // Animation state trackers - Mobile starts with all visible, Web has animations
  const [animatedSections, setAnimatedSections] = useState({
    section1: true,
    section2: Platform.OS !== 'web',
    section3: Platform.OS !== 'web',
    cta: Platform.OS !== 'web',
  });

  useEffect(() => {
    // Hero section starts visible, no animation needed
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        // Skip animations on Android to ensure content visibility
        if (Platform.OS === 'android') return;
        
        const offsetY = event.nativeEvent.contentOffset.y;
        
        // Animate section 2 (Solution) - only for web
        if (Platform.OS === 'web' && offsetY > 300 && !animatedSections.section2) {
          setAnimatedSections(prev => ({ ...prev, section2: true }));
          Animated.parallel([
            Animated.timing(section2Opacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: Platform.OS !== 'web',
            }),
            Animated.timing(section2TranslateY, {
              toValue: 0,
              duration: 800,
              useNativeDriver: Platform.OS !== 'web',
            }),
          ]).start();
        }
        
        // Animate section 3 (How it Works) - only for web
        if (Platform.OS === 'web' && offsetY > 600 && !animatedSections.section3) {
          setAnimatedSections(prev => ({ ...prev, section3: true }));
          Animated.parallel([
            Animated.timing(section3Opacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: Platform.OS !== 'web',
            }),
            Animated.timing(section3TranslateY, {
              toValue: 0,
              duration: 800,
              useNativeDriver: Platform.OS !== 'web',
            }),
          ]).start();
        }
        
        // Animate CTA section - only for web
        if (Platform.OS === 'web' && offsetY > 400 && !animatedSections.cta) {
          setAnimatedSections(prev => ({ ...prev, cta: true }));
          Animated.parallel([
            Animated.timing(ctaOpacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: Platform.OS !== 'web',
            }),
            Animated.timing(ctaTranslateY, {
              toValue: 0,
              duration: 800,
              useNativeDriver: Platform.OS !== 'web',
            }),
          ]).start();
        }
      },
    }
  );

  return (
    <RNView style={styles.screenContainer}>
      {/* Shared Navbar Component */}
      <Navbar isLargeScreen={isLargeScreen} activeTab="home" />

      {/* Main Content */}
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
      >
      {/* Hero Section */}
      <Animated.View 
        style={[
          styles.heroSection, 
          isLargeScreen && styles.heroSectionLarge,
          { opacity: heroOpacity }
        ]}
      >
        <View style={styles.heroContent}>
          {/* Logo placeholder */}
          <View style={[styles.logoContainer, isLargeScreen && styles.logoContainerLarge]}>
            <Text style={[styles.logo, isLargeScreen && styles.logoLarge]}>{t('hero.logo')}</Text>
          </View>
          
          <Text style={[styles.slogan, isLargeScreen && styles.sloganLarge]}>
            {t('hero.slogan')}
          </Text>
          
          <Text style={[styles.heroDescription, isLargeScreen && styles.heroDescriptionLarge]}>
            {t('hero.description')}
          </Text>
        </View>
      </Animated.View>

      {/* Section 1: Problem */}
      <Animated.View 
        style={[
          styles.section, 
          styles.problemSection, 
          isLargeScreen && styles.sectionLarge,
          {
            opacity: section1Opacity,
          }
        ]}
      >
        <View style={styles.sectionContent}>
          <Text style={[styles.sectionNumber, isLargeScreen && styles.sectionNumberLarge]}>{t('sections.problem.number')}</Text>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>{t('sections.problem.title')}</Text>
          
          <View style={[styles.problemGrid, isLargeScreen && styles.problemGridLarge]}>
            <View style={styles.problemItem}>
              <Text style={[styles.problemIcon, isLargeScreen && styles.problemIconLarge]}>🔥</Text>
              <Text style={[styles.problemTitle, isLargeScreen && styles.problemTitleLarge]}>{t('sections.problem.cards.burning.title')}</Text>
              <Text style={[styles.problemText, isLargeScreen && styles.problemTextLarge]}>
                {t('sections.problem.cards.burning.description')}
              </Text>
            </View>
            
            <View style={styles.problemItem}>
              <Text style={[styles.problemIcon, isLargeScreen && styles.problemIconLarge]}>🌫️</Text>
              <Text style={[styles.problemTitle, isLargeScreen && styles.problemTitleLarge]}>{t('sections.problem.cards.pollution.title')}</Text>
              <Text style={[styles.problemText, isLargeScreen && styles.problemTextLarge]}>
                {t('sections.problem.cards.pollution.description')}
              </Text>
            </View>
            
            <View style={styles.problemItem}>
              <Text style={[styles.problemIcon, isLargeScreen && styles.problemIconLarge]}>💸</Text>
              <Text style={[styles.problemTitle, isLargeScreen && styles.problemTitleLarge]}>{t('sections.problem.cards.income.title')}</Text>
              <Text style={[styles.problemText, isLargeScreen && styles.problemTextLarge]}>
                {t('sections.problem.cards.income.description')}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Section 2: Solution */}
      <Animated.View 
        style={[
          styles.section, 
          styles.solutionSection, 
          isLargeScreen && styles.sectionLarge,
          {
            opacity: section2Opacity,
            transform: [{ translateY: section2TranslateY }],
          }
        ]}
      >
        <View style={styles.sectionContent}>
          <Text style={[styles.sectionNumber, isLargeScreen && styles.sectionNumberLarge]}>{t('sections.solution.number')}</Text>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>{t('sections.solution.title')}</Text>
          
          <Text style={[styles.solutionDescription, isLargeScreen && styles.solutionDescriptionLarge]}>
            {t('sections.solution.subtitle')}
          </Text>
          
          <View style={[styles.solutionFeatures, isLargeScreen && styles.solutionFeaturesLarge]}>
            <View style={styles.featureItem}>
              <Text style={[styles.featureIcon, isLargeScreen && styles.featureIconLarge]}>🤝</Text>
              <Text style={[styles.featureTitle, isLargeScreen && styles.featureTitleLarge]}>{t('sections.solution.features.connect.title')}</Text>
              <Text style={[styles.featureText, isLargeScreen && styles.featureTextLarge]}>
                {t('sections.solution.features.connect.description')}
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={[styles.featureIcon, isLargeScreen && styles.featureIconLarge]}>♻️</Text>
              <Text style={[styles.featureTitle, isLargeScreen && styles.featureTitleLarge]}>{t('sections.solution.features.reuse.title')}</Text>
              <Text style={[styles.featureText, isLargeScreen && styles.featureTextLarge]}>
                {t('sections.solution.features.reuse.description')}
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={[styles.featureIcon, isLargeScreen && styles.featureIconLarge]}>📊</Text>
              <Text style={[styles.featureTitle, isLargeScreen && styles.featureTitleLarge]}>{t('sections.solution.features.track.title')}</Text>
              <Text style={[styles.featureText, isLargeScreen && styles.featureTextLarge]}>
                {t('sections.solution.features.track.description')}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Section 3: How it Works */}
      <Animated.View 
        style={[
          styles.section, 
          styles.howItWorksSection, 
          isLargeScreen && styles.sectionLarge,
          {
            opacity: section3Opacity,
            transform: [{ translateY: section3TranslateY }],
          }
        ]}
      >
        <View style={styles.sectionContent}>
          <Text style={[styles.sectionNumber, isLargeScreen && styles.sectionNumberLarge]}>{t('sections.howItWorks.number')}</Text>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>{t('sections.howItWorks.title')}</Text>
          
          <View style={[styles.stepsContainer, isLargeScreen && styles.stepsContainerLarge]}>
            <View style={styles.stepItem}>
              <View style={[styles.stepIconContainer, isLargeScreen && styles.stepIconContainerLarge]}>
                <Text style={[styles.stepIcon, isLargeScreen && styles.stepIconLarge]}>📝</Text>
              </View>
              <Text style={[styles.stepNumber, isLargeScreen && styles.stepNumberLarge]}>{t('sections.howItWorks.steps.step1.number')}</Text>
              <Text style={[styles.stepTitle, isLargeScreen && styles.stepTitleLarge]}>{t('sections.howItWorks.steps.step1.title')}</Text>
              <Text style={[styles.stepText, isLargeScreen && styles.stepTextLarge]}>
                {t('sections.howItWorks.steps.step1.description')}
              </Text>
            </View>
            
            <View style={styles.stepArrow}>
              <Text style={[styles.arrowIcon, isLargeScreen && styles.arrowIconLarge]}>
                {isLargeScreen ? '→' : '↓'}
              </Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={[styles.stepIconContainer, isLargeScreen && styles.stepIconContainerLarge]}>
                <Text style={[styles.stepIcon, isLargeScreen && styles.stepIconLarge]}>🔍</Text>
              </View>
              <Text style={[styles.stepNumber, isLargeScreen && styles.stepNumberLarge]}>{t('sections.howItWorks.steps.step2.number')}</Text>
              <Text style={[styles.stepTitle, isLargeScreen && styles.stepTitleLarge]}>{t('sections.howItWorks.steps.step2.title')}</Text>
              <Text style={[styles.stepText, isLargeScreen && styles.stepTextLarge]}>
                {t('sections.howItWorks.steps.step2.description')}
              </Text>
            </View>
            
            <View style={styles.stepArrow}>
              <Text style={[styles.arrowIcon, isLargeScreen && styles.arrowIconLarge]}>
                {isLargeScreen ? '→' : '↓'}
              </Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={[styles.stepIconContainer, isLargeScreen && styles.stepIconContainerLarge]}>
                <Text style={[styles.stepIcon, isLargeScreen && styles.stepIconLarge]}>💰</Text>
              </View>
              <Text style={[styles.stepNumber, isLargeScreen && styles.stepNumberLarge]}>{t('sections.howItWorks.steps.step3.number')}</Text>
              <Text style={[styles.stepTitle, isLargeScreen && styles.stepTitleLarge]}>{t('sections.howItWorks.steps.step3.title')}</Text>
              <Text style={[styles.stepText, isLargeScreen && styles.stepTextLarge]}>
                {t('sections.howItWorks.steps.step3.description')}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* CTA Section */}
      <View 
        style={[
          styles.ctaSection, 
          isLargeScreen && styles.ctaSectionLarge,
        ]}
      >
        <View style={styles.ctaContent}>
          <Text style={[styles.ctaTitle, isLargeScreen && styles.ctaTitleLarge]}>
            {t('cta.title')}
          </Text>
          <Text style={[styles.ctaSubtitle, isLargeScreen && styles.ctaSubtitleLarge]}>
            {t('cta.description')}
          </Text>
          
          <View style={[styles.ctaButtons, isLargeScreen && styles.ctaButtonsLarge]}>
            <TouchableOpacity style={[styles.primaryButton, isLargeScreen && styles.primaryButtonLarge]}>
              <Text style={[styles.primaryButtonText, isLargeScreen && styles.primaryButtonTextLarge]}>
                {t('cta.primaryButton')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.secondaryButton, isLargeScreen && styles.secondaryButtonLarge]}>
              <Text style={[styles.secondaryButtonText, isLargeScreen && styles.secondaryButtonTextLarge]}>
                {t('cta.secondaryButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </ScrollView>
    </RNView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 80 : Platform.OS === 'android' ? 60 : 0, // Increased padding for mobile
  },

  // Hero Section
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 60, // Reduced padding
    backgroundColor: '#f0fdf4', // Light green
    minHeight: Platform.OS === 'web' ? 600 : 400, // Shorter on mobile
    justifyContent: 'center',
  },
  heroSectionLarge: {
    paddingHorizontal: 80,
    paddingVertical: 120,
    minHeight: 700,
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 900,
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'rgba(21, 128, 61, 0.1)', // Very subtle green tint
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(21, 128, 61, 0.2)',
  },
  logoContainerLarge: {
    marginBottom: 32,
    padding: 24,
    borderRadius: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#15803d', // Forest green
    letterSpacing: -0.5,
  },
  logoLarge: {
    fontSize: 52,
    letterSpacing: -1,
  },
  slogan: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#166534', // Dark green
    marginBottom: 20,
    lineHeight: 36,
    letterSpacing: -0.5,
    paddingHorizontal: 16,
  },
  sloganLarge: {
    fontSize: 42,
    lineHeight: 52,
    marginBottom: 28,
    paddingHorizontal: 0,
  },
  heroDescription: {
    fontSize: 18,
    textAlign: 'center',
    color: '#374151', // Darker gray for better readability
    lineHeight: 28,
    paddingHorizontal: 20,
    maxWidth: 600,
  },
  heroDescriptionLarge: {
    fontSize: 22,
    lineHeight: 34,
    paddingHorizontal: 0,
  },

  // Section Base Styles
  section: {
    paddingHorizontal: 24,
    paddingVertical: Platform.OS === 'web' ? 80 : 50, // Reduced padding on mobile
  },
  sectionLarge: {
    paddingHorizontal: 80,
    paddingVertical: 100,
  },
  sectionContent: {
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  sectionNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#15803d', // Forest green
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  sectionNumberLarge: {
    fontSize: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#166534', // Dark green
    marginBottom: 48,
    lineHeight: 40,
    letterSpacing: -0.8,
    paddingHorizontal: 16,
  },
  sectionTitleLarge: {
    fontSize: 42,
    lineHeight: 52,
    marginBottom: 64,
    paddingHorizontal: 0,
  },

  // Problem Section
  problemSection: {
    backgroundColor: '#fef7f7', // Very light red background
  },
  problemGrid: {
    gap: 40,
    backgroundColor: 'transparent',
  },
  problemGridLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 32,
    backgroundColor: 'transparent',
  },
  problemItem: {
    alignItems: 'center',
    flex: 1,
    padding: Platform.OS === 'android' ? 20 : 28,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.15)',
    backgroundColor: 'rgba(254, 242, 242, 0.8)', // Very subtle red tint
    minHeight: 180, // Minimum height, but can grow with content
  },
  problemIcon: {
    fontSize: 56,
    marginBottom: 20,
  },
  problemIconLarge: {
    fontSize: 72,
    marginBottom: 28,
  },
  problemTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#166534', // Dark green
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  problemTitleLarge: {
    fontSize: 24,
    marginBottom: 20,
  },
  problemText: {
    fontSize: 16,
    color: '#374151', // Darker gray
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
    flex: 1,
    flexWrap: 'wrap',
    ...(Platform.OS === 'web' ? {
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    } : {}),
  },
  problemTextLarge: {
    fontSize: 18,
    lineHeight: 28,
    paddingHorizontal: 0,
  },

  // Solution Section
  solutionSection: {
    backgroundColor: '#f0fdf4', // Light green background
  },
  solutionDescription: {
    fontSize: 28,
    fontWeight: '700',
    color: '#15803d', // Forest green
    textAlign: 'center',
    marginBottom: 48,
    letterSpacing: -0.5,
    paddingHorizontal: 20,
  },
  solutionDescriptionLarge: {
    fontSize: 36,
    marginBottom: 64,
    paddingHorizontal: 0,
  },
  solutionFeatures: {
    gap: 40,
    backgroundColor: 'transparent',
  },
  solutionFeaturesLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 32,
    backgroundColor: 'transparent',
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
    padding: Platform.OS === 'android' ? 20 : 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(21, 128, 61, 0.2)',
    backgroundColor: 'rgba(236, 253, 245, 0.8)', // Subtle green tint
    minHeight: 200, // Minimum height, but can grow with content
  },
  featureIcon: {
    fontSize: 56,
    marginBottom: 20,
  },
  featureIconLarge: {
    fontSize: 72,
    marginBottom: 28,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#166534', // Dark green
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  featureTitleLarge: {
    fontSize: 24,
    marginBottom: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#374151', // Darker gray
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
    flex: 1,
    flexWrap: 'wrap',
    ...(Platform.OS === 'web' ? {
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    } : {}),
  },
  featureTextLarge: {
    fontSize: 18,
    lineHeight: 28,
    paddingHorizontal: 0,
  },

  // How It Works Section
  howItWorksSection: {
    backgroundColor: '#f6fdf9', // Very light green background
  },
  stepsContainer: {
    gap: 48,
    backgroundColor: 'transparent',
  },
  stepsContainerLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    backgroundColor: 'transparent',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
    padding: Platform.OS === 'android' ? 20 : 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(21, 128, 61, 0.15)',
    backgroundColor: 'rgba(240, 253, 244, 0.6)', // Very subtle green tint
    minHeight: 220, // Minimum height, but can grow with content
  },
  stepArrow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    backgroundColor: 'transparent',
  },
  arrowIcon: {
    fontSize: 28,
    color: '#15803d', // Forest green
    fontWeight: 'bold',
  },
  arrowIconLarge: {
    fontSize: 36,
  },
  stepIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#f0fdf4', // Very light green instead of white
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#dcfce7', // Light green border
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 6px 16px rgba(21, 128, 61, 0.15)',
    } : {
      elevation: 10,
    }),
  },
  stepIconContainerLarge: {
    width: 108,
    height: 108,
    borderRadius: 54,
    marginBottom: 28,
    borderWidth: 4,
  },
  stepIcon: {
    fontSize: 40,
  },
  stepIconLarge: {
    fontSize: 52,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#15803d', // Forest green
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  stepNumberLarge: {
    fontSize: 16,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#166534', // Dark green
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  stepTitleLarge: {
    fontSize: 24,
    marginBottom: 20,
  },
  stepText: {
    fontSize: 16,
    color: '#374151', // Darker gray
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
    flex: 1,
    flexWrap: 'wrap',
    ...(Platform.OS === 'web' ? {
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    } : {}),
  },
  stepTextLarge: {
    fontSize: 18,
    lineHeight: 28,
    paddingHorizontal: 0,
  },

  // CTA Section
  ctaSection: {
    backgroundColor: '#15803d', // Forest green
    paddingHorizontal: 24,
    paddingVertical: 30, // Reduced padding to ensure CTA visibility
    paddingBottom: 40, // Reduced bottom padding
  },
  ctaSectionLarge: {
    paddingHorizontal: 80,
    paddingVertical: 100,
  },
  ctaContent: {
    alignItems: 'center',
    maxWidth: 900,
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 40,
    letterSpacing: -0.8,
    paddingHorizontal: 16,
  },
  ctaTitleLarge: {
    fontSize: 42,
    lineHeight: 52,
    marginBottom: 28,
    paddingHorizontal: 0,
  },
  ctaSubtitle: {
    fontSize: 18,
    color: '#dcfce7', // Light green
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 28,
    paddingHorizontal: 20,
    maxWidth: 600,
  },
  ctaSubtitleLarge: {
    fontSize: 22,
    marginBottom: 56,
    lineHeight: 34,
    paddingHorizontal: 0,
  },
  ctaButtons: {
    gap: 20,
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  ctaButtonsLarge: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 28,
  },
  primaryButton: {
    backgroundColor: '#dcfce7', // Light green instead of white
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#15803d', // Forest green border
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 4px 12px rgba(21, 128, 61, 0.2)',
    } : {
      elevation: 6,
    }),
  },
  primaryButtonLarge: {
    paddingVertical: 20,
    paddingHorizontal: 44,
    minWidth: 240,
    borderRadius: 16,
  },
  primaryButtonText: {
    color: '#166534', // Dark green
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  primaryButtonTextLarge: {
    fontSize: 20,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#dcfce7', // Light green border instead of white
    alignItems: 'center',
  },
  secondaryButtonLarge: {
    paddingVertical: 20,
    paddingHorizontal: 44,
    minWidth: 240,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#dcfce7', // Light green border
  },
  secondaryButtonText: {
    color: '#dcfce7', // Light green text instead of white
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  secondaryButtonTextLarge: {
    fontSize: 20,
    color: '#dcfce7', // Light green text
  },
});
