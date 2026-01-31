import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Calendar, Search, Clock, ArrowLeft, ExternalLink, Network, Download, Star, ChevronDown } from 'lucide-react';
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
  const [showGraphView, setShowGraphView] = useState(true); // Default to visible
  const [showSearch, setShowSearch] = useState(false);
  const [selectedNodeInGraph, setSelectedNodeInGraph] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [tocExpanded, setTocExpanded] = useState(true);
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
      // Graph remains visible
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

  const selectedPost = noteId ? posts.find(post => post.id === noteId) : undefined;
  const normalizedSelectedTitle = selectedPost ? normalizeTitle(selectedPost.title) : undefined;
  const selectedPdfUrl = normalizedSelectedTitle ? pdfByNormalizedTitle[normalizedSelectedTitle] : undefined;
  const tocHeadings = React.useMemo(() => {
    if (!selectedPost) return [];
    return extractHeadings(removeFrontmatter(selectedPost.content));
  }, [selectedPost?.content]);

  React.useEffect(() => {
    if (noteId) {
      setTocExpanded(true);
    }
  }, [noteId]);

  const handleScrollToHeading = React.useCallback((headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // If we have a noteId, find and display that specific note
  if (noteId) {
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
                
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    onClick={() => navigate('/notes')}
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg shadow-slate-900/30 hover:-translate-y-0.5 hover:shadow-slate-900/40 dark:from-slate-100 dark:via-white dark:to-slate-200 dark:text-slate-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Notes
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
                      variant="default"
                      size="sm"
                      className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30 hover:-translate-y-0.5 hover:shadow-purple-500/50 dark:from-fuchsia-500/40 dark:via-purple-500/40 dark:to-indigo-500/40"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                  )}
                  <Button
                    onClick={toggleGraphView}
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/30 hover:-translate-y-0.5 hover:shadow-sky-500/45 dark:from-indigo-500/40 dark:via-sky-500/40 dark:to-cyan-500/40"
                  >
                    <Network className="w-4 h-4" />
                    {showGraphView ? 'Hide Graph' : 'Show Graph'}
                  </Button>
                </div>
              </div>
            </div>

            {tocHeadings.length > 0 && (
              <Card className="mt-8 mb-8 border border-slate-900/10 bg-white/80 text-slate-700 shadow-lg shadow-purple-500/15 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:shadow-purple-500/25">
                <CardContent className="p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-300">
                      <ChevronDown
                        className={`h-4 w-4 text-purple-500 transition-transform duration-200 dark:text-purple-300 ${tocExpanded ? '' : '-rotate-90'}`}
                      />
                      Table of Contents
                    </div>
                    <button
                      type="button"
                      onClick={() => setTocExpanded((prev) => !prev)}
                      className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-slate-600 transition-colors hover:bg-white hover:text-slate-900 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                    >
                      {tocExpanded ? 'Collapse' : 'Expand'}
                    </button>
                  </div>
                  {tocExpanded && (
                    <nav className="mt-5 space-y-1.5">
                      {tocHeadings.map((heading) => {
                        const level = Math.min(heading.level, 4);
                        const levelClass =
                          level === 1
                            ? 'pl-0 text-sm font-semibold text-slate-800 dark:text-white'
                            : level === 2
                              ? 'pl-4 text-sm text-slate-600 dark:text-slate-200'
                              : level === 3
                                ? 'pl-8 text-xs text-slate-500 dark:text-slate-300'
                                : 'pl-12 text-xs text-slate-500 dark:text-slate-400';
                        return (
                          <a
                            key={`${heading.id}-${heading.level}`}
                            href={`#${heading.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleScrollToHeading(heading.id);
                            }}
                            className={`group flex w-full items-center rounded-lg py-2 pr-3 text-left transition-colors hover:bg-purple-500/10 hover:text-purple-600 dark:hover:bg-purple-500/20 dark:hover:text-purple-100 ${levelClass}`}
                          >
                            <span className="mr-2 text-xs text-purple-400 transition-colors group-hover:text-purple-600 dark:text-purple-300 dark:group-hover:text-purple-100">
                              •
                            </span>
                            <span className="flex-1">{heading.text}</span>
                          </a>
                        );
                      })}
                    </nav>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="bg-card/40 border-border/40 backdrop-blur-sm shadow-lg shadow-black/5 dark:shadow-purple-500/10">
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
                  variant="default" 
                  size="sm"
                  className="bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/30 hover:-translate-y-0.5 hover:shadow-sky-500/45 dark:from-indigo-500/40 dark:via-sky-500/40 dark:to-cyan-500/40"
                >
                  <Network className="w-4 h-4 mr-2" />
                  {showGraphView ? 'Hide Graph' : 'Show Graph'}
                </Button>
                <Button
                  onClick={() => setShowSearch((v) => !v)}
                  variant="ghost"
                  size="sm"
                  aria-label="Toggle search"
                  className="rounded-full border border-slate-900/10 bg-white/80 p-2 text-slate-600 shadow-sm hover:bg-white hover:text-slate-900 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
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
            inline={false}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Notes;
