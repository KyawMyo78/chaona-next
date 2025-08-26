import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Page content styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0, // Removed excessive top padding since we now use shared navbar
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
