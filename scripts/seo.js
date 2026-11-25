// Post-build: sitemap.xml + per-note static HTML with Open Graph tags.
// The site is a SPA, so LinkedIn/Twitter crawlers (no JS) only see index.html.
// A stub at docs/notes/<id>/index.html gives each note its own share preview.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const docs = join(root, 'docs');
const SITE = 'https://jorgemunozl.github.io';
const metaSrc = readFileSync(join(root, 'src/components/data/notesMeta.ts'), 'utf8');
const posts = JSON.parse(metaSrc.slice(metaSrc.indexOf('= [') + 2, metaSrc.lastIndexOf(']') + 1));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const template = readFileSync(join(docs, 'index.html'), 'utf8');
const urls = ['/', '/notes', '/notes/featured', '/portfolio', '/about'];

for (const p of posts) {
  const url = `${SITE}/notes/${p.id}`;
  const title = `${p.title} | munBlog`;
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(p.excerpt)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(p.excerpt)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta property="og:type" content=")website"/, '$1article"')
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`);
  const dir = join(docs, 'notes', String(p.id));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  urls.push(`/notes/${p.id}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((u) => `  <url><loc>${SITE}${u}</loc></url>`)
  .join('\n')}\n</urlset>\n`;
writeFileSync(join(docs, 'sitemap.xml'), sitemap);
console.log(`SEO: sitemap.xml (${urls.length} urls) + ${posts.length} note pages`);
