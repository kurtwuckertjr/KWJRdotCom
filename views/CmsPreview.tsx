import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { DynamicPostRenderer } from '@shared/components/blog/DynamicPostRenderer';
import type { ComponentNode } from '@shared/types/post';
import { Calendar } from 'lucide-react';

/**
 * CMS Preview route - renders article content using the exact same
 * components and CSS as the live site. The CMS embeds this in an
 * iframe and sends data via postMessage.
 *
 * When `interactive` is true (CMS edit mode), blocks become clickable
 * and hoverable, with visual feedback and postMessage events sent to parent.
 */

interface PreviewData {
  type: 'cms-preview';
  componentMap: any[];
  title?: string;
  date?: string;
  tag?: string;
  imageUrl?: string;
  category?: string;
  excerpt?: string;
  interactive?: boolean;
  /** Block type labels for each block index */
  blockLabels?: string[];
}

const AUTHOR_TITLES: Record<string, string> = {
  bitcoin: 'Chief Bitcoin Historian',
  fitness: 'BJJ Black Belt & Competition Coach',
  politics: 'Independent American',
  religion: 'Protestant Christian',
  business: 'Founder, GorillaPool & Open Protocol Labs',
};

/** CSS injected when interactive mode is active */
const INTERACTIVE_STYLES = `
  .cms-block-wrapper {
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    transition: outline-color 0.15s, background-color 0.15s;
    outline: 2px solid transparent;
    outline-offset: 4px;
  }
  .cms-block-wrapper:hover {
    outline: 2px dashed #14b8a6;
  }
  .cms-block-wrapper:hover .cms-block-label {
    opacity: 1;
  }
  .cms-block-wrapper[data-selected="true"] {
    outline: 2px solid #14b8a6;
    background-color: rgba(20, 184, 166, 0.03);
  }
  .cms-block-wrapper[data-selected="true"] .cms-block-label {
    opacity: 1;
    background-color: #14b8a6;
    color: white;
  }
  .cms-block-label {
    position: absolute;
    top: -10px;
    left: 8px;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 1px 6px;
    border-radius: 4px;
    background-color: #f0fdfa;
    color: #14b8a6;
    opacity: 0;
    transition: opacity 0.15s, background-color 0.15s;
    pointer-events: none;
    z-index: 10;
    white-space: nowrap;
  }
`;

const CmsPreview: React.FC = () => {
  const [data, setData] = useState<PreviewData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'cms-preview') {
        setData(event.data as PreviewData);
      }
      // Parent can programmatically select a block
      if (event.data?.type === 'cms-select-block') {
        setSelectedIndex(event.data.index ?? null);
      }
    }

    window.addEventListener('message', handleMessage);

    // Tell the parent we're ready
    window.parent.postMessage({ type: 'cms-preview-ready' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Click on empty space deselects
  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (!data?.interactive) return;
    // Only deselect if clicking the background, not a block wrapper
    if ((e.target as HTMLElement).closest('.cms-block-wrapper')) return;
    setSelectedIndex(null);
    window.parent.postMessage({ type: 'cms-block-deselect' }, '*');
  }, [data?.interactive]);

  const handleBlockClick = useCallback((index: number, node: ComponentNode) => {
    setSelectedIndex(index);
    window.parent.postMessage({
      type: 'cms-block-click',
      blockIndex: index,
      blockType: node.type,
      currentProps: node.props,
    }, '*');
  }, []);

  const handleBlockHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
    if (index !== null) {
      window.parent.postMessage({
        type: 'cms-block-hover',
        blockIndex: index,
      }, '*');
    }
  }, []);

  const wrapNode = useCallback((rendered: React.ReactNode, index: number, node: ComponentNode) => {
    if (!data?.interactive) return rendered;

    const label = data.blockLabels?.[index] ?? node.type;

    return (
      <div
        key={`wrapper-${index}`}
        className="cms-block-wrapper"
        data-block-index={index}
        data-block-label={label}
        data-selected={selectedIndex === index ? 'true' : 'false'}
        onClick={(e) => {
          e.stopPropagation();
          handleBlockClick(index, node);
        }}
        onMouseEnter={() => handleBlockHover(index)}
        onMouseLeave={() => handleBlockHover(null)}
      >
        <span className="cms-block-label">{label}</span>
        {rendered}
      </div>
    );
  }, [data?.interactive, data?.blockLabels, selectedIndex, handleBlockClick, handleBlockHover]);

  const authorTitle = useMemo(() => {
    return AUTHOR_TITLES[data?.category ?? 'business'] ?? AUTHOR_TITLES.business;
  }, [data?.category]);

  if (!data || !data.componentMap?.length) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
          Waiting for content...
        </p>
      </div>
    );
  }

  return (
    <>
      {data.interactive && <style>{INTERACTIVE_STYLES}</style>}
      <article className="bg-white min-h-screen py-32" onClick={handleBackgroundClick}>
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              {data.tag && (
                <span className="bg-teal-50 text-teal-600 px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest">
                  {data.tag}
                </span>
              )}
              {data.date && (
                <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                  <Calendar size={12} />
                  <time>{data.date.split('T')[0]}</time>
                </div>
              )}
            </div>

            {data.title && (
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase mb-8">
                {data.title}
              </h1>
            )}

            <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
              <img
                src="https://raw.githubusercontent.com/kurtwuckertjr/KWJRdotCom/main/public/Kurtface.jpg"
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-lg"
                alt="Kurt Wuckert Jr."
              />
              <div>
                <p className="text-slate-900 font-black uppercase text-xs tracking-widest">Kurt Wuckert Jr.</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{authorTitle}</p>
              </div>
            </div>
          </header>

          {data.imageUrl && (
            <figure className="relative aspect-video rounded-[3rem] overflow-hidden mb-20 shadow-3xl ring-1 ring-black/5 bg-slate-100">
              <img src={data.imageUrl} alt={data.title ?? ''} className="w-full h-full object-cover" />
            </figure>
          )}

          <div
            ref={contentRef}
            className="prose prose-xl prose-slate max-w-none text-slate-700 font-light leading-relaxed mb-32"
          >
            <DynamicPostRenderer
              componentMap={data.componentMap}
              wrapNode={data.interactive ? wrapNode : undefined}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default CmsPreview;
