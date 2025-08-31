import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Calendar, Search, Clock, ArrowLeft, ExternalLink, Network, Download, List, X, Maximize2, Minimize2 } from 'lucide-react';
import WikiMarkdown from '@/components/WikiMarkdown';
import GlobalGraphView from '@/components/GlobalGraphView';
import LocalGraphView from '@/components/LocalGraphView';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';
import { blogPosts as importedBlogPosts, BlogPost } from '@/data/notes';
import PageHeader from '@/components/PageHeader';
import { findRelatedNotes } from '@/utils/wikiLinks';

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

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showGraphView, setShowGraphView] = useState(false); // Default to hidden
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

  // Initialize posts with imported data from generated file
  React.useEffect(() => {
    if (posts.length === 0) {
      setPosts(importedBlogPosts);
    }
  }, [posts.length]);

  // Handler for wiki link clicks
  const handleWikiLinkClick = (postId: string) => {
    navigate(`/notes/${postId}`);
  };

  // Handler for graph node clicks
  const handleGraphNodeClick = (nodeId: string) => {
    const matchingPost = posts.find(post => post.title === nodeId);
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
    
    if (!selectedPost) {
      return (
        <div className="min-h-screen relative overflow-hidden bg-background gradient-bg">
          <div className="relative z-10">
            <PageHeader title="Thoughts!" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Note Not Found</h1>
              <p className="text-muted-foreground mb-8">The note you are looking for does not exist.</p>
              <Button onClick={() => navigate('/notes')} className="bg-purple-600 hover:bg-purple-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Notes
              </Button>
            </div>
          </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen relative overflow-hidden bg-background gradient-bg">
        <PageHeader title="Thoughts!" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Button 
              onClick={() => navigate('/notes')} 
              variant="ghost" 
              className="text-foreground hover:text-muted-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Button>
            
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
                  onClick={() => setShowTOC(!showTOC)}
                  variant="outline" 
                  className="text-blue-500 border-blue-500 bg-transparent hover:bg-transparent hover:text-blue-400"
                >
                  <List className="w-4 h-4 mr-2" />
                  {showTOC ? 'Hide TOC' : 'Show TOC'}
                </Button>
                
                <Button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/report.pdf';
                    link.download = 'report.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  variant="outline" 
                  className="text-red-500 border-red-500 bg-transparent hover:bg-transparent hover:text-red-400"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                
                <Button 
                  onClick={toggleGraphView}
                  variant="outline" 
                  className="text-purple-500 border-purple-500 bg-transparent hover:bg-transparent hover:text-purple-400"
                >
                  <Network className="w-4 h-4 mr-2" />
                  {showGraphView ? 'Hide Graph' : 'Show Graph'}
                </Button>
              </div>
            </div>
          </div>

          <Card className="bg-card/30 border-border/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-purple-500 prose-pre:bg-card prose-pre:border prose-pre:border-border">
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
                          className="text-purple-500 border-purple-500 bg-transparent hover:bg-transparent hover:text-purple-400"
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
                className="fixed z-50 bg-card/95 border border-border rounded-lg shadow-2xl backdrop-blur-sm"
                style={{
                  left: tocPosition.x,
                  top: tocPosition.y,
                  width: isMinimized ? 'auto' : '280px',
                  maxHeight: isMinimized ? 'auto' : '400px'
                }}
              >
                {/* TOC Header - Draggable */}
                <div
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-t-lg cursor-move border-b border-border"
                  onMouseDown={(e) => {
                    setIsDragging(true);
                    setDragOffset({
                      x: e.clientX - tocPosition.x,
                      y: e.clientY - tocPosition.y
                    });
                  }}
                >
                  <h3 className="text-sm font-semibold text-foreground">Contents</h3>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-muted"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-muted"
                      onClick={() => setShowTOC(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* TOC Content */}
                {!isMinimized && (
                  <div className="p-3 max-h-80 overflow-y-auto">
                    <nav className="space-y-1">
                      {headings.map((heading, index) => (
                        <a
                          key={index}
                          href={`#${heading.id}`}
                          className={`block text-xs transition-colors hover:text-blue-400 cursor-pointer ${
                            heading.level === 1 ? 'font-semibold text-foreground' :
                            heading.level === 2 ? 'pl-3 text-muted-foreground' :
                            'pl-6 text-muted-foreground/80'
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
            );
          })()}
          
          {/* Local Graph View Component for Individual Notes */}
          <LocalGraphView
            isVisible={showGraphView}
            onClose={() => setShowGraphView(false)}
            onNodeClick={handleGraphNodeClick}
            currentNote={selectedPost.title}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background gradient-bg">
      <div className="relative z-10">
        <PageHeader title="Thoughts!" showHomeButton={false} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Button 
              onClick={toggleGraphView}
              variant="outline" 
              className="text-purple-500 border-purple-500 bg-transparent hover:bg-transparent hover:text-purple-400"
            >
              <Network className="w-4 h-4 mr-2" />
              {showGraphView ? 'Hide Graph' : 'Show Graph'}
            </Button>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my thoughts, discoveries, and learnings in mathematics, physics, and computer science.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg bg-card/30 border-border/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-purple-500"
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
                className="bg-card/30 border-border/50 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-900/20 transition-shadow duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link 
                        to={`/notes/${post.id}`}
                        className="text-xl font-semibold text-foreground hover:text-purple-400 transition-colors block"
                      >
                        {post.title}
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col h-full">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  {/* Date and Read Time at Bottom */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto border-t border-border pt-3">
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
                  </div>
                </CardContent>
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
              className="text-purple-500 border-purple-500 bg-transparent hover:bg-transparent hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    ? "bg-transparent text-purple-400 border-purple-400 hover:bg-transparent hover:text-purple-300" 
                    : "text-purple-500 border-purple-500 bg-transparent hover:bg-transparent hover:text-purple-400"
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
              className="text-purple-500 border-purple-500 bg-transparent hover:bg-transparent hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
};

export default Notes;
