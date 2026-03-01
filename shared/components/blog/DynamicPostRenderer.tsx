import React from 'react';
import type { ComponentNode } from '../../types/post';
import { CalloutBox } from './CalloutBox';
import { SectionHeading } from './SectionHeading';
import { NumberedTimeline } from './NumberedTimeline';
import { CardGrid } from './CardGrid';
import { DarkSummaryBox } from './DarkSummaryBox';
import { DarkContentBlock } from './DarkContentBlock';
import { FaqAccordion } from './FaqAccordion';
import { ComparisonGrid } from './ComparisonGrid';
import { WarningGrid } from './WarningGrid';
import { Checklist } from './Checklist';
import { ScriptureCard } from './ScriptureCard';
import { StatGrid } from './StatGrid';
import { WorkoutTable } from './WorkoutTable';
import { StepList } from './StepList';
import { ObjectionBlock } from './ObjectionBlock';
import { ReferenceList } from './ReferenceList';
import { GlossarySection } from './GlossarySection';
import { BodyText } from './BodyText';
import { SubHeading } from './SubHeading';
import { FeaturedCard } from './FeaturedCard';
import { CenteredCallout } from './CenteredCallout';

const componentRegistry: Record<string, React.ComponentType<any>> = {
  CalloutBox,
  SectionHeading,
  NumberedTimeline,
  CardGrid,
  DarkSummaryBox,
  DarkContentBlock,
  FaqAccordion,
  ComparisonGrid,
  WarningGrid,
  Checklist,
  ScriptureCard,
  StatGrid,
  WorkoutTable,
  StepList,
  ObjectionBlock,
  ReferenceList,
  GlossarySection,
  BodyText,
  SubHeading,
  FeaturedCard,
  CenteredCallout,
};

/** HTML intrinsic element names produced by the markdown converter */
const HTML_ELEMENTS = new Set([
  'strong', 'em', 'code', 'a', 'ul', 'ol', 'li', 'blockquote',
  'pre', 'hr', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
]);

function renderNode(node: ComponentNode | string, key: number): React.ReactNode {
  if (typeof node === 'string') {
    return node;
  }

  const children = node.children?.map((child, i) => renderNode(child, i));

  // Named component from the registry
  const Component = componentRegistry[node.type];
  if (Component) {
    return (
      <Component key={key} {...node.props}>
        {children}
      </Component>
    );
  }

  // HTML intrinsic elements (strong, em, a, ul, ol, li, h3, etc.)
  if (HTML_ELEMENTS.has(node.type)) {
    // Special handling for self-closing / void elements
    if (node.type === 'hr') {
      return <hr key={key} />;
    }
    if (node.type === 'img') {
      return <img key={key} src={String(node.props.src ?? '')} alt={String(node.props.alt ?? '')} className="rounded-2xl my-8" />;
    }
    return React.createElement(node.type, { key, ...node.props }, children);
  }

  // Raw HTML node type
  if (node.type === 'html') {
    return <div key={key} dangerouslySetInnerHTML={{ __html: node.props.content ?? '' }} />;
  }

  console.warn(`Unknown component type: ${node.type}`);
  return null;
}

interface DynamicPostRendererProps {
  componentMap: ComponentNode[];
  /** Optional wrapper for each top-level node (used by CMS interactive preview) */
  wrapNode?: (rendered: React.ReactNode, index: number, node: ComponentNode) => React.ReactNode;
}

export function DynamicPostRenderer({ componentMap, wrapNode }: DynamicPostRendererProps) {
  return (
    <div className="space-y-12">
      {componentMap.map((node, i) => {
        const rendered = renderNode(node, i);
        return wrapNode ? wrapNode(rendered, i, node) : rendered;
      })}
    </div>
  );
}
