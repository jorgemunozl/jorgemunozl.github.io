#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the markdown files
const NOTES_DIR = path.join(__dirname, '..', 'src', 'components', 'Notes');
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

// Function to estimate read time
function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
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
    // Check if Notes directory exists
    if (!fs.existsSync(NOTES_DIR)) {
      console.error(`Notes directory does not exist: ${NOTES_DIR}`);
      process.exit(1);
    }

    // Read all markdown files from Notes directory
    const files = fs.readdirSync(NOTES_DIR).filter(file => file.endsWith('.md'));
    
    if (files.length === 0) {
      console.log('No markdown files found in Notes directory');
      return;
    }

    console.log(`Found ${files.length} markdown file(s):`);
    files.forEach(file => console.log(`  - ${file}`));

    // Process each markdown file
    const blogPosts = files.map((filename, index) => {
      const filePath = path.join(NOTES_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter, content } = parseFrontmatter(fileContent);
      
      // Generate data for the blog post
      const title = frontmatter.title || createTitle(filename);
      const excerpt = generateExcerpt(content);
      const readTime = estimateReadTime(content);
      const uploadDate = frontmatter.date || new Date().toISOString().split('T')[0];
      
      // Escape content for JavaScript string
      const escapedContent = fileContent
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${');

      return {
        id: (index + 1).toString(),
        title,
        excerpt,
        content: escapedContent,
        uploadDate,
        readTime,
        fileName: filename
      };
    });

    // Create the output directory if it doesn't exist
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate TypeScript file content
    const tsContent = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  uploadDate: string;
  readTime: string;
  fileName: string;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};

export default blogPosts;
`;

    // Write the generated file
    fs.writeFileSync(OUTPUT_FILE, tsContent);
    
    console.log(`\n✅ Generated notes data successfully!`);
    console.log(`📄 Output file: ${OUTPUT_FILE}`);
    console.log(`📊 Total notes: ${blogPosts.length}`);
    
    blogPosts.forEach(post => {
      console.log(`   - "${post.title}" (${post.readTime})`);
    });

  } catch (error) {
    console.error('Error generating notes data:', error);
    process.exit(1);
  }
}

// Run the script
generateNotesData();
