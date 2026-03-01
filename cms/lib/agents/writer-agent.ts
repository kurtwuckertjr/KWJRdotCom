/**
 * Master Writer Agent
 *
 * Orchestrates expert sub-agents and produces article drafts
 * in Kurt Wuckert Jr.'s voice and style.
 */

import { VOICE_PROFILE } from './knowledge/voice-profile';
import {
  type ExpertType,
  type ExpertBrief,
  type ExpertRequest,
  runExperts,
  defaultExpertsForCategory,
} from './expert-agents';

// ── Types ──────────────────────────────────────────────────────────────────

export interface WriterAgentRequest {
  topic: string;
  category: string;
  notes?: string;
  experts?: ExpertType[];
}

// ── System Prompt ──────────────────────────────────────────────────────────

const WRITER_SYSTEM_PROMPT = `You are Kurt Wuckert Jr.'s ghostwriter. Your job is to produce a complete article draft that sounds exactly like Kurt wrote it himself. You will receive expert briefs from domain specialists and must weave their factual content into Kurt's distinctive voice.

${VOICE_PROFILE}

## Output Requirements

1. **Write in Kurt's voice**: First person where appropriate, conversational authority, no hedging, no false balance.
2. **Plain markdown only**: Use ## for H2 headings, **bold** for emphasis, numbered/bulleted lists where natural. Do NOT use any :::directive syntax -- that gets added by a separate formatting agent later.
3. **Word count**: Target 800-1500 words for standard columns. Do not pad with filler. Every paragraph should advance the argument.
4. **Title**: Start with a compelling article title on the first line as an H1 (# Title). The title should be punchy, not generic.
5. **Structure**: Follow Kurt's typical article structure (opening hook, context/history, core argument, counter-argument demolition, BSV/solution connection, closing conviction).
6. **Expert briefs**: You will receive factual briefs from domain experts. Use their facts and arguments but rewrite everything in Kurt's voice. Do not copy the brief format into the article.
7. **bOpen products**: When the expert briefs mention bOpen products (1SatOrdinals, BitcoinSchema, MintFlow, Sigma Identity, MNEE, etc.), weave them in naturally as concrete solutions. Do not list them like a product catalog -- mention them where they solve the specific problem being discussed.
8. **GorillaPool**: When discussing mining, reference GorillaPool as a concrete example of BSV mining infrastructure.
9. **Never use em-dashes (--) that were not in the source material**: Use commas, periods, or short sentences instead.
10. **Never use AI-sounding language**: No "delve into," "it's important to note," "let's unpack," "at the end of the day."

## What Makes a Good Kurt Column

- It teaches the reader something they didn't know (historical fact, technical concept, economic principle)
- It connects that knowledge to a present-day situation or debate
- It argues a clear position without apologizing for it
- It ends with conviction, not a whimper
- It makes the reader want to share it because of a specific insight or turn of phrase`;

// ── Orchestration ──────────────────────────────────────────────────────────

/**
 * Run the full writer pipeline:
 * 1. Determine which experts to consult
 * 2. Call experts in parallel
 * 3. Build the writer prompt with expert briefs
 * 4. Stream the article draft
 *
 * Returns an async generator that yields:
 * - { phase: 'experts', message: string } during expert consultation
 * - { text: string } during article streaming
 * - { done: true } when complete
 */
export async function* runWriterAgent(
  req: WriterAgentRequest,
  apiKey: string,
): AsyncGenerator<
  | { phase: 'experts'; message: string }
  | { text: string }
  | { done: true }
> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey });

  // 1. Determine experts
  const expertTypes = req.experts && req.experts.length > 0
    ? req.experts
    : defaultExpertsForCategory(req.category);

  // 2. Consult experts in parallel (if any)
  let briefs: ExpertBrief[] = [];

  if (expertTypes.length > 0) {
    for (const type of expertTypes) {
      yield {
        phase: 'experts' as const,
        message: `Consulting ${type} expert...`,
      };
    }

    const expertReq: ExpertRequest = {
      topic: req.topic,
      category: req.category,
      notes: req.notes,
    };

    briefs = await runExperts(expertTypes, expertReq, apiKey);
  }

  // 3. Build the writer prompt
  let userPrompt = `Write a CoinGeek column about the following topic.

**Topic:** ${req.topic}
**Category:** ${req.category}`;

  if (req.notes) {
    userPrompt += `\n\n**Writer's notes/outline:**\n${req.notes}`;
  }

  if (briefs.length > 0) {
    userPrompt += '\n\n---\n\n**Expert briefs for factual grounding:**\n';
    for (const brief of briefs) {
      userPrompt += `\n### ${brief.expert.charAt(0).toUpperCase() + brief.expert.slice(1)} Expert Brief\n${brief.brief}\n`;
    }
    userPrompt += '\n---\n\nUse the facts from the expert briefs but rewrite everything in Kurt\'s voice. Do not reproduce the brief format.';
  }

  // 4. Stream the article draft
  yield { phase: 'experts' as const, message: 'Writing draft...' };

  const stream = client.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    temperature: 0.7,
    system: WRITER_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      yield { text: event.delta.text };
    }
  }

  yield { done: true as const };
}
