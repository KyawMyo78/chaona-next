import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
];

interface LanguageSelectorProps {
  isMobile?: boolean;
  onLanguageChange?: () => void;
}

export default function LanguageSelector({ isMobile = false, onLanguageChange }: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageSelect = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsModalVisible(false);
    onLanguageChange?.();
  };

  const buttonStyle = isMobile ? styles.mobileButton : styles.desktopButton;
  const textStyle = isMobile ? styles.mobileText : styles.desktopText;

  return (
    <View>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={textStyle}>
          {isMobile ? `Language: ${currentLanguage.nativeName}` : currentLanguage.code.toUpperCase()}
        </Text>
        <Text style={[textStyle, { marginLeft: 4 }]}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  currentLanguage.code === language.code && styles.selectedLanguage
                ]}
                onPress={() => handleLanguageSelect(language.code)}
              >
                <Text style={[
                  styles.languageOptionText,
                  currentLanguage.code === language.code && styles.selectedLanguageText
                ]}>
                  {language.nativeName}
                </Text>
                <Text style={[
                  styles.languageOptionSubtext,
                  currentLanguage.code === language.code && styles.selectedLanguageText
                ]}>
                  {language.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  desktopButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#15803d',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 0,
    shadowOpacity: 0,
  },
  mobileButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(21, 128, 61, 0.05)',
    backgroundColor: '#f0fdf4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  desktopText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#15803d',
    textAlign: 'center',
  },
  mobileText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    minWidth: 250,
    maxWidth: 300,
    ...(Platform.OS !== 'web' && {
      elevation: 8,
    }),
    ...(Platform.OS === 'web' && {
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    }),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
  },
  selectedLanguage: {
    backgroundColor: '#15803d',
  },
  languageOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  languageOptionSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  selectedLanguageText: {
    color: '#ffffff',
  },
});
