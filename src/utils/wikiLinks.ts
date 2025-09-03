// Utilities for parsing WikiLinks [[]] syntax and building graph relationships

export interface WikiLink {
  text: string;
  target: string;
  start: number;
  end: number;
}

export interface GraphNode {
  id: string;
  title: string;
  group: number;
  size?: number;
  color?: string;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Normalize titles/targets for robust matching (case, spaces, hyphens)
export function normalizeTitle(input: string): string {
  return input
    .trim()
    .toLowerCase()
    // treat hyphens and multiple spaces the same
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Extract WikiLinks [[]] from text content
 */
export function extractWikiLinks(content: string): WikiLink[] {
  const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
  const links: WikiLink[] = [];
  let match;

  while ((match = wikiLinkRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const linkContent = match[1];
    
    // Handle pipe syntax [[Link|Display Text]]
    const parts = linkContent.split('|');
    const target = parts[0].trim();
    const text = parts.length > 1 ? parts[1].trim() : target;

    links.push({
      text,
      target,
      start: match.index,
      end: match.index + fullMatch.length
    });
  }

  return links;
}

/**
 * Convert WikiLinks to markdown links that work with ReactMarkdown
 */
export function processWikiLinksToMarkdown(content: string, posts: Array<{ id: string; title: string; fileName: string }>): string {
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, linkContent) => {
    // Handle pipe syntax [[Link|Display Text]]
    const parts = linkContent.split('|');
    const target = parts[0].trim();
    const displayText = parts.length > 1 ? parts[1].trim() : target;
    
    // Try to find matching post
    const matchingPost = findMatchingPost(target, posts);
    
    if (matchingPost) {
      // Convert to markdown link with special wiki class
      return `[${displayText}](wiki:${matchingPost.id})`;
    } else {
      // Return as broken link with special styling
      return `[${displayText}](broken:${target})`;
    }
  });
}

/**
 * Find a matching post for a wiki link target
 */
export function findMatchingPost(target: string, posts: Array<{ id: string; title: string; fileName: string }>) {
  const normalizedTarget = target.toLowerCase().trim();
  
  return posts.find(post => {
    // Direct title match
    if (post.title.toLowerCase() === normalizedTarget) return true;
    
    // Filename match (with and without .md extension)
    const baseFileName = post.fileName.toLowerCase().replace('.md', '');
    if (baseFileName === normalizedTarget) return true;
    
    // Convert spaces to hyphens and try again
    const hyphenated = normalizedTarget.replace(/\s+/g, '-');
    if (baseFileName === hyphenated) return true;
    
    // Convert hyphens to spaces and try again
    const spaced = baseFileName.replace(/-/g, ' ');
    if (spaced === normalizedTarget) return true;
    
    return false;
  });
}

/**
 * Build graph data from blog posts
 */
export function buildGraphFromPosts(posts: Array<{ id: string; title: string; content: string }>): GraphData {
  const nodes: Map<string, GraphNode> = new Map();
  const linkCounts: Map<string, number> = new Map();
  const links: GraphLink[] = [];

  // Create nodes for all posts
  posts.forEach(post => {
    nodes.set(post.title, {
      id: post.title,
      title: post.title,
      group: 1,
      size: 10,
      color: '#A855F7' // purple-500
    });
  });

  // Process each post to find links
  posts.forEach(post => {
    const wikiLinks = extractWikiLinks(post.content);
    
    wikiLinks.forEach(link => {
      // Try to resolve target to an existing post title using normalization
      const normalizedTarget = normalizeTitle(link.target);
      const matchedPost = posts.find(p => normalizeTitle(p.title) === normalizedTarget);
      const targetTitle = matchedPost ? matchedPost.title : link.target;
      
      // Create target node if it doesn't exist (orphaned link)
      if (!nodes.has(targetTitle)) {
        nodes.set(targetTitle, {
          id: targetTitle,
          title: targetTitle,
          group: 2, // Different group for orphaned nodes
          size: 6,
          color: '#9CA3AF' // gray-400
        });
      }

      // Create or update link
      const linkKey = `${post.title}->${targetTitle}`;
      const reverseKey = `${targetTitle}->${post.title}`;
      
      // Check if we already have this connection
      const existingLink = links.find(l => 
        (l.source === post.title && l.target === targetTitle) ||
        (l.source === targetTitle && l.target === post.title)
      );

      if (existingLink) {
        existingLink.value += 1;
      } else {
        links.push({
          source: post.title,
          target: targetTitle,
          value: 1
        });
      }

      // Update link counts for node sizing
      const currentCount = linkCounts.get(post.title) || 0;
      linkCounts.set(post.title, currentCount + 1);
      
      const targetCount = linkCounts.get(targetTitle) || 0;
      linkCounts.set(targetTitle, targetCount + 1);
    });
  });

  // Update node sizes based on connection count
  nodes.forEach(node => {
    const connectionCount = linkCounts.get(node.id) || 0;
    node.size = Math.max(6, 10 + connectionCount * 2);
  });

  return {
    nodes: Array.from(nodes.values()),
    links
  };
}

/**
 * Find related notes based on WikiLinks
 */
export function findRelatedNotes(currentTitle: string, posts: Array<{ id: string; title: string; content: string }>): string[] {
  const related = new Set<string>();
  const normalizedCurrent = normalizeTitle(currentTitle);
  
  // Find notes that link to current note
  posts.forEach(post => {
    if (post.title === currentTitle) return;
    
    const links = extractWikiLinks(post.content);
    if (links.some(link => normalizeTitle(link.target) === normalizedCurrent)) {
      related.add(post.title);
    }
  });

  // Find notes that current note links to
  const currentPost = posts.find(p => p.title === currentTitle);
  if (currentPost) {
    const links = extractWikiLinks(currentPost.content);
    links.forEach(link => {
      const targetPost = posts.find(p => normalizeTitle(p.title) === normalizeTitle(link.target));
      if (targetPost) {
        related.add(targetPost.title);
      }
    });
  }

  return Array.from(related);
}
