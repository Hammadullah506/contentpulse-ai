'use client';

import React, { useState } from 'react';
import { RepurposeResponse } from '@/types';
import {
  MessageSquare,
  Send,
  Copy,
  Check,
  Download,
  ArrowUpRight,
  Layers,
  Video,
} from 'lucide-react';
import { TwitterXIcon, LinkedInIcon } from '@/components/icons/PlatformIcons';
import { CarouselDeckPreview } from '@/components/CarouselDeckPreview';
import { VideoScriptPreview } from '@/components/VideoScriptPreview';

interface OutputGridProps {
  data: RepurposeResponse;
}

export function OutputGrid({ data }: OutputGridProps) {
  const [activeTab, setActiveTab] = useState<
    'twitter' | 'quora' | 'linkedin' | 'whatsapp' | 'carousel' | 'video'
  >('twitter');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# ContentPulse Repurposed Assets
**Source Article**: ${data.sourceTitle}
**Source URL**: ${data.extractedUrl || 'N/A'}
**Generated At**: ${new Date().toISOString()}
**Original Word Count**: ${data.originalWordCount} words

---

## 1. Twitter / X Thread (5 Tweets)
${data.outputs.twitter.fullThreadText}

**Hashtags**: ${data.outputs.twitter.hashtags.join(' ')}

---

## 2. Quora Answer
### Question: ${data.outputs.quora.suggestedQuestion}

${data.outputs.quora.answerText}

**Key Highlights**:
${data.outputs.quora.keyBulletPoints.map((b) => `- ${b}`).join('\n')}

**Source Reference**:
${data.outputs.quora.backlinkCitation}

---

## 3. LinkedIn Post
${data.outputs.linkedin.fullPostText}

**Hashtags**: ${data.outputs.linkedin.hashtags.join(' ')}

---

## 4. Executive Briefing (WhatsApp / Telegram)
${data.outputs.whatsapp.fullMessageText}

---

## 5. Slide Carousel (5 Slides)
${data.outputs.carousel.slides
  .map(
    (s) =>
      `### Slide ${s.slideNumber}: ${s.headline}\n${s.subtext}\n${
        s.keyPoints ? s.keyPoints.map((p) => `- ${p}`).join('\n') : ''
      }\n*${s.footerTag || ''}*`
  )
  .join('\n\n')}

---

## 6. Short Video Script
**Title**: ${data.outputs.videoScript.title}
**Hook**: ${data.outputs.videoScript.hook}

${data.outputs.videoScript.scenes
  .map(
    (sc, i) =>
      `### Scene ${i + 1} (${sc.timeframe})\n- **Visual**: ${sc.visualPrompt}\n- **Overlay Text**: ${sc.onScreenText}\n- **Voiceover**: "${sc.voiceoverText}"`
  )
  .join('\n\n')}

**Voiceover Script**:\n${data.outputs.videoScript.fullVoiceover}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedTitle = data.sourceTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
    link.setAttribute('download', `contentpulse-${sanitizedTitle || 'repurposed'}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyAll = () => {
    const allText = `=== TWITTER / X THREAD ===\n${data.outputs.twitter.fullThreadText}\n\n=== QUORA ANSWER ===\n${data.outputs.quora.answerText}\n\n=== LINKEDIN POST ===\n${data.outputs.linkedin.fullPostText}\n\n=== EXECUTIVE BRIEFING ===\n${data.outputs.whatsapp.fullMessageText}\n\n=== VIDEO VOICEOVER ===\n${data.outputs.videoScript.fullVoiceover}`;
    copyToClipboard(allText, 'copy-all');
  };

  const { twitter, quora, linkedin, whatsapp, carousel, videoScript } = data.outputs;

  return (
    <div id="results-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-16 animate-in fade-in duration-200">
      
      {/* Top Bar with Title, Stats & Global Exports */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Generated Formats
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
              {data.processingTimeMs ? `${(data.processingTimeMs / 1000).toFixed(1)}s` : 'ready'}
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
            Source: <span className="text-zinc-200 font-medium">{data.sourceTitle}</span> ({data.originalWordCount} words)
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
          >
            {copiedKey === 'copy-all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">All Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy All</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium bg-white hover:bg-zinc-200 text-black transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden shadow-xl">
        
        {/* Navigation Tabs Header */}
        <div className="flex border-b border-zinc-800 bg-black overflow-x-auto">
          
          {/* Tab 1: Twitter */}
          <button
            onClick={() => setActiveTab('twitter')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'twitter'
                ? 'border-white text-white bg-zinc-900/50'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <TwitterXIcon className="w-3.5 h-3.5" />
            <span>X Thread</span>
          </button>

          {/* Tab 2: LinkedIn */}
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'linkedin'
                ? 'border-white text-white bg-zinc-900/50'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </button>

          {/* Tab 3: Quora */}
          <button
            onClick={() => setActiveTab('quora')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'quora'
                ? 'border-white text-white bg-zinc-900/50'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Quora</span>
          </button>

          {/* Tab 4: WhatsApp */}
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'border-white text-white bg-zinc-900/50'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Executive Brief</span>
          </button>

          {/* Tab 5: Carousel Slides */}
          <button
            onClick={() => setActiveTab('carousel')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'carousel'
                ? 'border-white text-white bg-zinc-900/50'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Slide Deck</span>
          </button>

          {/* Tab 6: Reel Script */}
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'video'
                ? 'border-white text-white bg-zinc-900/50'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Script</span>
          </button>

        </div>

        {/* Tab Content Panels */}
        <div className="p-5 sm:p-6">
          
          {/* TAB 1: TWITTER / X */}
          {activeTab === 'twitter' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-zinc-850">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    5-Tweet Thread
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Hook, key arguments, and closing CTA formatted within character limits.
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(twitter.fullThreadText, 'twitter-full')}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedKey === 'twitter-full' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Thread</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Thread</span>
                    </>
                  )}
                </button>
              </div>

              {/* Individual Tweet Cards */}
              <div className="space-y-3">
                {twitter.tweets.map((tweet, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-black border border-zinc-850 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span className="font-mono">
                        {index + 1}/5
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px]">
                          {tweet.text.length} chars
                        </span>
                        <button
                          onClick={() => copyToClipboard(tweet.text, `tweet-${index}`)}
                          className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          title="Copy tweet"
                        >
                          {copiedKey === `tweet-${index}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-200 whitespace-pre-line leading-relaxed font-sans">
                      {tweet.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Hashtag Strip */}
              {twitter.hashtags && twitter.hashtags.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
                  <span className="text-zinc-500 font-mono text-[11px]">Tags:</span>
                  {twitter.hashtags.map((tag, idx) => (
                    <span key={idx} className="font-mono text-zinc-300">
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LINKEDIN POST */}
          {activeTab === 'linkedin' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-zinc-850">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    LinkedIn Post
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Formatted with concise paragraph spacing and closing discussion hook.
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(linkedin.fullPostText, 'linkedin-full')}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedKey === 'linkedin-full' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Post</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 rounded-lg bg-black border border-zinc-850 space-y-4">
                <div className="text-xs sm:text-sm text-zinc-200 whitespace-pre-line leading-relaxed font-sans">
                  {linkedin.fullPostText}
                </div>

                {linkedin.hashtags && linkedin.hashtags.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-zinc-400 border-t border-zinc-900">
                    {linkedin.hashtags.map((h, i) => (
                      <span key={i}>{h.startsWith('#') ? h : `#${h}`}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: QUORA ANSWER */}
          {activeTab === 'quora' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-zinc-850">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Quora Answer
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Authoritative technical answer with source references.
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(quora.answerText, 'quora-full')}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedKey === 'quora-full' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Answer</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-1">
                  Question
                </span>
                <p className="text-sm font-medium text-white">
                  &ldquo;{quora.suggestedQuestion}&rdquo;
                </p>
              </div>

              <div className="p-5 rounded-lg bg-black border border-zinc-850 space-y-4">
                <p className="text-xs sm:text-sm text-zinc-200 whitespace-pre-line leading-relaxed">
                  {quora.answerText}
                </p>

                {quora.backlinkCitation && (
                  <div className="mt-3 p-3 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2">
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-white">Reference: </span>
                      {quora.backlinkCitation}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: WHATSAPP / TELEGRAM */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-zinc-850">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Executive Briefing
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Concise bullet points for messaging channels and newsletters.
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(whatsapp.fullMessageText, 'wa-full')}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedKey === 'wa-full' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Brief</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 rounded-lg bg-black border border-zinc-850 text-xs sm:text-sm text-zinc-200 whitespace-pre-line font-mono leading-relaxed">
                {whatsapp.fullMessageText}
              </div>
            </div>
          )}

          {/* TAB 5: SLIDE CAROUSEL */}
          {activeTab === 'carousel' && (
            <CarouselDeckPreview
              slides={carousel.slides}
              deckTitle={carousel.deckTitle || data.sourceTitle}
            />
          )}

          {/* TAB 6: 60S REEL SCRIPT */}
          {activeTab === 'video' && (
            <VideoScriptPreview script={videoScript} />
          )}

        </div>

      </div>

    </div>
  );
}
