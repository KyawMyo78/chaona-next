import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Notification {
  id: string;
  type: 'price_alert' | 'new_opportunity' | 'system_update' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  iconColor: string;
}

interface NotificationBellProps {
  isLargeScreen: boolean;
  isFullPage?: boolean;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ isLargeScreen, isFullPage = false }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock notification data - in real app, this would come from state/API
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'price_alert',
      title: t('notifications.types.priceAlert'),
      message: t('notifications.messages.riceHuskPrice'),
      time: '2 hours ago',
      read: false,
      icon: 'dollar',
      iconColor: '#15803d'
    },
    {
      id: '2',
      type: 'new_opportunity',
      title: t('notifications.types.newOpportunity'),
      message: t('notifications.messages.newBuyer'),
      time: '5 hours ago',
      read: false,
      icon: 'lightbulb-o',
      iconColor: '#f59e0b'
    },
    {
      id: '3',
      type: 'system_update',
      title: t('notifications.types.systemUpdate'),
      message: t('notifications.messages.systemMaintenance'),
      time: '1 day ago',
      read: true,
      icon: 'cog',
      iconColor: '#6b7280'
    },
    {
      id: '4',
      type: 'reminder',
      title: t('notifications.types.reminder'),
      message: t('notifications.messages.wastePickup'),
      time: '2 days ago',
      read: true,
      icon: 'bell',
      iconColor: '#3b82f6'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationPress = (notificationId: string) => {
    // In real app, mark notification as read
    console.log('Notification pressed:', notificationId);
  };

  const handleMarkAllRead = () => {
    // In real app, mark all notifications as read
    console.log('Mark all as read');
  };

  const renderNotificationsContent = () => (
    <View style={[styles.modalContainer, isFullPage && styles.fullPageContainer]}>
      {/* Header */}
      {!isFullPage && (
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            {t('notifications.title')}
          </Text>
          <View style={styles.headerActions}>
            {unreadCount > 0 && (
              <TouchableOpacity
                style={styles.markAllButton}
                onPress={handleMarkAllRead}
              >
                <Text style={styles.markAllText}>
                  {t('notifications.markAllRead')}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <FontAwesome name="times" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isFullPage && (
        <View style={[styles.fullPageHeader, isLargeScreen && styles.fullPageHeaderLarge]}>
          <Text style={[styles.fullPageTitle, isLargeScreen && styles.fullPageTitleLarge]}>
            {t('notifications.title')}
          </Text>
          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.markAllButton}
              onPress={handleMarkAllRead}
            >
              <Text style={styles.markAllText}>
                {t('notifications.markAllRead')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Notifications List */}
      <ScrollView style={[styles.notificationsList, isFullPage && styles.fullPageList]}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome name="bell-slash" size={48} color="#d1d5db" />
            <Text style={styles.emptyTitle}>
              {t('notifications.empty.title')}
            </Text>
            <Text style={styles.emptyMessage}>
              {t('notifications.empty.message')}
            </Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                !notification.read && styles.notificationItemUnread,
                isFullPage && isLargeScreen && styles.notificationItemLarge
              ]}
              onPress={() => handleNotificationPress(notification.id)}
            >
              <View style={styles.notificationIcon}>
                <FontAwesome
                  name={notification.icon as any}
                  size={20}
                  color={notification.iconColor}
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>
              {!notification.read && (
                <View style={styles.unreadDot} />
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );

  if (isFullPage) {
    return renderNotificationsContent();
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.bellContainer, isLargeScreen && styles.bellContainerLarge]}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <FontAwesome name="bell" size={isLargeScreen ? 20 : 18} color="#15803d" />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {unreadCount > 9 ? '9+' : unreadCount.toString()}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'fullScreen'}
        onRequestClose={() => setIsModalVisible(false)}
      >
        {renderNotificationsContent()}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bellContainer: {
    position: 'relative',
    padding: 8,
    marginHorizontal: 4,
  },
  bellContainerLarge: {
    marginHorizontal: 8,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: 'white',
    ...(Platform.OS === 'ios' && {
      paddingTop: 20,
    }),
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    marginLeft: 12,
  },
  markAllText: {
    fontSize: 14,
    color: '#15803d',
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
  },
  notificationsList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: 'white',
  },
  notificationItemUnread: {
    backgroundColor: '#f8fafc',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginTop: 8,
    marginLeft: 8,
  },
  // Full page styles
  fullPageContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  fullPageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  fullPageHeaderLarge: {
    paddingHorizontal: 40,
    paddingVertical: 24,
  },
  fullPageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  fullPageTitleLarge: {
    fontSize: 28,
  },
  fullPageList: {
    backgroundColor: '#f8fafc',
  },
  notificationItemLarge: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
});

export default NotificationBell;
