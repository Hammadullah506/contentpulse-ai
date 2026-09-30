'use client';

import React, { useState, useId } from 'react';
import { SAMPLE_ARTICLES } from '@/lib/presets';
import {
  FileText,
  Link2,
  Sparkles,
  Zap,
  Globe,
  Sliders,
  Check,
  RefreshCw,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';

import { useAuth } from '@/lib/auth-context';

interface ContentWorkspaceProps {
  onGenerate: (data: {
    content: string;
    url: string;
    title: string;
    tone: 'technical' | 'growth' | 'conversational' | 'executive';
    targetAudience: 'developers' | 'tech-leaders' | 'general';
    includeBacklink: boolean;
  }) => Promise<void>;
  isLoading: boolean;
  initialData?: {
    title?: string;
    url?: string;
    content?: string;
  };
  onOpenPricing?: () => void;
}

export function ContentWorkspace({
  onGenerate,
  isLoading,
  initialData,
  onOpenPricing,
}: ContentWorkspaceProps) {
  const { user, canGenerate, consumeCredit } = useAuth();
  const urlInputId = useId();
  const titleInputId = useId();
  const textInputId = useId();

  const [inputMode, setInputMode] = useState<'text' | 'url'>(
    initialData?.url && !initialData.content ? 'url' : 'text'
  );
  const [content, setContent] = useState(initialData?.content || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [tone, setTone] = useState<'technical' | 'growth' | 'conversational' | 'executive'>('technical');
  const [targetAudience, setTargetAudience] = useState<'developers' | 'tech-leaders' | 'general'>('developers');
  const [includeBacklink, setIncludeBacklink] = useState(true);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  // Compute live word and character counts
  const wordCount = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = content.length;

  // Handle Preset selection
  const handleSelectPreset = (presetId: string) => {
    const preset = SAMPLE_ARTICLES.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePresetId(presetId);
    setContent(preset.content);
    setTitle(preset.title);
    setUrl(preset.url || '');
    setExtractError(null);
  };

  // Handle URL extraction
  const handleFetchUrl = async () => {
    if (!url || !url.startsWith('http')) {
      setExtractError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setIsExtracting(true);
    setExtractError(null);

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to extract article content');
      }

      setTitle(data.title || '');
      setContent(data.content || '');
      setActivePresetId(null);
    } catch (err: unknown) {
      setExtractError(err instanceof Error ? err.message : 'Failed to fetch content from URL');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !url.trim()) {
      alert('Please enter article content or provide a URL to repurpose.');
      return;
    }

    if (!canGenerate()) {
      alert('You have used all your free credits for this month! Please upgrade to Pro for unlimited generation.');
      onOpenPricing?.();
      return;
    }

    consumeCredit();

    onGenerate({
      content,
      url,
      title,
      tone,
      targetAudience,
      includeBacklink,
    });
  };

  return (
    <div id="workspace-section" className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-12">
      <div className="glass-panel-glow rounded-3xl p-5 sm:p-8 border border-violet-500/25 relative overflow-hidden shadow-2xl">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Presets Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-violet-500/20 text-violet-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-outfit)]">
                Content Repurposing Studio
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Provide your blog article or choose a sample to test the 4 viral formats immediately.
            </p>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              Try Presets:
            </span>
            {SAMPLE_ARTICLES.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.id)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                  activePresetId === preset.id
                    ? 'bg-violet-600/40 border-violet-400 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
                title={preset.title}
              >
                {preset.id === 'vector-dbs-2026'
                  ? '🔥 Vector DBs Benchmark'
                  : preset.id === 'nextjs-fullstack-2026'
                  ? '⚡ Next.js 15 Arch'
                  : '🧠 GraphRAG Memory'}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          
          {/* Mode Switch Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex p-1 rounded-xl bg-slate-900/80 border border-slate-800">
              <button
                type="button"
                onClick={() => setInputMode('text')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  inputMode === 'text'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Raw Text / Markdown</span>
              </button>
              <button
                type="button"
                onClick={() => setInputMode('url')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  inputMode === 'url'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>Fetch from URL</span>
              </button>
            </div>

            {/* Word & Char Live Stats + User Plan Credits */}
            <div className="flex items-center gap-3 text-xs text-slate-400 bg-slate-900/50 px-3.5 py-1.5 rounded-xl border border-slate-800 flex-wrap">
              {user && (
                <>
                  <button
                    type="button"
                    onClick={onOpenPricing}
                    className="flex items-center gap-1 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {user.plan === 'pro' || user.plan === 'agency' ? (
                      <span className="text-violet-400">PRO Unlimited ⚡</span>
                    ) : (
                      <span className="text-cyan-400 hover:underline">
                        ⚡ {Math.max(0, user.maxCredits - user.creditsUsed)} / {user.maxCredits} Free Credits
                      </span>
                    )}
                  </button>
                  <span className="text-slate-600">•</span>
                </>
              )}
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Words: <strong className="text-slate-200">{wordCount}</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span>Chars: <strong className="text-slate-200">{charCount}</strong></span>
              {wordCount > 0 && (
                <>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3 h-3 text-violet-400" />
                    ~{Math.max(1, Math.ceil(wordCount / 200))} min read
                  </span>
                </>
              )}
            </div>
          </div>

          {/* URL Input Bar (Visible if inputMode === 'url' or URL is set) */}
          {inputMode === 'url' && (
            <div className="space-y-2">
              <label htmlFor={urlInputId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Article Web Address (URL)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    id={urlInputId}
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://blog.malikhammaddigital.com/vector-databases-benchmark-2026..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleFetchUrl}
                  disabled={isExtracting || !url}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 disabled:opacity-50 flex items-center gap-2 transition-all cursor-pointer"
                >
                  {isExtracting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      <span>Extracting...</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Fetch Content</span>
                    </>
                  )}
                </button>
              </div>

              {extractError && (
                <p className="text-xs text-rose-400 bg-rose-950/30 p-2.5 rounded-xl border border-rose-900/50">
                  {extractError}
                </p>
              )}
            </div>
          )}

          {/* Article Title Field */}
          <div>
            <label htmlFor={titleInputId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Article Title (Optional / Auto-Extracted)
            </label>
            <input
              id={titleInputId}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Vector Databases in 2026: Pinecone vs Qdrant vs Milvus vs Chroma"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
          </div>

          {/* Main Article Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor={textInputId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Article Body / Content
              </label>
              {content && (
                <button
                  type="button"
                  onClick={() => {
                    setContent('');
                    setTitle('');
                    setUrl('');
                    setActivePresetId(null);
                  }}
                  className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
                >
                  Clear Content
                </button>
              )}
            </div>
            <textarea
              id={textInputId}
              rows={8}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setActivePresetId(null);
              }}
              placeholder="Paste your technical article, tutorial, or case study here in plain text or markdown..."
              className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-y font-mono text-xs leading-relaxed"
            />
          </div>

          {/* Customization Grid: Tone, Audience, Backlink */}
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-violet-400" />
                <span>Voice & Tone</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'technical', label: 'Tech Authority' },
                  { id: 'growth', label: 'Growth Hacker' },
                  { id: 'conversational', label: 'Storyteller' },
                  { id: 'executive', label: 'Executive' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTone(item.id as typeof tone)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                      tone === item.id
                        ? 'bg-violet-600/30 border-violet-500 text-violet-300'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Audience Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Target Audience</span>
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'developers', label: 'Software Engineers & Devs' },
                  { id: 'tech-leaders', label: 'CTOs & Tech Leaders' },
                  { id: 'general', label: 'Tech Enthusiasts & Founders' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTargetAudience(item.id as typeof targetAudience)}
                    className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-medium border text-left flex items-center justify-between transition-all ${
                      targetAudience === item.id
                        ? 'bg-cyan-600/20 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    {targetAudience === item.id && <Check className="w-3 h-3 text-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Source Backlink Option & Tips */}
            <div className="flex flex-col justify-between">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Backlink Integration</span>
                </label>
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/40 border border-slate-800/80 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={includeBacklink}
                    onChange={(e) => setIncludeBacklink(e.target.checked)}
                    className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 border-slate-700 bg-slate-900"
                  />
                  <span className="text-xs text-slate-300">
                    Embed source link in outputs for backlink traffic
                  </span>
                </label>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-violet-950/20 border border-violet-500/20 text-[11px] text-violet-300/80 flex items-start gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                <span>Repurposes 1 article into Twitter, Quora, LinkedIn, and WhatsApp in parallel.</span>
              </div>
            </div>

          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || (!content.trim() && !url.trim())}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.008] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-white" />
                  <span>Repurposing into 4 Viral Formats (5s Pulse)...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span>Generate 4 Viral Formats Now</span>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
