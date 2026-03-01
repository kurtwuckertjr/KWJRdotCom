/**
 * Metadata about a block's source position in the markdown document.
 * Used by the CMS visual block editor to map preview blocks back to
 * their source lines for attribute editing.
 *
 * This is CMS-only -- it does NOT modify the shared ComponentNode interface.
 */
export interface BlockMetadata {
  /** Index in the ComponentNode[] array */
  index: number;
  /** Directive name if this block came from a directive (e.g., 'callout', 'timeline') */
  directiveName: string | null;
  /** The component type this block maps to (e.g., 'CalloutBox', 'BodyText') */
  componentType: string;
  /** 1-based line number where this block starts in the markdown source */
  startLine: number;
  /** 1-based line number where this block ends */
  endLine: number;
  /** Character offset where this block starts */
  startOffset: number;
  /** Character offset where this block ends */
  endOffset: number;
  /** Raw attribute string from directive (e.g., 'type="teal" icon="BookOpen"') */
  rawAttributes: Record<string, string>;
}
