import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Calendar, Search, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';
import { blogPosts as importedBlogPosts, BlogPost } from '@/data/notes';
import PageHeader from '@/components/PageHeader';

// Function to remove YAML frontmatter from content
const removeFrontmatter = (content: string): string => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    return match[2].trim(); // Return content without frontmatter
  }
  
  return content.trim();
};

// Function to convert Obsidian wiki links to regular markdown links
const processObsidianWikiLinks = (content: string, allPosts: BlogPost[]): string => {
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
    // Try to find a matching note by title or filename
    const matchingPost = allPosts.find(post => 
      post.title.toLowerCase() === linkText.toLowerCase() ||
      post.fileName.toLowerCase() === linkText.toLowerCase() + '.md' ||
      post.fileName.toLowerCase().replace('.md', '').replace(/-/g, ' ') === linkText.toLowerCase()
    );
    
    if (matchingPost) {
      // Convert to regular markdown link that will navigate to the note
      return `[${linkText}](/notes/${matchingPost.id})`;
    } else {
      // If no matching note found, keep as plain text with different styling
      return `**${linkText}** _(note not found)_`;
    }
  });
};

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const params = useParams();
  const navigate = useNavigate();
  const noteId = params.id;

  // Initialize posts with imported data from generated file
  React.useEffect(() => {
    if (posts.length === 0) {
      setPosts(importedBlogPosts);
    }
  }, [posts.length]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // If we have a noteId, find and display that specific note
  if (noteId) {
    const selectedPost = posts.find(post => post.id === noteId);
    
    if (!selectedPost) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-black">
          <PageHeader title="Learning Notes" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Note Not Found</h1>
              <p className="text-gray-300 mb-8">The note you are looking for does not exist.</p>
              <Button onClick={() => navigate('/notes')} className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Notes
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-black">
        <PageHeader title="Learning Notes" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Button 
              onClick={() => navigate('/notes')} 
              variant="ghost" 
              className="text-blue-400 hover:text-blue-300 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Button>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{selectedPost.title}</h1>
                <div className="flex items-center text-sm text-gray-400 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(selectedPost.uploadDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedPost.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="pt-6">
              <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-blue-300 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeHighlight, rehypeKatex]}
                  components={{
                    // Custom link renderer to handle internal navigation
                    a: ({ href, children }) => {
                      if (href?.startsWith('/notes/')) {
                        // Internal note link
                        return (
                          <span
                            className="obsidian-link"
                            style={{ color: '#60a5fa', cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => navigate(href)}
                          >
                            {children}
                          </span>
                        );
                      } else if (href?.startsWith('http')) {
                        // External link
                        return (
                          <a 
                            href={href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            {children}
                          </a>
                        );
                      } else {
                        // Regular link
                        return <a href={href} className="text-blue-400 hover:text-blue-300 underline">{children}</a>;
                      }
                    }
                  }}
                >
                  {processObsidianWikiLinks(removeFrontmatter(selectedPost.content), posts)}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-black">
      <PageHeader title="Learning Notes" showHomeButton={true} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of my thoughts, discoveries, and learnings in mathematics, physics, and computer science.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
            />
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No notes found</h3>
              <p className="text-gray-500">Try adjusting your search or upload a new note.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                className="bg-gray-800 border-gray-600 hover:shadow-lg hover:shadow-gray-900/20 transition-shadow duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link 
                        to={`/notes/${post.id}`}
                        className="text-xl font-semibold text-white hover:text-blue-400 transition-colors block"
                      >
                        {post.title}
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.uploadDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
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
      </div>
    </div>
  );
};

export default Notes;
