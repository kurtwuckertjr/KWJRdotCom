import { runWriterAgent, type WriterAgentRequest } from '@/lib/agents/writer-agent';
import type { ExpertType } from '@/lib/agents/expert-agents';
import { requireAuth, requireRole } from '@/lib/api-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const { user, supabase, error: authError } = await requireAuth();
  if (authError) return authError;

  const roleError = await requireRole(supabase!, user!.id);
  if (roleError) return roleError;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { topic: string; category: string; notes?: string; experts?: string[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body.topic || !body.category) {
    return new Response(
      JSON.stringify({ error: 'topic and category are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const writerReq: WriterAgentRequest = {
    topic: body.topic,
    category: body.category,
    notes: body.notes,
    experts: body.experts as ExpertType[] | undefined,
  };

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of runWriterAgent(writerReq, apiKey)) {
          if ('phase' in event) {
            const data = JSON.stringify({ phase: event.phase, message: event.message });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          } else if ('text' in event) {
            const data = JSON.stringify({ text: event.text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          } else if ('done' in event) {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          }
        }
        controller.close();
      } catch (err) {
        console.error('Writer agent error:', err);
        const msg = process.env.NODE_ENV === 'development'
          ? (err instanceof Error ? err.message : 'Writer agent failed')
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
