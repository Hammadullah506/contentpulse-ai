'use client';

import React, { useSyncExternalStore } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  Activity,
  Key,
  ExternalLink,
  Zap,
  Rss,
  History,
  Sparkles,
  User as UserIcon,
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
  const { user } = useAuth();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090E]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-violet-500/20">
            <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0B0F19]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white font-[family-name:var(--font-outfit)]">
                Content<span className="glow-gradient-text">Pulse</span> AI
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                v1.2 Pro
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Multi-Platform Content Repurposing Micro-SaaS
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Founder Attribution Badge */}
          <a
            href="https://blog.malikhammaddigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
          >
            <span>Founder:</span>
            <span className="text-violet-400 font-semibold">Malik Hammad</span>
            <span className="text-slate-500 text-[10px]">(NEXUS PULSE)</span>
            <ExternalLink className="w-3 h-3 text-slate-500 ml-0.5" />
          </a>

          {/* WordPress RSS Feed Sync Trigger */}
          <button
            onClick={onOpenFeedModal}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 text-orange-400 border border-orange-500/30 hover:bg-orange-950/30 transition-all cursor-pointer"
            title="Sync WordPress Blog Articles via RSS"
          >
            <Rss className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Blog Sync</span>
          </button>

            {/* History Drawer Trigger */}
          <button
            onClick={onOpenHistoryDrawer}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
            title="View Past Campaigns"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">History</span>
            {mounted && historyCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>

          {/* API Key Configuration Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              hasCustomKey
                ? 'bg-violet-900/30 text-violet-300 border border-violet-500/40 hover:bg-violet-900/50'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700/80 hover:text-white'
            }`}
            title="Configure DeepSeek / OpenAI API Key"
          >
            <Key className="w-3.5 h-3.5 text-violet-400" />
            <span>{hasCustomKey ? `${provider.toUpperCase()} Active` : 'AI'}</span>
            {hasCustomKey && <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />}
          </button>

          {/* Pricing Upgrade Button */}
          <button
            onClick={onOpenPricingModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-md shadow-violet-600/25 transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">
              {mounted && user?.plan === 'pro' ? 'Pro Member' : 'Pricing'}
            </span>
            <span className="sm:hidden">Plans</span>
          </button>

          {/* User Profile / Auth Button */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-all cursor-pointer"
            title="Account & Credits"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
              {mounted && user ? user.name.slice(0, 1).toUpperCase() : <UserIcon className="w-3.5 h-3.5" />}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[11px] font-semibold text-slate-200 leading-tight">
                {mounted && user ? user.name.split(' ')[0] : 'Sign In'}
              </span>
              <span
                className={`text-[9px] font-bold ${
                  mounted && user?.plan === 'pro'
                    ? 'text-violet-400'
                    : mounted && user?.plan === 'agency'
                    ? 'text-amber-400'
                    : 'text-slate-400'
                }`}
              >
                {mounted && user
                  ? user.plan === 'pro'
                    ? 'PRO ✨'
                    : `${user.creditsUsed}/3 Free`
                  : 'Free'}
              </span>
            </div>
          </button>

        </div>

      </div>
    </header>
  );
}
