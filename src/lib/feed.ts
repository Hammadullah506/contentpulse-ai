import { FeedPost } from '@/types';

/**
 * Fetches and parses WordPress RSS feed
 */
export async function fetchWordPressFeed(blogUrl: string): Promise<FeedPost[]> {
  try {
    let cleanUrl = blogUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    // Normalize feed URL
    const possibleUrls = [
      cleanUrl.endsWith('/feed') || cleanUrl.endsWith('/feed/') ? cleanUrl : `${cleanUrl.replace(/\/$/, '')}/feed/`,
      cleanUrl.endsWith('/?feed=rss2') ? cleanUrl : `${cleanUrl.replace(/\/$/, '')}/?feed=rss2`,
      cleanUrl,
    ];

    let xmlText = '';
    for (const testUrl of possibleUrls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const res = await fetch(testUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ContentPulseFeedReader/1.0',
            Accept: 'application/rss+xml, application/xml, text/xml, */*',
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const text = await res.text();
          if (text.includes('<rss') || text.includes('<feed') || text.includes('<item>')) {
            xmlText = text;
            break;
          }
        }
      } catch (e) {
        console.warn(`Failed fetching from ${testUrl}`, e);
      }
    }

    if (!xmlText) {
      throw new Error('Could not find a valid WordPress RSS feed at this URL.');
    }

    return parseRssXml(xmlText);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown feed error';
    throw new Error(`WordPress Feed fetch failed: ${msg}`);
  }
}

/**
 * Parses RSS XML into FeedPost items
 */
export function parseRssXml(xml: string): FeedPost[] {
  const posts: FeedPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null && posts.length < 15) {
    const itemContent = match[1];

    const titleMatch = itemContent.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) ||
      itemContent.match(/<title>([\s\S]*?)<\/title>/i);

    const linkMatch = itemContent.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/i) ||
      itemContent.match(/<link>([\s\S]*?)<\/link>/i);

    const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

    const descMatch = itemContent.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) ||
      itemContent.match(/<description>([\s\S]*?)<\/description>/i);

    const encodedMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i);

    const rawTitle = titleMatch ? titleMatch[1].trim() : 'Untitled Post';
    const rawLink = linkMatch ? linkMatch[1].trim() : '';
    const rawPubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
    const rawExcerpt = descMatch ? descMatch[1] : '';
    const rawContent = encodedMatch ? encodedMatch[1] : rawExcerpt;

    // Clean HTML from excerpt
    const cleanExcerpt = rawExcerpt.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const cleanContent = rawContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    if (rawTitle && rawLink) {
      posts.push({
        title: decodeHtmlEntities(rawTitle),
        link: rawLink,
        pubDate: rawPubDate ? new Date(rawPubDate).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }) : undefined,
        excerpt: decodeHtmlEntities(cleanExcerpt).slice(0, 140) + (cleanExcerpt.length > 140 ? '...' : ''),
        content: cleanContent,
      });
    }
  }

  return posts;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#038;/g, '&');
}
