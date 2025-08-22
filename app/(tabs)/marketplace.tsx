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
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
            <Link href="./submit-waste" asChild>
              <TouchableOpacity style={styles.navLink}>
                <Text style={styles.navLinkText}>{t('navigation.submitWaste')}</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.navLink}>
              <Text style={[styles.navLinkText, styles.navLinkActive]}>{t('navigation.marketplace')}</Text>
            </TouchableOpacity>
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

// Product Card Component
const ProductCard = ({ product, isLargeScreen }: any) => {
  const { t } = useTranslation();
  
  return (
    <View style={[styles.productCard, isLargeScreen && styles.productCardLarge]}>
      <View style={styles.productImageContainer}>
        <View style={styles.productImagePlaceholder}>
          <FontAwesome name="leaf" size={40} color="#15803d" />
        </View>
        <View style={styles.productBadge}>
          <Text style={styles.productBadgeText}>{product.category}</Text>
        </View>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        
        <View style={styles.productMeta}>
          <View style={styles.productMetaItem}>
            <FontAwesome name="map-marker" size={14} color="#6b7280" />
            <Text style={styles.productMetaText}>{product.location}</Text>
          </View>
          <View style={styles.productMetaItem}>
            <FontAwesome name="clock-o" size={14} color="#6b7280" />
            <Text style={styles.productMetaText}>{product.timeAgo}</Text>
          </View>
        </View>
        
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>{product.price}</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>{t('marketplace.contact')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function MarketplacePage() {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isLargeScreen = width >= 768;

  const categories = [
    { key: 'all', label: t('marketplace.categories.all') },
    { key: 'crop_residue', label: t('marketplace.categories.cropResidue') },
    { key: 'organic', label: t('marketplace.categories.organic') },
    { key: 'packaging', label: t('marketplace.categories.packaging') },
    { key: 'processed', label: t('marketplace.categories.processed') },
  ];

  // Mock data for marketplace items
  const marketplaceItems = [
    {
      id: 1,
      title: t('marketplace.items.riceHusk.title'),
      description: t('marketplace.items.riceHusk.description'),
      price: t('marketplace.items.riceHusk.price'),
      location: 'Bangkok, Thailand',
      timeAgo: '2 hours ago',
      category: t('marketplace.categories.cropResidue'),
    },
    {
      id: 2,
      title: t('marketplace.items.compost.title'),
      description: t('marketplace.items.compost.description'),
      price: t('marketplace.items.compost.price'),
      location: 'Chiang Mai, Thailand',
      timeAgo: '5 hours ago',
      category: t('marketplace.categories.organic'),
    },
    {
      id: 3,
      title: t('marketplace.items.cornStalks.title'),
      description: t('marketplace.items.cornStalks.description'),
      price: t('marketplace.items.cornStalks.price'),
      location: 'Nakhon Ratchasima, Thailand',
      timeAgo: '1 day ago',
      category: t('marketplace.categories.cropResidue'),
    },
    {
      id: 4,
      title: t('marketplace.items.biochar.title'),
      description: t('marketplace.items.biochar.description'),
      price: t('marketplace.items.biochar.price'),
      location: 'Khon Kaen, Thailand',
      timeAgo: '2 days ago',
      category: t('marketplace.categories.processed'),
    },
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === categories.find(c => c.key === selectedCategory)?.label;
    return matchesSearch && matchesCategory;
  });

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
            <Link href="./submit-waste" asChild>
              <TouchableOpacity 
                style={styles.mobileMenuItem}
                onPress={() => setIsMobileMenuOpen(false)}
              >
                <Text style={styles.mobileMenuText}>{t('navigation.submitWaste')}</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity 
              style={styles.mobileMenuItem}
              onPress={() => setIsMobileMenuOpen(false)}
            >
              <Text style={[styles.mobileMenuText, styles.mobileMenuActive]}>{t('navigation.marketplace')}</Text>
            </TouchableOpacity>
            
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
            {t('marketplace.title')}
          </Text>
          <Text style={[styles.pageSubtitle, isLargeScreen && styles.pageSubtitleLarge]}>
            {t('marketplace.subtitle')}
          </Text>
        </View>

        {/* Search and Filter Section */}
        <View style={[styles.filterSection, isLargeScreen && styles.filterSectionLarge]}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={t('marketplace.searchPlaceholder')}
            />
          </View>

          {/* Category Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScrollView}
            contentContainerStyle={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.key && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category.key && styles.categoryButtonTextSelected
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={[styles.productsSection, isLargeScreen && styles.productsSectionLarge]}>
          <View style={styles.productsGrid}>
            {filteredItems.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isLargeScreen={isLargeScreen}
              />
            ))}
          </View>

          {filteredItems.length === 0 && (
            <View style={styles.emptyState}>
              <FontAwesome name="search" size={64} color="#d1d5db" />
              <Text style={styles.emptyStateText}>{t('marketplace.noResults')}</Text>
              <Text style={styles.emptyStateSubtext}>{t('marketplace.tryDifferentSearch')}</Text>
            </View>
          )}
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
  
  // Filter section
  filterSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  filterSectionLarge: {
    paddingHorizontal: 80,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  categoryScrollView: {
    marginHorizontal: -24,
  },
  categoryContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryButton: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  categoryButtonSelected: {
    backgroundColor: '#f0fdf4',
    borderColor: '#15803d',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryButtonTextSelected: {
    color: '#15803d',
    fontWeight: '600',
  },
  
  // Products section
  productsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  productsSectionLarge: {
    paddingHorizontal: 80,
  },
  productsGrid: {
    gap: 16,
  },
  
  // Product card
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#f3f4f6',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    } : {
      elevation: 3,
    }),
  },
  productCardLarge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  productImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#15803d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  productBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  productMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  productMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  productMetaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#15803d',
  },
  contactButton: {
    backgroundColor: '#15803d',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
  },
});
