import { createServerSupabaseClient } from './supabase-server';
import { NextResponse } from 'next/server';
import type { SupabaseClient, User } from '@supabase/supabase-js';

type AuthSuccess = { user: User; supabase: SupabaseClient; error: null };
type AuthFailure = { user: null; supabase: null; error: NextResponse };

/**
 * Verify the request is from an authenticated user.
 * Call at the top of every API route handler.
 */
export async function requireAuth(): Promise<AuthSuccess | AuthFailure> {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        user: null,
        supabase: null,
        error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      };
    }

    return { user, supabase, error: null };
  } catch {
    return {
      user: null,
      supabase: null,
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
}

/**
 * Return a safe error response that doesn't leak internals in production.
 */
export function safeError(err: unknown, fallback = 'An internal error occurred') {
  const message =
    process.env.NODE_ENV === 'development'
      ? err instanceof Error
        ? err.message
        : 'Unknown error'
      : fallback;
  return NextResponse.json({ error: message }, { status: 500 });
}
