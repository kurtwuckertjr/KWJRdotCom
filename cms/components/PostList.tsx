'use client';

import Link from 'next/link';
import { FileText, Clock, CheckCircle2, Eye, Archive, AlertTriangle } from 'lucide-react';

// Current schema version - bump this when Schema.org standards or
// JSON-LD best practices change significantly
export const CURRENT_SCHEMA_VERSION = 1;

interface PostItem {
  id: string;
  title: string;
  category: string;
  status: string;
  word_count: number;
  updated_at: string;
  published_at: string | null;
  schema_version?: number;
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  draft: { label: 'Draft', color: 'text-yellow-400 bg-yellow-400/10', icon: Clock },
  review: { label: 'In Review', color: 'text-blue-400 bg-blue-400/10', icon: Eye },
  published: { label: 'Published', color: 'text-green-400 bg-green-400/10', icon: CheckCircle2 },
  archived: { label: 'Archived', color: 'text-gray-400 bg-gray-400/10', icon: Archive },
};

const categoryColors: Record<string, string> = {
  bitcoin: 'text-orange-400',
  business: 'text-blue-400',
  politics: 'text-red-400',
  fitness: 'text-green-400',
  religion: 'text-purple-400',
};

export function PostList({ posts }: { posts: PostItem[] }) {
  const outdatedCount = posts.filter(
    (p) => p.status === 'published' && (p.schema_version ?? 0) < CURRENT_SCHEMA_VERSION,
  ).length;

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 py-16">
        <FileText className="mb-3 h-10 w-10 text-gray-600" />
        <p className="text-sm text-gray-400">No posts yet</p>
        <a
          href="/dashboard/editor/new"
          className="mt-3 text-sm font-medium text-teal-400 hover:text-teal-300"
        >
          Create your first post
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Schema drift banner */}
      {outdatedCount > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-yellow-800/50 bg-yellow-900/20 px-4 py-2.5">
          <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-400" />
          <p className="text-xs text-yellow-400">
            <span className="font-semibold">{outdatedCount} published article{outdatedCount > 1 ? 's' : ''}</span>{' '}
            {outdatedCount > 1 ? 'have' : 'has'} outdated schema (v{CURRENT_SCHEMA_VERSION} is current).
            Re-run the SEO agent and re-publish to update.
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Words
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Updated
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {posts.map((post) => {
              const status = statusConfig[post.status] ?? statusConfig.draft;
              const StatusIcon = status.icon;
              const isOutdated =
                post.status === 'published' &&
                (post.schema_version ?? 0) < CURRENT_SCHEMA_VERSION;

              return (
                <tr
                  key={post.id}
                  className="transition hover:bg-gray-900/30"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/editor/${post.id}`}
                        className="text-sm font-medium text-gray-200 hover:text-teal-400"
                      >
                        {post.title}
                      </Link>
                      {isOutdated && (
                        <span
                          className="inline-flex items-center gap-0.5 rounded bg-yellow-900/30 px-1.5 py-0.5 text-[9px] font-medium text-yellow-400"
                          title={`Schema v${post.schema_version ?? 0} - current is v${CURRENT_SCHEMA_VERSION}`}
                        >
                          <AlertTriangle className="h-2.5 w-2.5" />
                          outdated
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium capitalize ${categoryColors[post.category] ?? 'text-gray-400'}`}>
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {post.word_count.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(post.updated_at).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
