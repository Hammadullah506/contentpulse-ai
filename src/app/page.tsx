'use client';

import React, { useState } from 'react';
import { AuthProvider } from '@/lib/auth-context';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ContentWorkspace } from '@/components/ContentWorkspace';
import { OutputGrid } from '@/components/OutputGrid';
import { FeaturesStrip } from '@/components/FeaturesStrip';
import { Footer } from '@/components/Footer';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { WordPressFeedModal } from '@/components/WordPressFeedModal';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { AuthModal } from '@/components/AuthModal';
import { PricingModal } from '@/components/PricingModal';
import { RepurposeResponse, SavedCampaign, FeedPost } from '@/types';
import { AlertCircle } from 'lucide-react';

function ContentPulseApp() {
  const [apiKey, setApiKey] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('contentpulse_api_key') || '';
      } catch {
        return '';
      }
    }
    return '';
  });

  const [provider, setProvider] = useState<'deepseek' | 'openai' | 'auto'>(() => {
    if (typeof window !== 'undefined') {
      try {
        return (
          (localStorage.getItem('contentpulse_provider') as
            | 'deepseek'
            | 'openai'
            | 'auto') || 'auto'
        );
      } catch {
        return 'auto';
      }
    }
    return 'auto';
  });

  const [campaigns, setCampaigns] = useState<SavedCampaign[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('contentpulse_campaigns');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<RepurposeResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Active workspace initial data & key for re-mounting when selecting feed post
  const [workspaceKey, setWorkspaceKey] = useState(1);
  const [workspaceData, setWorkspaceData] = useState<{
    title?: string;
    url?: string;
    content?: string;
  }>({});

  const handleSaveApiKey = (newKey: string, newProvider: 'deepseek' | 'openai' | 'auto') => {
    setApiKey(newKey);
    setProvider(newProvider);
    try {
      localStorage.setItem('contentpulse_api_key', newKey);
      localStorage.setItem('contentpulse_provider', newProvider);
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  };

  const saveCampaignToHistory = (newResult: RepurposeResponse) => {
    const newCampaign: SavedCampaign = {
      id: `camp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now(),
      sourceTitle: newResult.sourceTitle,
      extractedUrl: newResult.extractedUrl,
      wordCount: newResult.originalWordCount,
      response: newResult,
    };

    setCampaigns((prev) => {
      const updated = [newCampaign, ...prev.slice(0, 49)];
      try {
        localStorage.setItem('contentpulse_campaigns', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage save failed', err);
      }
      return updated;
    });
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem('contentpulse_campaigns', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage save failed', err);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setCampaigns([]);
    try {
      localStorage.removeItem('contentpulse_campaigns');
    } catch (e) {
      console.warn('LocalStorage clear failed', e);
    }
  };

  const scrollToWorkspace = () => {
    const el = document.getElementById('workspace-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFeedArticle = (post: FeedPost) => {
    setWorkspaceData({
      title: post.title,
      url: post.link,
      content: post.content || '',
    });
    setWorkspaceKey((k) => k + 1);
    scrollToWorkspace();
  };

  const handleRestoreCampaign = (campaign: SavedCampaign) => {
    setResults(campaign.response);
    setTimeout(() => {
      const resultsEl = document.getElementById('results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleGenerate = async (params: {
    content: string;
    url: string;
    title: string;
    tone: 'technical' | 'growth' | 'conversational' | 'executive';
    targetAudience: 'developers' | 'tech-leaders' | 'general';
    includeBacklink: boolean;
  }) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/repurpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          apiKey: apiKey || undefined,
          provider,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to repurpose article');
      }

      setResults(data);
      saveCampaignToHistory(data);

      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred during generation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <Navbar
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenFeedModal={() => setIsFeedModalOpen(true)}
        onOpenHistoryDrawer={() => setIsHistoryDrawerOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenPricingModal={() => setIsPricingModalOpen(true)}
        historyCount={campaigns.length}
        hasCustomKey={!!apiKey}
        provider={provider}
      />

      <main className="flex-1">
        {/* Hero Section with Dynamic Typewriter */}
        <Hero onScrollToWorkspace={scrollToWorkspace} />

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6">
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Content Workspace (Input + Config + Credits tracking) */}
        <ContentWorkspace
          key={workspaceKey}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          initialData={workspaceData}
          onOpenPricing={() => setIsPricingModalOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />

        {/* Repurposed Output Preview (Twitter, Quora, LinkedIn, WA, Slides, Reel) */}
        {results && <OutputGrid data={results} />}

        {/* Why ContentPulse Wins Strip */}
        <FeaturesStrip />
      </main>

      {/* Footer */}
      <Footer />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        currentKey={apiKey}
        currentProvider={provider}
      />

      {/* WordPress Blog Feed Sync Modal */}
      <WordPressFeedModal
        isOpen={isFeedModalOpen}
        onClose={() => setIsFeedModalOpen(false)}
        onSelectArticle={handleSelectFeedArticle}
      />

      {/* Campaign History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        campaigns={campaigns}
        onSelectCampaign={handleRestoreCampaign}
        onDeleteCampaign={handleDeleteCampaign}
        onClearAll={handleClearHistory}
      />

      {/* User Login & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onOpenPricing={() => setIsPricingModalOpen(true)}
      />

      {/* Pricing & Plan Upgrade Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <ContentPulseApp />
    </AuthProvider>
  );
}
