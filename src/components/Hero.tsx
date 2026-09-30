'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Flame,
  ArrowRight,
  Layers,
  Video,
} from 'lucide-react';
import { TwitterXIcon, LinkedInIcon } from '@/components/icons/PlatformIcons';

interface HeroProps {
  onScrollToWorkspace: () => void;
}

const TYPEWRITER_FEATURES = [
  {
    text: '5-Tweet Viral X Threads',
    color: 'from-sky-400 via-cyan-300 to-blue-500',
    fontClass: 'font-[family-name:var(--font-outfit)] tracking-tight',
    badgeText: '🐦 Twitter / X Growth',
    badgeClass: 'bg-sky-500/15 border-sky-500/30 text-sky-300 shadow-sky-500/20',
    benefit: 'Structured hook, stat metrics & CTA under 280 chars',
    cursorColor: 'bg-sky-400',
  },
  {
    text: 'High-Authority Quora Answers',
    color: 'from-rose-400 via-pink-300 to-red-400',
    fontClass: 'font-serif italic font-semibold tracking-normal',
    badgeText: '❓ Quora SEO Authority',
    badgeClass: 'bg-rose-500/15 border-rose-500/30 text-rose-300 shadow-rose-500/20',
    benefit: 'Target high-intent search queries with organic backlink citations',
    cursorColor: 'bg-rose-400',
  },
  {
    text: 'B2B LinkedIn Thought-Leadership',
    color: 'from-blue-400 via-indigo-300 to-cyan-300',
    fontClass: 'font-[family-name:var(--font-inter)] font-black tracking-normal',
    badgeText: '💼 LinkedIn Leadership',
    badgeClass: 'bg-blue-500/15 border-blue-500/30 text-blue-300 shadow-blue-500/20',
    benefit: 'Punchy 1-line spacing & discussion prompts for comment velocity',
    cursorColor: 'bg-blue-400',
  },
  {
    text: 'WhatsApp & Telegram Briefings',
    color: 'from-emerald-400 via-teal-300 to-green-400',
    fontClass: 'font-mono tracking-tight font-bold',
    badgeText: '💬 WhatsApp Channels',
    badgeClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 shadow-emerald-500/20',
    benefit: 'Clean emoji bullet points & bold highlights with direct source link',
    cursorColor: 'bg-emerald-400',
  },
  {
    text: 'Interactive LinkedIn PDF Carousels',
    color: 'from-purple-400 via-violet-300 to-fuchsia-400',
    fontClass: 'font-[family-name:var(--font-outfit)] font-black uppercase tracking-wider',
    badgeText: '📊 5-Slide PDF Deck',
    badgeClass: 'bg-violet-500/15 border-violet-500/30 text-violet-300 shadow-violet-500/20',
    benefit: 'High-swipe visual slides with 1080x1080px client-side PDF export',
    cursorColor: 'bg-violet-400',
  },
  {
    text: '60s Viral YouTube Short Scripts',
    color: 'from-amber-400 via-orange-300 to-rose-400',
    fontClass: 'font-[family-name:var(--font-outfit)] font-extrabold tracking-tight',
    badgeText: '🎬 YouTube Shorts & Reels',
    badgeClass: 'bg-amber-500/15 border-amber-500/30 text-amber-300 shadow-amber-500/20',
    benefit: 'Precise scene timestamps, B-roll visual cues & teleprompter voiceover',
    cursorColor: 'bg-amber-400',
  },
];

export function Hero({ onScrollToWorkspace }: HeroProps) {
  const [featureIndex, setFeatureIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFeature = TYPEWRITER_FEATURES[featureIndex];
    const fullText = currentFeature.text;

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 55);
      } else {
        // Pause at completion before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, 28);
      } else {
        // Move to next feature with a gentle pause
        timer = setTimeout(() => {
          setIsDeleting(false);
          setFeatureIndex((prev) => (prev + 1) % TYPEWRITER_FEATURES.length);
        }, 150);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, featureIndex]);

  const currentFeature = TYPEWRITER_FEATURES[featureIndex];

  return (
    <section className="relative pt-10 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
      {/* Ambient background glows */}
      <div className="radial-blur-ambient top-0 left-1/4 w-96 h-96 bg-violet-600 -z-10" />
      <div className="radial-blur-ambient top-10 right-1/4 w-96 h-96 bg-cyan-500 -z-10" />

      <div className="max-w-4xl mx-auto">
        
        {/* Dynamic Live Feature Pill Indicator */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-lg backdrop-blur-xl ${currentFeature.badgeClass}`}
        >
          <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
          <span className="font-bold">{currentFeature.badgeText}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-normal hidden sm:inline">
            {currentFeature.benefit}
          </span>
        </div>

        {/* Main Hero Headline with DYNAMIC TYPEWRITER */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2] mb-5 font-[family-name:var(--font-outfit)] min-h-[140px] sm:min-h-[160px] flex flex-col justify-center items-center">
          <span className="text-slate-200">1 Technical Blog Article →</span>
          <div className="mt-1 flex items-center justify-center flex-wrap gap-1">
            <span
              className={`bg-gradient-to-r ${currentFeature.color} bg-clip-text text-transparent transition-all duration-200 ${currentFeature.fontClass}`}
            >
              {displayText}
            </span>
            {/* Animated Blinking Cursor */}
            <span
              className={`inline-block w-[3px] h-8 sm:h-12 rounded-full ${currentFeature.cursorColor} animate-pulse ml-1 align-middle`}
            />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-slate-400 mt-2">
            in only <span className="text-emerald-400">5 seconds</span>.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Designed for engineering leaders, dev advocates, and founders. Paste your blog URL or text, and let AI repurpose it into 6 platform-native formats with zero prompt friction.
        </p>

        {/* Feature Badges Strip (Interactive 6 Formats) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 transition-colors">
            <TwitterXIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>5-Tweet Thread</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-rose-500/40 transition-colors">
            <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
            <span>Quora Authority</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-colors">
            <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>LinkedIn Post</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-colors">
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp / TG</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 transition-colors">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>PDF Slides</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-colors">
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <span>60s Short Script</span>
          </div>
        </div>

        {/* Quick CTA to jump to workspace */}
        <button
          onClick={onScrollToWorkspace}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>Launch ContentPulse Workspace</span>
          <ArrowRight className="w-4 h-4 text-cyan-200" />
        </button>

      </div>
    </section>
  );
}
