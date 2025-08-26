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
import EnvironmentalCharts from '@/components/Charts/EnvironmentalCharts';
import { styles } from '@/styles/dashboardStyles';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardContent() {
  const { t } = useTranslation();
  const { width: screenWidth } = useWindowDimensions();
  const isLargeScreen = screenWidth >= 768;
  const { login } = useAuth();
  const router = require('expo-router').useRouter();

  return (
    <View style={styles.screenContainer}>
      <Navbar isLargeScreen={isLargeScreen} activeTab="profile" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dashboard Header */}
        <View style={[styles.headerSection, isLargeScreen && styles.headerSectionLarge]}>
          <Text style={[styles.pageTitle, isLargeScreen && styles.pageTitleLarge]}>
            {t('navigation.dashboard')}
          </Text>
        </View>

        {/* Platform Overview Section */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            {t('dashboard.overview.title')}
          </Text>
          <View style={[styles.statsGrid, isLargeScreen && styles.statsGridLarge]}>
            <View style={styles.statCard}>
              <FontAwesome name="database" size={32} color="#15803d" />
              <Text style={styles.statNumber}>{t('dashboard.overview.totalWaste.number')}</Text>
              <Text style={styles.statLabel}>{t('dashboard.overview.totalWaste.label')}</Text>
              <Text style={styles.statDescription}>{t('dashboard.overview.totalWaste.description')}</Text>
            </View>
            <View style={styles.statCard}>
              <FontAwesome name="exchange" size={32} color="#15803d" />
              <Text style={styles.statNumber}>{t('dashboard.overview.activeTransactions.number')}</Text>
              <Text style={styles.statLabel}>{t('dashboard.overview.activeTransactions.label')}</Text>
              <Text style={styles.statDescription}>{t('dashboard.overview.activeTransactions.description')}</Text>
            </View>
            <View style={styles.statCard}>
              <FontAwesome name="line-chart" size={32} color="#15803d" />
              <Text style={styles.statNumber}>{t('dashboard.overview.averagePrice.number')}</Text>
              <Text style={styles.statLabel}>{t('dashboard.overview.averagePrice.label')}</Text>
              <Text style={styles.statDescription}>{t('dashboard.overview.averagePrice.description')}</Text>
            </View>
            <View style={styles.statCard}>
              <FontAwesome name="thumbs-up" size={32} color="#15803d" />
              <Text style={styles.statNumber}>{t('dashboard.overview.satisfaction.number')}</Text>
              <Text style={styles.statLabel}>{t('dashboard.overview.satisfaction.label')}</Text>
              <Text style={styles.statDescription}>{t('dashboard.overview.satisfaction.description')}</Text>
            </View>
          </View>
        </View>

        {/* Environmental Impact Section */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            {t('dashboard.environmentalImpact.title')}
          </Text>
          <View style={[styles.impactGrid, isLargeScreen && styles.impactGridLarge]}>
            <View style={styles.impactCard}>
              <FontAwesome name="leaf" size={32} color="#15803d" style={styles.impactIcon} />
              <Text style={styles.impactNumber}>{t('dashboard.environmentalImpact.co2Saved.number')}</Text>
              <Text style={styles.impactLabel}>{t('dashboard.environmentalImpact.co2Saved.label')}</Text>
              <Text style={styles.impactDescription}>{t('dashboard.environmentalImpact.co2Saved.description')}</Text>
            </View>
            <View style={styles.impactCard}>
              <FontAwesome name="recycle" size={32} color="#15803d" style={styles.impactIcon} />
              <Text style={styles.impactNumber}>{t('dashboard.environmentalImpact.wasteProcessed.number')}</Text>
              <Text style={styles.impactLabel}>{t('dashboard.environmentalImpact.wasteProcessed.label')}</Text>
              <Text style={styles.impactDescription}>{t('dashboard.environmentalImpact.wasteProcessed.description')}</Text>
            </View>
            <View style={styles.impactCard}>
              <FontAwesome name="tree" size={32} color="#15803d" style={styles.impactIcon} />
              <Text style={styles.impactNumber}>{t('dashboard.environmentalImpact.farmersHelped.number')}</Text>
              <Text style={styles.impactLabel}>{t('dashboard.environmentalImpact.farmersHelped.label')}</Text>
              <Text style={styles.impactDescription}>{t('dashboard.environmentalImpact.farmersHelped.description')}</Text>
            </View>
          </View>
        </View>

        {/* Community Impact Section */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge, styles.sectionAlt]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            {t('dashboard.communityImpact.title')}
          </Text>
          <View style={[styles.statsGrid, isLargeScreen && styles.statsGridLarge]}>
            <View style={styles.statCard}>
              <FontAwesome name="handshake-o" size={32} color="#15803d" />
              <Text style={styles.statNumber}>{t('dashboard.communityImpact.transactions.number')}</Text>
              <Text style={styles.statLabel}>{t('dashboard.communityImpact.transactions.label')}</Text>
            </View>
            <View style={styles.statCard}>
              <FontAwesome name="building" size={32} color="#15803d" />
              <Text style={styles.statNumber}>{t('dashboard.communityImpact.organizations.number')}</Text>
              <Text style={styles.statLabel}>{t('dashboard.communityImpact.organizations.label')}</Text>
            </View>
            <View style={styles.statCard}>
              <FontAwesome name="map-marker" size={32} color="#15803d" />
              <Text style={styles.statNumber}>{t('dashboard.communityImpact.regions.number')}</Text>
              <Text style={styles.statLabel}>{t('dashboard.communityImpact.regions.label')}</Text>
            </View>
            <View style={styles.statCard}>
              <FontAwesome name="dollar" size={32} color="#15803d" />
              <Text style={styles.statNumber}>{t('dashboard.communityImpact.earnings.number')}</Text>
              <Text style={styles.statLabel}>{t('dashboard.communityImpact.earnings.label')}</Text>
            </View>
          </View>
        </View>

        {/* Environmental Charts Section */}
        <EnvironmentalCharts isLargeScreen={isLargeScreen} />

        {/* Quick Actions Section */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge, styles.sectionAlt]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            {t('dashboard.quickActions.title')}
          </Text>
          <View style={[styles.statsGrid, isLargeScreen && styles.statsGridLarge]}>
            <TouchableOpacity style={styles.statCard} onPress={() => router.push('/(tabs)/submit-waste')}>
              <FontAwesome name="plus-circle" size={32} color="#15803d" />
              <Text style={styles.statLabel}>{t('dashboard.quickActions.submitWaste')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard} onPress={() => router.push('/(tabs)/marketplace')}>
              <FontAwesome name="shopping-bag" size={32} color="#15803d" />
              <Text style={styles.statLabel}>{t('dashboard.quickActions.browseMarket')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard} onPress={() => router.push('/(tabs)/help')}>
              <FontAwesome name="support" size={32} color="#15803d" />
              <Text style={styles.statLabel}>{t('dashboard.quickActions.contactSupport')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Join CTA Section (only show if not logged in) */}
        {!login && (
          <View style={[styles.ctaSection, isLargeScreen && styles.ctaSectionLarge]}>
            <Text style={[styles.ctaTitle, isLargeScreen && styles.ctaTitleLarge]}>
              {t('dashboard.cta.title')}
            </Text>
            <Text style={[styles.ctaSubtitle, isLargeScreen && styles.ctaSubtitleLarge]}>
              {t('dashboard.cta.subtitle')}
            </Text>
            <TouchableOpacity 
              style={[styles.ctaButton, isLargeScreen && styles.ctaButtonLarge]}
              onPress={login}
            >
              <Text style={[styles.ctaButtonText, isLargeScreen && styles.ctaButtonTextLarge]}>
                {t('dashboard.cta.button')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
