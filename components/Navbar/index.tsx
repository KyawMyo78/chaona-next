import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LanguageSelector from '@/components/LanguageSelector';

interface NavbarProps {
  isLargeScreen: boolean;
  activeTab?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLargeScreen, activeTab = 'home' }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
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
                  <Text style={[
                    styles.navLinkText, 
                    activeTab === 'home' && styles.navLinkActive
                  ]}>
                    {t('navigation.home')}
                  </Text>
                </TouchableOpacity>
              </Link>
              <Link href="./submit-waste" asChild>
                <TouchableOpacity style={styles.navLink}>
                  <Text style={[
                    styles.navLinkText, 
                    activeTab === 'submit-waste' && styles.navLinkActive
                  ]}>
                    {t('navigation.submitWaste')}
                  </Text>
                </TouchableOpacity>
              </Link>
              <Link href="./marketplace" asChild>
                <TouchableOpacity style={styles.navLink}>
                  <Text style={[
                    styles.navLinkText, 
                    activeTab === 'marketplace' && styles.navLinkActive
                  ]}>
                    {t('navigation.marketplace')}
                  </Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity style={styles.navLink}>
                <Text style={[
                  styles.navLinkText, 
                  activeTab === 'dashboard' && styles.navLinkActive
                ]}>
                  {t('navigation.dashboard')}
                </Text>
              </TouchableOpacity>
              
              <LanguageSelector isMobile={false} />
              
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>{t('navigation.login')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Mobile Navigation - Fixed hamburger button */
            <TouchableOpacity 
              style={styles.mobileMenuButton}
              onPress={() => {
                console.log('Hamburger pressed, current state:', isMobileMenuOpen);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <FontAwesome name="bars" size={20} color="#15803d" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Mobile Menu Dropdown */}
      {!isLargeScreen && isMobileMenuOpen && (
        <View style={styles.mobileMenu}>
          <Link href="./" asChild>
            <TouchableOpacity 
              style={styles.mobileMenuItem}
              onPress={() => setIsMobileMenuOpen(false)}
            >
              <Text style={[
                styles.mobileMenuText, 
                activeTab === 'home' && styles.mobileMenuActive
              ]}>
                {t('navigation.home')}
              </Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="./submit-waste" asChild>
            <TouchableOpacity 
              style={styles.mobileMenuItem}
              onPress={() => setIsMobileMenuOpen(false)}
            >
              <Text style={[
                styles.mobileMenuText, 
                activeTab === 'submit-waste' && styles.mobileMenuActive
              ]}>
                {t('navigation.submitWaste')}
              </Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="./marketplace" asChild>
            <TouchableOpacity 
              style={styles.mobileMenuItem}
              onPress={() => setIsMobileMenuOpen(false)}
            >
              <Text style={[
                styles.mobileMenuText, 
                activeTab === 'marketplace' && styles.mobileMenuActive
              ]}>
                {t('navigation.marketplace')}
              </Text>
            </TouchableOpacity>
          </Link>
          
          <TouchableOpacity 
            style={styles.mobileMenuItem}
            onPress={() => setIsMobileMenuOpen(false)}
          >
            <Text style={[
              styles.mobileMenuText, 
              activeTab === 'dashboard' && styles.mobileMenuActive
            ]}>
              {t('navigation.dashboard')}
            </Text>
          </TouchableOpacity>
          
          {/* Language Selector in Mobile Menu */}
          <View style={styles.mobileLangContainer}>
            <LanguageSelector isMobile={true} onLanguageChange={() => setIsMobileMenuOpen(false)} />
          </View>
          
          <TouchableOpacity 
            style={[styles.mobileMenuItem, styles.mobileLoginButton]}
            onPress={() => setIsMobileMenuOpen(false)}
          >
            <Text style={styles.mobileLoginText}>{t('navigation.login')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(21, 128, 61, 0.1)',
    ...(Platform.OS === 'web' ? {
      position: 'sticky' as any,
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
    } : {}),
  },
  navbarLarge: {
    paddingHorizontal: 40,
    paddingVertical: 16,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  navLogo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#15803d',
    letterSpacing: -0.5,
  },
  navLogoLarge: {
    fontSize: 24,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  navLink: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  navLinkActive: {
    color: '#15803d',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#15803d',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Mobile Menu Styles - Fixed for proper display and interaction
  mobileMenuButton: {
    padding: 12,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -8, // Prevent overflow
  },
  mobileMenu: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(21, 128, 61, 0.1)',
    paddingVertical: 8,
    ...(Platform.OS === 'web' ? {
      position: 'sticky' as any,
      top: 0,
      zIndex: 999,
    } : {}),
  },
  mobileMenuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  mobileMenuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  mobileMenuActive: {
    color: '#15803d',
    fontWeight: '600',
  },
  mobileLangContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(21, 128, 61, 0.1)',
    marginVertical: 8,
  },
  mobileLoginButton: {
    backgroundColor: '#15803d',
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  mobileLoginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Navbar;
