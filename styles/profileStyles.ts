import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Page content styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 40,
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#f0fdf4',
  },
  headerSectionLarge: {
    paddingHorizontal: 80,
    paddingVertical: 60,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  pageTitleLarge: {
    fontSize: 36,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  pageSubtitleLarge: {
    fontSize: 18,
    lineHeight: 28,
  },
  
  // Content section
  contentSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  contentSectionLarge: {
    paddingHorizontal: 80,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  
  // Placeholder content
  placeholderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f3f4f6',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    } : {
      elevation: 3,
    }),
  },
  placeholderIcon: {
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  // Toggle button for testing
  toggleButton: {
    backgroundColor: '#15803d',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Dashboard specific styles
  section: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  sectionLarge: {
    paddingHorizontal: 80,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  sectionAlt: {
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 32,
    textAlign: 'center',
  },
  sectionTitleLarge: {
    fontSize: 32,
    marginBottom: 40,
  },
  
  // Impact Cards
  impactGrid: {
    gap: 20,
  },
  impactGridLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
  },
  impactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    } : {
      elevation: 3,
    }),
    flex: 1,
  },
  impactIcon: {
    marginBottom: 16,
  },
  impactNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#15803d',
    marginBottom: 8,
  },
  impactLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  impactDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  
  // Stats Grid
  statsGrid: {
    gap: 16,
  },
  statsGridLarge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 24,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flex: 1,
    minWidth: Platform.OS === 'web' ? 200 : '45%',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#15803d',
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // CTA Section
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 60,
    backgroundColor: '#15803d',
    alignItems: 'center',
  },
  ctaSectionLarge: {
    paddingHorizontal: 80,
    paddingVertical: 80,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaTitleLarge: {
    fontSize: 36,
    marginBottom: 24,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#dcfce7',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: 600,
  },
  ctaSubtitleLarge: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 40,
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 200,
  },
  ctaButtonLarge: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    minWidth: 240,
  },
  ctaButtonText: {
    color: '#15803d',
    fontSize: 16,
    fontWeight: '700',
  },
  ctaButtonTextLarge: {
    fontSize: 18,
  },
});
