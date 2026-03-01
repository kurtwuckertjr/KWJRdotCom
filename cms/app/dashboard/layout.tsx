import { createServerSupabaseClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/DashboardShell';
import { ToastProvider } from '@/components/Toast';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name')
    .eq('id', user.id)
    .single();

  return (
    <ToastProvider>
      <DashboardShell
        user={{
          email: user.email ?? '',
          displayName: profile?.display_name ?? user.email ?? '',
          role: profile?.role ?? 'viewer',
        }}
      >
        {children}
      </DashboardShell>
    </ToastProvider>
  );
}
