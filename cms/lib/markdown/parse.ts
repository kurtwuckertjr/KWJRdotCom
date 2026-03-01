import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import type { Root } from 'mdast';

/**
 * Parse markdown with directives into an MDAST tree.
 * This is the first stage of the pipeline - just parsing, no rendering.
 */
export function parseMarkdown(source: string): Root {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective);

  return processor.parse(source) as Root;
}

/**
 * Count words in a markdown source string (strips directive syntax).
 */
export function countWords(source: string): number {
  // Strip directive markers and attributes
  const text = source
    .replace(/^:::[a-z]+(\{[^}]*\})?$/gm, '')  // opening :::directive{attrs}
    .replace(/^:::$/gm, '')                        // closing :::
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')          // images
    .replace(/\[[^\]]*\]\([^)]*\)/g, '$1')         // links (keep text)
    .replace(/[#*_~`>|]/g, '');                    // markdown formatting

  return text.trim().split(/\s+/).filter(Boolean).length;
}
