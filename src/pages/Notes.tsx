import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Search, Clock, ArrowLeft, ArrowRight, ExternalLink, Network, Download, List, X, Maximize2, Minimize2, Star } from 'lucide-react';
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
  const [, setSelectedNodeInGraph] = useState<string | undefined>();
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
    const formattedUploadDate = selectedPost
      ? new Date(selectedPost.uploadDate).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      : '';
    
    if (!selectedPost) {
      return (
        <div className="page-shell">
          <RelativityFieldLines />
          <div className="page-surface pb-28">
            <TopControls title="Notes" />
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-40 text-center">
              <span className="section-eyebrow mx-auto">Missing note</span>
              <h1 className="mt-6 text-4xl font-semibold text-slate-900 dark:text-white">Note not found</h1>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
                The page you were looking for has either been removed or lives under a different URL.
              </p>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="page-shell">
        <RelativityFieldLines />
        <div className="page-surface">
          <TopControls title="Notes" />
          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-40 pb-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-4">
                <span className="section-eyebrow self-start">Deep dive</span>
                <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white">
                  {selectedPost.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">
                  <div className="flex items-center gap-2 tracking-normal text-slate-600 dark:text-slate-300">
                    <Calendar className="h-4 w-4" />
                    {formattedUploadDate}
                  </div>
                  <div className="flex items-center gap-2 tracking-normal text-slate-600 dark:text-slate-300">
                    <Clock className="h-4 w-4" />
                    {selectedPost.readTime}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-start gap-3 md:justify-end">
                <Button variant="outline" onClick={() => navigate('/notes')}>
                  <ArrowLeft className="h-4 w-4" />
                  Back to list
                </Button>
                <Button variant="ghost" onClick={() => setShowTOC(!showTOC)}>
                  <List className="h-4 w-4" />
                  {showTOC ? 'Hide TOC' : 'Show TOC'}
                </Button>
                {selectedPdfUrl && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = selectedPdfUrl;
                      link.download = `${selectedPost.title}.pdf`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                )}
                <Button variant="outline" onClick={toggleGraphView}>
                  <Network className="h-4 w-4" />
                  {showGraphView ? 'Hide Graph' : 'Show Graph'}
                </Button>
              </div>
            </div>

            <Card className="mt-10">
              <CardContent className="p-8 md:p-10">
                <div className="prose prose-lg max-w-none text-slate-700 prose-headings:text-slate-900 prose-a:text-emerald-600 prose-strong:text-slate-900 prose-pre:bg-slate-900/95 prose-pre:text-white dark:prose-invert dark:prose-headings:text-white dark:prose-strong:text-white dark:prose-pre:bg-white/10">
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
                <Card className="mt-12">
                  <CardHeader className="pb-0">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Related Notes</h3>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-3">
                      {relatedNotes.map((noteTitle) => {
                        const relatedPost = posts.find(p => p.title === noteTitle);
                        return relatedPost ? (
                          <Button
                            key={relatedPost.id}
                            variant="outline"
                            size="sm"
                            className="px-4"
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
                  <div className="glass-card rounded-2xl border border-slate-900/15 bg-white/85 p-0 dark:border-white/15 dark:bg-white/10">
                    {/* TOC Header - Draggable */}
                    <div
                      className="flex items-center justify-between border-b border-slate-900/10 bg-white/60 px-4 py-3 text-slate-500 dark:border-white/15 dark:bg-white/10 dark:text-white/70"
                      onMouseDown={(e) => {
                        setIsDragging(true);
                        setDragOffset({
                          x: e.clientX - tocPosition.x,
                          y: e.clientY - tocPosition.y
                        });
                      }}
                    >
                      <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em]">
                        <List className="h-3 w-3" />
                        Contents
                      </h3>
                      <div className="flex items-center space-x-0.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 rounded-full p-0 text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white"
                          onClick={() => setIsMinimized(!isMinimized)}
                          title={isMinimized ? "Expand" : "Minimize"}
                        >
                          {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 rounded-full p-0 text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white"
                          onClick={() => setShowTOC(false)}
                          title="Close"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* TOC Content */}
                    {!isMinimized && (
                      <div className="max-h-80 overflow-y-auto p-3">
                        <nav className="space-y-1">
                          {headings.map((heading, index) => (
                            <a
                              key={index}
                              href={`#${heading.id}`}
                              className={`block cursor-pointer rounded-lg py-1.5 px-3 text-xs text-slate-500 transition hover:bg-emerald-500/10 hover:text-slate-900 dark:text-white/60 dark:hover:bg-purple-500/10 dark:hover:text-white ${
                                heading.level === 1 ? 'font-semibold text-slate-600 dark:text-white/70' :
                                heading.level === 2 ? 'pl-4 text-slate-500 dark:text-white/60' :
                                heading.level === 3 ? 'pl-6 text-slate-400 dark:text-white/50' :
                                'pl-8 text-slate-400 dark:text-white/50'
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
    <div className="page-shell">
      <RelativityFieldLines />
      <div className="page-surface">
        <TopControls title="Notes" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-40 pb-32">
          <div className="relative text-center">
            <span className="section-eyebrow mx-auto">Knowledge base</span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-semibold leading-tight text-slate-900 dark:text-white">
              Atomic Notes
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-200/80">
              A collection of experiments, reference material, and half-baked ideas covering AI, physics, and engineering.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" onClick={toggleGraphView}>
                <Network className="h-4 w-4" />
                {showGraphView ? 'Hide Graph' : 'Show Graph'}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch((value) => !value)}
                aria-label="Toggle search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className={`mt-8 overflow-hidden transition-all duration-300 ease-out ${
              showSearch ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}
            aria-hidden={!showSearch}
          >
            <div className={`transition-transform duration-300 ${showSearch ? 'translate-y-0' : '-translate-y-2'}`}>
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-base"
                autoFocus={showSearch}
              />
            </div>
          </div>

          <div className="mt-12 space-y-6">
            {currentPosts.length === 0 ? (
              <div className="glass-card flex flex-col items-center gap-4 px-10 py-16 text-center">
                <BookOpen className="h-10 w-10 text-emerald-500 dark:text-purple-300" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">No notes found</h3>
                <p className="max-w-sm text-sm text-slate-500 dark:text-slate-300">
                  Try widening your search query or browse the featured posts from the home page.
                </p>
              </div>
            ) : (
              currentPosts.map((post) => {
                const published = new Date(post.uploadDate).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <Card
                    key={post.id}
                    className="group transition duration-300 hover:-translate-y-1 hover:shadow-emerald-500/25 dark:hover:shadow-purple-500/25"
                  >
                    <CardHeader className="space-y-3 pb-0">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-emerald-600/80 dark:text-purple-200/70">
                        <div className="flex items-center gap-2 tracking-normal text-slate-500 dark:text-slate-200/70">
                          <Calendar className="h-4 w-4" />
                          {published}
                        </div>
                        <div className="flex items-center gap-2 tracking-normal text-slate-500 dark:text-slate-200/70">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                        {post.repoUrl && post.repoName && (
                          <a
                            href={post.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 tracking-normal text-slate-500 transition hover:text-emerald-700 dark:text-slate-200/70 dark:hover:text-purple-200"
                          >
                            <ExternalLink className="h-4 w-4" />
                            {post.repoName}
                          </a>
                        )}
                      </div>
                      <div className="flex items-start gap-3">
                        {post.featured && (
                          <Star className="h-5 w-5 flex-shrink-0 text-emerald-500 dark:text-purple-300" />
                        )}
                        <Link
                          to={`/notes/${post.id}`}
                          className="text-2xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-purple-300"
                        >
                          {post.title}
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6 pt-4">
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200/80">
                        {post.excerpt}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[11px] uppercase tracking-[0.2em]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <Button
                          variant="ghost"
                          className="group inline-flex items-center gap-2 px-0 font-semibold text-emerald-700 hover:text-emerald-600 dark:text-purple-300 dark:hover:text-purple-200"
                          onClick={() => navigate(`/notes/${post.id}`)}
                        >
                          Read the note
                          <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedNodeInGraph(post.title);
                            setShowGraphView(true);
                          }}
                        >
                          Focus in graph
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}

          {sortedPosts.length > 0 && (
            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-300">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedPosts.length)} of {sortedPosts.length} notes
            </p>
          )}

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
