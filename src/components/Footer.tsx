'use client';

import React from 'react';
import { Activity, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#05070B] mt-auto py-8 text-xs text-slate-500">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-300 font-[family-name:var(--font-outfit)]">
            ContentPulse AI
          </span>
          <span>— Multi-Platform Technical Content Repurposing Micro-SaaS</span>
        </div>

        {/* Founder Credit */}
        <div className="flex items-center gap-2">
          <span>Architected by</span>
          <a
            href="https://blog.malikhammaddigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 font-semibold hover:text-violet-300 transition-colors inline-flex items-center gap-1"
          >
            <span>Malik Hammad</span>
            <span className="text-slate-500 font-normal">(NEXUS PULSE)</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-slate-600">
          &copy; {new Date().getFullYear()} ContentPulse AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
