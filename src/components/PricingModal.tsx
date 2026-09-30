'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { PlanType } from '@/types';
import { X, Check, Zap, Sparkles, ShieldCheck, Flame, Star } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const { user, upgradePlan } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [upgradedPlan, setUpgradedPlan] = useState<PlanType | null>(null);

  if (!isOpen) return null;

  const handleUpgrade = (plan: PlanType) => {
    upgradePlan(plan);
    setUpgradedPlan(plan);
    setTimeout(() => {
      setUpgradedPlan(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl glass-panel-glow border border-violet-500/30 p-6 sm:p-8 text-slate-100 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-[family-name:var(--font-outfit)]">
                Upgrade Your Content Engine
              </h3>
              <p className="text-xs text-slate-400">
                Unlock unlimited repurposing, 1080px LinkedIn PDF Slides, and 60s Reel scripts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center my-6">
          <div className="inline-flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                Save 35%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Starter (Free) */}
          <div
            className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
              user?.plan === 'free'
                ? 'bg-slate-900/60 border-slate-700'
                : 'bg-slate-950/40 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">Starter</h4>
                {user?.plan === 'free' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Current Plan
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">For casual bloggers & testing</p>

              <div className="my-4">
                <span className="text-3xl font-extrabold text-white font-[family-name:var(--font-outfit)]">
                  $0
                </span>
                <span className="text-xs text-slate-400"> / forever</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>3 Repurposes / Month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Twitter, Quora & LinkedIn</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Standard Generation Speed</span>
                </li>
                <li className="flex items-center gap-2 text-slate-500">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span>No LinkedIn PDF Slides</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                disabled={user?.plan === 'free'}
                onClick={() => handleUpgrade('free')}
                className="w-full py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400 disabled:opacity-40"
              >
                {user?.plan === 'free' ? 'Active Plan' : 'Downgrade to Free'}
              </button>
            </div>
          </div>

          {/* 2. PRO (Most Popular) */}
          <div className="rounded-2xl p-6 border-2 border-violet-500/80 bg-gradient-to-b from-violet-950/40 via-slate-900/80 to-[#0A0D17] relative flex flex-col justify-between shadow-xl shadow-violet-600/20 scale-[1.02]">
            
            {/* Most Popular Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-md">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span>Founder & Pro Choice</span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <span>Pro Creator</span>
                  <Flame className="w-4 h-4 text-amber-400" />
                </h4>
                {user?.plan === 'pro' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40">
                    Active Plan
                  </span>
                )}
              </div>
              <p className="text-xs text-violet-300/80 mt-1">For serious tech writers, founders & advocates</p>

              <div className="my-4">
                <span className="text-3xl font-extrabold text-white font-[family-name:var(--font-outfit)]">
                  ${billingCycle === 'yearly' ? '12' : '19'}
                </span>
                <span className="text-xs text-slate-400">
                  {' '}
                  / month {billingCycle === 'yearly' && '(billed $149/yr)'}
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-violet-900/40">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="font-semibold text-white">Unlimited Article Repurposing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>All 6 Viral Platforms</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>1080px LinkedIn PDF Slides Export</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>60s YouTube Short & Reel Scripts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>WordPress Blog RSS Auto-Sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>DeepSeek V3 & GPT-4o Engine</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleUpgrade('pro')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {upgradedPlan === 'pro' ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Upgraded to Pro! 🎉</span>
                  </>
                ) : user?.plan === 'pro' ? (
                  <span>Current Plan (Active)</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Upgrade to Pro Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3. Agency / Team */}
          <div className="rounded-2xl p-5 border border-slate-800 bg-slate-950/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">Agency / Team</h4>
                {user?.plan === 'agency' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Active Plan
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">For content agencies & dev marketing teams</p>

              <div className="my-4">
                <span className="text-3xl font-extrabold text-white font-[family-name:var(--font-outfit)]">
                  ${billingCycle === 'yearly' ? '33' : '49'}
                </span>
                <span className="text-xs text-slate-400">
                  {' '}
                  / month {billingCycle === 'yearly' && '(billed $399/yr)'}
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>5 Team Member Accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Custom Watermarks & Branding</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Direct Webhook & Buffer Sync</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleUpgrade('agency')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all cursor-pointer"
              >
                {upgradedPlan === 'agency' ? 'Upgraded! 🎉' : 'Select Agency Plan'}
              </button>
            </div>
          </div>

        </div>

        {/* Guarantee Banner */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Supports Global Cards (Stripe / LemonSqueezy) • Cancel anytime with 1-click.</span>
        </div>

      </div>
    </div>
  );
}
