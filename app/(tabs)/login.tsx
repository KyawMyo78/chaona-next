import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, TextInput, Alert, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleLogin = async () => {
    // Reset errors
    setErrors({ email: '', password: '' });
    
    // Validation
    const newErrors = { email: '', password: '' };
    let hasErrors = false;

    if (!formData.email.trim()) {
      newErrors.email = t('login.emailRequired');
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('login.emailInvalid');
      hasErrors = true;
    }

    if (!formData.password.trim()) {
      newErrors.password = t('login.passwordRequired');
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      login(); // Update auth context
      router.replace('/(tabs)'); // Navigate back to home page
    } catch (error) {
      Alert.alert(t('login.error'), t('login.loginFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(t('login.forgotPassword'), t('login.forgotPasswordMessage'));
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={[styles.scrollView, { paddingTop: insets.top }]}
        contentContainerStyle={[styles.content, isLargeScreen && styles.contentLarge]}
      >
        <View style={[styles.loginCard, isLargeScreen && styles.loginCardLarge]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, isLargeScreen && styles.titleLarge]}>
              {t('login.welcome')}
            </Text>
            <Text style={[styles.subtitle, isLargeScreen && styles.subtitleLarge]}>
              {t('login.subtitle')}
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('login.email')}</Text>
              <View style={[
                styles.inputContainer,
                focusedInput === 'email' && styles.inputContainerFocused,
                errors.email && styles.inputContainerError
              ]}>
                <FontAwesome name="envelope" size={18} color="#15803d" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, isLargeScreen && styles.inputLarge]}
                  placeholder={t('login.emailPlaceholder')}
                  placeholderTextColor="#15803d"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('login.password')}</Text>
              <View style={[
                styles.inputContainer,
                focusedInput === 'password' && styles.inputContainerFocused,
                errors.password && styles.inputContainerError
              ]}>
                <FontAwesome name="lock" size={18} color="#15803d" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, isLargeScreen && styles.inputLarge]}
                  placeholder={t('login.passwordPlaceholder')}
                  placeholderTextColor="#15803d"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity 
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <FontAwesome 
                    name={showPassword ? "eye-slash" : "eye"} 
                    size={18} 
                    color="#15803d" 
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>{t('login.forgotPassword')}</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={styles.loginButtonText}>{t('login.loggingIn')}</Text>
              ) : (
                <Text style={styles.loginButtonText}>{t('login.login')}</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('login.or')}</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Demo Login Info */}
            <View style={styles.demoInfo}>
              <Text style={styles.demoTitle}>{t('login.demoInfo')}</Text>
              <Text style={styles.demoText}>{t('login.anyCredentials')}</Text>
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
    backgroundColor: '#f0fdf4', // Match home page light green background
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    flex: 1,
    justifyContent: 'center', // Center the card vertically
    alignItems: 'center', // Center the card horizontally
  },
  contentLarge: {
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: 20, // Slightly more rounded to match theme
    padding: 32,
    width: '100%',
    maxWidth: 400,
    elevation: 12,
    shadowColor: '#15803d', // Green shadow to match theme
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: '#dcfce7', // Light green border
  },
  loginCardLarge: {
    padding: 40,
    minWidth: 440,
    maxWidth: 500,
    borderRadius: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#166534', // Dark green to match theme
    marginBottom: 8,
  },
  titleLarge: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#15803d', // Forest green to match theme
    textAlign: 'center',
    lineHeight: 22,
  },
  subtitleLarge: {
    fontSize: 18,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#166534', // Dark green
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6fdf9', // Very light green background to match theme
    borderWidth: 2,
    borderColor: '#bbf7d0', // Light green border
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputContainerFocused: {
    borderColor: '#15803d', // Forest green border when focused
    backgroundColor: '#ffffff', // White background when focused
  },
  inputContainerError: {
    borderColor: '#dc2626', // Red border when error
    backgroundColor: '#fef2f2', // Light red background when error
  },
  inputIcon: {
    marginRight: 12,
    color: '#15803d', // Forest green icons
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#166534', // Dark green text
    // Remove default web focus outline and borders
    ...(Platform.OS === 'web' ? {
      outline: 'none',
      outlineWidth: 0,
      outlineOffset: 0,
      border: 'none',
      boxShadow: 'none',
    } : {}),
  },
  inputLarge: {
    paddingVertical: 16,
    fontSize: 16,
  },
  errorText: {
    color: '#dc2626', // Red color for error text
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  passwordToggle: {
    padding: 6,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 28,
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: '#15803d', // Forest green to match theme
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#15803d', // Forest green to match theme
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 2,
    borderColor: '#166534', // Darker green border
    elevation: 4,
    shadowColor: '#15803d',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#9ca3af',
    borderColor: '#6b7280',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#bbf7d0', // Light green divider to match theme
  },
  dividerText: {
    fontSize: 14,
    color: '#15803d', // Forest green
    marginHorizontal: 16,
    fontWeight: '500',
  },
  demoInfo: {
    backgroundColor: '#f0fdf4', // Light green background to match theme
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#bbf7d0', // Light green border
  },
  demoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#166534', // Dark green
    marginBottom: 6,
  },
  demoText: {
    fontSize: 13,
    color: '#15803d', // Forest green
    lineHeight: 18,
    fontWeight: '500',
  },
});
