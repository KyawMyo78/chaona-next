import { StyleSheet, Platform } from 'react-native';

export const homeStyles = StyleSheet.create({
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

    backgroundColor: 'transparent',
  },
  problemGridLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',

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
      wordWrap: 'break-word' as any,
      overflowWrap: 'break-word' as any,
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

    backgroundColor: 'transparent',
  },
  solutionFeaturesLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',

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
      wordWrap: 'break-word' as any,
      overflowWrap: 'break-word' as any,
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

    backgroundColor: 'transparent',
  },
  stepsContainerLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

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
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowColor: 'rgba(21, 128, 61, 0.15)',
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
      wordWrap: 'break-word' as any,
      overflowWrap: 'break-word' as any,
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

    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  ctaButtonsLarge: {
    flexDirection: 'row',
    justifyContent: 'center',

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
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowColor: 'rgba(21, 128, 61, 0.2)',
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
