'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { PlanType } from '@/types';
import { X, Check } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-xl bg-zinc-950 border border-zinc-850 p-6 sm:p-8 text-zinc-100 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-850">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Subscription Plans
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select a plan for higher limits and full export capabilities.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center my-6">
          <div className="inline-flex items-center p-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-zinc-800 text-white font-medium'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-zinc-800 text-white font-medium'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-200 font-mono">
                -30%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Starter (Free) */}
          <div className="rounded-lg p-5 border border-zinc-850 bg-black flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Starter</h4>
                {user?.plan === 'free' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-1">Free testing tier</p>

              <div className="my-3">
                <span className="text-2xl font-bold text-white font-mono">$0</span>
                <span className="text-xs text-zinc-500"> / mo</span>
              </div>

              <ul className="space-y-2 text-xs text-zinc-400 pt-3 border-t border-zinc-900">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>3 Repurposes / mo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Twitter, Quora & LinkedIn</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Standard Generation</span>
                </li>
              </ul>
            </div>

            <div className="pt-5">
              <button
                disabled={user?.plan === 'free'}
                onClick={() => handleUpgrade('free')}
                className="w-full py-2 rounded-md border border-zinc-800 text-xs font-medium text-zinc-400 disabled:opacity-40"
              >
                {user?.plan === 'free' ? 'Active' : 'Downgrade'}
              </button>
            </div>
          </div>

          {/* 2. PRO */}
          <div className="rounded-lg p-5 border border-white bg-zinc-950 flex flex-col justify-between relative shadow-lg">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Pro Creator</h4>
                {user?.plan === 'pro' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black font-medium">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-1">For writers & advocates</p>

              <div className="my-3">
                <span className="text-2xl font-bold text-white font-mono">
                  ${billingCycle === 'yearly' ? '12' : '19'}
                </span>
                <span className="text-xs text-zinc-400"> / mo</span>
              </div>

              <ul className="space-y-2 text-xs text-zinc-300 pt-3 border-t border-zinc-800">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="font-medium text-white">Unlimited Repurposing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>All 6 Distribution Formats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>PDF Carousel Export</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>RSS Auto-Sync</span>
                </li>
              </ul>
            </div>

            <div className="pt-5">
              <button
                onClick={() => handleUpgrade('pro')}
                className="w-full py-2 rounded-md bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors cursor-pointer"
              >
                {upgradedPlan === 'pro' ? (
                  <span>Upgraded</span>
                ) : user?.plan === 'pro' ? (
                  <span>Current Plan</span>
                ) : (
                  <span>Upgrade to Pro</span>
                )}
              </button>
            </div>
          </div>

          {/* 3. Agency */}
          <div className="rounded-lg p-5 border border-zinc-850 bg-black flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Team</h4>
                {user?.plan === 'agency' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-1">For teams & agencies</p>

              <div className="my-3">
                <span className="text-2xl font-bold text-white font-mono">
                  ${billingCycle === 'yearly' ? '39' : '49'}
                </span>
                <span className="text-xs text-zinc-500"> / mo</span>
              </div>

              <ul className="space-y-2 text-xs text-zinc-400 pt-3 border-t border-zinc-900">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Team Workspaces</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Custom Watermarks</span>
                </li>
              </ul>
            </div>

            <div className="pt-5">
              <button
                onClick={() => handleUpgrade('agency')}
                className="w-full py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs border border-zinc-800 transition-colors cursor-pointer"
              >
                {upgradedPlan === 'agency' ? 'Upgraded' : 'Select Team'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
