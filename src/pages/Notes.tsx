import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Calendar, Search, Clock, ArrowLeft, ExternalLink, Network } from 'lucide-react';
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

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showGraphView, setShowGraphView] = useState(false); // Default to hidden
  const [selectedNodeInGraph, setSelectedNodeInGraph] = useState<string | undefined>();
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

  // If we have a noteId, find and display that specific note
  if (noteId) {
    const selectedPost = posts.find(post => post.id === noteId);
    
    if (!selectedPost) {
      return (
        <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #000000, #161027, #270000)'}}>
          {/* Lightbulb glow effect - fixed to viewport bottom */}
          {/* <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0">
            <div className="w-96 h-96 bg-gradient-radial from-purple-400/20 via-pink-500/15 to-transparent rounded-full blur-3xl"></div>
          </div>
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-0">
            <div className="w-48 h-48 bg-gradient-radial from-purple-400/40 via-pink-500/25 to-purple-600/15 rounded-full blur-2xl"></div>
          </div> */}
          
          <div className="relative z-10">
            <PageHeader title="Thoughts!" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Note Not Found</h1>
              <p className="text-gray-300 mb-8">The note you are looking for does not exist.</p>
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
      <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #000000, #161027, #270000)'}}>
        <PageHeader title="Thoughts!" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Button 
              onClick={() => navigate('/notes')} 
              variant="ghost" 
              className="text-white hover:text-gray-300 mb-4"
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
              
              <Button 
                onClick={toggleGraphView}
                variant="outline" 
                className="text-white border-white hover:bg-white/10 hover:text-white"
              >
                <Network className="w-4 h-4 mr-2" />
                {showGraphView ? 'Hide Graph' : 'Show Graph'}
              </Button>
            </div>
          </div>

          <Card className="bg-gray-800/30 border-gray-600/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-purple-300 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700">
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
              <Card className="bg-gray-800/30 border-gray-600/50 backdrop-blur-sm mt-6">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white">Related Notes</h3>
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
                          className="text-white border-white hover:bg-white/10 hover:text-white"
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
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #000000, #161027, #270000)'}}>
      {/* Lightbulb glow effect - fixed to viewport bottom */}
      {/* <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0">
        <div className="w-96 h-96 bg-gradient-radial from-purple-400/20 via-pink-500/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-0">
        <div className="w-48 h-48 bg-gradient-radial from-purple-400/40 via-pink-500/25 to-purple-600/15 rounded-full blur-2xl"></div>
      </div> */}
      
      <div className="relative z-10">
        <PageHeader title="Thoughts!" showHomeButton={false} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Button 
              onClick={toggleGraphView}
              variant="outline" 
              className="text-white border-white hover:bg-white/10 hover:text-white"
            >
              <Network className="w-4 h-4 mr-2" />
              {showGraphView ? 'Hide Graph' : 'Show Graph'}
            </Button>
          </div>
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
              className="pl-10 py-3 text-lg bg-gray-800/30 border-gray-600/50 backdrop-blur-sm text-white placeholder-gray-400 focus:border-purple-400"
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
                className="bg-gray-800/30 border-gray-600/50 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-900/20 transition-shadow duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link 
                        to={`/notes/${post.id}`}
                        className="text-xl font-semibold text-white hover:text-purple-400 transition-colors block"
                      >
                        {post.title}
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col h-full">
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  {/* Date and Read Time at Bottom */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-auto border-t border-gray-700 pt-3">
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
