'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Sparkles,
  Loader2,
  X,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface WriterPanelProps {
  open: boolean;
  onClose: () => void;
  category: string;
  onDraftComplete: (markdown: string, title: string) => void;
}

type ExpertKey = 'bitcoin' | 'theology' | 'politics';

const EXPERT_LABELS: Record<ExpertKey, string> = {
  bitcoin: 'Bitcoin/BSV',
  theology: 'Theology',
  politics: 'Politics',
};

const CATEGORY_DEFAULTS: Record<string, ExpertKey[]> = {
  bitcoin: ['bitcoin'],
  business: ['bitcoin'],
  religion: ['theology'],
  politics: ['politics'],
  fitness: [],
};

export function WriterPanel({
  open,
  onClose,
  category,
  onDraftComplete,
}: WriterPanelProps) {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [experts, setExperts] = useState<ExpertKey[]>(
    CATEGORY_DEFAULTS[category] ?? ['bitcoin'],
  );
  const [phase, setPhase] = useState<string | null>(null);
  const [streamText, setStreamText] = useState('');
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Update default experts when category changes
  const prevCatRef = useRef(category);
  if (prevCatRef.current !== category) {
    prevCatRef.current = category;
    setExperts(CATEGORY_DEFAULTS[category] ?? ['bitcoin']);
  }

  const toggleExpert = useCallback((key: ExpertKey) => {
    setExperts((prev) =>
      prev.includes(key) ? prev.filter((e) => e !== key) : [...prev, key],
    );
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim() || generating) return;

    setGenerating(true);
    setStreamText('');
    setPhase('Starting...');
    setDone(false);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/agents/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          category,
          notes: notes.trim() || undefined,
          experts: experts.length > 0 ? experts : undefined,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json();
        setPhase(`Error: ${err.error}`);
        setGenerating(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setPhase('Error: No response stream');
        setGenerating(false);
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done: readerDone, value } = await reader.read();
        if (readerDone) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();

          if (payload === '[DONE]') {
            setDone(true);
            setPhase(null);
            continue;
          }

          try {
            const data = JSON.parse(payload);
            if (data.error) {
              setPhase(`Error: ${data.error}`);
              continue;
            }
            if (data.phase) {
              setPhase(data.message);
            }
            if (data.text) {
              setPhase(null);
              setStreamText((prev) => prev + data.text);
              // Auto-scroll preview
              requestAnimationFrame(() => {
                if (previewRef.current) {
                  previewRef.current.scrollTop = previewRef.current.scrollHeight;
                }
              });
            }
          } catch {
            // Skip malformed lines
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setPhase(`Error: ${(err as Error).message}`);
      }
    } finally {
      setGenerating(false);
      abortRef.current = null;
    }
  }, [topic, notes, experts, category, generating]);

  const handleCancel = useCallback(() => {
    abortRef.current?.abort();
    setGenerating(false);
    setPhase(null);
  }, []);

  const handleAccept = useCallback(() => {
    // Strip code fences if present
    let cleaned = streamText
      .replace(/^```(?:markdown)?\n/m, '')
      .replace(/\n```\s*$/m, '')
      .trim();

    // Extract title from first H1 line
    let title = 'Untitled Draft';
    const h1Match = cleaned.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].trim();
      // Remove the H1 from the markdown (the CMS has a separate title field)
      cleaned = cleaned.replace(/^#\s+.+\n*/, '').trim();
    }

    onDraftComplete(cleaned, title);
    handleReset();
  }, [streamText, onDraftComplete]);

  const handleReset = useCallback(() => {
    setTopic('');
    setNotes('');
    setStreamText('');
    setPhase(null);
    setDone(false);
    setGenerating(false);
    setShowNotes(false);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl border border-gray-700 bg-gray-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 px-5 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-teal-400" />
            <span className="text-sm font-semibold text-gray-200">
              AI Draft Writer
            </span>
          </div>
          <button
            onClick={() => {
              if (generating) handleCancel();
              onClose();
            }}
            className="rounded p-1 text-gray-500 hover:bg-gray-800 hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Input section - shown when not streaming */}
          {!generating && !done && (
            <div className="space-y-4">
              {/* Topic */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-400">
                  Topic / Angle
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Why UTXOs matter for enterprise blockchain"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-teal-500 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                  autoFocus
                />
              </div>

              {/* Notes toggle */}
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300"
              >
                {showNotes ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
                Notes & outline (optional)
              </button>

              {showNotes && (
                <div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Bullet points, key arguments, specific things to include..."
                    rows={4}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-teal-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Expert toggles */}
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-400">
                  Expert Agents
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(EXPERT_LABELS) as ExpertKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => toggleExpert(key)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        experts.includes(key)
                          ? 'bg-teal-500/20 text-teal-400 ring-1 ring-teal-500/40'
                          : 'bg-gray-800 text-gray-500 ring-1 ring-gray-700 hover:text-gray-300'
                      }`}
                    >
                      {EXPERT_LABELS[key]}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-[10px] text-gray-600">
                  Experts provide factual grounding. The writer agent handles voice and style.
                </p>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={!topic.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Sparkles className="h-4 w-4" />
                Generate Draft
              </button>
            </div>
          )}

          {/* Phase indicator */}
          {phase && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-gray-800/50 px-3 py-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-teal-400" />
              <span className="text-xs text-gray-400">{phase}</span>
            </div>
          )}

          {/* Streaming preview */}
          {(streamText || generating) && (
            <div
              ref={previewRef}
              className="max-h-[50vh] overflow-y-auto rounded-lg border border-gray-700 bg-gray-950 p-4"
            >
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-300">
                {streamText || (generating ? 'Waiting for expert briefs...' : '')}
              </pre>
            </div>
          )}
        </div>

        {/* Footer actions - shown when draft is complete */}
        {done && streamText && (
          <div className="flex items-center justify-between border-t border-gray-700 px-5 py-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-800 hover:text-gray-300"
            >
              <X className="h-3 w-3" />
              Discard & retry
            </button>
            <button
              onClick={handleAccept}
              className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-teal-500"
            >
              <Check className="h-3.5 w-3.5" />
              Accept Draft
            </button>
          </div>
        )}

        {/* Cancel button during generation */}
        {generating && (
          <div className="flex justify-center border-t border-gray-700 px-5 py-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-800 hover:text-red-400"
            >
              <X className="h-3 w-3" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
