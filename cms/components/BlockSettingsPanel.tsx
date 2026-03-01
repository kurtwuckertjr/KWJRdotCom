'use client';

import { Settings, MousePointerClick } from 'lucide-react';
import type { BlockMetadata } from '@/lib/markdown';
import { ColorSwatch } from './block-controls/ColorSwatch';
import { IconPicker } from './block-controls/IconPicker';
import { PropToggle } from './block-controls/PropToggle';
import { PropStepper } from './block-controls/PropStepper';
import { PropTextField } from './block-controls/PropTextField';

interface BlockSettingsPanelProps {
  selectedIndex: number | null;
  metadata: BlockMetadata[];
  currentProps: Record<string, unknown>;
  onPropChange: (key: string, value: string | number | boolean | undefined) => void;
}

/**
 * Mapping from callout's `type` attribute to the display accent.
 * Callout uses `type` in the directive but maps to `accent` prop.
 */
const ACCENT_COLORS = [
  { name: 'Teal', value: 'teal', hex: '#14b8a6' },
  { name: 'Amber', value: 'amber', hex: '#f59e0b' },
  { name: 'Navy', value: 'navy', hex: '#1e3a5f' },
];

const SUBHEADING_COLORS = [
  { name: 'Amber', value: 'amber', hex: '#f59e0b' },
  { name: 'Slate', value: 'slate', hex: '#64748b' },
];

const DARKBOX_ACCENTS = [
  { name: 'Teal', value: 'teal', hex: '#14b8a6' },
  { name: 'Navy', value: 'navy', hex: '#1e3a5f' },
];

/**
 * Renders per-block-type visual controls.
 * The controls update directive attributes in the markdown source.
 */
export function BlockSettingsPanel({
  selectedIndex,
  metadata,
  currentProps,
  onPropChange,
}: BlockSettingsPanelProps) {
  if (selectedIndex === null) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <MousePointerClick className="mb-3 h-8 w-8 text-gray-700" />
        <p className="text-xs font-medium text-gray-500">Click a block in the preview</p>
        <p className="mt-1 text-[10px] text-gray-600">to edit its visual settings</p>
      </div>
    );
  }

  const meta = metadata[selectedIndex];
  if (!meta) return null;

  const { componentType, directiveName } = meta;

  return (
    <div className="space-y-4">
      {/* Block type header */}
      <div className="flex items-center gap-2 rounded-lg bg-gray-800/50 px-3 py-2">
        <Settings className="h-3.5 w-3.5 text-teal-500" />
        <div>
          <p className="text-xs font-bold text-gray-300">{componentType}</p>
          {directiveName && (
            <p className="text-[9px] text-gray-600">
              :::{directiveName}
            </p>
          )}
        </div>
      </div>

      {/* Per-type controls */}
      {renderControls(componentType, directiveName, currentProps, onPropChange)}
    </div>
  );
}

function renderControls(
  componentType: string,
  directiveName: string | null,
  props: Record<string, unknown>,
  onChange: (key: string, value: string | number | boolean | undefined) => void,
) {
  switch (componentType) {
    case 'CalloutBox':
      return (
        <div className="space-y-4">
          <ColorSwatch
            label="Accent Color"
            value={String(props.accent ?? props.type ?? 'teal')}
            onChange={(v) => onChange('type', v)}
            colors={ACCENT_COLORS}
          />
          <IconPicker
            value={String(props.icon ?? '')}
            onChange={(v) => onChange('icon', v)}
          />
          <PropTextField
            label="Title"
            value={String(props.title ?? '')}
            placeholder="e.g., Quick Summary"
            onChange={(v) => onChange('title', v || undefined)}
          />
        </div>
      );

    case 'DarkSummaryBox':
      return (
        <div className="space-y-4">
          <ColorSwatch
            label="Accent Color"
            value={String(props.accent ?? 'teal')}
            onChange={(v) => onChange('accent', v)}
            colors={DARKBOX_ACCENTS}
          />
          <IconPicker
            value={String(props.icon ?? '')}
            onChange={(v) => onChange('icon', v)}
          />
          <PropTextField
            label="Title"
            value={String(props.title ?? '')}
            placeholder="e.g., The Bottom Line"
            onChange={(v) => onChange('title', v || undefined)}
          />
        </div>
      );

    case 'ComparisonGrid':
      return (
        <div className="space-y-4">
          <ColorSwatch
            label="Accent Color"
            value={String(props.accent ?? 'teal')}
            onChange={(v) => onChange('accent', v)}
            colors={ACCENT_COLORS}
          />
          <PropToggle
            label="Layout"
            value={props.reversed ? 'reversed' : 'default'}
            options={[
              { label: 'Default', value: 'default' },
              { label: 'Reversed', value: 'reversed' },
            ]}
            onChange={(v) => onChange('reversed', v === 'reversed' ? 'true' : undefined)}
          />
          <PropTextField
            label="Left Title"
            value={String(props.leftTitle ?? 'Before')}
            onChange={(v) => onChange('leftTitle', v)}
          />
          <PropTextField
            label="Right Title"
            value={String(props.rightTitle ?? 'After')}
            onChange={(v) => onChange('rightTitle', v)}
          />
        </div>
      );

    case 'NumberedTimeline':
      return (
        <ColorSwatch
          label="Accent Color"
          value={String(props.accent ?? 'teal')}
          onChange={(v) => onChange('accent', v)}
          colors={ACCENT_COLORS}
        />
      );

    case 'StepList':
      return (
        <ColorSwatch
          label="Accent Color"
          value={String(props.accent ?? 'teal')}
          onChange={(v) => onChange('accent', v)}
          colors={ACCENT_COLORS}
        />
      );

    case 'CardGrid':
      return (
        <div className="space-y-4">
          <PropStepper
            label="Columns"
            value={Number(props.cols ?? 3)}
            min={1}
            max={4}
            onChange={(v) => onChange('cols', v)}
          />
          <PropToggle
            label="Variant"
            value={String(props.variant ?? 'default')}
            options={[
              { label: 'Default', value: 'default' },
              { label: 'Definition', value: 'definition' },
            ]}
            onChange={(v) => onChange('variant', v)}
          />
        </div>
      );

    case 'SubHeading':
      return (
        <ColorSwatch
          label="Color"
          value={String(props.color ?? 'slate')}
          onChange={(v) => onChange('color', v)}
          colors={SUBHEADING_COLORS}
        />
      );

    case 'CenteredCallout':
      return (
        <PropToggle
          label="Size"
          value={String(props.size ?? 'sm')}
          options={[
            { label: 'Small', value: 'sm' },
            { label: 'Large', value: 'lg' },
          ]}
          onChange={(v) => onChange('size', v)}
        />
      );

    case 'FeaturedCard':
      return (
        <IconPicker
          value={String(props.icon ?? '')}
          onChange={(v) => onChange('icon', v)}
        />
      );

    case 'WarningGrid':
      return (
        <PropStepper
          label="Columns"
          value={Number(props.cols ?? 2)}
          min={2}
          max={3}
          onChange={(v) => onChange('cols', v)}
        />
      );

    case 'StatGrid':
      return (
        <PropStepper
          label="Columns"
          value={Number(props.cols ?? 3)}
          min={2}
          max={4}
          onChange={(v) => onChange('cols', v)}
        />
      );

    case 'WorkoutTable':
      return (
        <PropTextField
          label="Title"
          value={String(props.title ?? '')}
          placeholder="e.g., Monday - Upper Body"
          onChange={(v) => onChange('title', v || undefined)}
        />
      );

    case 'ScriptureCard':
      return (
        <PropTextField
          label="Reference"
          value={String(props.reference ?? '')}
          placeholder="e.g., Romans 13:1 (ESV)"
          onChange={(v) => onChange('reference', v)}
        />
      );

    // Components with no visual settings
    case 'FaqAccordion':
    case 'Checklist':
    case 'ReferenceList':
    case 'GlossarySection':
    case 'ObjectionBlock':
    case 'DarkContentBlock':
    case 'BodyText':
    case 'SectionHeading':
    case 'img':
    case 'hr':
    case 'blockquote':
    case 'pre':
    case 'html':
    case 'ul':
    case 'ol':
      return (
        <div className="rounded-lg border border-dashed border-gray-800 px-4 py-6 text-center">
          <p className="text-[10px] text-gray-600">
            No visual settings for this block type
          </p>
        </div>
      );

    default:
      return (
        <div className="rounded-lg border border-dashed border-gray-800 px-4 py-6 text-center">
          <p className="text-[10px] text-gray-600">
            No visual settings for {componentType}
          </p>
        </div>
      );
  }
}
