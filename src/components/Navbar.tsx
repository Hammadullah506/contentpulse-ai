'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/Logo';
import {
  Key,
  ExternalLink,
  Zap,
  Rss,
  History,
  Sparkles,
  Menu,
  X,
  User as UserIcon,
  Crown,
  LogOut,
  ChevronRight,
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#07090E]/95 backdrop-blur-xl transition-all shadow-md shadow-black/30">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo with Malik Hammad / NEXUS PULSE Identity */}
        <div className="flex items-center min-w-0">
          <Logo size="md" showTagline={true} isCompactOnMobile={true} />
        </div>

        {/* Desktop Controls (Bootstrap-style lg:flex breakpoint) */}
        <div className="hidden lg:flex items-center gap-2.5">
          
          {/* Founder Attribution Badge */}
          <a
            href="https://blog.malikhammaddigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 hover:text-white transition-all group"
            title="Read Founder's Technical Blog on NEXUS PULSE"
          >
            <span className="text-slate-400">Founder:</span>
            <span className="text-violet-400 font-semibold group-hover:text-violet-300">Malik Hammad</span>
            <span className="text-slate-500 text-[10px]">(NEXUS PULSE)</span>
            <ExternalLink className="w-3 h-3 text-slate-500 ml-0.5 group-hover:text-cyan-400" />
          </a>

          {/* WordPress RSS Feed Sync */}
          <button
            onClick={onOpenFeedModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/80 text-orange-400 border border-orange-500/30 hover:bg-orange-950/30 hover:border-orange-500/50 transition-all cursor-pointer"
            title="Sync WordPress Blog Articles via RSS"
          >
            <Rss className="w-3.5 h-3.5" />
            <span>Blog Sync</span>
          </button>

          {/* History Drawer Trigger */}
          <button
            onClick={onOpenHistoryDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white transition-all cursor-pointer relative"
            title="View Past Campaigns"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>History</span>
            {mounted && historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-violet-600 text-white text-[10px] font-bold">
                {historyCount}
              </span>
            )}
          </button>

          {/* AI Settings */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              hasCustomKey
                ? 'bg-violet-900/30 text-violet-300 border border-violet-500/40 hover:bg-violet-900/50'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700/80 hover:text-white'
            }`}
            title="Configure DeepSeek / OpenAI API Key"
          >
            <Key className="w-3.5 h-3.5 text-violet-400" />
            <span>{hasCustomKey ? `${provider.toUpperCase()} Key Active` : 'AI Engine'}</span>
            {hasCustomKey && <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />}
          </button>

          {/* Pricing Upgrade Button */}
          <button
            onClick={onOpenPricingModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-md shadow-violet-600/25 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{mounted && user?.plan === 'pro' ? 'Pro Member' : 'Upgrade Plans'}</span>
          </button>

          {/* User Account / Sign In Pill */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-all cursor-pointer hover:bg-slate-800/60"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
              {mounted && user ? user.name.slice(0, 1).toUpperCase() : <UserIcon className="w-3.5 h-3.5 text-slate-300" />}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">
                {mounted && user ? user.name.split(' ')[0] : 'Sign In'}
              </span>
              <span
                className={`text-[10px] font-bold ${
                  mounted && user?.plan === 'pro'
                    ? 'text-violet-400 flex items-center gap-0.5'
                    : mounted && user?.plan === 'agency'
                    ? 'text-amber-400'
                    : 'text-cyan-400'
                }`}
              >
                {mounted && user ? (
                  user.plan === 'pro' ? (
                    <>
                      <Crown className="w-2.5 h-2.5 inline" /> PRO
                    </>
                  ) : (
                    `${3 - user.creditsUsed} Credits Left`
                  )
                ) : (
                  'Free Trial'
                )}
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Header Right Bar (Clean Bootstrap-style Touch Controls) */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
          
          {/* Quick User / Upgrade Button on Mobile */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 cursor-pointer active:scale-95 transition-all"
            aria-label="User Account"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-white text-[11px]">
              {mounted && user ? user.name.slice(0, 1).toUpperCase() : <UserIcon className="w-3.5 h-3.5" />}
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-white">
              {mounted && user ? (user.plan === 'pro' ? 'PRO' : `${3 - user.creditsUsed} cr`) : 'Sign In'}
            </span>
          </button>

          {/* Bootstrap Navbar Toggler Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              mobileMenuOpen
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Bootstrap-Style Mobile Collapsible Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#090D18]/98 backdrop-blur-2xl px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          
          {/* User Status Card in Mobile Drawer */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-md">
                {mounted && user ? user.name.slice(0, 1).toUpperCase() : <UserIcon className="w-5 h-5" />}
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">
                    {mounted && user ? user.name : 'Guest User'}
                  </span>
                  {mounted && user?.plan === 'pro' && (
                    <span className="px-1.5 py-0.5 rounded-full bg-violet-600/30 text-violet-300 border border-violet-500/40 text-[9px] font-black uppercase">
                      PRO
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">
                  {mounted && user ? (
                    user.plan === 'pro' ? (
                      'Unlimited Generations Active'
                    ) : (
                      `${3 - user.creditsUsed} free generations remaining`
                    )
                  ) : (
                    '3 Free Credits Included'
                  )}
                </span>
              </div>
            </div>

            {mounted && user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-400 hover:bg-rose-900/40 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Upgrade Plan Banner (Prominent CTA) */}
          <button
            onClick={() => {
              onOpenPricingModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-violet-600/30 via-indigo-600/30 to-cyan-500/30 border border-violet-500/50 hover:border-violet-400 text-white font-bold text-xs transition-all shadow-md group text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  Upgrade to Pro Tier
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black border border-amber-400/30">
                    $19/mo
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-normal">
                  Unlock unlimited conversions & watermark-free slides
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-violet-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Quick Action Grid (2 Columns, Bootstrap-style Clean Tiles) */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                onOpenFeedModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-orange-400 hover:bg-slate-800 text-left transition-colors cursor-pointer"
            >
              <Rss className="w-4 h-4 shrink-0 text-orange-400" />
              <span>WordPress Sync</span>
            </button>

            <button
              onClick={() => {
                onOpenHistoryDrawer();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-800 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>History</span>
              </div>
              {mounted && historyCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-violet-600 text-white text-[10px] font-bold">
                  {historyCount}
                </span>
              )}
            </button>
          </div>

          {/* AI Engine & Settings */}
          <button
            onClick={() => {
              onOpenApiKeyModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-violet-300 hover:bg-slate-800 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <Key className="w-4 h-4 text-violet-400" />
              <span>AI Engine & BYO API Key</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
              {hasCustomKey ? `${provider.toUpperCase()} Key` : 'Default Free'}
            </span>
          </button>

          {/* Founder Identity Card in Mobile Menu */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-violet-950/20 via-slate-900 to-cyan-950/20 border border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Created & Architected by
              </span>
              <span className="text-xs font-bold text-white">
                Malik Hammad <span className="text-cyan-400 font-normal">• NEXUS PULSE</span>
              </span>
            </div>
            <a
              href="https://blog.malikhammaddigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-300 font-semibold text-[11px] inline-flex items-center gap-1 hover:bg-violet-600/30 transition-colors"
            >
              <span>Visit Blog</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      )}
    </header>
  );
}
