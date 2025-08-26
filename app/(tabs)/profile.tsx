import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileContent from '@/components/ProfileContent';
import DashboardContent from '@/components/DashboardContent';

export default function ProfileScreen() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <ProfileContent /> : <DashboardContent />;
}
