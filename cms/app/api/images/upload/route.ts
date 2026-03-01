import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAuth, safeError } from '@/lib/api-auth';
import { randomUUID } from 'crypto';

/**
 * Upload an image file to Supabase Storage.
 * Accepts multipart form data with a "file" field.
 */
export async function POST(request: Request) {
  const { error: authError } = await requireAuth();
  if (authError) return authError;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: 'Supabase service role key not configured' },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.match(/^image\/(webp|png|jpeg|jpg|gif|svg\+xml)$/)) {
      return NextResponse.json(
        { error: 'Invalid file type. Supported: webp, png, jpg, gif, svg' },
        { status: 400 },
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum 10MB.' },
        { status: 400 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Use UUID filename to prevent path traversal and collisions
    const ext = (file.name.split('.').pop() ?? 'webp').replace(/[^a-zA-Z0-9]/g, '');
    const filename = `${randomUUID()}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 },
      );
    }

    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filename);

    return NextResponse.json({
      url: urlData.publicUrl,
      filename,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return safeError(err, 'Upload failed');
  }
}
