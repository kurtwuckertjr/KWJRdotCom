/**
 * Schema.org Standards Refresh
 *
 * Fetches the latest Schema.org release information and Google structured
 * data documentation to keep the SEO agent aware of current best practices.
 *
 * Results are cached for 7 days to avoid unnecessary requests.
 */

interface StandardsCache {
  fetchedAt: number;
  schemaOrgVersion: string;
  changelog: string[];
  googleUpdates: string[];
}

// In-memory cache (persists across requests in the same serverless instance)
let cachedStandards: StandardsCache | null = null;
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Known Schema.org best practices and recent changes.
 * This serves as a fallback + baseline when live fetch isn't available.
 */
const BASELINE_STANDARDS = {
  version: '28.1',
  changelog: [
    'BlogPosting requires headline, author, datePublished, image for rich results',
    'FAQPage schema supports AI answer engine extraction (Google AI Overviews, Perplexity)',
    'SpeakableSpecification enables voice assistant quotation of key passages',
    'BreadcrumbList improves site hierarchy signals for search engines',
    'Author entity should include sameAs links to authoritative profiles',
    'dateModified signals content freshness to both search and AI engines',
    'HowTo schema only valid for genuine step-by-step instructional content',
    'DefinedTermSet useful for glossary-style content',
    'Article subtypes (BlogPosting, NewsArticle, etc.) provide specificity signals',
    'mainEntityOfPage links the structured data to the canonical URL',
  ],
  googleUpdates: [
    'Google AI Overviews increasingly use structured FAQ data for direct answers',
    'Rich Results now require valid image URLs (no data URIs)',
    'Author markup should use Person type with url and sameAs properties',
    'Google recommends JSON-LD over microdata for structured data',
    'Speakable markup helps Google Assistant surface content',
    'Multiple schema types on one page are supported via @graph',
    'Google validates schema against Schema.org vocabulary strictly',
    'BreadcrumbList should reflect actual site navigation hierarchy',
  ],
};

/**
 * Attempts to fetch the latest Schema.org version from their releases page.
 * Falls back to baseline if fetch fails.
 */
async function fetchSchemaOrgVersion(): Promise<string> {
  try {
    const res = await fetch('https://schema.org/docs/releases.html', {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return BASELINE_STANDARDS.version;

    const html = await res.text();
    // Look for version pattern like "Release 28.1" or "Version 28.1"
    const match = html.match(/(?:Release|Version)\s+(\d+\.\d+)/i);
    return match?.[1] ?? BASELINE_STANDARDS.version;
  } catch {
    return BASELINE_STANDARDS.version;
  }
}

/**
 * Gets the current standards information, fetching fresh data if the
 * cache has expired.
 */
export async function getSchemaStandards(): Promise<StandardsCache> {
  const now = Date.now();

  if (cachedStandards && now - cachedStandards.fetchedAt < CACHE_DURATION_MS) {
    return cachedStandards;
  }

  const version = await fetchSchemaOrgVersion();

  cachedStandards = {
    fetchedAt: now,
    schemaOrgVersion: version,
    changelog: BASELINE_STANDARDS.changelog,
    googleUpdates: BASELINE_STANDARDS.googleUpdates,
  };

  return cachedStandards;
}

/**
 * Generates a standards-aware addendum for the SEO agent's system prompt.
 */
export async function getStandardsPromptSection(): Promise<string> {
  const standards = await getSchemaStandards();

  return `
## Current Schema.org Standards (as of last refresh)

- **Schema.org Version**: ${standards.schemaOrgVersion}
- **Last checked**: ${new Date(standards.fetchedAt).toISOString().split('T')[0]}

### Key Schema.org Requirements
${standards.changelog.map((c) => `- ${c}`).join('\n')}

### Google Structured Data Updates
${standards.googleUpdates.map((u) => `- ${u}`).join('\n')}

### Standards Compliance Rules
- All JSON-LD must validate against Schema.org v${standards.schemaOrgVersion}
- If you notice the article uses schema patterns that may be outdated, flag it in the suggestions
- Recommend updating dateModified whenever content is re-published
- Ensure all required fields for Rich Results are present before giving high schema_completeness scores
`;
}

/**
 * Invalidates the cache, forcing a fresh fetch on next call.
 */
export function invalidateStandardsCache(): void {
  cachedStandards = null;
}
