'use client';

import React, { useState } from 'react';
import { CarouselSlide } from '@/types';
import { ChevronLeft, ChevronRight, Copy, Check, Download, Sparkles, Layers } from 'lucide-react';

interface CarouselDeckPreviewProps {
  slides: CarouselSlide[];
  deckTitle: string;
}

export function CarouselDeckPreview({ slides, deckTitle }: CarouselDeckPreviewProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [theme, setTheme] = useState<'violet' | 'cyberpunk' | 'ocean'>('violet');
  const [copied, setCopied] = useState(false);

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const copySlidesText = () => {
    const text = slides
      .map(
        (s) =>
          `[SLIDE ${s.slideNumber}/${slides.length}]\n${s.headline}\n${s.subtext}\n${
            s.keyPoints ? s.keyPoints.map((p) => `• ${p}`).join('\n') : ''
          }\n${s.footerTag || ''}`
      )
      .join('\n\n====================\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple client-side print/PDF trigger for slides
  const handlePrintPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const slidesHtml = slides
      .map(
        (s) => `
      <div style="page-break-after: always; width: 1080px; height: 1080px; background: #0b0f19; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding: 60px; box-sizing: border-box; border: 4px solid #8b5cf6;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #334155; padding-bottom: 20px;">
          <span style="font-size: 20px; font-weight: bold; color: #a78bfa;">ContentPulse AI • Slide ${s.slideNumber}/${slides.length}</span>
          <span style="font-size: 16px; color: #94a3b8;">Malik Hammad (NEXUS PULSE)</span>
        </div>
        <div style="margin: auto 0;">
          <h1 style="font-size: 42px; font-weight: 800; line-height: 1.2; margin-bottom: 20px; color: #ffffff;">${s.headline}</h1>
          <p style="font-size: 22px; color: #cbd5e1; line-height: 1.5; margin-bottom: 30px;">${s.subtext}</p>
          ${
            s.keyPoints
              ? `<div style="background: rgba(30,41,59,0.8); border-radius: 16px; padding: 30px; border: 1px solid #475569;">
                  ${s.keyPoints.map((p) => `<div style="font-size: 20px; color: #e2e8f0; margin-bottom: 15px; display: flex; align-items: center;"><span style="color: #38bdf8; margin-right: 15px;">⚡</span>${p}</div>`).join('')}
                </div>`
              : ''
          }
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #334155; padding-top: 20px; font-size: 16px; color: #a78bfa; font-weight: bold;">
          <span>${s.footerTag || 'Swipe to continue →'}</span>
          <span style="color: #64748b;">blog.malikhammaddigital.com</span>
        </div>
      </div>
    `
      )
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>${deckTitle} — LinkedIn Slides</title>
          <style>
            @page { size: 1080px 1080px; margin: 0; }
            body { margin: 0; padding: 0; background: #000; }
          </style>
        </head>
        <body>
          ${slidesHtml}
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const themeStyles = {
    violet: {
      bg: 'bg-gradient-to-br from-[#0c0919] via-[#090e1f] to-[#04060c]',
      border: 'border-violet-500/40',
      badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      accent: 'text-violet-400',
      glow: 'shadow-violet-600/20',
    },
    cyberpunk: {
      bg: 'bg-gradient-to-br from-[#051a14] via-[#071318] to-[#020708]',
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      accent: 'text-emerald-400',
      glow: 'shadow-emerald-600/20',
    },
    ocean: {
      bg: 'bg-gradient-to-br from-[#061224] via-[#09152b] to-[#03070f]',
      border: 'border-cyan-500/40',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      accent: 'text-cyan-400',
      glow: 'shadow-cyan-600/20',
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className="space-y-6">
      
      {/* Top Header & Theme Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-violet-400" />
            <span>LinkedIn Carousel / PDF Slide Deck</span>
          </h3>
          <p className="text-xs text-slate-400">
            5-Slide visual breakdown formatted for LinkedIn carousel PDF uploads and high-swipe viral reach.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Theme Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-[11px]">
            <button
              onClick={() => setTheme('violet')}
              className={`px-2 py-1 rounded ${theme === 'violet' ? 'bg-violet-600 text-white' : 'text-slate-400'}`}
            >
              Violet
            </button>
            <button
              onClick={() => setTheme('cyberpunk')}
              className={`px-2 py-1 rounded ${theme === 'cyberpunk' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              Cyber
            </button>
            <button
              onClick={() => setTheme('ocean')}
              className={`px-2 py-1 rounded ${theme === 'ocean' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
            >
              Ocean
            </button>
          </div>

          <button
            onClick={copySlidesText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrintPdf}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/30 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Export PDF Slides</span>
          </button>
        </div>
      </div>

      {/* Main Slide Interactive Preview Frame (1:1 Ratio or Modern Card) */}
      <div className="flex flex-col items-center">
        <div
          className={`w-full max-w-xl aspect-square rounded-3xl p-7 sm:p-9 border shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${currentTheme.bg} ${currentTheme.border} ${currentTheme.glow}`}
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Header */}
          <div className="flex items-center justify-between z-10">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${currentTheme.badge}`}
            >
              Slide {currentSlide.slideNumber} / {slides.length}
            </span>
            <span className="text-xs text-slate-400 font-medium font-[family-name:var(--font-outfit)]">
              Malik Hammad • NEXUS PULSE
            </span>
          </div>

          {/* Slide Body */}
          <div className="my-auto py-4 z-10 space-y-4">
            {currentSlide.visualCue && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-amber-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentSlide.visualCue}</span>
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-[family-name:var(--font-outfit)]">
              {currentSlide.headline}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentSlide.subtext}
            </p>

            {/* Key Bullet Points */}
            {currentSlide.keyPoints && currentSlide.keyPoints.length > 0 && (
              <div className="pt-2 space-y-2">
                {currentSlide.keyPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Slide Footer */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs font-semibold z-10">
            <span className={currentTheme.accent}>
              {currentSlide.footerTag || 'Swipe to continue →'}
            </span>
            <span className="text-slate-500 font-normal">
              blog.malikhammaddigital.com
            </span>
          </div>
        </div>

        {/* Carousel Slider Navigation Controls */}
        <div className="flex items-center justify-between w-full max-w-xl mt-4 px-2">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'w-6 bg-violet-400'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === slides.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
