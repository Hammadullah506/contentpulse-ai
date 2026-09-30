import { NextRequest, NextResponse } from 'next/server';
import { extractArticleFromUrl } from '@/lib/extractor';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Valid URL is required' },
        { status: 400 }
      );
    }

    const extracted = await extractArticleFromUrl(url);

    return NextResponse.json({
      success: true,
      url,
      title: extracted.title,
      content: extracted.content,
      excerpt: extracted.excerpt,
      wordCount: extracted.content.trim().split(/\s+/).filter(Boolean).length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to extract content from URL';
    return NextResponse.json(
      {
        error: message,
        fallbackTip: 'Try copying and pasting the raw article text directly into the text editor tab.',
      },
      { status: 500 }
    );
  }
}
