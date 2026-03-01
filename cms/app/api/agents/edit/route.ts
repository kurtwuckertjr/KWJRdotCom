import { EDIT_SYSTEM_PROMPT, type EditAgentRequest } from '@/lib/agents/edit-agent';
import { requireAuth } from '@/lib/api-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const { error: authError } = await requireAuth();
  if (authError) return authError;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: EditAgentRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body.markdown || !body.instruction) {
    return new Response(
      JSON.stringify({ error: 'markdown and instruction are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey });

  const userPrompt = `Category: ${body.category || 'general'}
Title: ${body.title || 'Untitled'}

Current markdown:
---
${body.markdown}
---

Instruction: ${body.instruction}`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = client.messages.stream({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 16384,
          temperature: 0.2,
          system: EDIT_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userPrompt }],
        });

        for await (const event of response) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            const data = JSON.stringify({ text: event.delta.text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (err) {
        console.error('Edit agent error:', err);
        const msg = process.env.NODE_ENV === 'development'
          ? (err instanceof Error ? err.message : 'Edit agent failed')
          : 'An internal error occurred';
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
