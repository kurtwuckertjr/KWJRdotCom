'use client';

import { useEffect, useRef, useState } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter, drawSelection, rectangularSelection } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion } from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import {
  Plus,
  X,
  ImageIcon,
  Search,
} from 'lucide-react';

// ─── Directive snippets ───────────────────────────────────

const DIRECTIVE_SNIPPETS: Record<string, string> = {
  callout: ':::callout{type="teal" icon="BookOpen" title="Title"}\nContent here...\n:::\n',
  'callout-amber': ':::callout{type="amber" icon="Compass" title="Title"}\nContent here...\n:::\n',
  'callout-navy': ':::callout{type="navy" icon="Info" title="Title"}\nContent here...\n:::\n',
  timeline: ':::timeline{accent="teal"}\n1. **Step one**\n   Description...\n\n2. **Step two**\n   Description...\n:::\n',
  'timeline-amber': ':::timeline{accent="amber"}\n1. **Step one**\n   Description...\n\n2. **Step two**\n   Description...\n:::\n',
  darkbox: '::::darkbox{title="The Bottom Line" icon="Info"}\nSummary here...\n::::\n',
  darkcontent: ':::darkcontent\nContent here...\n:::\n',
  cardgrid: ':::cardgrid{cols=3}\n### Card Title\nCard description...\n\n### Card Title\nCard description...\n\n### Card Title\nCard description...\n:::\n',
  'cardgrid-def': ':::cardgrid{cols=3 variant="definition"}\n### Term\nShort definition...\n\n### Term\nShort definition...\n\n### Term\nShort definition...\n:::\n',
  scripture: ':::scripture{reference="Reference (Translation)"}\n"Quote here..."\n---\nExplanation here...\n:::\n',
  faq: ':::faq\n**Question here?**\nAnswer here...\n\n**Another question?**\nAnother answer...\n:::\n',
  comparison: ':::comparison{leftTitle="Option A" rightTitle="Option B"}\n- Left item 1\n- Left item 2\n\n---\n\n- Right item 1\n- Right item 2\n:::\n',
  'comparison-amber': ':::comparison{leftTitle="Option A" rightTitle="Option B" accent="amber"}\n- Left item 1\n- Left item 2\n\n---\n\n- Right item 1\n- Right item 2\n:::\n',
  'comparison-navy': ':::comparison{leftTitle="Option A" rightTitle="Option B" accent="navy"}\n- Left item 1\n- Left item 2\n\n---\n\n- Right item 1\n- Right item 2\n:::\n',
  'comparison-reversed': ':::comparison{leftTitle="Option A" rightTitle="Option B" reversed}\n- Left item 1\n- Left item 2\n\n---\n\n- Right item 1\n- Right item 2\n:::\n',
  warning: ':::warning{cols=2}\n### Warning one.\n\n### Warning two.\n:::\n',
  checklist: ':::checklist\n- **Item one** - description here\n- **Item two** - description here\n- **Item three** - description here\n:::\n',
  statgrid: ':::statgrid{cols=3}\n- **100%** Stat label\n- **50+** Another label\n- **24/7** Third label\n:::\n',
  workout: ':::workout{title="Day 1"}\n| Exercise | Sets | Reps | Notes |\n|----------|------|------|-------|\n| Squat    | 4    | 8    | Heavy |\n:::\n',
  steps: ':::steps{accent="teal"}\n1. **First step**\n   Description...\n\n2. **Second step**\n   Description...\n:::\n',
  objection: ':::objection\n**"The common objection"**\nThe reply to the objection...\n:::\n',
  references: ':::references\n- Reference 1\n- Reference 2\n:::\n',
  glossary: ':::glossary\n### A\n**Term** - Definition here\n:::\n',
  subheading: ':::subheading{color="slate"}\nSub-heading text here\n:::\n',
  'subheading-amber': ':::subheading{color="amber"}\nSub-heading text here\n:::\n',
  featuredcard: '::::featuredcard{icon="ShieldCheck"}\n:::subheading{color="slate"}\nSection title\n:::\n\nContent here...\n::::\n',
  centered: ':::centered{size="sm"}\nCentered text here.\n:::\n',
  'centered-lg': ':::centered{size="lg"}\nBold statement here.\n:::\n',
  h2: '\n## Section Heading\n',
  bold: '**bold text**',
  italic: '*italic text*',
};

// ─── Directive autocomplete ───────────────────────────────

const ALL_DIRECTIVE_NAMES = [
  'callout', 'timeline', 'darkbox', 'darkcontent', 'cardgrid',
  'scripture', 'faq', 'comparison', 'warning', 'checklist',
  'statgrid', 'workout', 'steps', 'objection', 'references',
  'glossary', 'subheading', 'featuredcard', 'centered',
];

function directiveCompletions(context: any) {
  const before = context.matchBefore(/^:{2,4}\w*/);
  if (!before) return null;

  return {
    from: before.from,
    options: ALL_DIRECTIVE_NAMES.map((name) => ({
      label: `:::${name}`,
      type: 'keyword',
      detail: 'directive',
      apply: DIRECTIVE_SNIPPETS[name] ?? `:::${name}\n\n:::\n`,
    })),
  };
}

// ─── Palette items ────────────────────────────────────────

interface PaletteItem {
  id: string;
  label: string;
  description: string;
  category: string;
  color: string;          // tailwind color class for the icon badge
  snippet: string;
  keywords: string[];     // for search filtering
}

const PALETTE_ITEMS: PaletteItem[] = [
  // --- Text ---
  { id: 'h2', label: 'Section Heading', description: 'Large H2 heading with underline', category: 'Text', color: 'bg-slate-700', snippet: DIRECTIVE_SNIPPETS.h2, keywords: ['heading', 'h2', 'section', 'title'] },
  { id: 'subheading', label: 'Sub-heading (slate)', description: 'Uppercase H3 sub-heading, dark color', category: 'Text', color: 'bg-slate-600', snippet: DIRECTIVE_SNIPPETS.subheading, keywords: ['heading', 'h3', 'sub', 'slate'] },
  { id: 'subheading-amber', label: 'Sub-heading (amber)', description: 'Uppercase H3 sub-heading, warm color', category: 'Text', color: 'bg-amber-600', snippet: DIRECTIVE_SNIPPETS['subheading-amber'], keywords: ['heading', 'h3', 'sub', 'amber', 'warm'] },
  { id: 'centered', label: 'Centered Callout (sm)', description: 'Small uppercase centered advice text', category: 'Text', color: 'bg-gray-500', snippet: DIRECTIVE_SNIPPETS.centered, keywords: ['center', 'callout', 'small', 'advice'] },
  { id: 'centered-lg', label: 'Centered Callout (lg)', description: 'Large bold centered statement', category: 'Text', color: 'bg-slate-800', snippet: DIRECTIVE_SNIPPETS['centered-lg'], keywords: ['center', 'callout', 'large', 'bold', 'statement'] },
  { id: 'bold', label: 'Bold', description: 'Bold inline text', category: 'Text', color: 'bg-gray-600', snippet: DIRECTIVE_SNIPPETS.bold, keywords: ['bold', 'strong'] },
  { id: 'italic', label: 'Italic', description: 'Italic inline text', category: 'Text', color: 'bg-gray-600', snippet: DIRECTIVE_SNIPPETS.italic, keywords: ['italic', 'emphasis'] },

  // --- Boxes & Cards ---
  { id: 'callout', label: 'Callout Box (teal)', description: 'Left-border callout with icon. Use for summaries & key takeaways.', category: 'Boxes', color: 'bg-teal-600', snippet: DIRECTIVE_SNIPPETS.callout, keywords: ['callout', 'box', 'teal', 'summary', 'takeaway'] },
  { id: 'callout-amber', label: 'Callout Box (amber)', description: 'Warm-toned callout for lifestyle, religion, politics.', category: 'Boxes', color: 'bg-amber-600', snippet: DIRECTIVE_SNIPPETS['callout-amber'], keywords: ['callout', 'box', 'amber', 'warm'] },
  { id: 'callout-navy', label: 'Callout Box (navy)', description: 'Navy accent callout for occasional emphasis.', category: 'Boxes', color: 'bg-indigo-800', snippet: DIRECTIVE_SNIPPETS['callout-navy'], keywords: ['callout', 'box', 'navy', 'blue', 'accent'] },
  { id: 'darkbox', label: 'Dark Summary Box', description: 'Dark background with icon & glow. Use for final takeaways.', category: 'Boxes', color: 'bg-slate-800', snippet: DIRECTIVE_SNIPPETS.darkbox, keywords: ['dark', 'summary', 'box', 'bottom', 'line', 'conclusion'] },
  { id: 'featuredcard', label: 'Featured Card', description: 'Rounded card with faded background icon. For standout sections.', category: 'Boxes', color: 'bg-teal-700', snippet: DIRECTIVE_SNIPPETS.featuredcard, keywords: ['featured', 'card', 'standout', 'highlight', 'important'] },
  { id: 'darkcontent', label: 'Dark Content Block', description: 'Full-width dark section for extended dark content.', category: 'Boxes', color: 'bg-gray-800', snippet: DIRECTIVE_SNIPPETS.darkcontent, keywords: ['dark', 'content', 'block', 'full', 'width'] },

  // --- Lists & Grids ---
  { id: 'timeline', label: 'Timeline (teal)', description: 'Numbered vertical timeline with hover effects.', category: 'Lists', color: 'bg-teal-600', snippet: DIRECTIVE_SNIPPETS.timeline, keywords: ['timeline', 'numbered', 'steps', 'sequence', 'order', 'teal'] },
  { id: 'timeline-amber', label: 'Timeline (amber)', description: 'Amber-accented numbered timeline.', category: 'Lists', color: 'bg-amber-600', snippet: DIRECTIVE_SNIPPETS['timeline-amber'], keywords: ['timeline', 'numbered', 'steps', 'amber'] },
  { id: 'steps', label: 'Step List', description: 'Numbered steps with connecting line. For how-to content.', category: 'Lists', color: 'bg-teal-500', snippet: DIRECTIVE_SNIPPETS.steps, keywords: ['steps', 'how', 'to', 'instructions', 'guide'] },
  { id: 'cardgrid', label: 'Card Grid', description: 'Hover-interactive cards in 2-4 columns.', category: 'Lists', color: 'bg-teal-700', snippet: DIRECTIVE_SNIPPETS.cardgrid, keywords: ['card', 'grid', 'columns', 'features', 'benefits'] },
  { id: 'cardgrid-def', label: 'Definition Cards', description: 'Small compact definition cards. For quick-reference terms.', category: 'Lists', color: 'bg-amber-700', snippet: DIRECTIVE_SNIPPETS['cardgrid-def'], keywords: ['definition', 'card', 'grid', 'term', 'glossary', 'compact'] },
  { id: 'comparison', label: 'Comparison (teal)', description: 'Side-by-side: dark left, teal right.', category: 'Lists', color: 'bg-teal-700', snippet: DIRECTIVE_SNIPPETS.comparison, keywords: ['comparison', 'side', 'by', 'side', 'versus', 'vs', 'contrast', 'teal'] },
  { id: 'comparison-amber', label: 'Comparison (amber)', description: 'Side-by-side: dark left, amber right.', category: 'Lists', color: 'bg-amber-700', snippet: DIRECTIVE_SNIPPETS['comparison-amber'], keywords: ['comparison', 'side', 'versus', 'vs', 'amber', 'warm'] },
  { id: 'comparison-navy', label: 'Comparison (navy)', description: 'Side-by-side: dark left, navy right.', category: 'Lists', color: 'bg-indigo-700', snippet: DIRECTIVE_SNIPPETS['comparison-navy'], keywords: ['comparison', 'side', 'versus', 'vs', 'navy', 'blue'] },
  { id: 'comparison-reversed', label: 'Comparison (reversed)', description: 'Side-by-side: colored left, dark right.', category: 'Lists', color: 'bg-slate-700', snippet: DIRECTIVE_SNIPPETS['comparison-reversed'], keywords: ['comparison', 'reversed', 'flip', 'swap'] },
  { id: 'checklist', label: 'Checklist', description: 'Teal checkmark items. For action items & requirements.', category: 'Lists', color: 'bg-teal-600', snippet: DIRECTIVE_SNIPPETS.checklist, keywords: ['checklist', 'check', 'action', 'items', 'todo'] },
  { id: 'warning', label: 'Warning Grid', description: 'Red-tinted cards for mistakes & things to avoid.', category: 'Lists', color: 'bg-red-600', snippet: DIRECTIVE_SNIPPETS.warning, keywords: ['warning', 'mistake', 'error', 'avoid', 'red', 'danger'] },
  { id: 'statgrid', label: 'Stat Grid', description: 'Key numbers and metrics in a grid.', category: 'Lists', color: 'bg-slate-600', snippet: DIRECTIVE_SNIPPETS.statgrid, keywords: ['stat', 'grid', 'number', 'metric', 'data', 'statistic'] },

  // --- Content ---
  { id: 'faq', label: 'FAQ Accordion', description: 'Collapsible question & answer pairs.', category: 'Content', color: 'bg-teal-600', snippet: DIRECTIVE_SNIPPETS.faq, keywords: ['faq', 'question', 'answer', 'accordion', 'collapsible'] },
  { id: 'scripture', label: 'Scripture Card', description: 'Bible verse with reference and explanation.', category: 'Content', color: 'bg-amber-700', snippet: DIRECTIVE_SNIPPETS.scripture, keywords: ['scripture', 'bible', 'verse', 'quote', 'religion'] },
  { id: 'objection', label: 'Objection Block', description: 'Bold objection with reply. For debates & counterpoints.', category: 'Content', color: 'bg-slate-600', snippet: DIRECTIVE_SNIPPETS.objection, keywords: ['objection', 'reply', 'debate', 'counter', 'argument'] },
  { id: 'references', label: 'Reference List', description: 'Styled citations and source list.', category: 'Content', color: 'bg-gray-600', snippet: DIRECTIVE_SNIPPETS.references, keywords: ['reference', 'citation', 'source', 'bibliography'] },
  { id: 'glossary', label: 'Glossary', description: 'Alphabetical term definitions grouped by letter.', category: 'Content', color: 'bg-teal-700', snippet: DIRECTIVE_SNIPPETS.glossary, keywords: ['glossary', 'terms', 'definitions', 'alphabet'] },

  // --- Fitness ---
  { id: 'workout', label: 'Workout Table', description: 'Exercise / sets / reps table layout.', category: 'Fitness', color: 'bg-teal-600', snippet: DIRECTIVE_SNIPPETS.workout, keywords: ['workout', 'exercise', 'fitness', 'gym', 'table', 'sets', 'reps'] },
];

const CATEGORIES = ['Text', 'Boxes', 'Lists', 'Content', 'Fitness'];

// ─── MarkdownEditor Component ─────────────────────────────

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MarkdownEditor({ value, onChange, className }: EditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const isExternalUpdate = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged && !isExternalUpdate.current) {
        onChangeRef.current(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        drawSelection(),
        rectangularSelection(),
        history(),
        oneDark,
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        autocompletion({ override: [directiveCompletions] }),
        highlightSelectionMatches(),
        keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap, indentWithTab]),
        updateListener,
        EditorView.lineWrapping,
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-scroller': { overflow: 'auto' },
          '.cm-content': { fontFamily: '"JetBrains Mono", "Fira Code", monospace', fontSize: '13px', padding: '16px 0' },
          '.cm-line': { padding: '0 16px' },
          '.cm-gutters': { backgroundColor: 'transparent', borderRight: '1px solid #1e293b' },
        }),
      ],
    });

    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;

    return () => { view.destroy(); viewRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const currentValue = view.state.doc.toString();
    if (currentValue !== value) {
      isExternalUpdate.current = true;
      view.dispatch({ changes: { from: 0, to: currentValue.length, insert: value } });
      isExternalUpdate.current = false;
    }
  }, [value]);

  return <div ref={containerRef} className={`h-full overflow-hidden ${className ?? ''}`} />;
}

// ─── Insert Palette (floating panel) ──────────────────────

function InsertPalette({
  open,
  onClose,
  onInsert,
  onInsertImage,
}: {
  open: boolean;
  onClose: () => void;
  onInsert: (snippet: string) => void;
  onInsertImage?: () => void;
}) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus search on open
  useEffect(() => {
    if (open) {
      setSearch('');
      setActiveCategory(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const query = search.toLowerCase().trim();
  const filtered = query
    ? PALETTE_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.keywords.some((k) => k.includes(query)),
      )
    : activeCategory
    ? PALETTE_ITEMS.filter((item) => item.category === activeCategory)
    : PALETTE_ITEMS;

  const showCategories = !query;

  return (
    <div
      ref={panelRef}
      className="absolute left-0 right-0 top-0 z-50 mx-auto max-h-[70vh] w-full max-w-2xl overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-2xl"
    >
      {/* Search bar */}
      <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-3">
        <Search className="h-4 w-4 shrink-0 text-gray-500" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search formatting options..."
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none"
        />
        <button onClick={onClose} className="rounded p-1 text-gray-500 transition hover:text-gray-300">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Category tabs */}
      {showCategories && (
        <div className="flex items-center gap-1 overflow-x-auto border-b border-gray-800 px-3 py-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
              activeCategory === null
                ? 'bg-teal-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
                activeCategory === cat
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
          {onInsertImage && (
            <>
              <span className="mx-1 h-4 w-px bg-gray-800" />
              <button
                onClick={() => {
                  onInsertImage();
                  onClose();
                }}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-900/30 px-3 py-1 text-xs font-medium text-amber-400 transition hover:bg-amber-900/50"
              >
                <ImageIcon className="h-3 w-3" />
                Image
              </button>
            </>
          )}
        </div>
      )}

      {/* Items grid */}
      <div className="max-h-[50vh] overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onInsert(item.snippet);
                onClose();
              }}
              className="group flex items-start gap-3 rounded-lg p-3 text-left transition hover:bg-gray-800"
            >
              <div className={`mt-0.5 h-8 w-8 shrink-0 rounded-lg ${item.color} flex items-center justify-center`}>
                <span className="text-[10px] font-black uppercase tracking-tighter text-white/90">
                  {item.label.slice(0, 2)}
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-200 group-hover:text-white">
                  {item.label}
                </div>
                <div className="mt-0.5 text-xs leading-snug text-gray-500 group-hover:text-gray-400">
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-600">
            No matching formatting options
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EditorToolbar Component ──────────────────────────────

interface ToolbarProps {
  onInsert: (snippet: string) => void;
  onInsertImage?: () => void;
}

export function EditorToolbar({ onInsert, onInsertImage }: ToolbarProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="relative border-b border-gray-800 px-2 py-1">
      <button
        onClick={() => setPaletteOpen(!paletteOpen)}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
          paletteOpen
            ? 'bg-teal-600 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-teal-400'
        }`}
      >
        <Plus className="h-3.5 w-3.5" />
        Insert Block
      </button>

      <InsertPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onInsert={onInsert}
        onInsertImage={onInsertImage}
      />
    </div>
  );
}
