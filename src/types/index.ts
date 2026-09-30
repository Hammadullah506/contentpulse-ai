export interface RepurposeRequest {
  content?: string;
  url?: string;
  title?: string;
  tone?: 'technical' | 'growth' | 'conversational' | 'executive';
  targetAudience?: 'developers' | 'tech-leaders' | 'general';
  includeBacklink?: boolean;
  apiKey?: string;
  provider?: 'deepseek' | 'openai' | 'auto';
}

export interface TweetItem {
  tweetNumber: number;
  text: string;
  characterCount: number;
  hashtags: string[];
}

export interface CarouselSlide {
  slideNumber: number;
  headline: string;
  subtext: string;
  keyPoints?: string[];
  visualCue?: string;
  footerTag?: string;
}

export interface ReelScriptScene {
  timeframe: string;
  visualPrompt: string;
  voiceoverText: string;
  onScreenText: string;
}

export interface VideoScript {
  title: string;
  hook: string;
  estimatedDuration: string;
  scenes: ReelScriptScene[];
  fullVoiceover: string;
  callToAction: string;
}

export interface RepurposeOutputs {
  twitter: {
    headline: string;
    tweets: TweetItem[];
    fullThreadText: string;
    hashtags: string[];
  };
  quora: {
    suggestedQuestion: string;
    answerText: string;
    keyBulletPoints: string[];
    backlinkCitation: string;
  };
  linkedin: {
    hookLine: string;
    body: string;
    callToAction: string;
    hashtags: string[];
    fullPostText: string;
  };
  whatsapp: {
    channelHeadline: string;
    executiveSummary: string;
    bulletPoints: string[];
    actionUrlCallout: string;
    fullMessageText: string;
  };
  carousel: {
    deckTitle: string;
    theme: string;
    slides: CarouselSlide[];
  };
  videoScript: VideoScript;
}

export interface RepurposeResponse {
  success: boolean;
  sourceTitle: string;
  originalWordCount: number;
  extractedUrl?: string;
  processingTimeMs: number;
  outputs: RepurposeOutputs;
  error?: string;
}

export interface PresetArticle {
  id: string;
  title: string;
  category: string;
  url?: string;
  content: string;
  readingTime: string;
}

export interface SavedCampaign {
  id: string;
  timestamp: number;
  sourceTitle: string;
  extractedUrl?: string;
  wordCount: number;
  response: RepurposeResponse;
}

export interface FeedPost {
  title: string;
  link: string;
  pubDate?: string;
  author?: string;
  excerpt?: string;
  content?: string;
}

export type PlanType = 'free' | 'pro' | 'agency';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: PlanType;
  creditsUsed: number;
  maxCredits: number; // e.g. 3 for free, unlimited for pro (-1)
  joinedDate: string;
}

export interface PricingPlan {
  id: PlanType;
  name: string;
  badge?: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}
