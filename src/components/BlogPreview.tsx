import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, Clock } from 'lucide-react';
import { blogPosts, BlogPost } from '@/components/data/notes';

const BlogPreview = () => {
  const navigate = useNavigate();

  // Only featured posts, sorted by date (newest first) and show up to 6 recent posts
  const recentPosts = blogPosts
    .filter((p: BlogPost) => (p as any).featured === true)
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, 6);

  const handleViewAllNotes = () => {
    navigate('/notes');
  };

  return (
    <section className="py-5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 mb-6">
          {recentPosts.map((post) => (
            <Card key={post.id} className="bg-card/30 border-black dark:border-purple-800/50 backdrop-blur-sm hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-purple-500/20 transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle 
                  className="text-xl text-foreground hover:text-black dark:hover:text-purple-400 transition-colors cursor-pointer"
                  onClick={() => navigate(`/notes/${post.id}`)}
                >
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col h-full">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                
                {/* Date and Read Time at Bottom */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto border-t border-black dark:border-purple-800/50 pt-3">
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
          ))}
        </div>

        <div className="text-center">
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => navigate('/notes')}
              className="bg-gradient-to-r from-black-500 to-black-600 hover:from-black-600 hover:to-black-700 dark:bg-gradient-to-r dark:from-purple-500 dark:to-purple-500 dark:hover:from-purple-600 dark:hover:to-purple-600 text-white"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View All Notes
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/notes/featured')}
              className="border-black text-black hover:bg-black/10 hover:text-black hover:border-black dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-950 dark:hover:text-purple-200 dark:hover:border-purple-700"
            >
              Featured Notes
            </Button>
            <Button 
              onClick={() => navigate('/additional-contents')}
              variant="outline"
              className="border-black text-black hover:bg-black/10 hover:text-black hover:border-black dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-950 dark:hover:text-purple-200 dark:hover:border-purple-700"
            >
              Additional Contents
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
