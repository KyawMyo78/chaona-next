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
import LanguageSelector from '@/components/LanguageSelector';

// Navbar component for consistency
const Navbar = ({ isLargeScreen }: any) => {
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
            
            <LanguageSelector isMobile={false} />
            
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{t('navigation.login')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Mobile Navigation */
          <TouchableOpacity style={styles.menuButton}>
            <FontAwesome name="bars" size={24} color="#15803d" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Product Card Component
const ProductCard = ({ product, isLargeScreen, onPress }: any) => {
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity 
      style={[styles.productCard, isLargeScreen && styles.productCardLarge]}
      onPress={() => onPress(product)}
      activeOpacity={0.7}
    >
      <View style={styles.productImageContainer}>
        {product.image ? (
          <Image 
            source={{ uri: product.image }} 
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.productImagePlaceholder}>
            <FontAwesome name="leaf" size={40} color="#15803d" />
          </View>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <View style={styles.productBadge}>
            <Text style={styles.productBadgeText}>{product.category}</Text>
          </View>
        </View>
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
          <View style={styles.cardActions}>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={(e) => {
                e.stopPropagation();
                // Handle contact action
              }}
            >
              <Text style={styles.contactButtonText}>{t('marketplace.contact')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={(e) => {
                e.stopPropagation();
                // Handle buy action
              }}
            >
              <Text style={styles.buyButtonText}>{t('marketplace.buyNow')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function MarketplacePage() {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductDetailVisible, setIsProductDetailVisible] = useState(false);

  const isLargeScreen = width >= 768;

  const categories = [
    { key: 'all', label: t('marketplace.categories.all') },
    { key: 'crop_residue', label: t('marketplace.categories.cropResidue') },
    { key: 'organic', label: t('marketplace.categories.organic') },
    { key: 'packaging', label: t('marketplace.categories.packaging') },
    { key: 'processed', label: t('marketplace.categories.processed') },
  ];

  // Mock data for marketplace items with real images
  const marketplaceItems = [
    {
      id: 1,
      title: t('marketplace.items.riceHusk.title'),
      description: t('marketplace.items.riceHusk.description'),
      price: t('marketplace.items.riceHusk.price'),
      location: t('marketplace.locations.bangkok'),
      timeAgo: t('marketplace.timeAgo.hoursAgo', { count: 2 }),
      category: t('marketplace.categories.cropResidue'),
      image: 'https://www.thecooldown.com/wp-content/uploads/2024/05/A2kx8WoeZrWRrLvWvMLfKnXpdZiC5NH9dUH8MHSM41Q.jpeg?w=1920&h=800',
    },
    {
      id: 2,
      title: t('marketplace.items.compost.title'),
      description: t('marketplace.items.compost.description'),
      price: t('marketplace.items.compost.price'),
      location: t('marketplace.locations.chiangMai'),
      timeAgo: t('marketplace.timeAgo.hoursAgo', { count: 5 }),
      category: t('marketplace.categories.organic'),
      image: 'https://www.pennington.com/all-products/fertilizer/resources/-/media/Project/OneWeb/Pennington/Images/blog/fertilizer/What-is-Organic-Fertilizer/orgainc-soil.jpg',
    },
    {
      id: 3,
      title: t('marketplace.items.cornStalks.title'),
      description: t('marketplace.items.cornStalks.description'),
      price: t('marketplace.items.cornStalks.price'),
      location: t('marketplace.locations.nakhonRatchasima'),
      timeAgo: t('marketplace.timeAgo.daysAgo', { count: 1 }),
      category: t('marketplace.categories.cropResidue'),
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop&crop=center',
    },
    {
      id: 4,
      title: t('marketplace.items.biochar.title'),
      description: t('marketplace.items.biochar.description'),
      price: t('marketplace.items.biochar.price'),
      location: t('marketplace.locations.khonKaen'),
      timeAgo: t('marketplace.timeAgo.daysAgo', { count: 2 }),
      category: t('marketplace.categories.processed'),
      image: 'https://axismrkt.com/cdn/shop/files/Organic-biochar-soil.jpg?v=1739421664&width=823',
    },
    {
      id: 5,
      title: t('marketplace.items.coconutFiber.title'),
      description: t('marketplace.items.coconutFiber.description'),
      price: t('marketplace.items.coconutFiber.price'),
      location: t('marketplace.locations.suratThani'),
      timeAgo: t('marketplace.timeAgo.daysAgo', { count: 3 }),
      category: t('marketplace.categories.organic'),
      image: 'https://plus.unsplash.com/premium_photo-1664359132241-b0bf6cdd6c2e?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 6,
      title: t('marketplace.items.bananaLeaves.title'),
      description: t('marketplace.items.bananaLeaves.description'),
      price: t('marketplace.items.bananaLeaves.price'),
      location: t('marketplace.locations.krabi'),
      timeAgo: t('marketplace.timeAgo.daysAgo', { count: 4 }),
      category: t('marketplace.categories.packaging'),
      image: 'https://images.unsplash.com/photo-1551551313-fe7031e26248?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 7,
      title: t('marketplace.items.mushroomMedium.title'),
      description: t('marketplace.items.mushroomMedium.description'),
      price: t('marketplace.items.mushroomMedium.price'),
      location: t('marketplace.locations.lampang'),
      timeAgo: t('marketplace.timeAgo.daysAgo', { count: 5 }),
      category: t('marketplace.categories.processed'),
      image: 'https://spookymushrooms.wordpress.com/wp-content/uploads/2022/01/pxl_20210417_135707940.portrait.jpg',
    },
    {
      id: 8,
      title: t('marketplace.items.sugarCaneBagasse.title'),
      description: t('marketplace.items.sugarCaneBagasse.description'),
      price: t('marketplace.items.sugarCaneBagasse.price'),
      location: t('marketplace.locations.udonThani'),
      timeAgo: t('marketplace.timeAgo.weeksAgo', { count: 1 }),
      category: t('marketplace.categories.cropResidue'),
      image: 'https://renouvo.net/wp-content/uploads/2023/04/what-is-bagasse-new-cover-en.jpg',
    },
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === categories.find(c => c.key === selectedCategory)?.label;
    return matchesSearch && matchesCategory;
  });

  const handleProductPress = (product: any) => {
    setSelectedProduct(product);
    setIsProductDetailVisible(true);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Navbar */}
      <Navbar 
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
            
            <View style={styles.mobileMenuItem}>
              <LanguageSelector isMobile={true} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Product Detail Modal */}
      <Modal
        visible={isProductDetailVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsProductDetailVisible(false)}
      >
        <View style={styles.productDetailContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setIsProductDetailVisible(false)}
            >
              <FontAwesome name="times" size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{t('marketplace.productDetails')}</Text>
            <View style={{ width: 24 }} />
          </View>

          {selectedProduct && (
            <ScrollView style={styles.productDetailScroll}>
              {/* Product Image */}
              <View style={styles.detailImageContainer}>
                {selectedProduct.image ? (
                  <Image 
                    source={{ uri: selectedProduct.image }} 
                    style={styles.detailImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.detailImagePlaceholder}>
                    <FontAwesome name="leaf" size={80} color="#15803d" />
                  </View>
                )}
              </View>

              {/* Product Info */}
              <View style={styles.detailContent}>
                <View style={styles.detailHeader}>
                  <Text style={styles.detailTitle}>{selectedProduct.title}</Text>
                  <View style={styles.detailBadge}>
                    <Text style={styles.detailBadgeText}>{selectedProduct.category}</Text>
                  </View>
                </View>

                <Text style={styles.detailPrice}>{selectedProduct.price}</Text>
                
                <View style={styles.detailMeta}>
                  <View style={styles.detailMetaItem}>
                    <FontAwesome name="map-marker" size={16} color="#6b7280" />
                    <Text style={styles.detailMetaText}>{selectedProduct.location}</Text>
                  </View>
                  <View style={styles.detailMetaItem}>
                    <FontAwesome name="clock-o" size={16} color="#6b7280" />
                    <Text style={styles.detailMetaText}>{selectedProduct.timeAgo}</Text>
                  </View>
                </View>

                <Text style={styles.detailDescription}>{selectedProduct.description}</Text>

                {/* Additional Details */}
                <View style={styles.additionalDetails}>
                  <Text style={styles.sectionTitle}>{t('marketplace.productDetails')}</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{t('marketplace.condition')}:</Text>
                    <Text style={styles.detailValue}>Fresh/Organic</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{t('marketplace.quantityAvailable')}:</Text>
                    <Text style={styles.detailValue}>5-10 tons</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{t('marketplace.sellerRating')}:</Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.detailValue}>4.8</Text>
                      <FontAwesome name="star" size={16} color="#fbbf24" />
                    </View>
                  </View>
                </View>

                {/* Contact Information */}
                <View style={styles.sellerInfo}>
                  <Text style={styles.sectionTitle}>{t('marketplace.sellerInfo')}</Text>
                  <View style={styles.sellerCard}>
                    <FontAwesome name="user-circle" size={40} color="#15803d" />
                    <View style={styles.sellerDetails}>
                      <Text style={styles.sellerName}>Farm Cooperative Co.</Text>
                      <Text style={styles.sellerLocation}>{t('marketplace.verifiedSeller')} • {selectedProduct.location}</Text>
                    </View>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.messageButton}>
                    <FontAwesome name="comments" size={16} color="#ffffff" />
                    <Text style={styles.messageButtonText}>{t('marketplace.contactSeller')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buyNowButton}>
                    <FontAwesome name="shopping-cart" size={16} color="#ffffff" />
                    <Text style={styles.buyNowButtonText}>{t('marketplace.buyNow')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
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
                onPress={handleProductPress}
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
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
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
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  buyButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buyButtonText: {
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

  // Product Detail Modal Styles
  productDetailContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: '#ffffff',
    ...Platform.OS === 'ios' ? {
      paddingTop: 60,
    } : {},
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  productDetailScroll: {
    flex: 1,
  },
  detailImageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#f9fafb',
  },
  detailImage: {
    width: '100%',
    height: '100%',
  },
  detailImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    padding: 24,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
    marginRight: 12,
  },
  detailBadge: {
    backgroundColor: '#15803d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detailBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  detailPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#15803d',
    marginBottom: 16,
  },
  detailMeta: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
  },
  detailMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailMetaText: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 24,
  },
  additionalDetails: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sellerInfo: {
    marginBottom: 32,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    gap: 12,
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  sellerLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 32,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6b7280',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  messageButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15803d',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  buyNowButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
