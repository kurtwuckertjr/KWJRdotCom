import { NextResponse } from 'next/server';
import { runStyleAgent, type StyleAgentRequest } from '@/lib/agents/style-agent';
import { requireAuth, safeError } from '@/lib/api-auth';

export async function POST(request: Request) {
  const { error: authError } = await requireAuth();
  if (authError) return authError;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY not configured' },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as StyleAgentRequest;

    if (!body.markdown || !body.category) {
      return NextResponse.json(
        { error: 'markdown and category are required' },
        { status: 400 },
      );
    }

    const result = await runStyleAgent(body, apiKey);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Style agent error:', err);
    return safeError(err, 'Style agent failed');
  }
}
