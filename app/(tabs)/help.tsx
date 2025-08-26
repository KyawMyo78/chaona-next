import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Navbar from '@/components/Navbar';

export default function HelpScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const helpCategories = [
    {
      title: t('help.quickActions.title'),
      items: [
        { icon: 'phone', label: t('help.quickActions.contact'), action: 'contact', color: '#15803d' },
        { icon: 'envelope', label: t('help.quickActions.email'), action: 'email', color: '#3b82f6' },
        { icon: 'comment', label: t('help.quickActions.chat'), action: 'chat', color: '#8b5cf6' },
        { icon: 'book', label: t('help.quickActions.guides'), action: 'guides', color: '#f59e0b' },
      ]
    }
  ];

  const faqItems = [
    {
      question: t('help.faq.items.gettingStarted.question'),
      answer: t('help.faq.items.gettingStarted.answer')
    },
    {
      question: t('help.faq.items.submitWaste.question'),
      answer: t('help.faq.items.submitWaste.answer')
    },
    {
      question: t('help.faq.items.pricing.question'),
      answer: t('help.faq.items.pricing.answer')
    },
    {
      question: t('help.faq.items.payment.question'),
      answer: t('help.faq.items.payment.answer')
    },
    {
      question: t('help.faq.items.quality.question'),
      answer: t('help.faq.items.quality.answer')
    },
    {
      question: t('help.faq.items.support.question'),
      answer: t('help.faq.items.support.answer')
    }
  ];

  const handleHelpAction = (action: string) => {
    console.log(`Help action pressed: ${action}`);
    // TODO: Implement help actions (contact, email, chat, guides)
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Navbar isLargeScreen={isLargeScreen} activeTab="help" />
      
      <ScrollView 
        style={[styles.scrollView, { paddingTop: insets.top }]}
        contentContainerStyle={[styles.content, isLargeScreen && styles.contentLarge]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, isLargeScreen && styles.titleLarge]}>
            {t('help.title')}
          </Text>
          <Text style={[styles.subtitle, isLargeScreen && styles.subtitleLarge]}>
            {t('help.subtitle')}
          </Text>
        </View>

        {/* Quick Actions */}
        {helpCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={[styles.section, isLargeScreen && styles.sectionLarge]}>
            <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
              {category.title}
            </Text>
            
            <View style={[styles.actionsGrid, isLargeScreen && styles.actionsGridLarge]}>
              {category.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.actionCard}
                  onPress={() => handleHelpAction(item.action)}
                >
                  <View style={[styles.actionIcon, { backgroundColor: `${item.color}20` }]}>
                    <FontAwesome name={item.icon as any} size={24} color={item.color} />
                  </View>
                  <Text style={styles.actionLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* FAQ Section */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            {t('help.faq.title')}
          </Text>
          
          <View style={styles.faqContainer}>
            {faqItems.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFaq(index)}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <FontAwesome 
                    name={expandedFaq === index ? "chevron-up" : "chevron-down"} 
                    size={12} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
                
                {expandedFaq === index && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View style={[styles.section, isLargeScreen && styles.sectionLarge, styles.contactSection]}>
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            {t('help.contact.title')}
          </Text>
          
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <FontAwesome name="envelope" size={16} color="#15803d" />
              <Text style={styles.contactText}>support@chaona.com</Text>
            </View>
            <View style={styles.contactItem}>
              <FontAwesome name="phone" size={16} color="#15803d" />
              <Text style={styles.contactText}>+66 (0) 2-123-4567</Text>
            </View>
            <View style={styles.contactItem}>
              <FontAwesome name="clock-o" size={16} color="#15803d" />
              <Text style={styles.contactText}>{t('help.contact.hours')}</Text>
            </View>
          </View>
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionsGridLarge: {
    gap: 16,
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    minWidth: 140,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  faqContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#f9fafb',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  contactSection: {
    marginTop: 16,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    fontWeight: '500',
  },
});
