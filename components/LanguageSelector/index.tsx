import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'EN' },
  { code: 'th', name: 'Thai', nativeName: 'TH' },
];

interface LanguageSelectorProps {
  isMobile?: boolean;
  onLanguageChange?: () => void;
}

export default function LanguageSelector({ isMobile = false, onLanguageChange }: LanguageSelectorProps) {
  const { i18n } = useTranslation();

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleToggle = () => {
    const newLanguage = currentLanguage.code === 'en' ? 'th' : 'en';
    i18n.changeLanguage(newLanguage);
    onLanguageChange?.();
  };

  const buttonStyle = isMobile ? styles.mobileButton : styles.desktopButton;
  const textStyle = isMobile ? styles.mobileText : styles.desktopText;

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handleToggle}
    >
      <Text style={textStyle}>
        {currentLanguage.nativeName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  desktopButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#15803d',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    elevation: 0,
    shadowOpacity: 0,
  },
  mobileButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#15803d',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
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
    color: '#15803d',
    textAlign: 'center',
  },
});
