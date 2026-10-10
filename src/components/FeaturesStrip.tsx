'use client';

import React from 'react';
import { Sparkles, Terminal, Share2, ShieldCheck } from 'lucide-react';

export function FeaturesStrip() {
  const features = [
    {
      icon: <Terminal className="w-4 h-4 text-zinc-300" />,
      title: 'Technical Depth Retained',
      desc: 'Preserves architecture details, benchmark numbers, and key code insights instead of flattening them into generic summaries.',
    },
    {
      icon: <Share2 className="w-4 h-4 text-zinc-300" />,
      title: 'Platform-Native Formatting',
      desc: 'Thread hooks, LinkedIn spacing, and executive briefings are formatted to the specific reading habits of each network.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-zinc-300" />,
      title: 'Source Attribution',
      desc: 'Seamlessly embeds canonical links and references to drive qualified readers back to your main site.',
    },
    {
      icon: <Sparkles className="w-4 h-4 text-zinc-300" />,
      title: 'Zero Prompt Friction',
      desc: 'No endless prompt tweaking. Just input your source post and get distribution-ready drafts in seconds.',
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-20">
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Purpose-built for technical distribution
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg mx-auto">
          High-fidelity repurposing for engineering leaders, dev advocates, and creators.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-colors"
          >
            <div className="p-2 rounded-md bg-zinc-900 border border-zinc-800 w-fit mb-3">
              {f.icon}
            </div>
            <h4 className="text-sm font-semibold text-white mb-1 tracking-tight">
              {f.title}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
