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

type AllowedRole = 'owner' | 'editor';

/**
 * Verify the authenticated user has a required role.
 * Must be called after requireAuth() succeeds.
 */
export async function requireRole(
  supabase: SupabaseClient,
  userId: string,
  roles: AllowedRole[] = ['owner', 'editor'],
): Promise<NextResponse | null> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (!profile || !roles.includes(profile.role as AllowedRole)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }
  return null;
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
