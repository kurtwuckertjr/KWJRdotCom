/**
 * Agent 2: AEO/GEO Authority Agent (Claude Sonnet)
 *
 * Builds maximum authority and trust with every article across both
 * traditional search and AI-powered answer engines.
 */

const SEO_SYSTEM_PROMPT = `You are an AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) agent for kurtwuckertjr.com, the personal blog of Kurt Wuckert Jr. Your job is to analyze article content and generate structured data, metadata, and optimization suggestions that maximize authority and trust across search engines and AI answer engines (Google AI Overviews, Perplexity, ChatGPT Search, Bing Copilot).

## Author Information
- Name: Kurt Wuckert Jr.
- Site: https://kurtwuckertjr.com
- Author image: https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/refs/heads/main/public/kwjr.webp
- Category-specific titles:
  - Bitcoin: "Chief Bitcoin Historian"
  - Fitness: "BJJ Black Belt & Competition Coach"
  - Politics: "Independent American"
  - Religion: "Protestant Christian"
  - Business: "Founder, GorillaPool & Open Protocol Labs"

## Your Tasks

Given an article's title, category, excerpt, markdown content, and URL slug, produce a JSON response with these fields:

### 1. meta_description (string)
- Exactly 150-155 characters
- Optimized for snippet extraction by AI engines
- Includes the primary keyword naturally
- Answers the implied question of the title

### 2. json_ld (object)
Complete JSON-LD graph with:
- **BlogPosting**: type, headline, description, author (Person with sameAs, jobTitle, image), publisher, datePublished, dateModified, wordCount, image, mainEntityOfPage, articleSection, keywords
- **BreadcrumbList**: Home > Archive > Category > Article
- **FAQPage** (if applicable): Extract natural Q&A pairs from the content. Only include if the content has actual question-answer structures.
- **SpeakableSpecification**: cssSelector array targeting the most quotable passages
- **HowTo** (if applicable): Only for step-by-step instructional content

### 3. keywords (string[])
- 5-10 relevant keywords/phrases
- Mix of head terms and long-tail
- Include the article's main topic and related concepts

### 4. questions (object[])
Question-answer pairs extracted from the content that AI engines could use as direct answers.
Each: { question: string, answer: string }
- Only include genuinely answerable questions from the content
- Answers should be 1-3 sentences, self-contained

### 5. entities (object[])
People, concepts, technologies, organizations mentioned.
Each: { name: string, type: string, sameAs?: string }
- type: Person, Organization, Technology, Concept, Place, etc.
- sameAs: Wikipedia or official URL when identifiable

### 6. authority_signals (object)
{
  schema_completeness: number (0-100),
  entity_linking_score: number (0-100),
  citation_worthiness: number (0-100),
  aeo_readiness: number (0-100),
  overall: number (0-100),
  issues: string[]  // things to fix
}

### 7. suggestions (object[])
Specific improvement suggestions.
Each: { type: "title" | "content" | "schema" | "entity" | "internal_link", message: string, priority: "high" | "medium" | "low" }

### 8. internal_links (object[])
Suggestions for linking to other articles on the site.
Each: { slug: string, title: string, relevance: string }
- Only suggest links to articles from the provided existing posts list

## Rules
- All JSON-LD must be valid Schema.org vocabulary
- Use https://schema.org as @context
- datePublished and dateModified in ISO 8601 format
- Author sameAs should include relevant social/professional profiles
- Never fabricate facts or quotes not in the source content
- Be conservative with authority scores. 90+ means publication-quality SEO

## Response Format
Return ONLY valid JSON. No markdown, no code fences, no commentary.`;

export interface SeoAgentRequest {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  markdown: string;
  date: string;
  wordCount: number;
  existingPosts: { slug: string; title: string; category: string }[];
}

export interface SeoSuggestion {
  type: 'title' | 'content' | 'schema' | 'entity' | 'internal_link';
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SeoQuestion {
  question: string;
  answer: string;
}

export interface SeoEntity {
  name: string;
  type: string;
  sameAs?: string;
}

export interface AuthoritySignals {
  schema_completeness: number;
  entity_linking_score: number;
  citation_worthiness: number;
  aeo_readiness: number;
  overall: number;
  issues: string[];
}

export interface InternalLink {
  slug: string;
  title: string;
  relevance: string;
}

export interface SeoAgentResponse {
  meta_description: string;
  json_ld: Record<string, unknown>;
  keywords: string[];
  questions: SeoQuestion[];
  entities: SeoEntity[];
  authority_signals: AuthoritySignals;
  suggestions: SeoSuggestion[];
  internal_links: InternalLink[];
}

export async function runSeoAgent(
  req: SeoAgentRequest,
  apiKey: string,
): Promise<SeoAgentResponse> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const { getStandardsPromptSection } = await import('./schema-standards');

  const client = new Anthropic({ apiKey });

  // Fetch current Schema.org standards context
  const standardsSection = await getStandardsPromptSection();
  const systemPrompt = SEO_SYSTEM_PROMPT + '\n' + standardsSection;

  const existingPostsList = req.existingPosts
    .map((p) => `- [${p.title}](/post/${p.slug}) (${p.category})`)
    .join('\n');

  const userPrompt = `Analyze this article and generate the full AEO/GEO optimization data.

**Title**: ${req.title}
**Slug**: ${req.slug}
**Category**: ${req.category}
**Excerpt**: ${req.excerpt}
**Date**: ${req.date}
**Word Count**: ${req.wordCount}
**URL**: https://kurtwuckertjr.com/post/${req.slug}

**Existing articles on the site** (for internal linking suggestions):
${existingPostsList || '(none yet)'}

**Article content**:
${req.markdown}`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    temperature: 0.2,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => (block as { type: 'text'; text: string }).text)
    .join('');

  // Strip any accidental code fences
  const cleaned = text
    .replace(/^```(?:json)?\n/m, '')
    .replace(/\n```\s*$/m, '')
    .trim();

  try {
    return JSON.parse(cleaned) as SeoAgentResponse;
  } catch {
    // If parsing fails, return a minimal valid response
    return {
      meta_description: req.excerpt.slice(0, 155),
      json_ld: {},
      keywords: [],
      questions: [],
      entities: [],
      authority_signals: {
        schema_completeness: 0,
        entity_linking_score: 0,
        citation_worthiness: 0,
        aeo_readiness: 0,
        overall: 0,
        issues: ['Failed to parse agent response'],
      },
      suggestions: [{ type: 'schema', message: 'SEO agent returned invalid JSON. Try again.', priority: 'high' }],
      internal_links: [],
    };
  }
}
