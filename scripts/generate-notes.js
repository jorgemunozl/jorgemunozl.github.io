#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories containing the markdown files
const DIRECTORIES = [
  { dir: path.join(__dirname, '..', 'src', 'components', 'Featured Notes'), featured: true },
  { dir: path.join(__dirname, '..', 'src', 'components', 'Notes'), featured: false },
];
const DATA_DIR = path.join(__dirname, '..', 'src', 'components', 'data');
const OUTPUT_META = path.join(DATA_DIR, 'notesMeta.ts');
const OUTPUT_GRAPH = path.join(DATA_DIR, 'prebuiltGraph.ts');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const PUBLIC_NOTES_DIR = path.join(PUBLIC_DIR, 'notes');
const PUBLIC_ASSETS_DIR = path.join(PUBLIC_DIR, 'notes-assets');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];

/** Mirrors src/utils/wikiLinks.ts for build-time graph generation */
function normalizeTitle(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ');
}

function stripMarkdownExtension(fileName) {
  return fileName.replace(/\.(md|markdown)$/i, '');
}

function normalizeFileReference(fileName) {
  return normalizeTitle(stripMarkdownExtension(fileName));
}

function findPostByNormalizedTarget(normalizedTarget, posts) {
  return posts.find((post) => {
    if (normalizeTitle(post.title) === normalizedTarget) return true;
    if (post.fileName && normalizeFileReference(post.fileName) === normalizedTarget) return true;
    return false;
  });
}

function extractWikiLinks(content) {
  const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
  const links = [];
  let match;
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    const linkContent = match[1];
    const parts = linkContent.split('|');
    const target = parts[0].trim();
    const text = parts.length > 1 ? parts[1].trim() : target;
    links.push({ text, target, start: match.index, end: match.index + match[0].length });
  }
  return links;
}

/** Same algorithm as buildGraphFromPosts in wikiLinks.ts */
function buildGraphFromPosts(posts) {
  const nodes = new Map();
  const linkCounts = new Map();
  const links = [];

  posts.forEach((post) => {
    nodes.set(post.title, {
      id: post.title,
      title: post.title,
      group: 1,
      size: 10,
      color: '#A855F7',
    });
  });

  posts.forEach((post) => {
    const wikiLinks = extractWikiLinks(post.content);

    wikiLinks.forEach((link) => {
      const normalizedTarget = normalizeTitle(link.target);
      const matchedPost = findPostByNormalizedTarget(normalizedTarget, posts);
      const targetTitle = matchedPost ? matchedPost.title : link.target;

      if (!nodes.has(targetTitle)) {
        nodes.set(targetTitle, {
          id: targetTitle,
          title: targetTitle,
          group: 2,
          size: 6,
          color: '#9CA3AF',
        });
      }

      const existingLink = links.find(
        (l) =>
          (l.source === post.title && l.target === targetTitle) ||
          (l.source === targetTitle && l.target === post.title)
      );

      if (existingLink) {
        existingLink.value += 1;
      } else {
        links.push({
          source: post.title,
          target: targetTitle,
          value: 1,
        });
      }

      const currentCount = linkCounts.get(post.title) || 0;
      linkCounts.set(post.title, currentCount + 1);
      const targetCount = linkCounts.get(targetTitle) || 0;
      linkCounts.set(targetTitle, targetCount + 1);
    });
  });

  // sqrt(degree) so visual area (not radius) scales with degree — matches
  // Obsidian's graph emphasis on hubs without dwarfing leaves.
  nodes.forEach((node) => {
    const connectionCount = linkCounts.get(node.id) || 0;
    node.size = 4 + Math.sqrt(connectionCount) * 2.2;
  });

  return {
    nodes: Array.from(nodes.values()),
    links,
  };
}

// Function to parse frontmatter from markdown content
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: content.trim() };
  }
  
  const frontmatterText = match[1];
  const markdownContent = match[2].trim();
  
  // Parse YAML-like frontmatter
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && trimmed.includes(':')) {
      const [key, ...valueParts] = trimmed.split(':');
      let value = valueParts.join(':').trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      frontmatter[key.trim()] = value;
    }
  }
  
  return { frontmatter, content: markdownContent };
}

// Function to generate excerpt from content
function generateExcerpt(content, maxLength = 150) {
  // Remove markdown headers and get first meaningful paragraph
  const lines = content.split('\n').filter(line => line.trim());
  const firstParagraph = lines.find(line => 
    !line.startsWith('#') && 
    !line.startsWith('---') && 
    !line.startsWith('![[') &&
    line.trim().length > 20
  );
  
  if (!firstParagraph) return 'No excerpt available';
  
  const excerpt = firstParagraph.substring(0, maxLength);
  return excerpt.length < firstParagraph.length ? excerpt + '...' : excerpt;
}

// Find markdown image references and return their paths
function extractImageRefs(markdown) {
  const refs = [];
  const imgRegex = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g; // ![alt](path "title")
  let m;
  while ((m = imgRegex.exec(markdown)) !== null) {
    const src = m[1];
    // Skip external or data URIs
    if (/^(?:[a-z]+:)?\/\//i.test(src) || src.startsWith('data:')) continue;
    refs.push({ match: m[0], src });
  }
  return refs;
}

// Copy local images to public/notes-assets/<note-base>/ and rewrite src in markdown
function rewriteAndCopyImages(markdown, mdDir, mdFileName) {
  try {
    const base = mdFileName.replace(/\.md$/i, '').replace(/\s+/g, '-').toLowerCase();
    const destDir = path.join(PUBLIC_ASSETS_DIR, base);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const refs = extractImageRefs(markdown);
    let out = markdown;
    for (const { match, src } of refs) {
      let resolvedPath = null;
      let fileName = null;

      const hasExt = path.extname(src) !== '';
      if (hasExt) {
        const abs = path.resolve(mdDir, src);
        if (fs.existsSync(abs) && fs.statSync(abs).isFile()) {
          resolvedPath = abs;
          fileName = path.basename(src);
        }
      } else {
        // Try common image extensions when none provided
        for (const ext of IMAGE_EXTENSIONS) {
          const candidate = path.resolve(mdDir, src + ext);
          if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
            resolvedPath = candidate;
            fileName = path.basename(src + ext);
            break;
          }
        }
      }

      if (!resolvedPath || !fileName) continue;

      const destPath = path.join(destDir, fileName);
      try {
        fs.copyFileSync(resolvedPath, destPath);
      } catch {}

      const altSrcMatch = match.match(/!\[([^\]]*)\]\(([^)\s]+)/);
      const altText = altSrcMatch ? altSrcMatch[1] : '';
      const newSrc = `notes-assets/${base}/${fileName}`;
      const rewritten = `![${altText}](${newSrc})`;
      out = out.replace(match, rewritten);
    }
    return out;
  } catch {
    return markdown;
  }
}

// Normalize common non-standard image syntaxes to standard markdown
function normalizeImageSyntax(markdown) {
  let out = markdown;
  // Convert ![filename.ext] -> ![filename.ext](filename.ext)
  out = out.replace(/!\[([^\]\(\)]+\.(?:png|jpg|jpeg|gif|svg|webp))\](?!\()/gi, (_m, fname) => `![${fname}](${fname})`);
  // Convert Obsidian embeds ![[file.ext]] (optionally with |alt or #anchor)
  out = out.replace(/!\[\[([^\]]+)\]\]/g, (_m, inner) => {
    const clean = String(inner).split('|')[0].split('#')[0];
    const alt = clean;
    return `![${alt}](${clean})`;
  });
  return out;
}

// Function to estimate read time based on content analysis
function estimateReadTime(content) {
  const wordsPerMinute = 200; // Average reading speed
  
  // Remove markdown syntax and frontmatter for accurate word count
  const cleanContent = content
    // Remove YAML frontmatter
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
    // Remove markdown headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove markdown links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove wiki-style links but keep text
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    // Remove markdown bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Remove LaTeX math expressions (they take longer to read)
    .replace(/\$\$[\s\S]*?\$\$/g, '[math equation]')
    .replace(/\$([^$]+)\$/g, '[math]')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
  
  // Count words
  const wordCount = cleanContent.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate base reading time
  let readingTimeMinutes = wordCount / wordsPerMinute;
  
  // Adjust for content complexity
  const mathEquationCount = (content.match(/\$\$[\s\S]*?\$\$|\$[^$]+\$/g) || []).length;
  const codeBlockCount = (content.match(/```[\s\S]*?```/g) || []).length;
  const linkCount = (content.match(/\[\[([^\]]+)\]\]|\[([^\]]+)\]\([^)]+\)/g) || []).length;
  
  // Add extra time for complex content
  readingTimeMinutes += mathEquationCount * 0.5; // Math equations take longer
  readingTimeMinutes += codeBlockCount * 1; // Code blocks take longer
  readingTimeMinutes += linkCount * 0.1; // Links add minimal time
  
  // Round to nearest minute, minimum 1 minute
  const minutes = Math.max(1, Math.round(readingTimeMinutes));
  
  // Return formatted string
  if (minutes === 1) {
    return "1 min read";
  } else {
    return `${minutes} min read`;
  }
}

// Function to analyze content and provide detailed statistics
function analyzeContent(content, title) {
  const cleanContent = content
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/```[\s\S]*?```/g, '[code block]')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\$\$[\s\S]*?\$\$/g, '[math equation]')
    .replace(/\$([^$]+)\$/g, '[math]')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const wordCount = cleanContent.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = cleanContent.length;
  const mathCount = (content.match(/\$\$[\s\S]*?\$\$|\$[^$]+\$/g) || []).length;
  const codeBlockCount = (content.match(/```[\s\S]*?```/g) || []).length;
  const linkCount = (content.match(/\[\[([^\]]+)\]\]|\[([^\]]+)\]\([^)]+\)/g) || []).length;
  const headerCount = (content.match(/^#{1,6}\s+/gm) || []).length;

  return {
    title,
    wordCount,
    charCount,
    mathCount,
    codeBlockCount,
    linkCount,
    headerCount,
    estimatedReadTime: estimateReadTime(content)
  };
}

// Function to create title from filename
function createTitle(filename) {
  return filename
    .replace('.md', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// Main function to generate notes data
function generateNotesData() {
  try {
    // Collect markdown files from configured directories
    const collected = [];

    for (const { dir, featured } of DIRECTORIES) {
      if (!fs.existsSync(dir)) {
        // Skip silently if a directory is missing
        continue;
      }

      const files = fs.readdirSync(dir).filter(file => file.endsWith('.md'));
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { frontmatter, content } = parseFrontmatter(fileContent);

        const title = frontmatter.title || createTitle(file);
        const excerpt = generateExcerpt(content);
        const readTime = estimateReadTime(content);
        const uploadDate = frontmatter.date || new Date().toISOString().split('T')[0];

        // Normalize image syntaxes and copy referenced images to public
        const normalized = normalizeImageSyntax(fileContent);
        const processedContent = rewriteAndCopyImages(normalized, dir, file);
        // Keep processed content; JSON.stringify will escape safely
        const escapedContent = processedContent;

        collected.push({
          title,
          excerpt,
          content: escapedContent,
          uploadDate,
          readTime,
          fileName: file,
          featured,
        });
      });
    }

    if (collected.length === 0) {
      console.log('No markdown files found in configured directories');
    }

    // Sort by uploadDate desc for stable id assignment
    collected.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    const blogPosts = collected.map((post, index) => ({
      id: (index + 1).toString(),
      ...post,
    }));

    const blogPostsMeta = blogPosts.map(({ content: _c, ...meta }) => meta);
    const graphData = buildGraphFromPosts(
      blogPosts.map((p) => ({
        id: p.id,
        title: p.title,
        content: p.content,
        fileName: p.fileName,
      }))
    );

    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const generatedAt = new Date().toISOString();

    const metaTs = [
      '// Auto-generated file - do not edit manually',
      `// Generated on: ${generatedAt}`,
      '',
      "import type { BlogPostMeta } from '@/types/notes';",
      '',
      `export const blogPostsMeta: BlogPostMeta[] = ${JSON.stringify(blogPostsMeta, null, 2)};`,
      '',
      'export default blogPostsMeta;',
      '',
    ].join('\n');

    const graphTs = [
      '// Auto-generated file - do not edit manually',
      `// Generated on: ${generatedAt}`,
      '',
      "import type { GraphData } from '@/utils/wikiLinks';",
      '',
      `export const prebuiltGraphData: GraphData = ${JSON.stringify(graphData, null, 2)};`,
      '',
    ].join('\n');

    fs.writeFileSync(OUTPUT_META, metaTs);
    fs.writeFileSync(OUTPUT_GRAPH, graphTs);

    // Legacy files that were previously bundled as JS.
    for (const stale of [
      path.join(DATA_DIR, 'notes.ts'),
      path.join(DATA_DIR, 'notesBodies.ts'),
    ]) {
      if (fs.existsSync(stale)) fs.unlinkSync(stale);
    }

    // Emit one JSON file per note so bodies are fetched on demand at runtime.
    if (fs.existsSync(PUBLIC_NOTES_DIR)) {
      for (const entry of fs.readdirSync(PUBLIC_NOTES_DIR)) {
        if (entry.endsWith('.json')) {
          fs.unlinkSync(path.join(PUBLIC_NOTES_DIR, entry));
        }
      }
    } else {
      fs.mkdirSync(PUBLIC_NOTES_DIR, { recursive: true });
    }

    for (const post of blogPosts) {
      fs.writeFileSync(
        path.join(PUBLIC_NOTES_DIR, `${post.id}.json`),
        JSON.stringify(post.content)
      );
    }

    console.log(`\n✅ Generated notes data successfully!`);
    console.log(`📄 Meta: ${OUTPUT_META}`);
    console.log(`📄 Graph: ${OUTPUT_GRAPH}`);
    console.log(`📁 Bodies: ${PUBLIC_NOTES_DIR}/<id>.json (${blogPosts.length} files)`);
    console.log(`📊 Total notes: ${blogPosts.length}`);
    
    // Show detailed analysis for each post
    console.log(`\n📈 Content Analysis:`);
    blogPosts.forEach(post => {
      const analysis = analyzeContent(post.content, post.title);
      console.log(`   📝 "${analysis.title}"`);
      console.log(`      └─ ${analysis.wordCount} words, ${analysis.estimatedReadTime}`);
      if (analysis.mathCount > 0) console.log(`      └─ ${analysis.mathCount} math expressions`);
      if (analysis.codeBlockCount > 0) console.log(`      └─ ${analysis.codeBlockCount} code blocks`);
      if (analysis.linkCount > 0) console.log(`      └─ ${analysis.linkCount} links`);
    });

  } catch (error) {
    console.error('Error generating notes data:', error);
    process.exit(1);
  }
}

// Run the script
generateNotesData();
