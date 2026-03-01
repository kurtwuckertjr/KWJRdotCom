import type { Root, Content, Heading, Paragraph, List, ListItem, Text, Strong, Emphasis, InlineCode, Link, Image, ThematicBreak, Blockquote, Code, Table, TableRow, TableCell, Html } from 'mdast';
import { toString } from 'mdast-util-to-string';
import type { ComponentNode } from '@shared/types/post';
import type { BlockMetadata } from './block-metadata';

/**
 * Directive node types added by remark-directive.
 * These extend the standard MDAST node types.
 */
interface DirectiveNode {
  type: 'containerDirective' | 'leafDirective' | 'textDirective';
  name: string;
  attributes?: Record<string, string>;
  children: Content[];
}

function isDirective(node: Content): node is DirectiveNode & Content {
  return (
    node.type === 'containerDirective' ||
    node.type === 'leafDirective' ||
    node.type === 'textDirective'
  );
}

/**
 * Convert inline content (text, strong, emphasis, code, links) to a string.
 * Used for simple prop values where we don't need rich formatting.
 */
function inlineToString(nodes: Content[]): string {
  return nodes.map((n) => toString(n)).join('');
}

/**
 * Convert inline content to an array of ComponentNode or string.
 * Preserves bold, italic, code, and links as structured nodes.
 */
function inlineToChildren(nodes: Content[]): (ComponentNode | string)[] {
  const result: (ComponentNode | string)[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case 'text':
        result.push((node as Text).value);
        break;
      case 'strong':
        result.push({
          type: 'strong',
          props: {},
          children: inlineToChildren((node as Strong).children as Content[]),
        });
        break;
      case 'emphasis':
        result.push({
          type: 'em',
          props: {},
          children: inlineToChildren((node as Emphasis).children as Content[]),
        });
        break;
      case 'inlineCode':
        result.push({
          type: 'code',
          props: {},
          children: [(node as InlineCode).value],
        });
        break;
      case 'link':
        result.push({
          type: 'a',
          props: { href: (node as Link).url },
          children: inlineToChildren((node as Link).children as Content[]),
        });
        break;
      default:
        result.push(toString(node));
    }
  }

  return result;
}

/**
 * Parse a heading node into a ComponentNode.
 * H2s become SectionHeading components; others become standard HTML headings.
 */
function convertHeading(node: Heading): ComponentNode {
  if (node.depth === 2) {
    return {
      type: 'SectionHeading',
      props: {},
      children: inlineToChildren(node.children as Content[]),
    };
  }

  return {
    type: `h${node.depth}`,
    props: {},
    children: inlineToChildren(node.children as Content[]),
  };
}

/**
 * Convert a paragraph to a BodyText component node.
 */
function convertParagraph(node: Paragraph): ComponentNode {
  // Check if this is an image-only paragraph
  if (node.children.length === 1 && node.children[0].type === 'image') {
    const img = node.children[0] as Image;
    return {
      type: 'img',
      props: { src: img.url, alt: img.alt ?? '' },
    };
  }

  return {
    type: 'BodyText',
    props: {},
    children: inlineToChildren(node.children as Content[]),
  };
}

/**
 * Parse :::callout{type="teal" icon="BookOpen" title="Quick Summary"}
 */
function convertCallout(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  return {
    type: 'CalloutBox',
    props: {
      accent: (attrs.type as 'teal' | 'amber') || 'teal',
      title: attrs.title || undefined,
      icon: attrs.icon || undefined,
    },
    children: node.children.map(convertNode).filter(Boolean) as (ComponentNode | string)[],
  };
}

/**
 * Parse :::timeline - expects numbered list children.
 * Each list item becomes a timeline entry with title (bold text) and description.
 */
function convertTimeline(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  const items: { title: string; description: string }[] = [];

  for (const child of node.children) {
    if (child.type === 'list') {
      for (const li of (child as List).children) {
        const text = toString(li);
        // Try to extract bold title from "**Title** Description" pattern
        const firstPara = (li as ListItem).children[0];
        if (firstPara && firstPara.type === 'paragraph') {
          const para = firstPara as Paragraph;
          if (para.children[0]?.type === 'strong') {
            const title = toString(para.children[0]);
            const rest = para.children.slice(1);
            const desc = rest.map((n) => toString(n)).join('').replace(/^\s+/, '');
            items.push({ title, description: desc || text });
          } else {
            items.push({ title: text.slice(0, 60), description: text });
          }
        } else {
          items.push({ title: text.slice(0, 60), description: text });
        }
      }
    }
  }

  return {
    type: 'NumberedTimeline',
    props: {
      items,
      accent: attrs.accent || 'teal',
    },
  };
}

/**
 * Parse :::darkbox{title="The Bottom Line" icon="Info"}
 */
function convertDarkbox(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  return {
    type: 'DarkSummaryBox',
    props: {
      title: attrs.title || undefined,
      icon: attrs.icon || undefined,
      accent: attrs.accent || undefined,
    },
    children: node.children.map(convertNode).filter(Boolean) as (ComponentNode | string)[],
  };
}

/**
 * Parse :::darkcontent - full-width dark section
 */
function convertDarkcontent(node: DirectiveNode & Content): ComponentNode {
  return {
    type: 'DarkContentBlock',
    props: {},
    children: node.children.map(convertNode).filter(Boolean) as (ComponentNode | string)[],
  };
}

/**
 * Parse :::cardgrid{cols=3}
 * Expects heading + paragraph pairs as children.
 */
function convertCardgrid(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  const items: { title: string; description: string; number?: number }[] = [];
  let currentTitle = '';
  let counter = 1;

  for (const child of node.children) {
    if (child.type === 'heading') {
      currentTitle = toString(child);
    } else if (child.type === 'paragraph' && currentTitle) {
      items.push({ title: currentTitle, description: toString(child), number: counter++ });
      currentTitle = '';
    }
  }

  // If there's an unterminated heading, add it with empty description
  if (currentTitle) {
    items.push({ title: currentTitle, description: '', number: counter });
  }

  return {
    type: 'CardGrid',
    props: {
      items,
      cols: attrs.cols ? parseInt(attrs.cols, 10) : 3,
      variant: attrs.variant || 'default',
    },
  };
}

/**
 * Parse :::scripture{reference="Romans 13:1 (ESV)"}
 * Content before --- is the quote, after --- is the explanation.
 */
function convertScripture(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  const parts: { quote: string[]; explanation: string[] } = { quote: [], explanation: [] };
  let pastDivider = false;

  for (const child of node.children) {
    if (child.type === 'thematicBreak') {
      pastDivider = true;
      continue;
    }
    const text = toString(child);
    if (pastDivider) {
      parts.explanation.push(text);
    } else {
      parts.quote.push(text);
    }
  }

  return {
    type: 'ScriptureCard',
    props: {
      reference: attrs.reference || '',
      quote: parts.quote.join('\n'),
      explanation: parts.explanation.join('\n') || undefined,
    },
  };
}

/**
 * Parse :::faq
 * Expects alternating bold questions and answer paragraphs.
 */
function convertFaq(node: DirectiveNode & Content): ComponentNode {
  const items: { question: string; answer: string }[] = [];
  let currentQuestion = '';

  for (const child of node.children) {
    if (child.type === 'paragraph') {
      const para = child as Paragraph;
      // Check if paragraph starts with strong text (question)
      if (para.children[0]?.type === 'strong') {
        // If we had a previous question, it had no answer
        if (currentQuestion) {
          items.push({ question: currentQuestion, answer: '' });
        }
        currentQuestion = toString(para.children[0]);
        // If there's text after the bold, that's the answer
        const rest = para.children.slice(1);
        if (rest.length > 0) {
          const answer = rest.map((n) => toString(n)).join('').replace(/^\s+/, '');
          if (answer) {
            items.push({ question: currentQuestion, answer });
            currentQuestion = '';
          }
        }
      } else if (currentQuestion) {
        items.push({ question: currentQuestion, answer: toString(para) });
        currentQuestion = '';
      }
    }
  }

  if (currentQuestion) {
    items.push({ question: currentQuestion, answer: '' });
  }

  return {
    type: 'FaqAccordion',
    props: { items },
  };
}

/**
 * Parse :::comparison{leftTitle="Before" rightTitle="After"}
 * Expects two lists as children.
 */
function convertComparison(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  // Split items by thematicBreak (---) into left/right columns.
  // If no divider, split a single list in half.
  const leftItems: string[] = [];
  const rightItems: string[] = [];
  let pastDivider = false;

  for (const child of node.children) {
    if (child.type === 'thematicBreak') {
      pastDivider = true;
      continue;
    }
    if (child.type === 'list') {
      const items = (child as List).children.map((li) => toString(li));
      if (pastDivider) {
        rightItems.push(...items);
      } else {
        leftItems.push(...items);
      }
    }
  }

  // If no divider was found and we have one list, split in half
  if (!pastDivider && leftItems.length > 0 && rightItems.length === 0) {
    const half = Math.ceil(leftItems.length / 2);
    rightItems.push(...leftItems.splice(half));
  }

  return {
    type: 'ComparisonGrid',
    props: {
      leftTitle: attrs.leftTitle || 'Before',
      rightTitle: attrs.rightTitle || 'After',
      leftItems,
      rightItems,
      accent: attrs.accent || undefined,
      reversed: attrs.reversed !== undefined ? true : undefined,
    },
  };
}

/**
 * Parse :::warning{cols=2}
 * Expects heading + paragraph pairs.
 */
function convertWarning(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  const items: { title: string; description: string }[] = [];
  let currentTitle = '';

  for (const child of node.children) {
    if (child.type === 'heading') {
      if (currentTitle) items.push({ title: currentTitle, description: '' });
      currentTitle = toString(child);
    } else if (child.type === 'paragraph' && currentTitle) {
      items.push({ title: currentTitle, description: toString(child) });
      currentTitle = '';
    }
  }
  if (currentTitle) items.push({ title: currentTitle, description: '' });

  return {
    type: 'WarningGrid',
    props: {
      items,
      cols: attrs.cols ? parseInt(attrs.cols, 10) : 2,
    },
  };
}

/**
 * Parse :::checklist - expects a list of items.
 */
function convertChecklist(node: DirectiveNode & Content): ComponentNode {
  const items: string[] = [];
  for (const child of node.children) {
    if (child.type === 'list') {
      for (const li of (child as List).children) {
        items.push(toString(li));
      }
    }
  }
  return {
    type: 'Checklist',
    props: { items },
  };
}

/**
 * Parse :::statgrid{cols=3}
 * Expects list items in "value | label" or "**value** label" format.
 */
function convertStatgrid(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  const items: { label: string; value: string }[] = [];

  for (const child of node.children) {
    if (child.type === 'list') {
      for (const li of (child as List).children) {
        const text = toString(li);
        // Try "value | label" format
        if (text.includes('|')) {
          const [value, ...rest] = text.split('|');
          items.push({ value: value.trim(), label: rest.join('|').trim() });
        } else {
          // Try bold value format
          const firstPara = (li as ListItem).children[0];
          if (firstPara?.type === 'paragraph' && (firstPara as Paragraph).children[0]?.type === 'strong') {
            const value = toString((firstPara as Paragraph).children[0]);
            const label = (firstPara as Paragraph).children.slice(1).map((n) => toString(n)).join('').trim();
            items.push({ value, label });
          } else {
            items.push({ value: text, label: '' });
          }
        }
      }
    }
  }

  return {
    type: 'StatGrid',
    props: {
      items,
      cols: attrs.cols ? parseInt(attrs.cols, 10) : 3,
    },
  };
}

/**
 * Parse :::workout
 * Expects a table with Exercise | Sets | Reps | Notes columns.
 */
function convertWorkout(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  const exercises: { name: string; sets: string; reps: string; notes?: string }[] = [];

  for (const child of node.children) {
    if (child.type === 'table') {
      const rows = (child as Table).children;
      // Skip header row
      for (let i = 1; i < rows.length; i++) {
        const cells = (rows[i] as TableRow).children;
        exercises.push({
          name: toString(cells[0] ?? ''),
          sets: toString(cells[1] ?? ''),
          reps: toString(cells[2] ?? ''),
          notes: cells[3] ? toString(cells[3]) : undefined,
        });
      }
    }
  }

  return {
    type: 'WorkoutTable',
    props: {
      title: attrs.title || undefined,
      exercises,
    },
  };
}

/**
 * Parse :::subheading{color="amber"}
 * Renders a styled H3 sub-heading with color variant.
 */
function convertSubheading(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  // Extract inline content from paragraph children (avoid wrapping in BodyText/p)
  const children: (ComponentNode | string)[] = [];
  for (const child of node.children) {
    if (child.type === 'paragraph') {
      children.push(...inlineToChildren((child as Paragraph).children as Content[]));
    } else {
      const text = toString(child);
      if (text) children.push(text);
    }
  }
  return {
    type: 'SubHeading',
    props: {
      color: attrs.color || 'slate',
    },
    children,
  };
}

/**
 * Parse :::featuredcard{icon="ShieldCheck"}
 * Renders a rounded card section with optional faded background icon.
 */
function convertFeaturedcard(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  return {
    type: 'FeaturedCard',
    props: {
      icon: attrs.icon || undefined,
    },
    children: node.children.map(convertNode).filter(Boolean) as (ComponentNode | string)[],
  };
}

/**
 * Parse :::centered{size="sm"}
 * Renders centered uppercase callout text.
 */
function convertCentered(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  // Extract inline content from paragraph children (avoid nested <p> tags)
  const children: (ComponentNode | string)[] = [];
  for (const child of node.children) {
    if (child.type === 'paragraph') {
      children.push(...inlineToChildren((child as Paragraph).children as Content[]));
    } else {
      const text = toString(child);
      if (text) children.push(text);
    }
  }
  return {
    type: 'CenteredCallout',
    props: {
      size: attrs.size || 'sm',
    },
    children,
  };
}

/**
 * Parse :::steps{accent="teal"}
 * Same format as timeline but uses StepList component.
 */
function convertSteps(node: DirectiveNode & Content): ComponentNode {
  const attrs = node.attributes ?? {};
  const items: { title: string; description: string }[] = [];

  for (const child of node.children) {
    if (child.type === 'list') {
      for (const li of (child as List).children) {
        const firstPara = (li as ListItem).children[0];
        if (firstPara?.type === 'paragraph' && (firstPara as Paragraph).children[0]?.type === 'strong') {
          const title = toString((firstPara as Paragraph).children[0]);
          const desc = (firstPara as Paragraph).children.slice(1).map((n) => toString(n)).join('').replace(/^\s+/, '');
          items.push({ title, description: desc });
        } else {
          const text = toString(li);
          items.push({ title: text.slice(0, 60), description: text });
        }
      }
    }
  }

  return {
    type: 'StepList',
    props: {
      items,
      accent: attrs.accent || 'teal',
    },
  };
}

/**
 * Parse :::objection - alternating bold objection + paragraph reply.
 * Produces multiple ObjectionBlock components.
 */
function convertObjection(node: DirectiveNode & Content): ComponentNode[] {
  const blocks: ComponentNode[] = [];
  let currentObjection = '';

  for (const child of node.children) {
    if (child.type === 'paragraph') {
      const para = child as Paragraph;
      if (para.children[0]?.type === 'strong') {
        if (currentObjection) {
          blocks.push({
            type: 'ObjectionBlock',
            props: { objection: currentObjection, reply: '' },
          });
        }
        currentObjection = toString(para.children[0]);
        const rest = para.children.slice(1).map((n) => toString(n)).join('').replace(/^\s+/, '');
        if (rest) {
          blocks.push({
            type: 'ObjectionBlock',
            props: { objection: currentObjection, reply: rest },
          });
          currentObjection = '';
        }
      } else if (currentObjection) {
        blocks.push({
          type: 'ObjectionBlock',
          props: { objection: currentObjection, reply: toString(para) },
        });
        currentObjection = '';
      }
    }
  }

  if (currentObjection) {
    blocks.push({
      type: 'ObjectionBlock',
      props: { objection: currentObjection, reply: '' },
    });
  }

  return blocks;
}

/**
 * Parse :::references - expects a list.
 */
function convertReferences(node: DirectiveNode & Content): ComponentNode {
  const items: string[] = [];
  for (const child of node.children) {
    if (child.type === 'list') {
      for (const li of (child as List).children) {
        items.push(toString(li));
      }
    }
  }
  return {
    type: 'ReferenceList',
    props: { items },
  };
}

/**
 * Parse :::glossary
 * Expects headings (letters) with definition lists or bold term + description.
 */
function convertGlossary(node: DirectiveNode & Content): ComponentNode[] {
  const sections: ComponentNode[] = [];
  let currentLetter = '';
  let currentTerms: { term: string; definition: string }[] = [];

  for (const child of node.children) {
    if (child.type === 'heading') {
      if (currentLetter && currentTerms.length > 0) {
        sections.push({
          type: 'GlossarySection',
          props: { letter: currentLetter, terms: currentTerms },
        });
      }
      currentLetter = toString(child);
      currentTerms = [];
    } else if (child.type === 'paragraph') {
      const para = child as Paragraph;
      if (para.children[0]?.type === 'strong') {
        const term = toString(para.children[0]);
        const definition = para.children.slice(1).map((n) => toString(n)).join('').replace(/^\s*[-:]\s*/, '');
        currentTerms.push({ term, definition });
      }
    }
  }

  if (currentLetter && currentTerms.length > 0) {
    sections.push({
      type: 'GlossarySection',
      props: { letter: currentLetter, terms: currentTerms },
    });
  }

  return sections;
}

/**
 * Convert a single MDAST node to a ComponentNode (or null if skipped).
 */
function convertNode(node: Content): ComponentNode | null {
  // Handle directive nodes
  if (isDirective(node)) {
    return convertDirective(node);
  }

  switch (node.type) {
    case 'heading':
      return convertHeading(node as Heading);
    case 'paragraph':
      return convertParagraph(node as Paragraph);
    case 'list': {
      const list = node as List;
      return {
        type: list.ordered ? 'ol' : 'ul',
        props: {},
        children: list.children.map((li) => ({
          type: 'li',
          props: {},
          children: (li as ListItem).children.map(convertNode).filter(Boolean) as (ComponentNode | string)[],
        })),
      };
    }
    case 'blockquote':
      return {
        type: 'blockquote',
        props: {},
        children: (node as Blockquote).children.map(convertNode).filter(Boolean) as (ComponentNode | string)[],
      };
    case 'code':
      return {
        type: 'pre',
        props: { language: (node as Code).lang ?? '' },
        children: [(node as Code).value],
      };
    case 'thematicBreak':
      return { type: 'hr', props: {} };
    case 'html':
      return { type: 'html', props: { content: (node as Html).value } };
    default:
      return null;
  }
}

/**
 * Route a directive to the appropriate converter.
 * Returns null for unrecognized directives, which are then rendered as-is.
 */
function convertDirective(node: DirectiveNode & Content): ComponentNode | null {
  switch (node.name) {
    case 'callout':
      return convertCallout(node);
    case 'timeline':
      return convertTimeline(node);
    case 'darkbox':
      return convertDarkbox(node);
    case 'darkcontent':
      return convertDarkcontent(node);
    case 'cardgrid':
      return convertCardgrid(node);
    case 'scripture':
      return convertScripture(node);
    case 'faq':
      return convertFaq(node);
    case 'comparison':
      return convertComparison(node);
    case 'warning':
      return convertWarning(node);
    case 'checklist':
      return convertChecklist(node);
    case 'statgrid':
      return convertStatgrid(node);
    case 'workout':
      return convertWorkout(node);
    case 'steps':
      return convertSteps(node);
    case 'objection':
      // Returns multiple nodes, handled specially
      return null;
    case 'references':
      return convertReferences(node);
    case 'glossary':
      // Returns multiple nodes, handled specially
      return null;
    case 'subheading':
      return convertSubheading(node);
    case 'featuredcard':
      return convertFeaturedcard(node);
    case 'centered':
      return convertCentered(node);
    default:
      return null;
  }
}

/**
 * Main entry point: convert a markdown MDAST Root to a ComponentNode array.
 * This is the format consumed by DynamicPostRenderer.
 */
export function toComponentMap(tree: Root): ComponentNode[] {
  const result: ComponentNode[] = [];

  for (const node of tree.children) {
    // Handle directives that return multiple components
    if (isDirective(node)) {
      const directive = node as unknown as DirectiveNode & Content;
      if (directive.name === 'objection') {
        result.push(...convertObjection(directive));
        continue;
      }
      if (directive.name === 'glossary') {
        result.push(...convertGlossary(directive));
        continue;
      }
    }

    const converted = convertNode(node as Content);
    if (converted) {
      result.push(converted);
    }
  }

  return result;
}

/**
 * Directive name to component type mapping.
 * Used by metadata extraction to record which component a directive becomes.
 */
const DIRECTIVE_TO_COMPONENT: Record<string, string> = {
  callout: 'CalloutBox',
  timeline: 'NumberedTimeline',
  darkbox: 'DarkSummaryBox',
  darkcontent: 'DarkContentBlock',
  cardgrid: 'CardGrid',
  scripture: 'ScriptureCard',
  faq: 'FaqAccordion',
  comparison: 'ComparisonGrid',
  warning: 'WarningGrid',
  checklist: 'Checklist',
  statgrid: 'StatGrid',
  workout: 'WorkoutTable',
  steps: 'StepList',
  objection: 'ObjectionBlock',
  references: 'ReferenceList',
  glossary: 'GlossarySection',
  subheading: 'SubHeading',
  featuredcard: 'FeaturedCard',
  centered: 'CenteredCallout',
};

/**
 * Get the component type for a standard MDAST node.
 */
function getNodeComponentType(node: Content): string | null {
  switch (node.type) {
    case 'heading': {
      const h = node as Heading;
      return h.depth === 2 ? 'SectionHeading' : `h${h.depth}`;
    }
    case 'paragraph': {
      const p = node as Paragraph;
      if (p.children.length === 1 && p.children[0].type === 'image') return 'img';
      return 'BodyText';
    }
    case 'list': return (node as List).ordered ? 'ol' : 'ul';
    case 'blockquote': return 'blockquote';
    case 'code': return 'pre';
    case 'thematicBreak': return 'hr';
    case 'html': return 'html';
    default: return null;
  }
}

/**
 * Extended entry point: convert MDAST Root to ComponentNode[] with parallel
 * BlockMetadata[] for the CMS visual editor.
 *
 * The metadata tracks source positions so the block editor can map preview
 * clicks back to the markdown source for attribute editing.
 */
export function toComponentMapWithMetadata(tree: Root): {
  componentMap: ComponentNode[];
  metadata: BlockMetadata[];
} {
  const componentMap: ComponentNode[] = [];
  const metadata: BlockMetadata[] = [];

  for (const node of tree.children) {
    const pos = (node as any).position;
    const startLine = pos?.start?.line ?? 0;
    const endLine = pos?.end?.line ?? 0;
    const startOffset = pos?.start?.offset ?? 0;
    const endOffset = pos?.end?.offset ?? 0;

    // Handle directives that return multiple components
    if (isDirective(node)) {
      const directive = node as unknown as DirectiveNode & Content;
      const attrs = directive.attributes ?? {};

      if (directive.name === 'objection') {
        const blocks = convertObjection(directive);
        for (const block of blocks) {
          const idx = componentMap.length;
          componentMap.push(block);
          metadata.push({
            index: idx,
            directiveName: 'objection',
            componentType: 'ObjectionBlock',
            startLine,
            endLine,
            startOffset,
            endOffset,
            rawAttributes: { ...attrs },
          });
        }
        continue;
      }
      if (directive.name === 'glossary') {
        const sections = convertGlossary(directive);
        for (const section of sections) {
          const idx = componentMap.length;
          componentMap.push(section);
          metadata.push({
            index: idx,
            directiveName: 'glossary',
            componentType: 'GlossarySection',
            startLine,
            endLine,
            startOffset,
            endOffset,
            rawAttributes: { ...attrs },
          });
        }
        continue;
      }

      const converted = convertDirective(directive);
      if (converted) {
        const idx = componentMap.length;
        componentMap.push(converted);
        metadata.push({
          index: idx,
          directiveName: directive.name,
          componentType: DIRECTIVE_TO_COMPONENT[directive.name] ?? converted.type,
          startLine,
          endLine,
          startOffset,
          endOffset,
          rawAttributes: { ...attrs },
        });
        continue;
      }
    }

    const converted = convertNode(node as Content);
    if (converted) {
      const idx = componentMap.length;
      componentMap.push(converted);
      metadata.push({
        index: idx,
        directiveName: null,
        componentType: getNodeComponentType(node as Content) ?? converted.type,
        startLine,
        endLine,
        startOffset,
        endOffset,
        rawAttributes: {},
      });
    }
  }

  return { componentMap, metadata };
}
