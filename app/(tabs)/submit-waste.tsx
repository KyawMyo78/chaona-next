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
  Image,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '@/components/Navbar';
import { styles } from '../../styles/submitWasteStyles';

export default function SubmitWastePage() {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    pricePerKg: '',
    condition: '',
    description: '',
    location: '',
    contactInfo: '',
    sellerName: '',
    availableFrom: '',
    minimumOrder: '',
    paymentMethods: [] as string[],
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
      {/* Shared Navbar Component */}
      <Navbar isLargeScreen={isLargeScreen} activeTab="submit-waste" />

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

          {/* Price per Kg */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.pricePerKg')}</Text>
            <TextInput
              style={styles.textInput}
              value={formData.pricePerKg}
              onChangeText={(text) => setFormData({...formData, pricePerKg: text})}
              placeholder={t('submitWaste.form.pricePerKgPlaceholder')}
              keyboardType="numeric"
            />
          </View>

          {/* Condition */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.condition')}</Text>
            <View style={styles.optionGrid}>
              {[
                { key: 'new', label: t('submitWaste.form.conditionOptions.new') },
                { key: 'good', label: t('submitWaste.form.conditionOptions.good') },
                { key: 'fair', label: t('submitWaste.form.conditionOptions.fair') },
                { key: 'poor', label: t('submitWaste.form.conditionOptions.poor') },
              ].map((condition) => (
                <TouchableOpacity
                  key={condition.key}
                  style={[
                    styles.optionButton,
                    formData.condition === condition.key && styles.optionButtonSelected
                  ]}
                  onPress={() => setFormData({...formData, condition: condition.key})}
                >
                  <Text style={[
                    styles.optionButtonText,
                    formData.condition === condition.key && styles.optionButtonTextSelected
                  ]}>
                    {condition.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Seller Name */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.sellerName')}</Text>
            <TextInput
              style={styles.textInput}
              value={formData.sellerName}
              onChangeText={(text) => setFormData({...formData, sellerName: text})}
              placeholder={t('submitWaste.form.sellerNamePlaceholder')}
            />
          </View>

          {/* Available From */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.availableFrom')}</Text>
            <TextInput
              style={styles.textInput}
              value={formData.availableFrom}
              onChangeText={(text) => setFormData({...formData, availableFrom: text})}
              placeholder="e.g., Immediately, Next week, March 2025"
            />
          </View>

          {/* Minimum Order */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.minimumOrder')}</Text>
            <TextInput
              style={styles.textInput}
              value={formData.minimumOrder}
              onChangeText={(text) => setFormData({...formData, minimumOrder: text})}
              placeholder={t('submitWaste.form.minimumOrderPlaceholder')}
            />
          </View>

          {/* Payment Methods */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{t('submitWaste.form.paymentMethods')}</Text>
            <Text style={styles.formSubLabel}>{t('submitWaste.form.paymentMethodsSubtext')}</Text>
            <View style={styles.checkboxContainer}>
              {[
                { key: 'cod', label: t('submitWaste.form.paymentOptions.cod') },
                { key: 'bankTransfer', label: t('submitWaste.form.paymentOptions.bankTransfer') },
                { key: 'mobilePayment', label: t('submitWaste.form.paymentOptions.mobilePayment') },
                { key: 'creditCard', label: t('submitWaste.form.paymentOptions.creditCard') },
              ].map((method) => (
                <TouchableOpacity
                  key={method.key}
                  style={styles.checkboxItem}
                  onPress={() => {
                    const currentMethods = formData.paymentMethods;
                    const newMethods = currentMethods.includes(method.key)
                      ? currentMethods.filter(m => m !== method.key)
                      : [...currentMethods, method.key];
                    setFormData({...formData, paymentMethods: newMethods});
                  }}
                >
                  <View style={[
                    styles.checkbox,
                    formData.paymentMethods.includes(method.key) && styles.checkboxSelected
                  ]}>
                    {formData.paymentMethods.includes(method.key) && (
                      <FontAwesome name="check" size={12} color="#ffffff" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{method.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
