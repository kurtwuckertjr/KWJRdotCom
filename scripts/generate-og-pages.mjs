/**
 * Post-build script: generates per-article HTML files with correct OG meta tags.
 * Reads dist/index.html as a template, parses BLOG_POSTS from constants.tsx,
 * and writes dist/post/{id}/index.html for each post.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SITE_URL = 'https://kurtwuckertjr.com';

// Parse BLOG_POSTS from constants.tsx
function parsePosts() {
  const src = readFileSync(join(ROOT, 'constants.tsx'), 'utf8');
  const posts = [];
  // Match each post object in the BLOG_POSTS array
  const postRegex = /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']*(?:\\'[^']*)*)',\s*category:\s*Category\.(\w+),\s*excerpt:\s*'([^']*(?:\\'[^']*)*)',\s*date:\s*'([^']+)',\s*image:\s*'([^']+)',\s*tag:\s*'([^']+)'\s*\}/g;
  let m;
  while ((m = postRegex.exec(src)) !== null) {
    posts.push({
      id: m[1],
      title: m[2].replace(/\\'/g, "'"),
      excerpt: m[4].replace(/\\'/g, "'"),
      image: m[6],
    });
  }
  return posts;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8');
const posts = parsePosts();

console.log(`Generating OG pages for ${posts.length} posts...`);

for (const post of posts) {
  const url = `${SITE_URL}/post/${post.id}`;
  const title = escapeHtml(post.title);
  const excerpt = escapeHtml(post.excerpt);
  const image = escapeHtml(post.image);

  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title} | Kurt Wuckert Jr.</title>`
  );

  // Replace og:type
  html = html.replace(
    /<meta property="og:type"[^>]*>/,
    `<meta property="og:type" content="article">`
  );

  // Replace og:title
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${title}">`
  );

  // Replace og:description
  html = html.replace(
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${excerpt}">`
  );

  // Replace og:image (and remove width/height since article images vary)
  html = html.replace(
    /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${image}">`
  );

  // Add og:url after og:image:height
  html = html.replace(
    /(<meta property="og:image:height"[^>]*>)/,
    `$1\n    <meta property="og:url" content="${url}">`
  );

  // Replace twitter:image
  html = html.replace(
    /<meta name="twitter:image"[^>]*>/,
    `<meta name="twitter:image" content="${image}">`
  );

  // Add twitter:title and twitter:description after twitter:site
  html = html.replace(
    /(<meta name="twitter:site"[^>]*>)/,
    `$1\n    <meta name="twitter:title" content="${title}">\n    <meta name="twitter:description" content="${excerpt}">`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${excerpt}">`
  );

  const dir = join(DIST, 'post', post.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

console.log(`Done. Generated ${posts.length} OG pages in dist/post/`);
