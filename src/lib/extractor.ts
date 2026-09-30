/**
 * Helper to fetch and extract clean article text and metadata from a URL
 */
export async function extractArticleFromUrl(url: string): Promise<{
  title: string;
  content: string;
  excerpt: string;
}> {
  try {
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid URL protocol. Please provide an http or https URL.');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 ContentPulseBot/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch article: HTTP status ${response.status}`);
    }

    const html = await response.text();
    return parseHtmlContent(html, url);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error during extraction';
    throw new Error(`Extraction failed: ${errorMsg}`);
  }
}

/**
 * Cleanly extracts title and readable body from HTML
 */
export function parseHtmlContent(html: string, fallbackUrl?: string): {
  title: string;
  content: string;
  excerpt: string;
} {
  // Extract Title
  let title = '';
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    title = titleMatch[1].trim();
  }

  // Check OpenGraph title
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  if (ogTitleMatch && ogTitleMatch[1]) {
    title = ogTitleMatch[1].trim();
  }

  if (!title && fallbackUrl) {
    try {
      const u = new URL(fallbackUrl);
      title = u.pathname.replace(/^\/|\/$/g, '').split('/').pop()?.replace(/[-_]/g, ' ') || 'Untitled Article';
      title = title.charAt(0).toUpperCase() + title.slice(1);
    } catch {
      title = 'Extracted Article';
    }
  }

  // Remove scripts, styles, svg, forms, nav, footer, header
  const cleanHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ')
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ')
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ' ')
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');

  // Try to find <article> or <main> tag first
  const articleMatch = cleanHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const mainMatch = cleanHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const bodyMatch = cleanHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  let targetContent = articleMatch ? articleMatch[1] : (mainMatch ? mainMatch[1] : (bodyMatch ? bodyMatch[1] : cleanHtml));

  // Convert headings and paragraphs to markdown-like spacing
  targetContent = targetContent
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '\n> $1\n');

  // Strip all other HTML tags
  let text = targetContent.replace(/<[^>]+>/g, ' ');

  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');

  // Normalize excessive whitespaces
  text = text
    .split('\n')
    .map(line => line.trim())
    .filter((line, i, arr) => line.length > 0 || (i > 0 && arr[i - 1].length > 0))
    .join('\n')
    .trim();

  // Excerpt
  const plainWords = text.replace(/[#\-\*>`]/g, '').trim().split(/\s+/);
  const excerpt = plainWords.slice(0, 45).join(' ') + (plainWords.length > 45 ? '...' : '');

  return {
    title: title || 'Extracted Technical Article',
    content: text,
    excerpt,
  };
}
