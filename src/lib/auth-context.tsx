'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        // 1. Check cookie first (set by Google OAuth)
        const match = document.cookie.match(new RegExp('(^| )contentpulse_user=([^;]+)'));
        if (match && match[2]) {
          const parsed = JSON.parse(decodeURIComponent(match[2]));
          localStorage.setItem('contentpulse_auth_user', JSON.stringify(parsed));
          return parsed;
        }

        // 2. Check localStorage
        const stored = localStorage.getItem('contentpulse_auth_user');
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  // Sync cookie updates if redirected back from Google OAuth
  useEffect(() => {
    try {
      const match = document.cookie.match(new RegExp('(^| )contentpulse_user=([^;]+)'));
      if (match && match[2]) {
        const parsed = JSON.parse(decodeURIComponent(match[2]));
        setUser(parsed);
        localStorage.setItem('contentpulse_auth_user', JSON.stringify(parsed));
      }
    } catch (e) {
      console.warn('Cookie sync warning', e);
    }
  }, []);

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    try {
      if (u) {
        localStorage.setItem('contentpulse_auth_user', JSON.stringify(u));
        document.cookie = `contentpulse_user=${encodeURIComponent(JSON.stringify(u))}; path=/; max-age=2592000`;
      } else {
        localStorage.removeItem('contentpulse_auth_user');
        document.cookie = 'contentpulse_user=; path=/; max-age=0';
      }
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  };

  const loginWithGoogle = async () => {
    // Redirect to backend Google OAuth initiation route
    window.location.href = '/api/auth/google/url';
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
    if (!user) return false;
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
