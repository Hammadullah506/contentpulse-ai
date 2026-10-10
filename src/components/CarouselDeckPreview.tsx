'use client';

import React, { useState } from 'react';
import { CarouselSlide } from '@/types';
import { ChevronLeft, ChevronRight, Copy, Check, Download, Layers } from 'lucide-react';

interface CarouselDeckPreviewProps {
  slides: CarouselSlide[];
  deckTitle: string;
}

export function CarouselDeckPreview({ slides, deckTitle }: CarouselDeckPreviewProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
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

  const handlePrintPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const slidesHtml = slides
      .map(
        (s) => `
      <div style="page-break-after: always; width: 1080px; height: 1080px; background: #000000; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding: 70px; box-sizing: border-box; border: 1px solid #262626;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #262626; padding-bottom: 24px;">
          <span style="font-size: 18px; font-weight: 600; color: #ffffff;">ContentPulse • Slide ${s.slideNumber}/${slides.length}</span>
          <span style="font-size: 16px; color: #71717a;">Malik Hammad</span>
        </div>
        <div style="margin: auto 0;">
          <h1 style="font-size: 44px; font-weight: 700; line-height: 1.2; margin-bottom: 24px; color: #ffffff;">${s.headline}</h1>
          <p style="font-size: 22px; color: #a1a1aa; line-height: 1.5; margin-bottom: 32px;">${s.subtext}</p>
          ${
            s.keyPoints
              ? `<div style="background: #0a0a0a; border-radius: 12px; padding: 28px; border: 1px solid #262626;">
                  ${s.keyPoints.map((p) => `<div style="font-size: 20px; color: #ededed; margin-bottom: 14px; display: flex; align-items: center;"><span style="color: #71717a; margin-right: 14px;">—</span>${p}</div>`).join('')}
                </div>`
              : ''
          }
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #262626; padding-top: 24px; font-size: 16px; color: #a1a1aa; font-weight: 500;">
          <span>${s.footerTag || 'Swipe to continue →'}</span>
          <span style="color: #71717a;">malikhammaddigital.com</span>
        </div>
      </div>
    `
      )
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>${deckTitle} — Slides</title>
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

  return (
    <div className="space-y-5">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-850">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-400" />
            <span>Slide Deck (PDF / LinkedIn)</span>
          </h3>
          <p className="text-xs text-zinc-400">
            5-Slide visual breakdown formatted for LinkedIn carousel PDFs.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={copySlidesText}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrintPdf}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Slide Interactive Preview Frame */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xl aspect-square rounded-xl p-6 sm:p-8 border border-zinc-800 bg-black text-white flex flex-col justify-between shadow-2xl relative">
          
          {/* Slide Header */}
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>
              Slide {currentSlide.slideNumber} / {slides.length}
            </span>
            <span>ContentPulse</span>
          </div>

          {/* Slide Body */}
          <div className="my-auto py-4 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
              {currentSlide.headline}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {currentSlide.subtext}
            </p>

            {/* Key Bullet Points */}
            {currentSlide.keyPoints && currentSlide.keyPoints.length > 0 && (
              <div className="pt-2 space-y-1.5">
                {currentSlide.keyPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2 rounded-md bg-zinc-950 border border-zinc-850 text-xs text-zinc-300"
                  >
                    <span className="text-zinc-500 font-mono">—</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Slide Footer */}
          <div className="flex items-center justify-between border-t border-zinc-850 pt-3 text-xs text-zinc-500">
            <span className="text-zinc-400">
              {currentSlide.footerTag || 'Swipe to continue →'}
            </span>
            <span>malikhammaddigital.com</span>
          </div>
        </div>

        {/* Carousel Slider Controls */}
        <div className="flex items-center justify-between w-full max-w-xl mt-3 px-1">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'w-4 bg-white'
                    : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === slides.length - 1}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
