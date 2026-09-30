'use client';

import React from 'react';
import { Zap, Share2, Layers, Cpu } from 'lucide-react';

export function FeaturesStrip() {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: '5-Second Micro-Pipeline',
      desc: 'Transforms 3,000+ word technical papers into 4 viral formats in under 5 seconds with zero manual prompt friction.',
    },
    {
      icon: <Share2 className="w-5 h-5 text-sky-400" />,
      title: 'Platform-Native Tone Matching',
      desc: 'Twitter hooks, Quora technical depth, LinkedIn executive voice, and WhatsApp brevity all custom-tailored.',
    },
    {
      icon: <Layers className="w-5 h-5 text-violet-400" />,
      title: 'Organic Backlink Strategy',
      desc: 'Seamlessly embeds natural source citations to drive qualified developer referral traffic back to your website.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      title: 'DeepSeek V3 & OpenAI Engine',
      desc: 'Powered by DeepSeek V3 and GPT-4o with an intelligent offline fallback engine for zero-setup execution.',
    },
  ];

  return (
    <section className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-16">
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-outfit)]">
          Why ContentPulse AI Wins Over Generic ChatGPT
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
          Built specifically for engineering bloggers, developer advocates, and tech founders who demand high-authority output.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl glass-card border border-slate-800/80 hover:border-violet-500/30 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 w-fit mb-3 group-hover:scale-105 transition-transform">
              {f.icon}
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5 font-[family-name:var(--font-outfit)]">
              {f.title}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
