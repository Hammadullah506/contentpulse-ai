'use client';

import React, { useState } from 'react';
import { VideoScript } from '@/types';
import { Video, Clock, Copy, Check, Sparkles, Eye, Volume2 } from 'lucide-react';

interface VideoScriptPreviewProps {
  script: VideoScript;
}

export function VideoScriptPreview({ script }: VideoScriptPreviewProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'teleprompter'>('timeline');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyScenes = () => {
    const text = `VIDEO TITLE: ${script.title}\nESTIMATED DURATION: ${script.estimatedDuration}\nHOOK: ${script.hook}\n\nSCENE BREAKDOWN:\n` +
      script.scenes
        .map(
          (s, i) =>
            `--- SCENE ${i + 1} (${s.timeframe}) ---\n[VISUAL]: ${s.visualPrompt}\n[TEXT ON SCREEN]: ${s.onScreenText}\n[VOICEOVER]: "${s.voiceoverText}"\n`
        )
        .join('\n') +
      `\nCALL TO ACTION: ${script.callToAction}`;

    copyToClipboard(text, 'scenes');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-rose-400" />
            <span>60s YouTube Short & Instagram Reel Script</span>
          </h3>
          <p className="text-xs text-slate-400">
            Engineered for high retention: 3-second hook, visual B-roll cues, on-screen text overlays, and voiceover text.
          </p>
        </div>

        {/* View Toggle & Copy Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-[11px]">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-2.5 py-1 rounded font-medium ${
                activeTab === 'timeline' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Scene Timeline
            </button>
            <button
              onClick={() => setActiveTab('teleprompter')}
              className={`px-2.5 py-1 rounded font-medium ${
                activeTab === 'teleprompter' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Teleprompter
            </button>
          </div>

          <button
            onClick={() => copyToClipboard(script.fullVoiceover, 'voiceover')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition-colors"
          >
            {copiedKey === 'voiceover' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied Audio Voiceover!</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Copy Voiceover</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyScenes}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition-all cursor-pointer"
          >
            {copiedKey === 'scenes' ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied All Scenes!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white" />
                <span>Copy Full Script</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Script Metadata Banner */}
      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block">
            Suggested Short Title
          </span>
          <h4 className="text-base font-bold text-white font-[family-name:var(--font-outfit)]">
            {script.title}
          </h4>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs text-rose-300">
          <span className="flex items-center gap-1.5 bg-rose-900/40 px-3 py-1.5 rounded-xl border border-rose-500/30">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>Target: ~{script.estimatedDuration}</span>
          </span>
        </div>
      </div>

      {/* View 1: Timeline Mode */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          {script.scenes.map((scene, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              {/* Scene Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 text-xs font-bold font-mono">
                    Scene {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {scene.timeframe}
                  </span>
                </div>

                <div className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/25 text-xs font-bold">
                  Overlay: &ldquo;{scene.onScreenText}&rdquo;
                </div>
              </div>

              {/* Visual Cue Instruction */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <Eye className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-cyan-300">Camera / Visual Direction: </span>
                  {scene.visualPrompt}
                </div>
              </div>

              {/* Spoken Voiceover Text */}
              <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-500/25 text-xs sm:text-sm text-slate-100 flex items-start gap-2.5">
                <Volume2 className="w-4 h-4 text-violet-400 shrink-0 mt-1" />
                <div>
                  <span className="font-semibold text-violet-300 block text-xs uppercase mb-1">
                    Spoken Voiceover:
                  </span>
                  &ldquo;{scene.voiceoverText}&rdquo;
                </div>
              </div>

            </div>
          ))}

          {/* Call to action card */}
          {script.callToAction && (
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-white">Closing CTA: </strong>
                {script.callToAction}
              </span>
            </div>
          )}
        </div>
      )}

      {/* View 2: Continuous Teleprompter Mode */}
      {activeTab === 'teleprompter' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
            <span>Continuous Voiceover Readout (Ready for Microphone / Loom / ElevenLabs)</span>
            <span>Speed: ~140 wpm</span>
          </div>

          <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed whitespace-pre-line p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            {script.fullVoiceover}
          </p>

          <div className="pt-2 text-xs text-slate-500 italic">
            Tip: Record this in one take while screen-recording your browser terminal benchmarks for a high-converting Short!
          </div>
        </div>
      )}

    </div>
  );
}
