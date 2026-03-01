'use client';

import { useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';

interface DashboardShellProps {
  user: {
    email: string;
    displayName: string;
    role: string;
  };
  children: React.ReactNode;
}

const navItems = [
  { href: '/dashboard', label: 'Posts', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function DashboardShell({ user, children }: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const clientRef = useRef<SupabaseClient | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function getSupabase() {
    if (!clientRef.current) clientRef.current = createClient();
    return clientRef.current;
  }

  async function handleSignOut() {
    await getSupabase().auth.signOut();
    router.push('/');
  }

  // Hide sidebar on editor pages (editor has its own full-screen layout)
  const isEditorPage = pathname?.includes('/editor/');

  return (
    <div className="flex min-h-screen">
      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-gray-800 bg-gray-900 transition-transform duration-200
          lg:static lg:translate-x-0
          ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isEditorPage ? 'lg:hidden' : ''}
        `}
      >
        <div className="flex h-14 items-center justify-between border-b border-gray-800 px-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-teal-500" />
            <span className="text-sm font-bold tracking-wide text-white">
              KWJR CMS
            </span>
          </div>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="rounded-md p-1 text-gray-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-gray-800 text-teal-400'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-800 p-3">
          <div className="mb-2 px-3">
            <p className="truncate text-sm font-medium text-gray-200">
              {user.displayName}
            </p>
            <p className="truncate text-xs text-gray-500">{user.role}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-gray-800/50 hover:text-gray-200"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header bar (shown on non-editor pages when sidebar is hidden) */}
        {!isEditorPage && (
          <div className="flex h-14 items-center gap-3 border-b border-gray-800 px-4 lg:hidden">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
            <LayoutDashboard className="h-5 w-5 text-teal-500" />
            <span className="text-sm font-bold tracking-wide text-white">
              KWJR CMS
            </span>
          </div>
        )}
        <div className={isEditorPage ? '' : 'p-4 sm:p-6'}>{children}</div>
      </main>
    </div>
  );
}
