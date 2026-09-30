'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, PlanType } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  loginAsFounder: () => void;
  logout: () => void;
  upgradePlan: (plan: PlanType) => void;
  canGenerate: () => boolean;
  consumeCredit: () => boolean;
}

const FOUNDER_PROFILE: UserProfile = {
  id: 'usr_founder_malik',
  name: 'Malik Hammad',
  email: 'founder@malikhammaddigital.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
  plan: 'pro',
  creditsUsed: 0,
  maxCredits: -1, // Unlimited
  joinedDate: 'Founder • NEXUS PULSE',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // First-time visitors start as guest (null) unless they have previously signed in
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('contentpulse_auth_user');
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    try {
      if (u) {
        localStorage.setItem('contentpulse_auth_user', JSON.stringify(u));
      } else {
        localStorage.removeItem('contentpulse_auth_user');
      }
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  };

  const loginWithGoogle = async () => {
    const googleUser: UserProfile = {
      id: `usr_google_${Date.now()}`,
      name: 'Google User',
      email: 'user@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      plan: 'free',
      creditsUsed: 0,
      maxCredits: 3,
      joinedDate: new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
    };
    saveUser(googleUser);
  };

  const loginWithEmail = async (email: string, name?: string) => {
    const emailUser: UserProfile = {
      id: `usr_email_${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      plan: 'free',
      creditsUsed: 0,
      maxCredits: 3,
      joinedDate: new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
    };
    saveUser(emailUser);
  };

  const loginAsFounder = () => {
    saveUser(FOUNDER_PROFILE);
  };

  const logout = () => {
    saveUser(null);
  };

  const upgradePlan = (plan: PlanType) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      plan,
      maxCredits: plan === 'free' ? 3 : -1,
    };
    saveUser(updated);
  };

  const canGenerate = (): boolean => {
    if (!user) return false; // Must be logged in
    if (user.plan === 'pro' || user.plan === 'agency') return true;
    return user.creditsUsed < user.maxCredits;
  };

  const consumeCredit = (): boolean => {
    if (!user) return false;
    if (user.plan === 'pro' || user.plan === 'agency') return true;

    if (user.creditsUsed >= user.maxCredits) {
      return false;
    }

    const updated: UserProfile = {
      ...user,
      creditsUsed: user.creditsUsed + 1,
    };
    saveUser(updated);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithGoogle,
        loginWithEmail,
        loginAsFounder,
        logout,
        upgradePlan,
        canGenerate,
        consumeCredit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
