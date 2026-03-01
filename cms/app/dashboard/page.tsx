import { createServerSupabaseClient } from '@/lib/supabase-server';
import { PostList } from '@/components/PostList';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, category, categories, excerpt, date, image, tag, status, word_count, published_at, updated_at, schema_version')
    .order('updated_at', { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <p className="mt-1 text-sm text-gray-400">
            {posts?.length ?? 0} total posts
          </p>
        </div>
        <a
          href="/dashboard/editor/new"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500"
        >
          + New Post
        </a>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-800 bg-red-900/20 p-4 text-sm text-red-300">
          Failed to load posts: {error.message}
        </div>
      ) : (
        <PostList posts={posts ?? []} />
      )}
    </div>
  );
}
