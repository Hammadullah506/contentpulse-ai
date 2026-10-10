'use client';

import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { TwitterXIcon, LinkedInIcon } from '@/components/icons/PlatformIcons';

interface HeroProps {
  onScrollToWorkspace: () => void;
}

export function Hero({ onScrollToWorkspace }: HeroProps) {
  return (
    <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 text-center w-full max-w-4xl mx-auto">
      {/* Vercel-Style Minimalist Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-300 mb-6 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>Content Distribution System</span>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-500">Multi-Channel</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-5 font-[family-name:var(--font-outfit)]">
        Turn long-form writing into <br className="hidden sm:inline" />
        <span className="text-zinc-400">high-impact social distribution.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
        Convert technical articles and documentation into platform-native Twitter threads, 
        LinkedIn posts, and executive briefings. Natural prose, zero robotic filler.
      </p>

      {/* CTA Buttons (Vercel Monochrome Style) */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <button
          onClick={onScrollToWorkspace}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white hover:bg-zinc-200 text-black font-medium text-sm transition-colors cursor-pointer"
        >
          <span>Open Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onScrollToWorkspace}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-800 transition-colors text-sm font-medium cursor-pointer"
        >
          <FileText className="w-4 h-4 text-zinc-400" />
          <span>Load Sample Article</span>
        </button>
      </div>

      {/* Clean Platform Support Strip */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-zinc-400">
        <span className="text-zinc-600 mr-1 font-mono text-[11px] uppercase tracking-wider">Formats:</span>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-850">
          <TwitterXIcon className="w-3 h-3 text-zinc-300" />
          <span>X Thread</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-850">
          <LinkedInIcon className="w-3 h-3 text-zinc-300" />
          <span>LinkedIn Post</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-850">
          <span>Quora Answer</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-850">
          <span>WhatsApp / Telegram</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-850">
          <span>Slide Carousel</span>
        </div>
      </div>
    </section>
  );
}
