'use client';

import { useState, useCallback } from 'react';
import {
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  AlertTriangle,
  Shield,
  Zap,
  Link2,
  FileText,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Copy,
  ExternalLink,
  Quote,
} from 'lucide-react';
import type {
  SeoAgentResponse,
  SeoSuggestion,
  AuthoritySignals,
} from '@/lib/agents/seo-agent';

interface SeoSidebarProps {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  markdown: string;
  date: string;
  wordCount: number;
  existingPosts: { slug: string; title: string; category: string }[];
  onApplyJsonLd: (jsonLd: Record<string, unknown>) => void;
  onApplyMeta: (meta: { metaDescription: string; keywords: string[] }) => void;
  onInsertLink?: (markdownLink: string) => void;
}

type SectionKey = 'authority' | 'schema' | 'suggestions' | 'questions' | 'entities' | 'links' | 'speakable';

/* ---- Visual authority gauge (SVG ring) ---- */
function AuthorityRing({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color =
    score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : score >= 40 ? '#f97316' : '#ef4444';

  return (
    <div className="relative mx-auto h-24 w-24">
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40" cy="40" r={r}
          fill="none" stroke="#1f2937" strokeWidth="6"
        />
        <circle
          cx="40" cy="40" r={r}
          fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-white">{score}</span>
        <span className="text-[9px] uppercase tracking-wider text-gray-500">Authority</span>
      </div>
    </div>
  );
}

/* ---- Score bar with label ---- */
function ScoreBar({ score, label, tooltip }: { score: number; label: string; tooltip?: string }) {
  const color =
    score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="space-y-1" title={tooltip}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500">{label}</span>
        <span className="text-[10px] font-semibold text-gray-400">{score}</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-800">
        <div
          className={`h-1.5 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${Math.min(100, score)}%` }}
        />
      </div>
    </div>
  );
}

/* ---- Schema validation badge ---- */
function SchemaValidation({ jsonLd }: { jsonLd: Record<string, unknown> }) {
  const checks: { label: string; pass: boolean }[] = [];

  const hasContext = jsonLd['@context'] === 'https://schema.org' ||
    (jsonLd as any)['@graph']?.length > 0;
  checks.push({ label: '@context', pass: hasContext });

  const graph = (jsonLd as any)['@graph'] ?? [jsonLd];
  const hasBlogPosting = graph.some((n: any) => n['@type'] === 'BlogPosting');
  checks.push({ label: 'BlogPosting', pass: hasBlogPosting });

  const hasBreadcrumb = graph.some((n: any) => n['@type'] === 'BreadcrumbList');
  checks.push({ label: 'BreadcrumbList', pass: hasBreadcrumb });

  const hasFaq = graph.some((n: any) => n['@type'] === 'FAQPage');
  checks.push({ label: 'FAQPage', pass: hasFaq });

  const hasSpeakable = graph.some((n: any) =>
    n['@type'] === 'BlogPosting' && n.speakable,
  );
  checks.push({ label: 'Speakable', pass: hasSpeakable });

  const allPass = checks.filter(c => c.pass).length;
  const total = checks.length;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        {allPass >= 3 ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
        ) : (
          <XCircle className="h-3.5 w-3.5 text-yellow-400" />
        )}
        <span className="text-[10px] font-medium text-gray-400">
          Schema: {allPass}/{total} checks pass
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {checks.map((c, i) => (
          <div key={i} className="flex items-center gap-1">
            {c.pass ? (
              <Check className="h-2.5 w-2.5 text-green-500" />
            ) : (
              <X className="h-2.5 w-2.5 text-gray-600" />
            )}
            <span className={`text-[9px] ${c.pass ? 'text-gray-400' : 'text-gray-600'}`}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Collapsible section ---- */
function CollapsibleSection({
  title,
  icon: Icon,
  isOpen,
  onToggle,
  badge,
  badgeColor,
  children,
}: {
  title: string;
  icon: typeof Shield;
  isOpen: boolean;
  onToggle: () => void;
  badge?: string | number;
  badgeColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-800 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-0 py-2.5 text-left transition hover:opacity-80"
      >
        {isOpen ? (
          <ChevronDown className="h-3 w-3 text-gray-600" />
        ) : (
          <ChevronRight className="h-3 w-3 text-gray-600" />
        )}
        <Icon className="h-3.5 w-3.5 text-gray-500" />
        <span className="flex-1 text-xs font-medium text-gray-400">{title}</span>
        {badge != null && (
          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${badgeColor ?? 'bg-gray-800 text-gray-500'}`}>
            {badge}
          </span>
        )}
      </button>
      {isOpen && <div className="pb-3">{children}</div>}
    </div>
  );
}

/* ---- Main sidebar component ---- */
export function SeoSidebar({
  title,
  slug,
  category,
  excerpt,
  markdown,
  date,
  wordCount,
  existingPosts,
  onApplyJsonLd,
  onApplyMeta,
  onInsertLink,
}: SeoSidebarProps) {
  const [data, setData] = useState<SeoAgentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(
    new Set(['authority', 'suggestions']),
  );
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<number>>(new Set());
  const [appliedMeta, setAppliedMeta] = useState(false);
  const [appliedJsonLd, setAppliedJsonLd] = useState(false);

  const toggleSection = useCallback((key: SectionKey) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const runAnalysis = useCallback(async () => {
    if (!title || !markdown.trim()) return;
    setLoading(true);
    setError(null);
    setDismissedSuggestions(new Set());
    setAppliedMeta(false);
    setAppliedJsonLd(false);

    try {
      const res = await fetch('/api/agents/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          category,
          excerpt,
          markdown,
          date,
          wordCount,
          existingPosts,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Request failed');
      }

      const result: SeoAgentResponse = await res.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  }, [title, slug, category, excerpt, markdown, date, wordCount, existingPosts]);

  const authority = data?.authority_signals;
  const activeSuggestions = data?.suggestions.filter(
    (_, i) => !dismissedSuggestions.has(i),
  );
  const highPriorityCount = activeSuggestions?.filter(s => s.priority === 'high').length ?? 0;

  return (
    <div className="space-y-3">
      {/* Header with analyze button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          SEO & Authority
        </h3>
        <button
          onClick={runAnalysis}
          disabled={loading || !title || !markdown.trim()}
          className="inline-flex items-center gap-1 rounded-md bg-gray-800 px-2 py-1 text-[10px] font-medium text-teal-400 transition hover:bg-gray-700 disabled:opacity-40 disabled:hover:bg-gray-800"
        >
          <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Analyzing...' : data ? 'Re-analyze' : 'Analyze'}
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-md border border-red-800/50 bg-red-900/20 px-3 py-2 text-[10px] text-red-400">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!data && !loading && !error && (
        <div className="rounded-lg border border-dashed border-gray-700 p-6 text-center">
          <Shield className="mx-auto mb-2 h-8 w-8 text-gray-700" />
          <p className="text-xs text-gray-600">
            Click Analyze to run the AEO/GEO agent
          </p>
          <p className="mt-1 text-[10px] text-gray-700">
            Generates JSON-LD, meta, entities, internal links, and authority scoring
          </p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !data && (
        <div className="space-y-3 animate-pulse">
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-800" />
          <div className="space-y-2">
            <div className="h-3 rounded bg-gray-800" />
            <div className="h-3 w-3/4 rounded bg-gray-800" />
            <div className="h-3 w-1/2 rounded bg-gray-800" />
          </div>
        </div>
      )}

      {data && (
        <>
          {/* Authority Score Ring */}
          {authority && (
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <AuthorityRing score={authority.overall} />
              <div className="mt-4 space-y-2">
                <ScoreBar
                  score={authority.schema_completeness}
                  label="Schema Completeness"
                  tooltip="How complete and valid your JSON-LD structured data is"
                />
                <ScoreBar
                  score={authority.entity_linking_score}
                  label="Entity Linking"
                  tooltip="Coverage of entity mentions with sameAs links to authoritative sources"
                />
                <ScoreBar
                  score={authority.citation_worthiness}
                  label="Citation Worthiness"
                  tooltip="How likely AI engines are to cite this content"
                />
                <ScoreBar
                  score={authority.aeo_readiness}
                  label="AEO Readiness"
                  tooltip="Answer Engine Optimization readiness for AI-powered search"
                />
              </div>

              {/* Schema validation mini-check */}
              {data.json_ld && Object.keys(data.json_ld).length > 0 && (
                <div className="mt-3 border-t border-gray-800 pt-3">
                  <SchemaValidation jsonLd={data.json_ld} />
                </div>
              )}
            </div>
          )}

          {/* Meta description with apply button */}
          {data.meta_description && (
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  Meta Description
                </span>
                <span className={`text-[10px] font-medium ${
                  data.meta_description.length > 155 ? 'text-red-400' :
                  data.meta_description.length >= 140 ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {data.meta_description.length}/155
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-400">
                {data.meta_description}
              </p>
              <button
                onClick={() => {
                  onApplyMeta({
                    metaDescription: data.meta_description,
                    keywords: data.keywords,
                  });
                  setAppliedMeta(true);
                }}
                className={`inline-flex w-full items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[10px] font-semibold transition ${
                  appliedMeta
                    ? 'bg-green-900/30 text-green-400'
                    : 'bg-teal-600/20 text-teal-400 hover:bg-teal-600/30'
                }`}
              >
                {appliedMeta ? (
                  <>
                    <Check className="h-3 w-3" />
                    Applied
                  </>
                ) : (
                  <>
                    <Zap className="h-3 w-3" />
                    Apply meta + keywords
                  </>
                )}
              </button>
            </div>
          )}

          {/* Collapsible sections */}
          <div className="space-y-0">
            {/* Authority Issues */}
            {authority && authority.issues.length > 0 && (
              <CollapsibleSection
                title="Issues"
                icon={AlertTriangle}
                isOpen={openSections.has('authority')}
                onToggle={() => toggleSection('authority')}
                badge={authority.issues.length}
                badgeColor="bg-red-900/40 text-red-400"
              >
                <ul className="space-y-1.5">
                  {authority.issues.map((issue, i) => (
                    <li key={i} className="flex gap-2 text-[10px] text-yellow-400/80">
                      <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}

            {/* Suggestions */}
            {activeSuggestions && activeSuggestions.length > 0 && (
              <CollapsibleSection
                title="Suggestions"
                icon={Zap}
                isOpen={openSections.has('suggestions')}
                onToggle={() => toggleSection('suggestions')}
                badge={activeSuggestions.length}
                badgeColor={highPriorityCount > 0 ? 'bg-red-900/40 text-red-400' : 'bg-gray-800 text-gray-500'}
              >
                <ul className="space-y-2">
                  {data.suggestions.map((s, i) => {
                    if (dismissedSuggestions.has(i)) return null;
                    return (
                      <li key={i} className="group rounded-md bg-gray-900/50 p-2">
                        <div className="flex items-start gap-2">
                          <span className={`mt-0.5 shrink-0 rounded px-1 py-0.5 text-[8px] font-bold uppercase leading-none ${
                            s.priority === 'high' ? 'bg-red-900/40 text-red-400' :
                            s.priority === 'medium' ? 'bg-yellow-900/40 text-yellow-400' :
                            'bg-gray-800 text-gray-500'
                          }`}>
                            {s.priority}
                          </span>
                          <span className="flex-1 text-[10px] leading-relaxed text-gray-400">
                            {s.message}
                          </span>
                          <button
                            onClick={() => setDismissedSuggestions((prev) => new Set([...prev, i]))}
                            className="invisible shrink-0 rounded p-0.5 text-gray-600 transition hover:bg-gray-800 hover:text-gray-400 group-hover:visible"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="mt-1 pl-5">
                          <span className="rounded bg-gray-800 px-1 py-0.5 text-[8px] text-gray-600">
                            {s.type}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CollapsibleSection>
            )}

            {/* Q&A Pairs (AEO) */}
            {data.questions.length > 0 && (
              <CollapsibleSection
                title="Q&A Pairs (AEO)"
                icon={HelpCircle}
                isOpen={openSections.has('questions')}
                onToggle={() => toggleSection('questions')}
                badge={data.questions.length}
                badgeColor="bg-teal-900/40 text-teal-400"
              >
                <ul className="space-y-2">
                  {data.questions.map((q, i) => (
                    <li key={i} className="rounded-md border border-gray-800 bg-gray-900/50 p-2">
                      <p className="text-[10px] font-semibold text-gray-300">
                        <HelpCircle className="mr-1 inline h-3 w-3 text-teal-500" />
                        {q.question}
                      </p>
                      <p className="mt-1 pl-4 text-[10px] leading-relaxed text-gray-500">
                        {q.answer}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[9px] text-gray-600">
                  These Q&A pairs are included in FAQPage schema for AI answer engines.
                </p>
              </CollapsibleSection>
            )}

            {/* Entities */}
            {data.entities.length > 0 && (
              <CollapsibleSection
                title="Entities"
                icon={Shield}
                isOpen={openSections.has('entities')}
                onToggle={() => toggleSection('entities')}
                badge={data.entities.length}
              >
                <div className="space-y-1">
                  {data.entities.map((e, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px]">
                      <span className="rounded bg-gray-800 px-1 py-0.5 text-[8px] text-gray-600">
                        {e.type}
                      </span>
                      <span className="flex-1 text-gray-400">{e.name}</span>
                      {e.sameAs && (
                        <a
                          href={e.sameAs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-teal-400"
                          title={e.sameAs}
                        >
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            )}

            {/* Internal Links (actionable) */}
            {data.internal_links.length > 0 && (
              <CollapsibleSection
                title="Internal Links"
                icon={Link2}
                isOpen={openSections.has('links')}
                onToggle={() => toggleSection('links')}
                badge={data.internal_links.length}
                badgeColor="bg-teal-900/40 text-teal-400"
              >
                <ul className="space-y-2">
                  {data.internal_links.map((link, i) => (
                    <li key={i} className="rounded-md border border-gray-800 bg-gray-900/50 p-2">
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-medium text-teal-400">
                          {link.title}
                        </span>
                        <button
                          onClick={() => {
                            const md = `[${link.title}](/post/${link.slug})`;
                            if (onInsertLink) {
                              onInsertLink(md);
                            } else {
                              navigator.clipboard.writeText(md);
                            }
                          }}
                          className="shrink-0 rounded p-0.5 text-gray-600 transition hover:bg-gray-800 hover:text-teal-400"
                          title="Copy markdown link"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-[9px] text-gray-600">{link.relevance}</p>
                      <p className="mt-0.5 text-[9px] text-gray-700">/post/{link.slug}</p>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}

            {/* JSON-LD Preview */}
            <CollapsibleSection
              title="JSON-LD Schema"
              icon={FileText}
              isOpen={openSections.has('schema')}
              onToggle={() => toggleSection('schema')}
            >
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onApplyJsonLd(data.json_ld);
                    setAppliedJsonLd(true);
                  }}
                  className={`inline-flex w-full items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[10px] font-semibold transition ${
                    appliedJsonLd
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-teal-600/20 text-teal-400 hover:bg-teal-600/30'
                  }`}
                >
                  {appliedJsonLd ? (
                    <>
                      <Check className="h-3 w-3" />
                      JSON-LD Applied
                    </>
                  ) : (
                    <>
                      <FileText className="h-3 w-3" />
                      Apply JSON-LD to post
                    </>
                  )}
                </button>
                <pre className="max-h-48 overflow-auto rounded-md bg-gray-950 p-2 text-[9px] leading-relaxed text-gray-500 scrollbar-thin">
                  {JSON.stringify(data.json_ld, null, 2)}
                </pre>
              </div>
            </CollapsibleSection>
          </div>

          {/* Keywords */}
          {data.keywords.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Keywords
              </span>
              <div className="flex flex-wrap gap-1">
                {data.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-gray-800 bg-gray-900/50 px-2 py-0.5 text-[10px] text-gray-500"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Static info footer */}
      <div className="space-y-1.5 border-t border-gray-800 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-600">Word Count</span>
          <span className="text-[10px] font-medium text-gray-500">{wordCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-600">Reading Time</span>
          <span className="text-[10px] font-medium text-gray-500">
            {Math.max(1, Math.ceil(wordCount / 238))} min
          </span>
        </div>
        {existingPosts.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-600">Site Articles</span>
            <span className="text-[10px] font-medium text-gray-500">{existingPosts.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
