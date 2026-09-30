import { NextRequest, NextResponse } from 'next/server';
import { generateRepurposedContent } from '@/lib/generator';
import { extractArticleFromUrl } from '@/lib/extractor';
import { RepurposeRequest } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: RepurposeRequest = await req.json();
    let textToProcess = body.content || '';
    let resolvedTitle = body.title || '';

    // If URL is provided and text is short or missing, extract from URL
    if (body.url && (!textToProcess || textToProcess.trim().length < 50)) {
      try {
        const extracted = await extractArticleFromUrl(body.url);
        textToProcess = extracted.content;
        if (!resolvedTitle) {
          resolvedTitle = extracted.title;
        }
      } catch (extractErr) {
        console.warn('URL extraction failed:', extractErr);
        if (!textToProcess) {
          return NextResponse.json(
            {
              error: `Could not fetch article from URL: ${extractErr instanceof Error ? extractErr.message : 'Check URL connectivity'}. You can paste the article text directly.`,
            },
            { status: 400 }
          );
        }
      }
    }

    if (!textToProcess || textToProcess.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please provide an article text with at least 20 characters or a reachable URL.' },
        { status: 400 }
      );
    }

    if (!resolvedTitle) {
      const firstLine = textToProcess.split('\n')[0].replace(/^#+\s*/, '').trim();
      resolvedTitle = firstLine.length > 5 ? firstLine : 'Technical Deep-Dive';
    }

    const result = await generateRepurposedContent(body, resolvedTitle, textToProcess);

    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
