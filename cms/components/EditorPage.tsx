'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { markdownToComponentMap, countWords } from '@/lib/markdown';
import type { BlockMetadata } from '@/lib/markdown';
import { updateDirectiveAttribute } from '@/lib/markdown/attribute-updater';
import { MarkdownEditor, EditorToolbar } from './Editor';
import { Preview } from './Preview';
import { DiffView } from './DiffView';
import { SeoSidebar } from './SeoSidebar';
import { BlockSettingsPanel } from './BlockSettingsPanel';
import { EditAssistant } from './EditAssistant';
import { WriterPanel } from './WriterPanel';
import { ImageBrowser } from './ImageBrowser';
import { InlineImageModal } from './InlineImageModal';
import {
  Save,
  Sparkles,
  Send,
  ArrowLeft,
  Eye,
  Code,
  Columns2,
  Loader2,
  PanelLeft,
  PanelRight,
  X,
  Wand2,
  Settings,
  Search,
  MessageSquare,
  PenTool,
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from './Toast';

interface Post {
  id: string;
  title: string;
  category: string;
  categories: string[];
  excerpt: string;
  date: string;
  image: string;
  tag: string;
  markdown_source: string;
  rendered_html: string;
  component_map: unknown[];
  word_count: number;
  json_ld: Record<string, unknown>;
  seo_metadata: Record<string, unknown>;
  status: string;
}

const CATEGORIES = ['bitcoin', 'business', 'politics', 'fitness', 'religion'];

type ViewMode = 'editor' | 'preview' | 'split';
type RightTab = 'seo' | 'block';

export function EditorPage({
  post,
  existingPosts = [],
}: {
  post: Post | null;
  existingPosts?: { slug: string; title: string; category: string }[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const clientRef = useRef<SupabaseClient | null>(null);
  const isNew = !post;

  function getSupabase() {
    if (!clientRef.current) clientRef.current = createClient();
    return clientRef.current;
  }

  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.id ?? '');
  const [category, setCategory] = useState(post?.category ?? 'bitcoin');
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [tag, setTag] = useState(post?.tag ?? '');
  const [imageUrl, setImageUrl] = useState(post?.image ?? '');
  const [markdown, setMarkdown] = useState(post?.markdown_source ?? '');
  const [status, setStatus] = useState(post?.status ?? 'draft');
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [aiFormatting, setAiFormatting] = useState(false);
  const [diffMarkdown, setDiffMarkdown] = useState<string | null>(null);
  const [jsonLd, setJsonLd] = useState<Record<string, unknown>>(
    (post?.json_ld as Record<string, unknown>) ?? {},
  );
  const [seoMeta, setSeoMeta] = useState<{ metaDescription: string; keywords: string[] }>({
    metaDescription: (post?.seo_metadata as any)?.metaDescription ?? '',
    keywords: [],
  });
  const [imageBrowserOpen, setImageBrowserOpen] = useState(false);
  const [inlineImageOpen, setInlineImageOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showAutoFormatBanner, setShowAutoFormatBanner] = useState(false);
  const autoFormatDismissed = useRef(false);
  // Mobile panel toggles
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // Block editor state
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [selectedBlockProps, setSelectedBlockProps] = useState<Record<string, unknown>>({});
  const [blockMetadata, setBlockMetadata] = useState<BlockMetadata[]>([]);
  const [rightTab, setRightTab] = useState<RightTab>('seo');
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [writerPanelOpen, setWriterPanelOpen] = useState(false);

  // Detect raw markdown (no directives) and offer auto-format
  useEffect(() => {
    if (autoFormatDismissed.current || aiFormatting || diffMarkdown) return;
    if (!markdown.trim()) { setShowAutoFormatBanner(false); return; }

    // Check if markdown contains any directives
    const hasDirectives = /^:{3,4}\w/m.test(markdown);
    // Only show banner if there's substantial content without directives
    const lineCount = markdown.split('\n').length;
    if (!hasDirectives && lineCount > 10) {
      setShowAutoFormatBanner(true);
    } else {
      setShowAutoFormatBanner(false);
    }
  }, [markdown, aiFormatting, diffMarkdown]);

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80);
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (isNew) {
      setSlug(generateSlug(value));
    }
  }

  const wordCount = markdown.trim() ? countWords(markdown) : 0;

  const handleInsertSnippet = useCallback((snippet: string) => {
    setMarkdown((prev) => (prev ? prev + '\n\n' + snippet : snippet));
  }, []);

  // Block editor handlers
  const handleBlockClick = useCallback((blockIndex: number, blockType: string, currentProps: Record<string, unknown>) => {
    setSelectedBlockIndex(blockIndex);
    setSelectedBlockProps(currentProps);
    setRightTab('block');
  }, []);

  const handleBlockHover = useCallback((_blockIndex: number | null) => {
    // Could add hover state tracking here if needed
  }, []);

  const handleBlockDeselect = useCallback(() => {
    setSelectedBlockIndex(null);
    setSelectedBlockProps({});
    setRightTab('seo');
  }, []);

  const handleMetadataReady = useCallback((metadata: BlockMetadata[]) => {
    setBlockMetadata(metadata);
  }, []);

  const handleBlockPropChange = useCallback((key: string, value: string | number | boolean | undefined) => {
    if (selectedBlockIndex === null) return;
    const meta = blockMetadata[selectedBlockIndex];
    if (!meta) return;

    const updated = updateDirectiveAttribute(markdown, meta, key, value);
    setMarkdown(updated);

    // Update the local props so the panel reflects the change immediately
    setSelectedBlockProps((prev) => {
      const next = { ...prev };
      if (value === undefined) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  }, [selectedBlockIndex, blockMetadata, markdown]);

  async function handleAiFormat() {
    if (!markdown.trim() || aiFormatting) return;
    setAiFormatting(true);

    try {
      const res = await fetch('/api/agents/style', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown, category, title }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast(`AI Format failed: ${err.error}`, 'error');
        return;
      }

      const { formattedMarkdown } = await res.json();
      setDiffMarkdown(formattedMarkdown);
    } catch (err) {
      toast(`AI Format error: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error');
    } finally {
      setAiFormatting(false);
    }
  }

  function handleAcceptDiff(formatted: string) {
    setMarkdown(formatted);
    setDiffMarkdown(null);
    setSelectedBlockIndex(null);
    setSelectedBlockProps({});
    // Notify EditAssistant of accept
    const mark = (window as unknown as Record<string, unknown>).__editAssistantMark as
      | ((s: 'accepted' | 'rejected') => void)
      | undefined;
    mark?.('accepted');
  }

  function handleRejectDiff() {
    setDiffMarkdown(null);
    // Notify EditAssistant of reject
    const mark = (window as unknown as Record<string, unknown>).__editAssistantMark as
      | ((s: 'accepted' | 'rejected') => void)
      | undefined;
    mark?.('rejected');
  }

  function handleEditComplete(newMarkdown: string) {
    setDiffMarkdown(newMarkdown);
  }

  function handleDraftComplete(draftMarkdown: string, suggestedTitle: string) {
    if (markdown.trim() && !confirm('Replace current content with AI draft?')) return;
    setMarkdown(draftMarkdown);
    if (!title.trim() && suggestedTitle) {
      setTitle(suggestedTitle);
      if (isNew) setSlug(generateSlug(suggestedTitle));
    }
    setWriterPanelOpen(false);
    toast('Draft loaded into editor', 'success');
  }

  async function handleSave() {
    if (!title || !slug) return;
    setSaving(true);

    let componentMap: unknown[] = [];
    try {
      componentMap = markdownToComponentMap(markdown);
    } catch (err) {
      console.error('Failed to generate component map:', err);
    }

    const record = {
      id: slug,
      title,
      category,
      categories: [category],
      excerpt,
      tag,
      markdown_source: markdown,
      word_count: wordCount,
      status,
      date: post?.date ?? new Date().toISOString(),
      image: imageUrl,
      rendered_html: '',
      component_map: componentMap,
      json_ld: jsonLd,
      seo_metadata: {
        metaDescription: seoMeta.metaDescription,
        keywords: seoMeta.keywords,
      },
    };

    const { error } = isNew
      ? await getSupabase().from('posts').insert(record)
      : await getSupabase().from('posts').update(record).eq('id', post.id);

    setSaving(false);

    if (error) {
      toast(`Save failed: ${error.message}`, 'error');
      return;
    }

    setLastSaved(new Date().toLocaleTimeString());
    toast('Draft saved', 'success');

    if (isNew) {
      router.push(`/dashboard/editor/${slug}`);
    }
  }

  async function handlePublish() {
    if (!slug || publishing) return;

    // Save first to ensure latest content is persisted
    await handleSave();

    if (!confirm('Publish this article? It will go live after a short build.')) return;

    setPublishing(true);
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: slug }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast(`Publish failed: ${err.error}`, 'error');
        return;
      }

      const data = await res.json();
      setStatus('published');
      toast(
        data.deployTriggered
          ? 'Published! Site rebuild triggered. Live in ~1-2 min.'
          : 'Published! Deploy hook not configured.',
        'success',
      );
    } catch (err) {
      toast(`Publish error: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error');
    } finally {
      setPublishing(false);
    }
  }

  /* ---- Metadata panel content (shared between desktop sidebar and mobile drawer) ---- */
  const metadataContent = (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          disabled={!isNew}
          className="w-full rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-300 disabled:opacity-50 focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1.5 text-xs capitalize text-gray-300 focus:border-teal-500 focus:outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Tag</label>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="e.g., Foundations"
          className="w-full rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-300 focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={4}
          placeholder="Brief description..."
          className="w-full rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-300 focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-300 focus:border-teal-500 focus:outline-none"
        />
        <button
          onClick={() => setImageBrowserOpen(true)}
          className="mt-1.5 w-full rounded-md border border-dashed border-gray-700 py-2 text-xs text-gray-500 transition hover:border-teal-600 hover:text-teal-400"
        >
          Browse / Generate Image
        </button>
        {imageUrl && (
          <div className="mt-2 aspect-video overflow-hidden rounded-md border border-gray-800">
            <img src={imageUrl} alt="Header" className="h-full w-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col lg:h-[calc(100vh-48px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard"
            className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-800 hover:text-gray-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
            className="min-w-0 flex-1 bg-transparent text-base font-bold text-white placeholder-gray-600 focus:outline-none sm:text-lg"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Mobile panel toggles */}
          <button
            onClick={() => { setLeftPanelOpen(!leftPanelOpen); setRightPanelOpen(false); }}
            className={`rounded-md p-1.5 transition xl:hidden ${
              leftPanelOpen ? 'bg-gray-800 text-teal-400' : 'text-gray-500 hover:text-gray-300'
            }`}
            title="Toggle metadata"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => { setRightPanelOpen(!rightPanelOpen); setLeftPanelOpen(false); }}
            className={`rounded-md p-1.5 transition xl:hidden ${
              rightPanelOpen ? 'bg-gray-800 text-teal-400' : 'text-gray-500 hover:text-gray-300'
            }`}
            title="Toggle sidebar"
          >
            <PanelRight className="h-4 w-4" />
          </button>

          {lastSaved && (
            <span className="hidden text-[10px] text-gray-600 sm:inline">
              Saved {lastSaved}
            </span>
          )}
          <span className="hidden rounded-full bg-gray-800 px-2.5 py-0.5 text-xs text-gray-400 sm:inline-flex">
            {wordCount.toLocaleString()} words
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:text-xs ${
            status === 'published'
              ? 'bg-green-400/10 text-green-400'
              : status === 'review'
              ? 'bg-blue-400/10 text-blue-400'
              : 'bg-yellow-400/10 text-yellow-400'
          }`}>
            {status}
          </span>
        </div>
      </div>

      {/* Three-panel layout */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Mobile overlay for side panels */}
        {(leftPanelOpen || rightPanelOpen) && (
          <div
            className="absolute inset-0 z-30 bg-black/40 xl:hidden"
            onClick={() => { setLeftPanelOpen(false); setRightPanelOpen(false); }}
          />
        )}

        {/* Left panel: metadata */}
        <div
          className={`
            absolute inset-y-0 left-0 z-40 w-64 shrink-0 overflow-y-auto border-r border-gray-800 bg-gray-950 p-4 transition-transform duration-200
            xl:static xl:w-56 xl:translate-x-0 xl:bg-transparent
            ${leftPanelOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Mobile close button */}
          <div className="mb-3 flex items-center justify-between xl:hidden">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Metadata</span>
            <button
              onClick={() => setLeftPanelOpen(false)}
              className="rounded p-1 text-gray-500 hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {metadataContent}
        </div>

        {/* Center panel: editor + preview */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* View mode tabs + directive toolbar */}
          <div className="flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-1 px-2 py-1.5 sm:px-3">
              <button
                onClick={() => setViewMode('editor')}
                className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition sm:gap-1.5 sm:px-2.5 ${
                  viewMode === 'editor'
                    ? 'bg-gray-800 text-teal-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Code className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Editor</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`hidden items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition md:flex ${
                  viewMode === 'split'
                    ? 'bg-gray-800 text-teal-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Columns2 className="h-3.5 w-3.5" />
                Split
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition sm:gap-1.5 sm:px-2.5 ${
                  viewMode === 'preview'
                    ? 'bg-gray-800 text-teal-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </button>
            </div>
          </div>

          {/* Directive toolbar (shown in editor/split modes, hidden during diff) */}
          {viewMode !== 'preview' && !diffMarkdown && (
            <EditorToolbar
              onInsert={handleInsertSnippet}
              onInsertImage={() => setInlineImageOpen(true)}
            />
          )}

          {/* Auto-format banner */}
          {showAutoFormatBanner && !diffMarkdown && !aiFormatting && (
            <div className="flex items-center gap-3 border-b border-teal-800/30 bg-teal-950/50 px-4 py-2.5">
              <Wand2 className="h-4 w-4 shrink-0 text-teal-400" />
              <p className="flex-1 text-xs text-teal-300">
                Plain markdown detected. Apply AI formatting to add visual styling?
              </p>
              <button
                onClick={handleAiFormat}
                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-teal-500"
              >
                <Sparkles className="h-3 w-3" />
                Auto-Format
              </button>
              <button
                onClick={() => { setShowAutoFormatBanner(false); autoFormatDismissed.current = true; }}
                className="rounded p-1 text-teal-600 transition hover:text-teal-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* AI formatting in progress */}
          {aiFormatting && (
            <div className="flex items-center gap-3 border-b border-teal-800/30 bg-teal-950/50 px-4 py-2.5">
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-teal-400" />
              <p className="text-xs text-teal-300">
                AI is analyzing your content and applying formatting directives...
              </p>
            </div>
          )}

          {/* Content area */}
          {diffMarkdown ? (
            /* Diff view when AI Format is active */
            <DiffView
              original={markdown}
              formatted={diffMarkdown}
              onAccept={handleAcceptDiff}
              onReject={handleRejectDiff}
            />
          ) : (
            /* Normal split view */
            <div className="flex flex-1 overflow-hidden">
              {viewMode !== 'preview' && (
                <div className={`overflow-hidden ${viewMode === 'split' ? 'w-1/2 border-r border-gray-800' : 'w-full'}`}>
                  <MarkdownEditor
                    value={markdown}
                    onChange={setMarkdown}
                  />
                </div>
              )}

              {viewMode !== 'editor' && (
                <div className={`overflow-y-auto bg-white ${viewMode === 'split' ? 'w-1/2' : 'w-full'}`}>
                  <Preview
                    markdown={markdown}
                    title={title}
                    date={post?.date ?? new Date().toISOString()}
                    tag={tag}
                    imageUrl={imageUrl}
                    category={category}
                    onBlockClick={handleBlockClick}
                    onBlockHover={handleBlockHover}
                    onBlockDeselect={handleBlockDeselect}
                    onMetadataReady={handleMetadataReady}
                    selectedBlockIndex={selectedBlockIndex}
                  />
                </div>
              )}
            </div>
          )}

          {/* AI Edit Assistant drawer */}
          <EditAssistant
            open={editDrawerOpen}
            onClose={() => setEditDrawerOpen(false)}
            markdown={markdown}
            category={category}
            title={title}
            onEditComplete={handleEditComplete}
          />
        </div>

        {/* Right panel: SEO + Block Settings tabs */}
        <div
          className={`
            absolute inset-y-0 right-0 z-40 w-72 shrink-0 overflow-y-auto border-l border-gray-800 bg-gray-950 p-4 transition-transform duration-200
            xl:static xl:w-64 xl:translate-x-0 xl:bg-transparent
            ${rightPanelOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* Mobile close button */}
          <div className="mb-3 flex items-center justify-between xl:hidden">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {rightTab === 'seo' ? 'SEO' : 'Block'}
            </span>
            <button
              onClick={() => setRightPanelOpen(false)}
              className="rounded p-1 text-gray-500 hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tab switcher */}
          <div className="mb-4 flex rounded-lg bg-gray-800/50 p-0.5">
            <button
              onClick={() => setRightTab('seo')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[10px] font-semibold transition ${
                rightTab === 'seo'
                  ? 'bg-gray-700 text-teal-400 shadow-sm'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Search className="h-3 w-3" />
              SEO
            </button>
            <button
              onClick={() => setRightTab('block')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[10px] font-semibold transition ${
                rightTab === 'block'
                  ? 'bg-gray-700 text-teal-400 shadow-sm'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Settings className="h-3 w-3" />
              Block
              {selectedBlockIndex !== null && (
                <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-teal-400" />
              )}
            </button>
          </div>

          {/* Tab content */}
          {rightTab === 'seo' ? (
            <SeoSidebar
              title={title}
              slug={slug}
              category={category}
              excerpt={excerpt}
              markdown={markdown}
              date={post?.date ?? new Date().toISOString()}
              wordCount={wordCount}
              existingPosts={existingPosts}
              onApplyJsonLd={(ld) => setJsonLd(ld)}
              onApplyMeta={(meta) => setSeoMeta(meta)}
            />
          ) : (
            <BlockSettingsPanel
              selectedIndex={selectedBlockIndex}
              metadata={blockMetadata}
              currentProps={selectedBlockProps}
              onPropChange={handleBlockPropChange}
            />
          )}
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between border-t border-gray-800 px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleSave}
            disabled={saving || !title}
            className="inline-flex items-center gap-1 rounded-lg bg-gray-800 px-2.5 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-gray-700 disabled:opacity-50 sm:gap-1.5 sm:px-3"
          >
            <Save className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save Draft'}</span>
            <span className="sm:hidden">{saving ? '...' : 'Save'}</span>
          </button>
          <button
            onClick={() => setWriterPanelOpen(true)}
            className="inline-flex items-center gap-1 rounded-lg bg-gray-800 px-2.5 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-gray-700 sm:gap-1.5 sm:px-3"
            title="AI Draft Writer"
          >
            <PenTool className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">AI Draft</span>
          </button>
          <button
            onClick={handleAiFormat}
            disabled={aiFormatting || !markdown.trim()}
            className="inline-flex items-center gap-1 rounded-lg bg-gray-800 px-2.5 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-gray-700 disabled:opacity-50 sm:gap-1.5 sm:px-3"
            title="Agent 1: Apply style directives"
          >
            {aiFormatting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">{aiFormatting ? 'Formatting...' : 'AI Format'}</span>
            <span className="sm:hidden">{aiFormatting ? '...' : 'AI'}</span>
          </button>
          <button
            onClick={() => setEditDrawerOpen((o) => !o)}
            disabled={!markdown.trim()}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition disabled:opacity-50 sm:gap-1.5 sm:px-3 ${
              editDrawerOpen
                ? 'bg-teal-600/20 text-teal-400 ring-1 ring-teal-600/40'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            title="AI Edit Assistant"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">AI Edit</span>
          </button>
        </div>
        <button
          onClick={handlePublish}
          disabled={publishing || saving || !title || !slug}
          className="inline-flex items-center gap-1 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-500 disabled:opacity-50 sm:gap-1.5 sm:px-4"
        >
          {publishing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          {publishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>

      {/* Image Browser Modal */}
      <ImageBrowser
        open={imageBrowserOpen}
        onClose={() => setImageBrowserOpen(false)}
        onSelect={(url) => setImageUrl(url)}
        title={title}
        category={category}
        slug={slug}
      />

      {/* Writer Panel Modal */}
      <WriterPanel
        open={writerPanelOpen}
        onClose={() => setWriterPanelOpen(false)}
        category={category}
        onDraftComplete={handleDraftComplete}
      />

      {/* Inline Image Modal */}
      <InlineImageModal
        open={inlineImageOpen}
        onClose={() => setInlineImageOpen(false)}
        onInsert={(markdownImg) => {
          setMarkdown((prev) => (prev ? prev + '\n\n' + markdownImg + '\n' : markdownImg + '\n'));
          setInlineImageOpen(false);
        }}
        category={category}
      />
    </div>
  );
}
