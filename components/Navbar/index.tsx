import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Pressable, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LanguageSelector from '@/components/LanguageSelector';
import NotificationBell from '@/components/NotificationBell';
import NavbarAIButton from '@/components/NavbarAIButton';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  isLargeScreen: boolean;
  activeTab?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLargeScreen, activeTab = 'home' }) => {
  const { t } = useTranslation();
  const { isLoggedIn, toggleLogin } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine the text for profile/dashboard tab
  const profileTabText = isLoggedIn ? t('navigation.profile') : t('navigation.dashboard');

  return (
    <>
      <View style={[styles.navbar, isLargeScreen && styles.navbarLarge]}>
        <View style={styles.navContainer}>
          {/* Logo */}
          <TouchableOpacity onPress={() => router.push('./')}>
            <Text style={[styles.navLogo, isLargeScreen && styles.navLogoLarge]}>
              ChaonaNext
            </Text>
          </TouchableOpacity>

          {isLargeScreen ? (
            /* Desktop Navigation */
            <View style={styles.navLinks}>
              <Link href="./" asChild>
                <TouchableOpacity style={styles.navLink}>
                  <Text style={[styles.navLinkText, activeTab === 'home' && styles.navLinkActive]}>
                    {t('navigation.home')}
                  </Text>
                </TouchableOpacity>
              </Link>
              <Link href="./submit-waste" asChild>
                <TouchableOpacity style={styles.navLink}>
                  <Text style={[styles.navLinkText, activeTab === 'submit-waste' && styles.navLinkActive]}>
                    {t('navigation.submitWaste')}
                  </Text>
                </TouchableOpacity>
              </Link>
              <Link href="./marketplace" asChild>
                <TouchableOpacity style={styles.navLink}>
                  <Text style={[styles.navLinkText, activeTab === 'marketplace' && styles.navLinkActive]}>
                    {t('navigation.marketplace')}
                  </Text>
                </TouchableOpacity>
              </Link>
              <Link href="./profile" asChild>
                <TouchableOpacity style={styles.navLink}>
                  <Text style={[styles.navLinkText, activeTab === 'profile' && styles.navLinkActive]}>
                    {profileTabText}
                  </Text>
                </TouchableOpacity>
              </Link>
              <LanguageSelector isMobile={false} />
              {isLoggedIn && (
                <NotificationBell isLargeScreen={true} />
              )}
              <NavbarAIButton />
              {isLoggedIn ? (
                <>
                  <TouchableOpacity
                    style={styles.mobileMenuButton}
                    onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <FontAwesome name="bars" size={20} color="#15803d" />
                  </TouchableOpacity>
                  {isMobileMenuOpen && (
                    <View style={[styles.userDropdown, { right: 0, top: 48, position: 'absolute' }]}> 
                      <TouchableOpacity style={[styles.userMenuItem, styles.userMenuItemTop]} onPress={() => { setIsMobileMenuOpen(false); router.push('/(tabs)/settings'); }}>
                        <FontAwesome name="cog" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
                        <Text style={styles.userMenuText}>{t('navigation.settings')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.userMenuItem} onPress={() => { setIsMobileMenuOpen(false); router.push('/(tabs)/help'); }}>
                        <FontAwesome name="question-circle" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
                        <Text style={styles.userMenuText}>{t('navigation.help')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.userMenuItem, styles.userMenuItemBottom]} onPress={() => { setIsMobileMenuOpen(false); toggleLogin(); }}>
                        <FontAwesome name="sign-out" size={16} color="#ef4444" style={styles.mobileMenuIcon} />
                        <Text style={[styles.userMenuText, styles.userMenuLogoutText]}>{t('navigation.logout')}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              ) : (
                <TouchableOpacity style={styles.loginButton} onPress={() => {
                  router.push('/(tabs)/login');
                }}>
                  <Text style={styles.loginButtonText}>
                    {t('navigation.login')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            /* Mobile Navigation - Fixed hamburger button */
            <View style={styles.mobileNavButtons}>
              <NavbarAIButton />
              <TouchableOpacity 
                style={styles.mobileMenuButton}
                onPress={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <FontAwesome name="bars" size={20} color="#15803d" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Mobile Menu Dropdown */}
      {!isLargeScreen && isMobileMenuOpen && (
          <View style={{ flex: 1, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
            <View style={{ flex: 1, paddingBottom: 80 }}>
              <ScrollView contentContainerStyle={styles.mobileMenu}>
          {/* Profile Header for logged in users */}
          {isLoggedIn && (
            <>
              <View style={styles.mobileUserProfile}>
                <View style={styles.mobileUserAvatar}>
                  <FontAwesome name="user" size={20} color="#15803d" />
                </View>
                <View style={styles.mobileUserInfo}>
                  <Text style={styles.mobileUserName}>John Farmer</Text>
                  <Text style={styles.mobileUserEmail}>john.farmer@example.com</Text>
                </View>
              </View>
              
              <View style={styles.mobileMenuDivider} />
            </>
          )}
          
              {isLoggedIn ? (
                <Link href="./dashboard" asChild>
                  <TouchableOpacity 
                    style={styles.mobileMenuItem}
                    onPress={() => setIsMobileMenuOpen(false)}
                  >
                      <FontAwesome name="dashboard" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
                    <Text style={[ 
                      styles.mobileMenuText, 
                      activeTab === 'dashboard' && styles.mobileMenuActive
                    ]}>
                      {t('navigation.dashboard')}
                    </Text>
                  </TouchableOpacity>
                </Link>
              ) : (
                <Link href="./" asChild>
                  <TouchableOpacity 
                    style={styles.mobileMenuItem}
                    onPress={() => setIsMobileMenuOpen(false)}
                  >
                      <FontAwesome name="home" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
                    <Text style={[ 
                      styles.mobileMenuText, 
                      activeTab === 'home' && styles.mobileMenuActive
                    ]}>
                      {t('navigation.home')}
                    </Text>
                  </TouchableOpacity>
                </Link>
              )}
          
          <Link href="./submit-waste" asChild>
            <TouchableOpacity 
              style={styles.mobileMenuItem}
              onPress={() => setIsMobileMenuOpen(false)}
            >
              <FontAwesome name="upload" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
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
              <FontAwesome name="shopping-cart" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
              <Text style={[
                styles.mobileMenuText, 
                activeTab === 'marketplace' && styles.mobileMenuActive
              ]}>
                {t('navigation.marketplace')}
              </Text>
            </TouchableOpacity>
          </Link>
          
          {isLoggedIn ? (
            <Link href="./profile" asChild>
              <TouchableOpacity 
                style={styles.mobileMenuItem}
                onPress={() => setIsMobileMenuOpen(false)}
              >
                <FontAwesome name="user" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
                <Text style={[
                  styles.mobileMenuText, 
                  activeTab === 'profile' && styles.mobileMenuActive
                ]}>
                  {profileTabText}
                </Text>
              </TouchableOpacity>
            </Link>
          ) : (
            <Link href="./dashboard" asChild>
              <TouchableOpacity 
                style={styles.mobileMenuItem}
                onPress={() => setIsMobileMenuOpen(false)}
              >
                <FontAwesome name="dashboard" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
                <Text style={[
                  styles.mobileMenuText, 
                  activeTab === 'dashboard' && styles.mobileMenuActive
                ]}>
                  {t('navigation.dashboard')}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
          
          {/* Additional options for logged in users */}
          {isLoggedIn && (
            <>
              <View style={styles.mobileMenuDivider} />
              
              <TouchableOpacity 
                style={styles.mobileMenuItem}
                onPress={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/(tabs)/settings');
                }}
              >
                <FontAwesome name="cog" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
                <Text style={styles.mobileMenuText}>{t('navigation.settings')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.mobileMenuItem}
                onPress={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/(tabs)/notifications');
                }}
              >
                <FontAwesome name="bell" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
                <Text style={styles.mobileMenuText}>{t('notifications.title')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.mobileMenuItem}
                onPress={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/(tabs)/help');
                }}
              >
                <FontAwesome name="question-circle" size={16} color="#6b7280" style={styles.mobileMenuIcon} />
                <Text style={styles.mobileMenuText}>{t('navigation.help')}</Text>
              </TouchableOpacity>
            </>
          )}
          
          <View style={styles.mobileMenuDivider} />
          
          {/* Language Selector in Mobile Menu */}
          <View style={styles.mobileLangContainer}>
            <LanguageSelector isMobile={true} onLanguageChange={() => setIsMobileMenuOpen(false)} />
          </View>
          
          <TouchableOpacity 
            style={[styles.mobileMenuItem, styles.mobileLoginButton]}
            onPress={() => {
              setIsMobileMenuOpen(false);
              if (!isLoggedIn) {
                router.push('/(tabs)/login');
              } else {
                toggleLogin();
              }
            }}
          >
            <FontAwesome 
              name={isLoggedIn ? "sign-out" : "sign-in"} 
              size={16} 
              color="white" 
              style={styles.mobileMenuIcon} 
            />
            <Text style={styles.mobileLoginText}>
              {isLoggedIn ? t('navigation.logout') : t('navigation.login')}
            </Text>
          </TouchableOpacity>
            </ScrollView>
          </View>
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
  },
  navLink: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 12,
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
    marginLeft: 16, // Add spacing between language selector and login button
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Mobile Menu Styles - Fixed for proper display and interaction
  mobileNavButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
    flexDirection: 'row',
    alignItems: 'center',
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
  mobileNotificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(21, 128, 61, 0.1)',
  },
  mobileNotificationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 12,
  },
  mobileLoginButton: {
    backgroundColor: '#15803d',
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  mobileLoginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  userMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#15803d',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  userMenuContainer: {
    position: 'relative',
  },
  userDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    borderRadius: 16,
    minWidth: 280,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    zIndex: 1000,
    marginTop: 8,
    overflow: 'hidden',
  },
  userMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#15803d',
    backgroundColor: '#f6fff4',
    marginVertical: 0,
    shadowColor: '#15803d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  userMenuItemTop: {
    borderTopWidth: 0,
  },
  userMenuItemBottom: {
    borderBottomWidth: 0,
  },
  userMenuText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
    fontWeight: '500',
  },
  userMenuDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  userMenuLangContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  userMenuLogout: {
    backgroundColor: '#fef2f2',
  },
  userMenuLogoutText: {
    color: '#ef4444',
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f9fafb',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: '#6b7280',
  },
  userMenuSection: {
    paddingVertical: 4,
  },
  userMenuLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  languageInMenu: {
    marginLeft: 'auto',
  },
  // Mobile user profile styles
  mobileUserProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f9fafb',
    marginBottom: 8,
  },
  mobileUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mobileUserInfo: {
    flex: 1,
  },
  mobileUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  mobileUserEmail: {
    fontSize: 12,
    color: '#6b7280',
  },
  mobileMenuDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
    marginHorizontal: 20,
  },
  mobileMenuIcon: {
    marginRight: 8,
    width: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default Navbar;
