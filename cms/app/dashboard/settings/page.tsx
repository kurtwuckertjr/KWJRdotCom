import { createServerSupabaseClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name')
    .eq('id', user!.id)
    .single();

  const isOwner = profile?.role === 'owner';

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage your account and CMS configuration
        </p>
      </div>

      {/* Profile section */}
      <section className="rounded-lg border border-gray-800 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Profile
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Email</span>
            <span className="text-sm text-gray-200">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Display Name</span>
            <span className="text-sm text-gray-200">{profile?.display_name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Role</span>
            <span className="text-sm capitalize text-gray-200">{profile?.role}</span>
          </div>
        </div>
      </section>

      {/* Environment section */}
      <section className="rounded-lg border border-gray-800 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Environment
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Supabase</span>
            <span className="text-xs rounded-full bg-green-400/10 px-2.5 py-0.5 text-green-400">
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Vercel Deploy Hook</span>
            <span className="text-xs rounded-full bg-gray-400/10 px-2.5 py-0.5 text-gray-400">
              Not configured
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Gemini API</span>
            <span className="text-xs rounded-full bg-gray-400/10 px-2.5 py-0.5 text-gray-400">
              Not configured
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Anthropic API</span>
            <span className="text-xs rounded-full bg-gray-400/10 px-2.5 py-0.5 text-gray-400">
              Not configured
            </span>
          </div>
        </div>
      </section>

      {/* User management (owner only) */}
      {isOwner && (
        <section className="rounded-lg border border-gray-800 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            User Management
          </h2>
          <p className="text-sm text-gray-500">
            User management interface will be implemented in a later sprint.
          </p>
        </section>
      )}
    </div>
  );
}
