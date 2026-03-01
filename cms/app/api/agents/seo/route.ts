import { NextResponse } from 'next/server';
import { runSeoAgent, type SeoAgentRequest } from '@/lib/agents/seo-agent';
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
    const body = (await request.json()) as SeoAgentRequest;

    if (!body.title || !body.markdown) {
      return NextResponse.json(
        { error: 'title and markdown are required' },
        { status: 400 },
      );
    }

    const result = await runSeoAgent(body, apiKey);
    return NextResponse.json(result);
  } catch (err) {
    console.error('SEO agent error:', err);
    return safeError(err, 'SEO agent failed');
  }
}
