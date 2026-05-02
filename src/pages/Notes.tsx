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
import 'katex/dist/katex.min.css';
import { blogPostsMeta } from '@/components/data/notesMeta';
import { prebuiltGraphData } from '@/components/data/prebuiltGraph';
import type { BlogPost } from '@/types/notes';
import { fetchNoteBody, getCachedNoteBody } from '@/utils/noteBodies';

const importedBlogPosts: BlogPost[] = blogPostsMeta.map((m) => ({
  ...m,
  content: '',
}));
import { normalizeTitle, relatedTitlesFromGraph } from '@/utils/wikiLinks';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<ExtendedBlogPost[]>([]);
  const [showGraphView, setShowGraphView] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedNodeInGraph, setSelectedNodeInGraph] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [tocExpanded, setTocExpanded] = useState(false);
  const postsPerPage = 7;
  const params = useParams();
  const navigate = useNavigate();
  const noteId = params.id;

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
    const q = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      (post.excerpt?.toLowerCase().includes(q) ?? false)
    );
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

  const baseSelectedPost = noteId ? posts.find(post => post.id === noteId) : undefined;
  const [selectedBody, setSelectedBody] = useState<{ id: string; content: string } | null>(() => {
    if (!noteId) return null;
    const cached = getCachedNoteBody(noteId);
    return cached !== undefined ? { id: noteId, content: cached } : null;
  });
  const [selectedBodyStatus, setSelectedBodyStatus] = useState<'idle' | 'loading' | 'error'>(
    () => (noteId && getCachedNoteBody(noteId) === undefined ? 'loading' : 'idle')
  );

  React.useEffect(() => {
    if (!noteId) {
      setSelectedBody(null);
      setSelectedBodyStatus('idle');
      return;
    }
    const cached = getCachedNoteBody(noteId);
    if (cached !== undefined) {
      setSelectedBody({ id: noteId, content: cached });
      setSelectedBodyStatus('idle');
      return;
    }
    const controller = new AbortController();
    setSelectedBody(null);
    setSelectedBodyStatus('loading');
    fetchNoteBody(noteId, controller.signal)
      .then((content) => {
        setSelectedBody({ id: noteId, content });
        setSelectedBodyStatus('idle');
      })
      .catch((err) => {
        if ((err as { name?: string })?.name === 'AbortError') return;
        setSelectedBodyStatus('error');
      });
    return () => controller.abort();
  }, [noteId]);

  const selectedPost = baseSelectedPost
    ? {
        ...baseSelectedPost,
        content:
          selectedBody && selectedBody.id === baseSelectedPost.id
            ? selectedBody.content
            : '',
      }
    : undefined;
  const selectedContentReady =
    !!selectedPost && selectedBody?.id === selectedPost.id && selectedBodyStatus === 'idle';
  const normalizedSelectedTitle = selectedPost ? normalizeTitle(selectedPost.title) : undefined;
  const selectedPdfUrl = normalizedSelectedTitle ? pdfByNormalizedTitle[normalizedSelectedTitle] : undefined;
  const tocHeadings = React.useMemo(() => {
    if (!selectedPost || !selectedContentReady) return [];
    return extractHeadings(removeFrontmatter(selectedPost.content));
  }, [selectedPost, selectedContentReady]);

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
          <div className="relative z-10 flex-1 pb-12">
            <TopControls title="Notes" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 pt-14 pb-10">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">Note Not Found</h1>
                <p className="text-muted-foreground mb-4">The note you are looking for does not exist.</p>
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
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-2 pt-8 pb-10 relative z-20">
            <div className="mb-3 relative z-30">
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">{selectedPost.title}</h1>
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
              <div className="font-toc mt-2 mb-3 rounded-r-xl border-l-[3px] border-violet-500 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/[0.06] to-transparent py-2.5 pl-3.5 pr-3 shadow-sm shadow-violet-500/10 dark:border-violet-400 dark:from-violet-500/20 dark:via-fuchsia-500/10 dark:to-transparent dark:shadow-violet-900/20">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setTocExpanded((prev) => !prev)}
                    className="flex min-w-0 flex-1 items-center gap-2.5 text-left text-sm font-semibold tracking-wide text-violet-900 dark:text-violet-100"
                  >
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-violet-600 transition-transform duration-200 dark:text-violet-300 ${tocExpanded ? '' : '-rotate-90'}`}
                      aria-hidden
                    />
                    <span>Table of Contents</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTocExpanded((prev) => !prev)}
                    className="shrink-0 rounded-full bg-violet-500/15 px-3 py-1 text-sm font-medium text-violet-700 transition-colors hover:bg-violet-500/25 hover:text-violet-900 dark:bg-violet-400/15 dark:text-violet-200 dark:hover:bg-violet-400/25 dark:hover:text-white"
                  >
                    {tocExpanded ? 'Collapse' : 'Expand'}
                  </button>
                </div>
                {tocExpanded && (
                  <nav className="mt-3 space-y-0.5 border-t border-violet-500/15 pt-3 dark:border-violet-400/20" aria-label="In this page">
                    {tocHeadings.map((heading) => {
                      const level = Math.min(heading.level, 4);
                      const levelClass =
                        level === 1
                          ? 'pl-0 text-lg font-semibold leading-snug text-slate-800 dark:text-slate-100'
                          : level === 2
                            ? 'pl-3 text-base leading-snug text-slate-600 dark:text-slate-300'
                            : level === 3
                              ? 'pl-6 text-[0.95rem] leading-snug text-slate-500 dark:text-slate-400'
                              : 'pl-9 text-[0.95rem] leading-snug text-slate-500 dark:text-slate-500';
                      return (
                        <a
                          key={`${heading.id}-${heading.level}`}
                          href={`#${heading.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleScrollToHeading(heading.id);
                          }}
                          className={`group flex w-full items-center rounded-md py-1.5 pr-2 text-left transition-colors hover:bg-violet-500/15 hover:text-violet-900 dark:hover:bg-violet-500/20 dark:hover:text-violet-50 ${levelClass}`}
                        >
                          <span className="mr-2 text-violet-400 transition-colors group-hover:text-violet-600 dark:text-violet-500 dark:group-hover:text-violet-300">
                            ·
                          </span>
                          <span className="flex-1">{heading.text}</span>
                        </a>
                      );
                    })}
                  </nav>
                )}
              </div>
            )}

            <Card className="bg-card/60 border-border/40 shadow-lg shadow-black/5 dark:shadow-purple-500/10">
              <CardContent className="p-3.5 md:p-4">
                <div className="prose md-scale-markdown dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-pre:bg-card prose-pre:border prose-pre:border-border">
                  {selectedContentReady ? (
                    <WikiMarkdown
                      content={removeFrontmatter(selectedPost.content)}
                      posts={posts}
                      onWikiLinkClick={handleWikiLinkClick}
                      className="wiki-content"
                    />
                  ) : selectedBodyStatus === 'error' ? (
                    <p className="text-muted-foreground">Could not load this note. Please try again.</p>
                  ) : (
                    <div className="space-y-2" aria-busy="true" aria-label="Loading note">
                      <div className="h-4 w-2/3 rounded bg-muted/60 animate-pulse" />
                      <div className="h-4 w-11/12 rounded bg-muted/60 animate-pulse" />
                      <div className="h-4 w-10/12 rounded bg-muted/60 animate-pulse" />
                      <div className="h-4 w-9/12 rounded bg-muted/60 animate-pulse" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Related Notes Section */}
            {(() => {
              const relatedNotes = relatedTitlesFromGraph(prebuiltGraphData, selectedPost.title);
              return relatedNotes.length > 0 ? (
                <Card className="bg-card/50 border-border/50 mt-3">
                  <CardHeader className="px-4 py-2.5 sm:px-5">
                    <h3 className="text-base font-semibold text-foreground">Related Notes</h3>
                  </CardHeader>
                  <CardContent className="px-4 pb-3 pt-0 sm:px-5">
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
      {/* Simplified light-mode decorative glows - no blur for better performance */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 z-0 pointer-events-none block opacity-40 dark:hidden">
        <div className="w-[36rem] h-[36rem] rounded-full" style={{background:'radial-gradient(circle, rgba(139,92,246,0.15), rgba(59,130,246,0.10), transparent)'}}></div>
      </div>
      <div className="fixed top-28 left-8 z-0 pointer-events-none block opacity-40 dark:hidden">
        <div className="w-56 h-56 rounded-full" style={{background:'radial-gradient(circle, rgba(56,189,248,0.15), rgba(147,51,234,0.12), transparent)'}}></div>
      </div>
      <div className="relative z-10 flex-1">
        <TopControls title="Notes" />
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-3 pt-14 pb-8">
          {/* Header Section */}
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Atomic Notes</h1>
              <div className="flex justify-center items-center gap-2 mb-2">
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
                  className="rounded-full border border-slate-600 bg-white/80 p-2 text-slate-600 shadow-sm hover:bg-white hover:text-slate-900 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
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
            className={`mb-4 space-y-2 overflow-hidden transition-all duration-300 ease-out ${
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
                className="px-3 py-2 text-base bg-card/50 border-black dark:border-black text-foreground placeholder:text-muted-foreground focus:border-black"
                autoFocus={showSearch}
              />
            </div>
          </div>

          {/* Blog Posts List */}
          <div className="space-y-4">
            {currentPosts.length === 0 ? (
              <div className="text-center py-6">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-1">No notes found</h3>
                <p className="text-muted-foreground">Try adjusting your search or upload a new note.</p>
              </div>
            ) : (
              currentPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-card/50 border-black dark:border-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:border-black"
                >
                  <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
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
                  <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2 flex flex-col h-full">
                    <p className="text-muted-foreground text-sm mb-2 leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                    {/* Date and Read Time at Bottom */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground mt-auto border-t border-black dark:border-black pt-2">
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
                    <CardContent className="pt-1.5 pb-3 px-4 sm:px-5">
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
            <div className="flex justify-center items-center space-x-4 mt-6">
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
            <div className="text-center mt-3 text-sm text-muted-foreground">
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
