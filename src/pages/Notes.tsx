import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Calendar, Search, Clock, ArrowLeft, ExternalLink, Network, Download, List, X, Maximize2, Minimize2, Star } from 'lucide-react';
import WikiMarkdown from '@/components/WikiMarkdown';
import GlobalGraphView from '@/components/GlobalGraphView';
import LocalGraphView from '@/components/LocalGraphView';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import Footer from '@/components/Footer';
import TopControls from '@/components/TopControls';
import { useTheme } from 'next-themes';
import hljsLight from 'highlight.js/styles/github.css?raw';
import hljsDark from 'highlight.js/styles/github-dark.css?raw';
import 'katex/dist/katex.min.css';
import { blogPosts as importedBlogPosts, BlogPost } from '@/components/data/notes';
import { findRelatedNotes, normalizeTitle } from '@/utils/wikiLinks';

// Optional per-note PDFs are auto-discovered from the Featured Notes directory.
// Drop a PDF next to its matching markdown file and it will show up in the Download button.
const pdfAssetModules = import.meta.glob('@/components/Featured Notes/*.pdf', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const pdfByNormalizedTitle = Object.entries(pdfAssetModules).reduce<Record<string, string>>(
  (acc, [path, url]) => {
    const fileName = path.split('/').pop() ?? '';
    const baseName = fileName.replace(/\.pdf$/i, '');
    acc[normalizeTitle(baseName)] = url;
    return acc;
  },
  {}
);

// Function to remove YAML frontmatter from content
const removeFrontmatter = (content: string): string => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    return match[2].trim(); // Return content without frontmatter
  }
  
  return content.trim();
};

// Function to extract headings from markdown content
const extractHeadings = (content: string) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    headings.push({ level, text, id });
  }

  return headings;
};

type ExtendedBlogPost = BlogPost & {
  tags?: string[];
  repoUrl?: string;
  repoName?: string;
};

const Notes = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<ExtendedBlogPost[]>([]);
  const [showGraphView, setShowGraphView] = useState(false); // Default to hidden
  const [showSearch, setShowSearch] = useState(false);
  const [selectedNodeInGraph, setSelectedNodeInGraph] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [showTOC, setShowTOC] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [tocPosition, setTocPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const postsPerPage = 7;
  const params = useParams();
  const navigate = useNavigate();
  const noteId = params.id;

  // Inject appropriate highlight.js theme based on current theme
  React.useEffect(() => {
    const id = 'hljs-theme';
    let styleTag = document.getElementById(id) as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = id;
      document.head.appendChild(styleTag);
    }
    const isDark = theme === 'dark';
    styleTag.textContent = isDark ? hljsDark : hljsLight;
    return () => {
      // Clean up on unmount to avoid duplicates
      const existing = document.getElementById(id);
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    };
  }, [theme]);

  // Initialize posts with imported data from generated file
  React.useEffect(() => {
    if (posts.length === 0) {
      setPosts(importedBlogPosts as ExtendedBlogPost[]);
    }
  }, [posts.length]);

  // Reset view when navigating back to notes list
  React.useEffect(() => {
    if (!noteId) {
      // Clear any selected state when going back to list view
      setSelectedNodeInGraph(undefined);
      setShowGraphView(false);
    }
  }, [noteId]);

  // Handler for wiki link clicks
  const handleWikiLinkClick = (postId: string) => {
    navigate(`/notes/${postId}`);
  };

  // Handler for graph node clicks
  const handleGraphNodeClick = (nodeId: string) => {
    const targetNorm = normalizeTitle(nodeId);
    const matchingPost = posts.find(post => normalizeTitle(post.title) === targetNorm);
    if (matchingPost) {
      setSelectedNodeInGraph(nodeId);
      navigate(`/notes/${matchingPost.id}`);
    }
  };

  // Handler for toggling graph view
  const toggleGraphView = () => {
    setShowGraphView(!showGraphView);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Sort posts by date (newest first)
  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

  // Calculate pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle dragging
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setTocPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // If we have a noteId, find and display that specific note
  if (noteId) {
    const selectedPost = posts.find(post => post.id === noteId);
    const normalizedSelectedTitle = selectedPost ? normalizeTitle(selectedPost.title) : undefined;
    const selectedPdfUrl = normalizedSelectedTitle ? pdfByNormalizedTitle[normalizedSelectedTitle] : undefined;
    
    if (!selectedPost) {
      return (
        <div className="min-h-screen relative overflow-hidden bg-background gradient-bg flex flex-col">
          <RelativityFieldLines />
          <div className="relative z-10 flex-1 pb-24">
            <TopControls title="Notes" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 pt-20 pb-20">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-4">Note Not Found</h1>
                <p className="text-muted-foreground mb-8">The note you are looking for does not exist.</p>
                {/* Removed Return to Notes button per request */}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen relative overflow-hidden bg-background gradient-bg flex flex-col">
        <RelativityFieldLines />
        {/* Removed light-mode decorative glows inside note view */}
        <div className="relative z-10 flex-1">
          <TopControls title="Notes" />
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-8 pt-20 pb-24 relative z-20">
            <div className="mb-8 relative z-30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">{selectedPost.title}</h1>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(selectedPost.uploadDate).toLocaleString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button 
                    onClick={() => navigate('/notes')}
                    variant="outline" 
                    className="bg-black text-white border-black hover:bg-gray-800 hover:text-white dark:text-blue-500 dark:border-blue-500 dark:bg-transparent dark:hover:bg-transparent dark:hover:text-blue-400"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Notes
                  </Button>
                  <Button 
                    onClick={() => setShowTOC(!showTOC)}
                    variant="outline" 
                    className="bg-black text-white border-black hover:bg-gray-800 hover:text-white dark:text-red-500 dark:border-red-500 dark:bg-transparent dark:hover:bg-transparent dark:hover:text-red-400"
                  >
                    <List className="w-4 h-4 mr-2" />
                    {showTOC ? 'Hide TOC' : 'Show TOC'}
                  </Button>

                  {selectedPdfUrl && (
                    <Button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = selectedPdfUrl;
                        link.download = `${selectedPost.title}.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      variant="outline" 
                      className="bg-black text-white border-purple hover:bg-gray-800 hover:text-white dark:text-purple-500 dark:border-purple dark:bg-transparent dark:hover:bg-transparent dark:hover:text-purple-400"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  )}
                  
                  <Button 
                    onClick={toggleGraphView}
                    variant="outline" 
                    className="bg-black text-white border-black hover:bg-gray-800 hover:text-white dark:text-pink-500 dark:border-pink-500 dark:bg-transparent dark:hover:bg-transparent dark:hover:text-pink-400"
                  >
                    <Network className="w-4 h-4 mr-2" />
                    {showGraphView ? 'Hide Graph' : 'Show Graph'}
                  </Button>
                </div>
              </div>
            </div>

            <Card className="bg-card/30 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-pre:bg-card prose-pre:border prose-pre:border-border">
                  <WikiMarkdown 
                    content={removeFrontmatter(selectedPost.content)}
                    posts={posts}
                    onWikiLinkClick={handleWikiLinkClick}
                    className="wiki-content"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Related Notes Section */}
            {(() => {
              const relatedNotes = findRelatedNotes(selectedPost.title, posts);
              return relatedNotes.length > 0 ? (
                <Card className="bg-card/30 border-border/50 backdrop-blur-sm mt-6">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-foreground">Related Notes</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {relatedNotes.map((noteTitle) => {
                        const relatedPost = posts.find(p => p.title === noteTitle);
                        return relatedPost ? (
                          <Button
                            key={relatedPost.id}
                            variant="outline"
                            size="sm"
                            className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400"
                            onClick={() => navigate(`/notes/${relatedPost.id}`)}
                          >
                            {noteTitle}
                          </Button>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              ) : null;
            })()}
            
            {/* Detachable Table of Contents */}
            {(() => {
              const headings = extractHeadings(selectedPost.content);
              if (!showTOC || headings.length === 0) return null;

              return (
                <div
                  className="fixed z-50 group"
                  style={{
                    left: tocPosition.x,
                    top: tocPosition.y,
                    width: isMinimized ? 'auto' : '300px',
                    maxHeight: isMinimized ? 'auto' : '450px'
                  }}
                >
                  {/* TOC Card with minimalist styling */}
                  <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-md border border-gray-600/60 dark:border-gray-700/20 shadow-sm card-hover-glow">
                    {/* TOC Header - Draggable */}
                    <div
                      className="flex items-center justify-between px-3 py-2 bg-gray-50/10 dark:bg-gray-700/10 rounded-t-md cursor-move border-b border-gray-600/50 dark:border-gray-700/30"
                      onMouseDown={(e) => {
                        setIsDragging(true);
                        setDragOffset({
                          x: e.clientX - tocPosition.x,
                          y: e.clientY - tocPosition.y
                        });
                      }}
                    >
                      <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center">
                        <List className="w-3 h-3 mr-1 text-gray-500 dark:text-gray-500" />
                        Contents
                      </h3>
                      <div className="flex items-center space-x-0.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-transparent rounded-full"
                          onClick={() => setIsMinimized(!isMinimized)}
                          title={isMinimized ? "Expand" : "Minimize"}
                        >
                          {isMinimized ? <Maximize2 className="h-2.5 w-2.5" /> : <Minimize2 className="h-2.5 w-2.5" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-transparent rounded-full"
                          onClick={() => setShowTOC(false)}
                          title="Close"
                        >
                          <X className="h-2.5 w-2.5" />
                        </Button>
                      </div>
                    </div>

                    {/* TOC Content */}
                    {!isMinimized && (
                      <div className="p-2 max-h-80 overflow-y-auto">
                        <nav className="space-y-0.5">
                          {headings.map((heading, index) => (
                            <a
                              key={index}
                              href={`#${heading.id}`}
                              className={`block text-xs transition-colors hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer py-1 px-2 rounded hover:bg-blue-50/50 dark:hover:bg-blue-900/10 ${
                                heading.level === 1 ? 'font-medium text-gray-700 dark:text-gray-300' :
                                heading.level === 2 ? 'pl-3 text-gray-600 dark:text-gray-400' :
                                heading.level === 3 ? 'pl-4 text-gray-500 dark:text-gray-500' :
                                'pl-5 text-gray-400 dark:text-gray-600 text-xs'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(heading.id);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                            >
                              {heading.text}
                            </a>
                          ))}
                        </nav>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Local Graph View Component for Individual Notes */}
          <LocalGraphView
            isVisible={showGraphView}
            onClose={() => setShowGraphView(false)}
            onNodeClick={handleGraphNodeClick}
            currentNote={selectedPost.title}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background gradient-bg flex flex-col">
      <RelativityFieldLines />
      {/* Light-mode decorative glows for list view */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 z-0 pointer-events-none block dark:hidden">
        <div className="w-[36rem] h-[36rem] rounded-full blur-3xl opacity-60" style={{background:'radial-gradient(circle, rgba(139,92,246,0.10), rgba(59,130,246,0.06), transparent)'}}></div>
      </div>
      <div className="fixed top-28 left-8 z-0 pointer-events-none block dark:hidden">
        <div className="w-56 h-56 rounded-full blur-2xl opacity-70" style={{background:'radial-gradient(circle, rgba(56,189,248,0.10), rgba(147,51,234,0.08), transparent)'}}></div>
      </div>
      <div className="relative z-10 flex-1">
        <TopControls title="Notes" />
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 pt-20">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Atomic Notes</h1>
            <div className="flex justify-center items-center gap-2 mb-4">
              <Button 
                onClick={toggleGraphView}
                variant="outline" 
                className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400"
              >
                <Network className="w-4 h-4 mr-2" />
                {showGraphView ? 'Hide Graph' : 'Show Graph'}
              </Button>
              <Button
                onClick={() => setShowSearch((v) => !v)}
                variant="outline"
                aria-label="Toggle search"
                className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400 p-2 h-9 w-9 rounded-full flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of my thoughts, discoveries, and learnings in mathematics, physics, and computer science.
            </p>
          </div>

          {/* Search and Filter (animated) */}
          <div
            className={`mb-8 space-y-4 overflow-hidden transition-all duration-300 ease-out ${
              showSearch ? 'opacity-100 translate-y-0 max-h-28' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'
            }`}
            aria-hidden={!showSearch}
          >
            <div className={`relative transition-transform duration-300 ${showSearch ? 'scale-100' : 'scale-95'}`}>
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-3 text-lg bg-card/30 border-black dark:border-black backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-black"
                autoFocus={showSearch}
              />
            </div>
          </div>

          {/* Blog Posts List */}
          <div className="space-y-8">
            {currentPosts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">No notes found</h3>
                <p className="text-muted-foreground">Try adjusting your search or upload a new note.</p>
              </div>
            ) : (
              currentPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="bg-card/30 border-black dark:border-black backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:border-black"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 flex items-center">
                        {post.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-2 flex-shrink-0" />
                        )}
                        <Link 
                          to={`/notes/${post.id}`}
                          className="text-xl font-semibold text-foreground hover:text-purple-400 transition-colors block"
                        >
                          {post.title}
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 md:p-6 flex flex-col h-full">
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                    {/* Date and Read Time at Bottom */}
                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground mt-auto border-t border-black dark:border-black pt-3">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.uploadDate).toLocaleString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                      {post.repoUrl && post.repoName && (
                        <div className="flex items-center">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          <a 
                            href={post.repoUrl}
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {post.repoName}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  {post.tags && post.tags.length > 0 && (
                    <CardContent className="pt-3 pb-5 px-5 md:px-6">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs uppercase tracking-wide bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={currentPage === page ? "default" : "outline"}
                    className={currentPage === page 
                      ? "bg-transparent text-purple-400 border-black hover:bg-transparent hover:text-purple-300" 
                      : "text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400"
                    }
                    size="sm"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                variant="outline"
                className="text-purple-500 border-black bg-transparent hover:bg-transparent hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          )}
          {/* Page Info */}
          {sortedPosts.length > 0 && (
            <div className="text-center mt-6 text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedPosts.length)} of {sortedPosts.length} notes
            </div>
          )}
          
          {/* Global Graph View Component for Notes Overview */}
          <GlobalGraphView
            isVisible={showGraphView}
            onClose={() => setShowGraphView(false)}
            onNodeClick={handleGraphNodeClick}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Notes;
