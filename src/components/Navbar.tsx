'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/Logo';
import {
  Key,
  Rss,
  History,
  Menu,
  X,
  User as UserIcon,
  LogOut,
} from 'lucide-react';

interface NavbarProps {
  onOpenApiKeyModal: () => void;
  onOpenFeedModal: () => void;
  onOpenHistoryDrawer: () => void;
  onOpenAuthModal: () => void;
  onOpenPricingModal: () => void;
  historyCount: number;
  hasCustomKey: boolean;
  provider: 'deepseek' | 'openai' | 'auto';
}

const emptySubscribe = () => () => {};

export function Navbar({
  onOpenApiKeyModal,
  onOpenFeedModal,
  onOpenHistoryDrawer,
  onOpenAuthModal,
  onOpenPricingModal,
  historyCount,
  hasCustomKey,
  provider,
}: NavbarProps) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Left: Minimal Brand Logo */}
        <div className="flex items-center">
          <Logo size="md" showTagline={false} />
        </div>

        {/* Desktop Controls (Vercel Style) */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* RSS Feed Sync */}
          <button
            onClick={onOpenFeedModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <Rss className="w-3.5 h-3.5" />
            <span>Blog Sync</span>
          </button>

          {/* History Trigger */}
          <button
            onClick={onOpenHistoryDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
            {mounted && historyCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-200 text-[10px] font-mono border border-zinc-700">
                {historyCount}
              </span>
            )}
          </button>

          {/* AI Settings */}
          <button
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{hasCustomKey ? `${provider.toUpperCase()} Key` : 'API Settings'}</span>
          </button>

          {/* Pricing Upgrade Button */}
          <button
            onClick={onOpenPricingModal}
            className="px-3 py-1.5 rounded-md text-xs font-medium text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
          >
            {mounted && user?.plan === 'pro' ? 'Pro Plan' : 'Pricing'}
          </button>

          {/* User Sign In / Account Button */}
          {mounted && user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <span className="text-xs text-zinc-300 font-medium">
                {user.name.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-1.5 rounded-md bg-white hover:bg-zinc-200 text-black text-xs font-medium transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Header Right Bar */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && user ? (
            <span className="text-xs text-zinc-300 font-medium mr-1">
              {user.name.split(' ')[0]}
            </span>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-2.5 py-1 rounded-md bg-white text-black text-xs font-medium"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-black/95 px-4 py-4 space-y-2">
          <button
            onClick={() => {
              onOpenFeedModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-md text-xs font-medium text-zinc-300 hover:bg-zinc-900 text-left"
          >
            <Rss className="w-4 h-4 text-zinc-400" />
            <span>Blog Sync</span>
          </button>

          <button
            onClick={() => {
              onOpenHistoryDrawer();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2 rounded-md text-xs font-medium text-zinc-300 hover:bg-zinc-900 text-left"
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-zinc-400" />
              <span>History</span>
            </div>
            {mounted && historyCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onOpenApiKeyModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-md text-xs font-medium text-zinc-300 hover:bg-zinc-900 text-left"
          >
            <Key className="w-4 h-4 text-zinc-400" />
            <span>AI Engine Settings</span>
          </button>

          <button
            onClick={() => {
              onOpenPricingModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-md text-xs font-medium text-zinc-300 hover:bg-zinc-900 text-left"
          >
            <span>Pricing & Plans</span>
          </button>

          {mounted && user && (
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded-md text-xs font-medium text-red-400 hover:bg-zinc-900 text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
