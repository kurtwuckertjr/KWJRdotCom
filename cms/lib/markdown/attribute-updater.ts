import type { BlockMetadata } from './block-metadata';

/**
 * Update a directive attribute in the markdown source string.
 *
 * Given a BlockMetadata entry and a key/value pair, this function:
 * 1. Finds the directive opening line using metadata.startLine
 * 2. Parses existing {...} attributes
 * 3. Updates or adds the specified attribute
 * 4. Reconstructs the opening line
 * 5. Returns the updated markdown string
 *
 * For non-directive blocks (e.g., BodyText, SectionHeading), returns
 * the original markdown unchanged since they have no attributes.
 */
export function updateDirectiveAttribute(
  markdown: string,
  meta: BlockMetadata,
  key: string,
  value: string | number | boolean | undefined,
): string {
  // Only directive blocks can have their attributes edited
  if (!meta.directiveName) return markdown;

  const lines = markdown.split('\n');
  // startLine is 1-based
  const lineIdx = meta.startLine - 1;
  if (lineIdx < 0 || lineIdx >= lines.length) return markdown;

  const line = lines[lineIdx];

  // Match the directive opening pattern: :::name or ::::name, optionally with {attrs}
  const directiveMatch = line.match(/^(:{3,4}\w+)(\{[^}]*\})?(.*)/);
  if (!directiveMatch) return markdown;

  const prefix = directiveMatch[1]; // e.g., :::callout
  const existingAttrs = directiveMatch[2] ?? ''; // e.g., {type="teal" icon="BookOpen"}
  const suffix = directiveMatch[3] ?? ''; // anything after the attrs block

  // Parse existing attributes from the {...} block
  const attrs = parseAttributes(existingAttrs);

  // Apply the update
  if (value === undefined || value === '') {
    delete attrs[key];
  } else {
    attrs[key] = String(value);
  }

  // Reconstruct the attribute string
  const newAttrStr = serializeAttributes(attrs);
  const newLine = `${prefix}${newAttrStr}${suffix}`;

  lines[lineIdx] = newLine;
  return lines.join('\n');
}

/**
 * Remove a directive attribute from the markdown source.
 */
export function removeDirectiveAttribute(
  markdown: string,
  meta: BlockMetadata,
  key: string,
): string {
  return updateDirectiveAttribute(markdown, meta, key, undefined);
}

/**
 * Parse a directive attribute block like {type="teal" icon="BookOpen" cols=3}
 * into a key-value record.
 */
function parseAttributes(attrStr: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  if (!attrStr) return attrs;

  // Strip outer braces
  const inner = attrStr.replace(/^\{|\}$/g, '').trim();
  if (!inner) return attrs;

  // Match key="value" or key=value patterns
  const regex = /(\w+)(?:=(?:"([^"]*)"|'([^']*)'|(\S+)))?/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(inner)) !== null) {
    const key = match[1];
    const val = match[2] ?? match[3] ?? match[4] ?? '';
    attrs[key] = val;
  }

  return attrs;
}

/**
 * Serialize a key-value record back into a directive attribute block.
 * Returns '' if no attributes, or '{key="value" ...}' otherwise.
 */
function serializeAttributes(attrs: Record<string, string>): string {
  const entries = Object.entries(attrs);
  if (entries.length === 0) return '';

  const parts = entries.map(([key, val]) => {
    // Boolean-like attributes with no value
    if (val === '' || val === 'true') return key;
    // Numeric values don't need quotes
    if (/^\d+$/.test(val)) return `${key}=${val}`;
    // String values get double quotes
    return `${key}="${val}"`;
  });

  return `{${parts.join(' ')}}`;
}
