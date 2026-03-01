'use client';

import { useState, useRef } from 'react';
import {
  X,
  Sparkles,
  Loader2,
  Upload,
  Check,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';

interface InlineImageModalProps {
  open: boolean;
  onClose: () => void;
  onInsert: (markdownImage: string) => void;
  category: string;
}

export function InlineImageModal({
  open,
  onClose,
  onInsert,
  category,
}: InlineImageModalProps) {
  const [mode, setMode] = useState<'generate' | 'upload' | 'url'>('generate');
  const [prompt, setPrompt] = useState('');
  const [altText, setAltText] = useState('');
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleGenerate() {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setPreview(null);
    setPublicUrl(null);

    try {
      const res = await fetch('/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          title: prompt,
          category,
          slug: 'inline',
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Generation failed: ${err.error}`);
        return;
      }

      const data = await res.json();
      setPreview(data.dataUrl);
      setPublicUrl(data.publicUrl);
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown'}`);
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
      setPublicUrl(data.url);
      setPreview(data.url);
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown'}`);
    } finally {
      setUploading(false);
    }
  }

  function handleInsert() {
    const url = publicUrl || preview || manualUrl;
    if (!url) return;
    const alt = altText || 'image';
    onInsert(`![${alt}](${url})`);
    onClose();
    // Reset state
    setPrompt('');
    setAltText('');
    setPreview(null);
    setPublicUrl(null);
    setManualUrl('');
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-gray-800 bg-gray-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-5 py-3">
          <h2 className="text-sm font-bold text-white">Insert Image</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-500 transition hover:bg-gray-800 hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-800 px-5 py-2">
          {(['generate', 'upload', 'url'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setMode(t)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
                mode === t
                  ? 'bg-gray-800 text-teal-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {t === 'generate' && <Sparkles className="h-3.5 w-3.5" />}
              {t === 'upload' && <Upload className="h-3.5 w-3.5" />}
              {t === 'url' && <ImageIcon className="h-3.5 w-3.5" />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4 p-5">
          {mode === 'generate' && (
            <>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Describe the image
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={2}
                  placeholder="A technical diagram showing..."
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-teal-500 focus:outline-none"
                />
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-500 disabled:opacity-50"
              >
                {generating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
                {generating ? 'Generating...' : 'Generate'}
              </button>
            </>
          )}

          {mode === 'upload' && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex w-full flex-col items-center rounded-xl border-2 border-dashed border-gray-700 py-10 transition hover:border-teal-600"
              >
                {uploading ? (
                  <Loader2 className="mb-2 h-8 w-8 animate-spin text-teal-500" />
                ) : (
                  <Upload className="mb-2 h-8 w-8 text-gray-600" />
                )}
                <p className="text-xs text-gray-400">
                  {uploading ? 'Uploading...' : 'Click to upload'}
                </p>
              </button>
            </>
          )}

          {mode === 'url' && (
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">
                Image URL
              </label>
              <input
                type="url"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-teal-500 focus:outline-none"
              />
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-700">
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Alt text + Insert */}
          {(preview || manualUrl) && (
            <>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe the image for accessibility..."
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                {mode === 'generate' && (
                  <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-400 transition hover:bg-gray-800"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Regenerate
                  </button>
                )}
                <button
                  onClick={handleInsert}
                  className="inline-flex items-center gap-1 rounded-lg bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-500"
                >
                  <Check className="h-3 w-3" />
                  Insert
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
