'use client';

import { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  Upload,
  Sparkles,
  Loader2,
  Image as ImageIcon,
  Check,
  RefreshCw,
} from 'lucide-react';

interface ImageEntry {
  name: string;
  url: string;
  source: 'supabase' | 'github';
}

interface ImageBrowserProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title: string;
  category: string;
  slug: string;
}

export function ImageBrowser({
  open,
  onClose,
  onSelect,
  title,
  category,
  slug,
}: ImageBrowserProps) {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'browse' | 'generate' | 'upload'>('browse');

  // Generate tab state
  const [genPrompt, setGenPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  // Upload tab state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      loadImages();
    }
  }, [open]);

  async function loadImages() {
    setLoading(true);
    try {
      const res = await fetch('/api/images/list');
      if (res.ok) {
        const data = await res.json();
        setImages(data.images);
      }
    } catch {
      // Silently fail - images will just be empty
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerate() {
    if (generating) return;
    setGenerating(true);
    setGeneratedPreview(null);
    setGeneratedUrl(null);

    try {
      const res = await fetch('/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: genPrompt, title, category, slug }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Generation failed: ${err.error}`);
        return;
      }

      const data = await res.json();
      setGeneratedPreview(data.dataUrl);
      setGeneratedUrl(data.publicUrl);
    } catch (err) {
      alert(`Generation error: ${err instanceof Error ? err.message : 'Unknown'}`);
    } finally {
      setGenerating(false);
    }
  }

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Upload failed: ${err.error}`);
        return;
      }

      const data = await res.json();
      onSelect(data.url);
      onClose();
    } catch (err) {
      alert(`Upload error: ${err instanceof Error ? err.message : 'Unknown'}`);
    } finally {
      setUploading(false);
    }
  }

  const filtered = search
    ? images.filter((img) =>
        img.name.toLowerCase().includes(search.toLowerCase()),
      )
    : images;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex h-[80vh] w-full max-w-4xl flex-col rounded-xl border border-gray-800 bg-gray-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-5 py-3">
          <h2 className="text-sm font-bold text-white">Image Browser</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-500 transition hover:bg-gray-800 hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-800 px-5 py-2">
          {(['browse', 'generate', 'upload'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
                tab === t
                  ? 'bg-gray-800 text-teal-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {t === 'browse' && <ImageIcon className="h-3.5 w-3.5" />}
              {t === 'generate' && <Sparkles className="h-3.5 w-3.5" />}
              {t === 'upload' && <Upload className="h-3.5 w-3.5" />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Browse tab */}
          {tab === 'browse' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-600" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search images..."
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 pl-9 pr-3 py-2 text-xs text-gray-300 focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={loadImages}
                  disabled={loading}
                  className="rounded-lg border border-gray-700 p-2 text-gray-500 transition hover:bg-gray-800 hover:text-gray-300"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ImageIcon className="mb-3 h-10 w-10 text-gray-700" />
                  <p className="text-sm text-gray-500">
                    {search ? 'No images match your search' : 'No images found'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {filtered.map((img) => (
                    <button
                      key={img.url}
                      onClick={() => {
                        onSelect(img.url);
                        onClose();
                      }}
                      className="group relative aspect-video overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition hover:border-teal-600"
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100">
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="truncate text-[10px] text-white">{img.name}</p>
                          <p className="text-[8px] text-gray-400">{img.source}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Generate tab */}
          {tab === 'generate' && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Article Title (used in prompt)
                </label>
                <p className="rounded-md border border-gray-800 bg-gray-900/50 px-3 py-2 text-xs text-gray-400">
                  {title || '(no title set)'}
                </p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Additional Prompt (optional)
                </label>
                <textarea
                  value={genPrompt}
                  onChange={(e) => setGenPrompt(e.target.value)}
                  rows={3}
                  placeholder="Add specific visual direction... (leave empty for auto-generated from title + category)"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerate}
                  disabled={generating || !title}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-500 disabled:opacity-50"
                >
                  {generating ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5" />
                  )}
                  {generating ? 'Generating...' : 'Generate Image'}
                </button>
                <span className="text-[10px] text-gray-600">
                  Powered by Gemini
                </span>
              </div>

              {generatedPreview && (
                <div className="space-y-3">
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-700">
                    <img
                      src={generatedPreview}
                      alt="Generated preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-sm font-black uppercase tracking-tight text-white">
                          {title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelect(generatedUrl ?? generatedPreview);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-500"
                    >
                      <Check className="h-3 w-3" />
                      Use This Image
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={generating}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-400 transition hover:bg-gray-800"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Upload tab */}
          {tab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/webp,image/png,image/jpeg,image/gif,image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-700 py-16 transition hover:border-teal-600"
              >
                {uploading ? (
                  <Loader2 className="mb-3 h-10 w-10 animate-spin text-teal-500" />
                ) : (
                  <Upload className="mb-3 h-10 w-10 text-gray-600" />
                )}
                <p className="text-sm font-medium text-gray-400">
                  {uploading ? 'Uploading...' : 'Click to upload an image'}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  WebP, PNG, JPG, GIF, SVG. Max 10MB.
                </p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
