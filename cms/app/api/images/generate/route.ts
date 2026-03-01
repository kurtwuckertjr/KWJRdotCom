import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAuth, requireRole, safeError } from '@/lib/api-auth';
import { randomUUID } from 'crypto';

interface GenerateRequest {
  prompt: string;
  title: string;
  category: string;
  slug?: string;
}

const CATEGORY_ATMOSPHERE: Record<string, string> = {
  bitcoin: 'Professional, dark technical, cryptographic, blockchain circuits, digital gold atmosphere',
  business: 'Clean corporate, modern minimalist, professional with warm lighting',
  politics: 'Bold patriotic, dignified, civic architecture, constitutional feel',
  fitness: 'Athletic intensity, dark gym environment, powerful movement, gritty',
  religion: 'Reverent, warm golden light, ancient textures, stained glass feel',
};

export async function POST(request: Request) {
  const { user, supabase: authSupabase, error: authError } = await requireAuth();
  if (authError) return authError;

  const roleError = await requireRole(authSupabase!, user!.id);
  if (roleError) return roleError;

  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY not configured' },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as GenerateRequest;

    if (!body.prompt && !body.title) {
      return NextResponse.json(
        { error: 'prompt or title is required' },
        { status: 400 },
      );
    }

    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: geminiKey });

    const atmosphere = CATEGORY_ATMOSPHERE[body.category] ?? CATEGORY_ATMOSPHERE.bitcoin;
    const fullPrompt = body.prompt
      ? `A cinematic 16:9 4K blog header image. ${atmosphere}. Title: "${body.title}". Additional direction: ${body.prompt}`
      : `A cinematic 16:9 4K blog header image. ${atmosphere}. Title: "${body.title}".`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: fullPrompt }] },
      config: {
        imageConfig: { aspectRatio: '16:9' },
      },
    });

    // Extract the base64 image from the response
    let imageData: { mimeType: string; base64: string } | null = null;
    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData) {
        imageData = {
          mimeType: part.inlineData.mimeType ?? 'image/webp',
          base64: part.inlineData.data ?? '',
        };
        break;
      }
    }

    if (!imageData) {
      return NextResponse.json(
        { error: 'No image generated. The model may have declined the prompt.' },
        { status: 422 },
      );
    }

    // Upload to Supabase Storage if credentials are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    let publicUrl: string | null = null;

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Use UUID filename to prevent path traversal
      const ext = imageData.mimeType.includes('png') ? 'png' : 'webp';
      const filename = `${randomUUID()}.${ext}`;
      const buffer = Buffer.from(imageData.base64, 'base64');

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filename, buffer, {
          contentType: imageData.mimeType,
          upsert: false,
        });

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filename);
        publicUrl = urlData.publicUrl;
      }
    }

    return NextResponse.json({
      dataUrl: `data:${imageData.mimeType};base64,${imageData.base64}`,
      publicUrl,
      mimeType: imageData.mimeType,
    });
  } catch (err) {
    console.error('Image generation error:', err);
    return safeError(err, 'Image generation failed');
  }
}
