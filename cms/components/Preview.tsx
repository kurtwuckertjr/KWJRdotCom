'use client';

import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { markdownToComponentMapWithMetadata } from '@/lib/markdown';
import type { BlockMetadata } from '@/lib/markdown';

interface PreviewProps {
  markdown: string;
  title?: string;
  date?: string;
  tag?: string;
  imageUrl?: string;
  category?: string;
  onBlockClick?: (blockIndex: number, blockType: string, currentProps: Record<string, unknown>) => void;
  onBlockHover?: (blockIndex: number | null) => void;
  onBlockDeselect?: () => void;
  onMetadataReady?: (metadata: BlockMetadata[]) => void;
  selectedBlockIndex?: number | null;
}

/**
 * Preview uses an iframe pointing to the main site's /cms-preview route.
 * This guarantees pixel-perfect rendering because the preview uses the
 * exact same CSS, components, and Tailwind config as the live site.
 *
 * Communication happens via postMessage:
 * - Parent sends { type: 'cms-preview', componentMap, title, ..., interactive, blockLabels }
 * - Child sends { type: 'cms-preview-ready' } when loaded
 * - Child sends { type: 'cms-block-click', blockIndex, blockType, currentProps } on click
 * - Child sends { type: 'cms-block-hover', blockIndex } on hover
 * - Child sends { type: 'cms-block-deselect' } on background click
 * - Parent sends { type: 'cms-select-block', index } for programmatic selection
 */

// In dev, the main Vite site runs on port 5173. In production, use the deployed site.
const PREVIEW_ORIGIN =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5173'
    : 'https://kurtwuckertjr.com';

export function Preview({
  markdown,
  title,
  date,
  tag,
  imageUrl,
  category,
  onBlockClick,
  onBlockHover,
  onBlockDeselect,
  onMetadataReady,
  selectedBlockIndex,
}: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  const { componentMap, metadata } = useMemo(() => {
    if (!markdown.trim()) return { componentMap: [], metadata: [] };
    try {
      return markdownToComponentMapWithMetadata(markdown);
    } catch (err) {
      console.error('Preview render error:', err);
      return { componentMap: [], metadata: [] };
    }
  }, [markdown]);

  // Notify parent of fresh metadata
  useEffect(() => {
    if (metadata.length > 0) {
      onMetadataReady?.(metadata);
    }
  }, [metadata, onMetadataReady]);

  // Build block labels from metadata for the iframe
  const blockLabels = useMemo(() => {
    return metadata.map((m) => m.directiveName ?? m.componentType);
  }, [metadata]);

  // Listen for iframe ready + block interaction messages
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'cms-preview-ready') {
        setReady(true);
      }
      if (event.data?.type === 'cms-block-click') {
        onBlockClick?.(
          event.data.blockIndex,
          event.data.blockType,
          event.data.currentProps ?? {},
        );
      }
      if (event.data?.type === 'cms-block-hover') {
        onBlockHover?.(event.data.blockIndex);
      }
      if (event.data?.type === 'cms-block-deselect') {
        onBlockDeselect?.();
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onBlockClick, onBlockHover, onBlockDeselect]);

  // Send data to iframe whenever content or metadata changes
  useEffect(() => {
    if (!ready || !iframeRef.current?.contentWindow) return;

    iframeRef.current.contentWindow.postMessage(
      {
        type: 'cms-preview',
        componentMap,
        title,
        date,
        tag,
        imageUrl,
        category,
        interactive: true,
        blockLabels,
      },
      PREVIEW_ORIGIN,
    );
  }, [ready, componentMap, title, date, tag, imageUrl, category, blockLabels]);

  // Send programmatic block selection to iframe
  useEffect(() => {
    if (!ready || !iframeRef.current?.contentWindow) return;

    iframeRef.current.contentWindow.postMessage(
      {
        type: 'cms-select-block',
        index: selectedBlockIndex ?? null,
      },
      PREVIEW_ORIGIN,
    );
  }, [ready, selectedBlockIndex]);

  if (!markdown.trim()) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-500">
        Start writing to see a live preview
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center">
            <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-teal-500" />
            <p className="text-xs text-gray-400">Loading live preview...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={`${PREVIEW_ORIGIN}/cms-preview`}
        className="h-full w-full border-0"
        title="Article Preview"
      />
    </div>
  );
}
