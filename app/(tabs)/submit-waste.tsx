import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  useWindowDimensions,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

// Navbar component for consistency
const Navbar = ({ onLanguagePress, onMenuPress, isLargeScreen }: any) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.navbar, isLargeScreen && styles.navbarLarge]}>
      <View style={styles.navContainer}>
        {/* Logo */}
        <Text style={[styles.navLogo, isLargeScreen && styles.navLogoLarge]}>
          ChaonaNext
        </Text>

        {isLargeScreen ? (
          /* Desktop Navigation */
          <View style={styles.navLinks}>
            <Link href="./" asChild>
              <TouchableOpacity style={styles.navLink}>
                <Text style={styles.navLinkText}>{t('navigation.home')}</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.navLink}>
              <Text style={[styles.navLinkText, styles.navLinkActive]}>{t('navigation.submitWaste')}</Text>
            </TouchableOpacity>
            <Link href="./marketplace" asChild>
              <TouchableOpacity style={styles.navLink}>
                <Text style={styles.navLinkText}>{t('navigation.marketplace')}</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.navLink}>
              <Text style={styles.navLinkText}>{t('navigation.dashboard')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.langButton} onPress={onLanguagePress}>
              <Text style={styles.langButtonText}>{t('navigation.language')}</Text>
              <FontAwesome name="chevron-down" size={12} color="#15803d" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{t('navigation.login')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Mobile Navigation */
          <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
            <FontAwesome name="bars" size={24} color="#15803d" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function SubmitWastePage() {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    description: '',
    location: '',
    contactInfo: '',
    photos: [] as string[], // Array to store photo URIs
  });

  const isLargeScreen = width >= 768;

  const wasteTypes = [
    { key: 'crop_residue', label: t('submitWaste.wasteTypes.cropResidue') },
    { key: 'fruit_vegetable', label: t('submitWaste.wasteTypes.fruitVegetable') },
    { key: 'packaging', label: t('submitWaste.wasteTypes.packaging') },
    { key: 'organic', label: t('submitWaste.wasteTypes.organic') },
    { key: 'other', label: t('submitWaste.wasteTypes.other') },
  ];

  // Photo handling functions
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        t('submitWaste.permissions.title'),
        t('submitWaste.permissions.message')
      );
      return false;
    }
    return true;
  };

  const pickImageFromLibrary = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newPhotos = [...formData.photos, result.assets[0].uri];
      setFormData({ ...formData, photos: newPhotos });
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        t('submitWaste.permissions.cameraTitle'),
        t('submitWaste.permissions.cameraMessage')
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newPhotos = [...formData.photos, result.assets[0].uri];
      setFormData({ ...formData, photos: newPhotos });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: newPhotos });
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      t('submitWaste.photo.selectSource'),
      t('submitWaste.photo.selectSourceMessage'),
      [
        { text: t('submitWaste.photo.camera'), onPress: takePicture },
        { text: t('submitWaste.photo.library'), onPress: pickImageFromLibrary },
        { text: t('submitWaste.photo.cancel'), style: 'cancel' },
      ]
    );
  };

  const handleSubmit = () => {
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Navbar */}
      <Navbar 
        onLanguagePress={() => setIsLanguageModalVisible(true)}
        onMenuPress={() => setIsMobileMenuOpen(true)}
        isLargeScreen={isLargeScreen}
      />

      {/* Mobile Menu Modal */}
      <Modal
        visible={isMobileMenuOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsMobileMenuOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsMobileMenuOpen(false)}
        >
          <View style={styles.mobileMenu}>
            <Link href="./" asChild>
              <TouchableOpacity 
                style={styles.mobileMenuItem}
                onPress={() => setIsMobileMenuOpen(false)}
              >
                <Text style={styles.mobileMenuText}>{t('navigation.home')}</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity 
              style={styles.mobileMenuItem}
              onPress={() => setIsMobileMenuOpen(false)}
            >
              <Text style={[styles.mobileMenuText, styles.mobileMenuActive]}>{t('navigation.submitWaste')}</Text>
            </TouchableOpacity>
            <Link href="./marketplace" asChild>
              <TouchableOpacity 
                style={styles.mobileMenuItem}
                onPress={() => setIsMobileMenuOpen(false)}
              >
                <Text style={styles.mobileMenuText}>{t('navigation.marketplace')}</Text>
              </TouchableOpacity>
            </Link>
            
            <View style={styles.menuSeparator} />
            
            <TouchableOpacity 
              style={styles.mobileMenuItem}
              onPress={() => {
                setIsMobileMenuOpen(false);
                setIsLanguageModalVisible(true);
              }}
            >
              <Text style={styles.mobileMenuText}>{t('navigation.language')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Language Modal */}
      <Modal
        visible={isLanguageModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsLanguageModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsLanguageModalVisible(false)}
        >
          <View style={styles.languageModal}>
            <Text style={styles.languageTitle}>{t('navigation.language')}</Text>
            <TouchableOpacity 
              style={styles.languageOption}
              onPress={() => setIsLanguageModalVisible(false)}
            >
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.languageOption}
              onPress={() => setIsLanguageModalVisible(false)}
            >
              <Text style={styles.languageText}>ไทย</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={[styles.headerSection, isLargeScreen && styles.headerSectionLarge]}>
          <Text style={[styles.pageTitle, isLargeScreen && styles.pageTitleLarge]}>
            {t('submitWaste.title')}
          </Text>
          <Text style={[styles.pageSubtitle, isLargeScreen && styles.pageSubtitleLarge]}>
            {t('submitWaste.subtitle')}
          </Text>
        </View>

        {/* Form Section */}
        <View style={[styles.formSection, isLargeScreen && styles.formSectionLarge]}>
          {/* Waste Type Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.wasteType')}</Text>
            <View style={styles.wasteTypeGrid}>
              {wasteTypes.map((type) => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    styles.wasteTypeOption,
                    formData.wasteType === type.key && styles.wasteTypeOptionSelected
                  ]}
                  onPress={() => setFormData({...formData, wasteType: type.key})}
                >
                  <Text style={[
                    styles.wasteTypeText,
                    formData.wasteType === type.key && styles.wasteTypeTextSelected
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.quantity')}</Text>
            <TextInput
              style={styles.textInput}
              value={formData.quantity}
              onChangeText={(text) => setFormData({...formData, quantity: text})}
              placeholder={t('submitWaste.form.quantityPlaceholder')}
              keyboardType="numeric"
            />
          </View>

          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.description')}</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData({...formData, description: text})}
              placeholder={t('submitWaste.form.descriptionPlaceholder')}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Location */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.location')}</Text>
            <TextInput
              style={styles.textInput}
              value={formData.location}
              onChangeText={(text) => setFormData({...formData, location: text})}
              placeholder={t('submitWaste.form.locationPlaceholder')}
            />
          </View>

          {/* Contact Info */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.contactInfo')}</Text>
            <TextInput
              style={styles.textInput}
              value={formData.contactInfo}
              onChangeText={(text) => setFormData({...formData, contactInfo: text})}
              placeholder={t('submitWaste.form.contactPlaceholder')}
              keyboardType="phone-pad"
            />
          </View>

          {/* Photos */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.photos')}</Text>
            <Text style={styles.formSubLabel}>{t('submitWaste.form.photosSubtext')}</Text>
            
            {/* Photo Grid */}
            <View style={styles.photoGrid}>
              {formData.photos.map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image source={{ uri: photo }} style={styles.photoPreview} />
                  <TouchableOpacity 
                    style={styles.removePhotoButton}
                    onPress={() => removePhoto(index)}
                  >
                    <FontAwesome name="times" size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              ))}
              
              {/* Add Photo Button */}
              {formData.photos.length < 4 && (
                <TouchableOpacity 
                  style={styles.addPhotoButton} 
                  onPress={showImagePickerOptions}
                >
                  <FontAwesome name="plus" size={24} color="#15803d" />
                  <Text style={styles.addPhotoText}>{t('submitWaste.form.addPhoto')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t('submitWaste.form.submit')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Navbar styles (reused from index.tsx)
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(10px)' } : {}),
    zIndex: 1000,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(21, 128, 61, 0.1)',
  },
  navbarLarge: {
    paddingHorizontal: 40,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLogo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#15803d',
  },
  navLogoLarge: {
    fontSize: 24,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  navLink: {
    paddingVertical: 8,
  },
  navLinkText: {
    fontSize: 16,
    color: '#4b5563',
    fontWeight: '500',
  },
  navLinkActive: {
    color: '#15803d',
    fontWeight: '600',
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    gap: 8,
  },
  langButtonText: {
    fontSize: 16,
    color: '#15803d',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#15803d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  menuButton: {
    padding: 8,
  },
  
  // Mobile menu styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  mobileMenu: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 24,
    maxHeight: '50%',
  },
  mobileMenuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  mobileMenuText: {
    fontSize: 18,
    color: '#4b5563',
    fontWeight: '500',
  },
  mobileMenuActive: {
    color: '#15803d',
    fontWeight: '600',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  
  // Language modal styles
  languageModal: {
    backgroundColor: '#ffffff',
    margin: 40,
    borderRadius: 20,
    padding: 24,
    alignSelf: 'center',
    minWidth: 200,
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#15803d',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  languageText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
  
  // Page content styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
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
});
