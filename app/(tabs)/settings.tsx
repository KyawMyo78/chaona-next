import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Navbar from '@/components/Navbar';

export default function SettingsScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const settings = [
    {
      title: t('settings.account.title'),
      items: [
        { icon: 'user', label: t('settings.account.profile'), action: 'profile' },
        { icon: 'envelope', label: t('settings.account.email'), action: 'email' },
        { icon: 'lock', label: t('settings.account.password'), action: 'password' },
        { icon: 'phone', label: t('settings.account.phone'), action: 'phone' },
      ]
    },
    {
      title: t('settings.preferences.title'),
      items: [
        { icon: 'bell', label: t('settings.preferences.notifications'), action: 'notifications' },
        { icon: 'globe', label: t('settings.preferences.language'), action: 'language' },
        { icon: 'eye', label: t('settings.preferences.privacy'), action: 'privacy' },
      ]
    },
    {
      title: t('settings.business.title'),
      items: [
        { icon: 'building', label: t('settings.business.farmInfo'), action: 'farm' },
        { icon: 'credit-card', label: t('settings.business.payment'), action: 'payment' },
        { icon: 'truck', label: t('settings.business.shipping'), action: 'shipping' },
      ]
    },
    {
      title: t('settings.support.title'),
      items: [
        { icon: 'question-circle', label: t('settings.support.help'), action: 'help' },
        { icon: 'shield', label: t('settings.support.terms'), action: 'terms' },
        { icon: 'info-circle', label: t('settings.support.about'), action: 'about' },
      ]
    }
  ];

  const handleSettingPress = (action: string) => {
    console.log(`Settings action pressed: ${action}`);
    // TODO: Navigate to specific setting page
  };

  return (
    <View style={styles.container}>
      <Navbar isLargeScreen={isLargeScreen} activeTab="settings" />
      
      <ScrollView 
        style={[styles.scrollView, { paddingTop: insets.top }]}
        contentContainerStyle={[styles.content, isLargeScreen && styles.contentLarge]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, isLargeScreen && styles.titleLarge]}>
            {t('settings.title')}
          </Text>
          <Text style={[styles.subtitle, isLargeScreen && styles.subtitleLarge]}>
            {t('settings.subtitle')}
          </Text>
        </View>

        {/* Settings Sections */}
        {settings.map((section, sectionIndex) => (
          <View key={sectionIndex} style={[styles.section, isLargeScreen && styles.sectionLarge]}>
            <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
              {section.title}
            </Text>
            
            <View style={styles.settingsGrid}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.settingItem}
                  onPress={() => handleSettingPress(item.action)}
                >
                  <View style={styles.settingIconContainer}>
                    <FontAwesome name={item.icon as any} size={20} color="#15803d" />
                  </View>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <FontAwesome name="chevron-right" size={12} color="#9ca3af" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Danger Zone */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge, styles.dangerSection]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge, styles.dangerTitle]}>
            {t('settings.danger.title')}
          </Text>
          
          <TouchableOpacity
            style={[styles.settingItem, styles.dangerItem]}
            onPress={() => handleSettingPress('delete')}
          >
            <View style={styles.settingIconContainer}>
              <FontAwesome name="trash" size={20} color="#ef4444" />
            </View>
            <Text style={[styles.settingLabel, styles.dangerLabel]}>{t('settings.danger.deleteAccount')}</Text>
            <FontAwesome name="chevron-right" size={12} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  contentLarge: {
    paddingHorizontal: 40,
    paddingVertical: 32,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  titleLarge: {
    fontSize: 36,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  subtitleLarge: {
    fontSize: 18,
    textAlign: 'left',
  },
  section: {
    marginBottom: 24,
  },
  sectionLarge: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  sectionTitleLarge: {
    fontSize: 20,
  },
  settingsGrid: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  dangerSection: {
    marginTop: 16,
  },
  dangerTitle: {
    color: '#ef4444',
  },
  dangerItem: {
    backgroundColor: '#fef2f2',
  },
  dangerLabel: {
    color: '#ef4444',
  },
});
