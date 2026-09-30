'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, PlanType } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  logout: () => void;
  upgradePlan: (plan: PlanType) => void;
  canGenerate: () => boolean;
  consumeCredit: () => boolean;
}

const DEFAULT_GUEST_USER: UserProfile = {
  id: 'usr_guest_demo',
  name: 'Malik Hammad',
  email: 'founder@malikhammaddigital.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  plan: 'free',
  creditsUsed: 1,
  maxCredits: 3,
  joinedDate: 'Oct 2026',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('contentpulse_auth_user');
        return stored ? JSON.parse(stored) : DEFAULT_GUEST_USER;
      } catch {
        return DEFAULT_GUEST_USER;
      }
    }
    return DEFAULT_GUEST_USER;
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
    // Simulates quick Google OAuth with a verified profile
    const googleUser: UserProfile = {
      id: `usr_google_${Date.now()}`,
      name: 'Malik Hammad (Google)',
      email: 'malik@nexusdigital.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      plan: user?.plan || 'free',
      creditsUsed: user?.creditsUsed || 0,
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
      plan: user?.plan || 'free',
      creditsUsed: user?.creditsUsed || 0,
      maxCredits: 3,
      joinedDate: new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
    };
    saveUser(emailUser);
  };

  const logout = () => {
    saveUser(null);
  };

  const upgradePlan = (plan: PlanType) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      plan,
      maxCredits: plan === 'free' ? 3 : -1, // -1 means unlimited
    };
    saveUser(updated);
  };

  const canGenerate = (): boolean => {
    if (!user) return true;
    if (user.plan === 'pro' || user.plan === 'agency') return true;
    return user.creditsUsed < user.maxCredits;
  };

  const consumeCredit = (): boolean => {
    if (!user) return true;
    if (user.plan === 'pro' || user.plan === 'agency') return true;

    if (user.creditsUsed >= user.maxCredits) {
      return false; // Limit reached!
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
