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
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'notes.ts');

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

        // Keep raw content; JSON.stringify will escape safely
        const escapedContent = fileContent;

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

    // Create the output directory if it doesn't exist
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate TypeScript file content
    const tsContent = [
      '// Auto-generated file - do not edit manually',
      `// Generated on: ${new Date().toISOString()}`,
      '',
      'export interface BlogPost {',
      '  id: string;',
      '  title: string;',
      '  content: string;',
      '  excerpt: string;',
      '  uploadDate: string;',
      '  readTime: string;',
      '  fileName: string;',
      '  featured: boolean;',
      '}',
      '',
      `export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};`,
      '',
      'export default blogPosts;',
      ''
    ].join('\n');

    // Write the generated file
    fs.writeFileSync(OUTPUT_FILE, tsContent);
    
    console.log(`\n✅ Generated notes data successfully!`);
    console.log(`📄 Output file: ${OUTPUT_FILE}`);
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
