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
    paddingBottom: 0, // Removed bottom padding for dashboard
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
  
  // Sections
  section: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  sectionLarge: {
    paddingHorizontal: 80,
    paddingVertical: 60,
  },
  sectionAlt: {
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 32,
    textAlign: 'center',
  },
  sectionTitleLarge: {
    fontSize: 32,
    marginBottom: 40,
  },
  
  // Impact cards
  impactGrid: {
    flexDirection: 'column',
  },
  impactGridLarge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  impactCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    flex: 1,
    minWidth: Platform.OS === 'web' ? '22%' : undefined,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  impactIcon: {
    marginBottom: 12,
  },
  impactNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#15803d',
    marginTop: 12,
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  impactDescription: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 4,
  },
  
  // Stats grid
  statsGrid: {
    flexDirection: 'column',
  },
  statsGridLarge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: Platform.OS === 'web' ? '22%' : undefined,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: '#e5e7eb',
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
  },
  statDescription: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 4,
  },
  
  // CTA section
  ctaSection: {
    backgroundColor: '#15803d',
    paddingHorizontal: 24,
    paddingVertical: 60,
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
    marginBottom: 20,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#dcfce7',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  ctaSubtitleLarge: {
    fontSize: 18,
    marginBottom: 40,
    lineHeight: 28,
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: 'center',
    minWidth: 200,
  },
  ctaButtonLarge: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    minWidth: 250,
  },
  ctaButtonText: {
    color: '#15803d',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  ctaButtonTextLarge: {
    fontSize: 18,
  },
});
