'use client';

import React, { useState, useId } from 'react';
import { SAMPLE_ARTICLES } from '@/lib/presets';
import {
  FileText,
  Link2,
  Globe,
  Sliders,
  Check,
  RefreshCw,
  Clock,
  Layers,
  ArrowRight,
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
  onOpenAuth?: () => void;
}

export function ContentWorkspace({
  onGenerate,
  isLoading,
  initialData,
  onOpenPricing,
  onOpenAuth,
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

    if (!user) {
      onOpenAuth?.();
      return;
    }

    if (!canGenerate()) {
      alert('You have used all your free credits for this month. Upgrade to Pro for unlimited generation.');
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
    <div id="workspace-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-16">
      <div className="bg-zinc-950 rounded-xl p-5 sm:p-7 border border-zinc-800 shadow-xl">
        
        {/* Top Header & Presets Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-850">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Article Studio
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Paste your article text or enter a link to produce tailored social drafts.
            </p>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mr-1">
              Sample:
            </span>
            {SAMPLE_ARTICLES.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.id)}
                className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                  activePresetId === preset.id
                    ? 'bg-zinc-800 border-zinc-600 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {preset.id === 'vector-dbs-2026'
                  ? 'Vector DBs'
                  : preset.id === 'nextjs-fullstack-2026'
                  ? 'Next.js 15'
                  : 'GraphRAG'}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          
          {/* Mode Switch Tabs & Word Counts */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex p-0.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <button
                type="button"
                onClick={() => setInputMode('text')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  inputMode === 'text'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Text / Markdown</span>
              </button>
              <button
                type="button"
                onClick={() => setInputMode('url')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  inputMode === 'url'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>Article URL</span>
              </button>
            </div>

            {/* Live Stats */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span>{wordCount} words</span>
              <span>/</span>
              <span>{charCount} chars</span>
              {wordCount > 0 && (
                <>
                  <span>/</span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    ~{Math.max(1, Math.ceil(wordCount / 200))} min read
                  </span>
                </>
              )}
            </div>
          </div>

          {/* URL Input Bar */}
          {inputMode === 'url' && (
            <div className="space-y-2">
              <label htmlFor={urlInputId} className="block text-xs font-mono uppercase text-zinc-400">
                Article URL
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    id={urlInputId}
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/blog/my-technical-post"
                    className="w-full pl-9 pr-3 py-2 rounded-md bg-black border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleFetchUrl}
                  disabled={isExtracting || !url}
                  className="px-3.5 py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-medium border border-zinc-800 disabled:opacity-50 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {isExtracting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-zinc-400" />
                      <span>Fetching...</span>
                    </>
                  ) : (
                    <span>Fetch Article</span>
                  )}
                </button>
              </div>

              {extractError && (
                <p className="text-xs text-red-400 bg-red-950/20 p-2 rounded border border-red-900/30">
                  {extractError}
                </p>
              )}
            </div>
          )}

          {/* Article Title Field */}
          <div>
            <label htmlFor={titleInputId} className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Title (Optional)
            </label>
            <input
              id={titleInputId}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. In-Depth Guide: Designing Resilient Microservices"
              className="w-full px-3 py-2 rounded-md bg-black border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {/* Main Article Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor={textInputId} className="block text-xs font-mono uppercase text-zinc-400">
                Body Content
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
                  className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Clear
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
              placeholder="Paste article markdown or text here..."
              className="w-full p-3 rounded-md bg-black border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 resize-y font-mono leading-relaxed transition-colors"
            />
          </div>

          {/* Customization Grid: Tone, Audience, Backlink */}
          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-850 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                <span>Tone of Voice</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'technical', label: 'Technical' },
                  { id: 'growth', label: 'Direct & Punchy' },
                  { id: 'conversational', label: 'Narrative' },
                  { id: 'executive', label: 'Executive' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTone(item.id as typeof tone)}
                    className={`py-1.5 px-2 rounded-md text-xs font-medium border text-center transition-colors cursor-pointer ${
                      tone === item.id
                        ? 'bg-zinc-800 border-zinc-600 text-white'
                        : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Audience Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-zinc-400" />
                <span>Target Audience</span>
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'developers', label: 'Engineers & Developers' },
                  { id: 'tech-leaders', label: 'CTOs & Engineering Managers' },
                  { id: 'general', label: 'Founders & Product Teams' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTargetAudience(item.id as typeof targetAudience)}
                    className={`w-full py-1.5 px-2.5 rounded-md text-xs font-medium border text-left flex items-center justify-between transition-colors cursor-pointer ${
                      targetAudience === item.id
                        ? 'bg-zinc-800 border-zinc-600 text-white'
                        : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    {targetAudience === item.id && <Check className="w-3 h-3 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Source Backlink Option */}
            <div className="flex flex-col justify-between">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Attribution</span>
                </label>
                <label className="flex items-center gap-2.5 p-2 rounded-md bg-black border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeBacklink}
                    onChange={(e) => setIncludeBacklink(e.target.checked)}
                    className="w-4 h-4 rounded text-zinc-800 focus:ring-0 border-zinc-700 bg-zinc-900"
                  />
                  <span className="text-xs text-zinc-300">
                    Include source URL in output drafts
                  </span>
                </label>
              </div>

              <div className="mt-3 text-[11px] text-zinc-500">
                Formats: 5-Tweet Thread, LinkedIn Update, Quora Answer, and Executive Briefing.
              </div>
            </div>

          </div>

          {/* Primary Action Button (Vercel Style Solid White Button) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || (!content.trim() && !url.trim())}
              className="w-full py-3 px-5 rounded-md bg-white hover:bg-zinc-200 disabled:opacity-40 text-black font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Generating platform drafts...</span>
                </>
              ) : !user ? (
                <>
                  <span>Sign In to Generate Content (3 Free Credits)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Generate Distribution Drafts</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
