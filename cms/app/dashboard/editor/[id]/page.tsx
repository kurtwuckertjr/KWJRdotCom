import { createServerSupabaseClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { EditorPage } from '@/components/EditorPage';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditorRoute({ params }: Props) {
  const { id } = await params;

  const supabase = await createServerSupabaseClient();

  // Fetch all posts for internal linking suggestions
  const { data: allPosts } = await supabase
    .from('posts')
    .select('id, title, category')
    .order('date', { ascending: false });

  const existingPosts = (allPosts ?? [])
    .filter((p) => p.id !== id)
    .map((p) => ({ slug: p.id, title: p.title, category: p.category }));

  // "new" means creating a fresh post
  if (id === 'new') {
    return <EditorPage post={null} existingPosts={existingPosts} />;
  }

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

  return <EditorPage post={post} existingPosts={existingPosts} />;
}
