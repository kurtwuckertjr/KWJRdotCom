export { parseMarkdown, countWords } from './parse';
export { toComponentMap, toComponentMapWithMetadata } from './to-component-map';
export type { BlockMetadata } from './block-metadata';
import { parseMarkdown } from './parse';
import { toComponentMap, toComponentMapWithMetadata } from './to-component-map';
import type { ComponentNode } from '@shared/types/post';
import type { BlockMetadata } from './block-metadata';

/**
 * Full pipeline: markdown source -> ComponentNode[]
 * Used by both the live preview and the save/publish flow.
 */
export function markdownToComponentMap(source: string): ComponentNode[] {
  const tree = parseMarkdown(source);
  return toComponentMap(tree);
}

/**
 * Full pipeline with metadata: markdown source -> { componentMap, metadata }
 * Used by the CMS visual block editor for interactive editing.
 */
export function markdownToComponentMapWithMetadata(source: string): {
  componentMap: ComponentNode[];
  metadata: BlockMetadata[];
} {
  const tree = parseMarkdown(source);
  return toComponentMapWithMetadata(tree);
}
