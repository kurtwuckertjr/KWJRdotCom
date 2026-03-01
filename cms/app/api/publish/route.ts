import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { CURRENT_SCHEMA_VERSION } from '@/components/PostList';

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // Verify auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['owner', 'editor'].includes(profile.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Fetch the post
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Validate required fields
    const missing: string[] = [];
    if (!post.title) missing.push('title');
    if (!post.excerpt) missing.push('excerpt');
    if (!post.markdown_source) missing.push('markdown_source');
    if (!post.image) missing.push('image');
    if (!post.category) missing.push('category');

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 },
      );
    }

    // Update post status to published
    const now = new Date().toISOString();
    const { error: updateError } = await supabase
      .from('posts')
      .update({
        status: 'published',
        published_at: now,
        updated_at: now,
        schema_version: CURRENT_SCHEMA_VERSION,
      })
      .eq('id', postId);

    if (updateError) {
      return NextResponse.json(
        { error: `Failed to publish: ${updateError.message}` },
        { status: 500 },
      );
    }

    // Trigger Vercel Deploy Hook
    let deployTriggered = false;
    const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

    if (hookUrl) {
      try {
        const deployRes = await fetch(hookUrl, { method: 'POST' });
        deployTriggered = deployRes.ok;
        if (!deployRes.ok) {
          console.error('Deploy hook failed:', deployRes.status, await deployRes.text());
        }
      } catch (err) {
        console.error('Deploy hook error:', err);
      }
    } else {
      console.warn('VERCEL_DEPLOY_HOOK_URL not configured - skipping deploy trigger');
    }

    return NextResponse.json({
      success: true,
      postId,
      publishedAt: now,
      deployTriggered,
    });
  } catch (err) {
    console.error('Publish error:', err);
    const message =
      process.env.NODE_ENV === 'development'
        ? (err instanceof Error ? err.message : 'Unknown error')
        : 'An internal error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
