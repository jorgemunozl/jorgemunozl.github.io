#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the markdown files
const NOTES_DIR = path.join(__dirname, '..', 'src', 'components', 'Notes');

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
  
  // Return object with detailed info
  return {
    minutes,
    wordCount,
    mathEquationCount,
    codeBlockCount,
    linkCount,
    formatted: minutes === 1 ? "1 min read" : `${minutes} min read`
  };
}

// Function to analyze content and provide detailed statistics
function analyzeContent(content, filename) {
  const title = filename.replace('.md', '').replace(/-/g, ' ');
  
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

  const readTimeData = estimateReadTime(content);
  const charCount = cleanContent.length;
  const lineCount = content.split('\n').length;
  const headerCount = (content.match(/^#{1,6}\s+/gm) || []).length;
  const imageCount = (content.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length;

  return {
    filename,
    title,
    wordCount: readTimeData.wordCount,
    charCount,
    lineCount,
    readTimeMinutes: readTimeData.minutes,
    readTimeFormatted: readTimeData.formatted,
    mathEquations: readTimeData.mathEquationCount,
    codeBlocks: readTimeData.codeBlockCount,
    links: readTimeData.linkCount,
    headers: headerCount,
    images: imageCount,
    complexity: readTimeData.mathEquationCount + readTimeData.codeBlockCount * 2 + readTimeData.linkCount * 0.5
  };
}

// Function to generate content analysis report
function generateAnalysisReport() {
  try {
    // Check if Notes directory exists
    if (!fs.existsSync(NOTES_DIR)) {
      console.error(`❌ Notes directory does not exist: ${NOTES_DIR}`);
      process.exit(1);
    }

    // Read all markdown files from Notes directory
    const files = fs.readdirSync(NOTES_DIR).filter(file => file.endsWith('.md'));
    
    if (files.length === 0) {
      console.log('❌ No markdown files found in Notes directory');
      return;
    }

    console.log(`📊 Analyzing ${files.length} notes...\n`);

    // Analyze each file
    const analyses = files.map(filename => {
      const filePath = path.join(NOTES_DIR, filename);
      const content = fs.readFileSync(filePath, 'utf-8');
      return analyzeContent(content, filename);
    });

    // Sort by read time (longest first)
    analyses.sort((a, b) => b.readTimeMinutes - a.readTimeMinutes);

    // Generate summary statistics
    const totalWords = analyses.reduce((sum, a) => sum + a.wordCount, 0);
    const totalReadTime = analyses.reduce((sum, a) => sum + a.readTimeMinutes, 0);
    const avgWordsPerNote = Math.round(totalWords / analyses.length);
    const avgReadTimePerNote = Math.round(totalReadTime / analyses.length * 10) / 10;

    // Display summary
    console.log(`📈 SUMMARY STATISTICS`);
    console.log(`${'─'.repeat(60)}`);
    console.log(`📝 Total notes: ${analyses.length}`);
    console.log(`🔤 Total words: ${totalWords.toLocaleString()}`);
    console.log(`⏱️  Total read time: ${totalReadTime} minutes (${Math.round(totalReadTime / 60 * 10) / 10} hours)`);
    console.log(`📊 Average words per note: ${avgWordsPerNote}`);
    console.log(`⏱️  Average read time per note: ${avgReadTimePerNote} minutes`);

    // Display top 10 longest notes
    console.log(`\n📚 TOP 10 LONGEST NOTES`);
    console.log(`${'─'.repeat(60)}`);
    analyses.slice(0, 10).forEach((analysis, index) => {
      const complexity = analysis.complexity > 5 ? '🔥' : analysis.complexity > 2 ? '⚡' : '📝';
      console.log(`${(index + 1).toString().padStart(2)}. ${complexity} "${analysis.title}"`);
      console.log(`    📏 ${analysis.wordCount} words • ⏱️ ${analysis.readTimeFormatted}`);
      if (analysis.mathEquations > 0 || analysis.codeBlocks > 0) {
        const extras = [];
        if (analysis.mathEquations > 0) extras.push(`${analysis.mathEquations} math`);
        if (analysis.codeBlocks > 0) extras.push(`${analysis.codeBlocks} code`);
        if (analysis.links > 0) extras.push(`${analysis.links} links`);
        console.log(`    🔗 ${extras.join(' • ')}`);
      }
      console.log('');
    });

    // Display notes by category
    const shortNotes = analyses.filter(a => a.readTimeMinutes <= 2);
    const mediumNotes = analyses.filter(a => a.readTimeMinutes > 2 && a.readTimeMinutes <= 5);
    const longNotes = analyses.filter(a => a.readTimeMinutes > 5);

    console.log(`📊 NOTES BY LENGTH`);
    console.log(`${'─'.repeat(60)}`);
    console.log(`⚡ Quick reads (≤2 min): ${shortNotes.length} notes`);
    console.log(`📖 Medium reads (3-5 min): ${mediumNotes.length} notes`);
    console.log(`📚 Long reads (>5 min): ${longNotes.length} notes`);

    // Display complexity analysis
    const highComplexity = analyses.filter(a => a.complexity > 5);
    const mathHeavy = analyses.filter(a => a.mathEquations > 3);
    const codeHeavy = analyses.filter(a => a.codeBlocks > 2);

    if (highComplexity.length > 0 || mathHeavy.length > 0 || codeHeavy.length > 0) {
      console.log(`\n🔥 COMPLEXITY ANALYSIS`);
      console.log(`${'─'.repeat(60)}`);
      if (highComplexity.length > 0) {
        console.log(`🔥 High complexity: ${highComplexity.length} notes`);
      }
      if (mathHeavy.length > 0) {
        console.log(`🧮 Math-heavy (>3 equations): ${mathHeavy.length} notes`);
      }
      if (codeHeavy.length > 0) {
        console.log(`💻 Code-heavy (>2 blocks): ${codeHeavy.length} notes`);
      }
    }

    console.log(`\n✅ Analysis complete!`);

  } catch (error) {
    console.error('❌ Error analyzing notes:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAnalysisReport();
}

export { analyzeContent, estimateReadTime };
