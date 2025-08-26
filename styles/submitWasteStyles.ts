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
    paddingTop: 0, // Removed excessive top padding since we now use shared navbar
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
  
  // Form styles
  formSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  formSectionLarge: {
    paddingHorizontal: 80,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  
  // Waste type selection
  wasteTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  wasteTypeOption: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: Platform.OS === 'web' ? 150 : '45%',
  },
  wasteTypeOptionSelected: {
    backgroundColor: '#f0fdf4',
    borderColor: '#15803d',
  },
  wasteTypeText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  wasteTypeTextSelected: {
    color: '#15803d',
    fontWeight: '600',
  },
  
  // Submit button
  submitButton: {
    backgroundColor: '#15803d',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 24,
    alignSelf: 'center',
    minWidth: 200,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Photo styles
  formSubLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  photoContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    } : {
      elevation: 3,
    }),
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#15803d',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addPhotoText: {
    fontSize: 12,
    color: '#15803d',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Option grid and buttons for condition, payment methods
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: Platform.OS === 'web' ? 120 : '45%',
  },
  optionButtonSelected: {
    backgroundColor: '#f0fdf4',
    borderColor: '#15803d',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  optionButtonTextSelected: {
    color: '#15803d',
    fontWeight: '600',
  },

  // Checkbox styles for payment methods
  checkboxContainer: {
    gap: 12,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#f0fdf4',
    borderColor: '#15803d',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
  },
});
