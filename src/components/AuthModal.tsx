'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { X, Mail, Check, User, LogOut } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPricing?: () => void;
}

export function AuthModal({ isOpen, onClose, onOpenPricing }: AuthModalProps) {
  const { user, loginWithGoogle, loginWithEmail, loginAsFounder, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await loginWithGoogle();
    setIsLoading(false);
    setSuccessMsg('Signed in successfully.');
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 600);
  };

  const handleFounderLogin = () => {
    loginAsFounder();
    setSuccessMsg('Signed in as Malik Hammad (Pro Plan).');
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 600);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await loginWithEmail(email, name);
    setIsLoading(false);
    setSuccessMsg('Account created.');
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm rounded-xl bg-zinc-950 border border-zinc-850 p-6 text-zinc-100 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-semibold text-white">
              {user ? 'Account Settings' : 'Sign In'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* If Already Logged In */}
        {user ? (
          <div className="mt-4 space-y-4">
            <div className="p-3.5 rounded-lg bg-black border border-zinc-850 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">{user.name}</h4>
                <p className="text-xs text-zinc-500">{user.email}</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 uppercase">
                {user.plan}
              </span>
            </div>

            {/* Credits Tracker */}
            <div className="p-3.5 rounded-lg bg-black border border-zinc-850 text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Usage Credits</span>
                <span className="text-white font-mono">
                  {user.plan === 'pro' || user.plan === 'agency'
                    ? 'Unlimited'
                    : `${user.creditsUsed} / ${user.maxCredits} Used`}
                </span>
              </div>
            </div>

            {user.plan === 'free' && onOpenPricing && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPricing();
                }}
                className="w-full py-2 px-3 rounded-md bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors cursor-pointer"
              >
                Upgrade to Pro
              </button>
            )}

            {/* Logout */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign In Form */
          <div className="mt-4 space-y-3.5">
            {successMsg && (
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Google 1-Click Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-2 px-3 rounded-md bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Quick Demo Sign In */}
            <button
              onClick={handleFounderLogin}
              className="w-full py-1.5 px-3 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Quick Test: Sign in as Malik Hammad
            </button>

            <div className="relative flex items-center justify-center py-1">
              <div className="border-t border-zinc-850 w-full" />
              <span className="bg-zinc-950 px-2 text-[10px] text-zinc-600 font-mono absolute uppercase">
                Or Email
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-2.5">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3 py-1.5 rounded-md bg-black border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-1.5 rounded-md bg-black border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full py-2 px-3 rounded-md bg-zinc-850 hover:bg-zinc-800 border border-zinc-750 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Sign In with Email</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
