import { NextResponse } from 'next/server';
import {
  invalidateStandardsCache,
  getSchemaStandards,
} from '@/lib/agents/schema-standards';
import { requireAuth, requireRole, safeError } from '@/lib/api-auth';

export async function POST() {
  const { user, supabase, error: authError } = await requireAuth();
  if (authError) return authError;

  const roleError = await requireRole(supabase!, user!.id);
  if (roleError) return roleError;

  try {
    invalidateStandardsCache();
    const standards = await getSchemaStandards();

    return NextResponse.json({
      version: standards.schemaOrgVersion,
      fetchedAt: new Date(standards.fetchedAt).toISOString(),
      changelogCount: standards.changelog.length,
      googleUpdatesCount: standards.googleUpdates.length,
    });
  } catch (err) {
    console.error('Refresh standards error:', err);
    return safeError(err, 'Failed to refresh standards');
  }
}
