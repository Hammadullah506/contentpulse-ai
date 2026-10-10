'use client';

import React, { useState } from 'react';
import { VideoScript } from '@/types';
import { Video, Clock, Copy, Check, Eye, Volume2 } from 'lucide-react';

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
    const text = `TITLE: ${script.title}\nDURATION: ${script.estimatedDuration}\nHOOK: ${script.hook}\n\nSCENES:\n` +
      script.scenes
        .map(
          (s, i) =>
            `--- SCENE ${i + 1} (${s.timeframe}) ---\n[VISUAL]: ${s.visualPrompt}\n[OVERLAY]: ${s.onScreenText}\n[VOICEOVER]: "${s.voiceoverText}"\n`
        )
        .join('\n') +
      `\nCALL TO ACTION: ${script.callToAction}`;

    copyToClipboard(text, 'scenes');
  };

  return (
    <div className="space-y-5">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-850">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-zinc-400" />
            <span>Short Video Script (Reels / Shorts)</span>
          </h3>
          <p className="text-xs text-zinc-400">
            Formatted with visual cues, overlay text, and voiceover pacing.
          </p>
        </div>

        {/* View Toggle & Copy Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 p-0.5 bg-zinc-900 rounded-md border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                activeTab === 'timeline' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Scenes
            </button>
            <button
              onClick={() => setActiveTab('teleprompter')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                activeTab === 'teleprompter' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Teleprompter
            </button>
          </div>

          <button
            onClick={() => copyToClipboard(script.fullVoiceover, 'voiceover')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {copiedKey === 'voiceover' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied Voiceover</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Copy Voiceover</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyScenes}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer"
          >
            {copiedKey === 'scenes' ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>Copied All</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Script Title Banner */}
      <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-mono uppercase text-zinc-500 block">
            Title
          </span>
          <h4 className="text-sm font-semibold text-white">
            {script.title}
          </h4>
        </div>

        <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Duration: ~{script.estimatedDuration}</span>
        </div>
      </div>

      {/* View 1: Timeline Mode */}
      {activeTab === 'timeline' && (
        <div className="space-y-3">
          {script.scenes.map((scene, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-black border border-zinc-850 space-y-2.5"
            >
              {/* Scene Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-zinc-400">
                    Scene {index + 1}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400 font-mono">
                    {scene.timeframe}
                  </span>
                </div>

                <div className="text-zinc-400 text-xs font-mono">
                  Overlay: &ldquo;{scene.onScreenText}&rdquo;
                </div>
              </div>

              {/* Visual Cue */}
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-850 text-xs text-zinc-400 flex items-start gap-2">
                <Eye className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-300 font-medium">Visual: </span>
                  {scene.visualPrompt}
                </div>
              </div>

              {/* Voiceover */}
              <div className="p-3 rounded bg-zinc-900/40 border border-zinc-800 text-xs sm:text-sm text-zinc-200">
                <span className="text-zinc-500 font-mono text-[11px] block mb-1">
                  Voiceover:
                </span>
                &ldquo;{scene.voiceoverText}&rdquo;
              </div>

            </div>
          ))}

          {/* CTA */}
          {script.callToAction && (
            <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400">
              <strong className="text-white">Call to action: </strong>
              {script.callToAction}
            </div>
          )}
        </div>
      )}

      {/* View 2: Continuous Teleprompter Mode */}
      {activeTab === 'teleprompter' && (
        <div className="p-5 rounded-lg bg-black border border-zinc-850 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-850 text-xs text-zinc-500 font-mono">
            <span>Teleprompter View</span>
            <span>~140 wpm</span>
          </div>

          <p className="text-sm sm:text-base text-zinc-200 font-sans leading-relaxed whitespace-pre-line p-3 rounded bg-zinc-950 border border-zinc-800">
            {script.fullVoiceover}
          </p>
        </div>
      )}

    </div>
  );
}
