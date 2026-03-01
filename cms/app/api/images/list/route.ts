import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '@/lib/api-auth';

interface ImageEntry {
  name: string;
  url: string;
  source: 'supabase' | 'github';
}

/**
 * List available images from both Supabase Storage and GitHub.
 */
export async function GET() {
  const { error: authError } = await requireAuth();
  if (authError) return authError;
  const images: ImageEntry[] = [];

  // 1. Fetch from Supabase Storage
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseServiceKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const { data: files } = await supabase.storage
        .from('blog-images')
        .list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });

      if (files) {
        for (const file of files) {
          if (file.name.startsWith('.')) continue;
          const { data: urlData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(file.name);
          images.push({
            name: file.name,
            url: urlData.publicUrl,
            source: 'supabase',
          });
        }
      }
    } catch (err) {
      console.error('Supabase storage list error:', err);
    }
  }

  // 2. Fetch from GitHub public/blog-images/
  try {
    const res = await fetch(
      'https://api.github.com/repos/kurtwuckertjr/KWJRdotCom/contents/public/blog-images',
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    );

    if (res.ok) {
      const entries = (await res.json()) as { name: string; download_url: string; type: string }[];
      for (const entry of entries) {
        if (entry.type !== 'file') continue;
        if (!entry.name.match(/\.(webp|png|jpg|jpeg|gif|svg)$/i)) continue;
        images.push({
          name: entry.name,
          url: entry.download_url,
          source: 'github',
        });
      }
    }
  } catch (err) {
    console.error('GitHub image list error:', err);
  }

  return NextResponse.json({ images });
}
