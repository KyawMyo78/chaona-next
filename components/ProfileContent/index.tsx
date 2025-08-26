import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Navbar from '@/components/Navbar';
import { styles } from '@/styles/profileStyles';

export default function ProfileContent() {
  const { t, i18n } = useTranslation();
  const { width: screenWidth } = useWindowDimensions();
  const isLargeScreen = screenWidth >= 768;
  // Responsive font size for user name
  const nameFontSize = isLargeScreen ? 36 : screenWidth < 400 ? 20 : 28;

  return (
    <View style={styles.screenContainer}>
      <Navbar isLargeScreen={isLargeScreen} activeTab="profile" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Management Section */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            {t('profile.information.title')}
          </Text>
          <View style={styles.impactCard}>
            <FontAwesome name="user-circle" size={64} color="#15803d" style={styles.impactIcon} />
            <Text style={[styles.impactNumber, { fontSize: nameFontSize, textAlign: 'center' }]}>
              {t('profile.information.name')}
            </Text>
            <Text style={styles.impactLabel}>{t('profile.information.membershipLevel')}</Text>
            <Text style={styles.impactDescription}>{t('profile.information.memberSince')}</Text>
          </View>
        </View>

        {/* Personal Analytics */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge, styles.sectionAlt]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            {t('profile.activity.title')}
          </Text>
          <View style={[styles.statsGrid, isLargeScreen && styles.statsGridLarge]}>
            <TouchableOpacity style={styles.statCard}>
              <FontAwesome name="upload" size={24} color="#15803d" />
              <Text style={styles.statNumber}>{t('profile.activity.wasteSubmissions.number')}</Text>
              <Text style={styles.statLabel}>{t('profile.activity.wasteSubmissions.label')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard}>
              <FontAwesome name="shopping-cart" size={24} color="#15803d" />
              <Text style={styles.statNumber}>{t('profile.activity.purchases.number')}</Text>
              <Text style={styles.statLabel}>{t('profile.activity.purchases.label')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard}>
              <FontAwesome name="dollar" size={24} color="#15803d" />
              <Text style={styles.statNumber}>{t('profile.activity.earnings.number')}</Text>
              <Text style={styles.statLabel}>{t('profile.activity.earnings.label')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard}>
              <FontAwesome name="star" size={24} color="#15803d" />
              <Text style={styles.statNumber}>{t('profile.activity.rating.number')}</Text>
              <Text style={styles.statLabel}>{t('profile.activity.rating.label')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User's Environmental Impact Section */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            {t('profile.impact.title')}
          </Text>
          <View style={[styles.impactGrid, isLargeScreen && styles.impactGridLarge]}>
            <View style={styles.impactCard}>
              <FontAwesome name="leaf" size={32} color="#15803d" style={styles.impactIcon} />
              <Text style={styles.impactNumber}>{t('profile.impact.co2Prevented.number')}</Text>
              <Text style={styles.impactLabel}>{t('profile.impact.co2Prevented.label')}</Text>
              <Text style={styles.impactDescription}>{t('profile.impact.co2Prevented.description')}</Text>
            </View>
            <View style={styles.impactCard}>
              <FontAwesome name="recycle" size={32} color="#15803d" style={styles.impactIcon} />
              <Text style={styles.impactNumber}>{t('profile.impact.wasteRecycled.number')}</Text>
              <Text style={styles.impactLabel}>{t('profile.impact.wasteRecycled.label')}</Text>
              <Text style={styles.impactDescription}>{t('profile.impact.wasteRecycled.description')}</Text>
            </View>
            <View style={styles.impactCard}>
              <FontAwesome name="tree" size={32} color="#15803d" style={styles.impactIcon} />
              <Text style={styles.impactNumber}>{t('profile.impact.treesEquivalent.number')}</Text>
              <Text style={styles.impactLabel}>{t('profile.impact.treesEquivalent.label')}</Text>
              <Text style={styles.impactDescription}>{t('profile.impact.treesEquivalent.description')}</Text>
            </View>
          </View>
        </View>

        {/* Financial Dashboard Section */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge, styles.sectionAlt]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            {t('profile.financial.title')}
          </Text>
          <View style={[styles.statsGrid, isLargeScreen && styles.statsGridLarge]}>
            <View style={styles.statCard}>
              <FontAwesome name="money" size={24} color="#15803d" />
              <Text style={styles.statNumber}>{t('profile.financial.totalEarnings.number')}</Text>
              <Text style={styles.statLabel}>{t('profile.financial.totalEarnings.label')}</Text>
              <Text style={styles.impactDescription}>{t('profile.financial.totalEarnings.description')}</Text>
            </View>
            <View style={styles.statCard}>
              <FontAwesome name="clock-o" size={24} color="#15803d" />
              <Text style={styles.statNumber}>{t('profile.financial.pendingPayments.number')}</Text>
              <Text style={styles.statLabel}>{t('profile.financial.pendingPayments.label')}</Text>
              <Text style={styles.impactDescription}>{t('profile.financial.pendingPayments.description')}</Text>
            </View>
            <View style={styles.statCard}>
              <FontAwesome name="leaf" size={24} color="#15803d" />
              <Text style={styles.statNumber}>{t('profile.financial.costSavings.number')}</Text>
              <Text style={styles.statLabel}>{t('profile.financial.costSavings.label')}</Text>
              <Text style={styles.impactDescription}>{t('profile.financial.costSavings.description')}</Text>
            </View>
            <View style={styles.statCard}>
              <FontAwesome name="calendar" size={24} color="#15803d" />
              <Text style={styles.statNumber}>{t('profile.financial.monthlyAverage.number')}</Text>
              <Text style={styles.statLabel}>{t('profile.financial.monthlyAverage.label')}</Text>
              <Text style={styles.impactDescription}>{t('profile.financial.monthlyAverage.description')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
