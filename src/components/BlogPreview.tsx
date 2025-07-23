import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, Clock } from 'lucide-react';
import { blogPosts, BlogPost } from '@/data/notes';

const BlogPreview = () => {
  const navigate = useNavigate();

  // Use the imported blog posts data (show up to 6 recent posts)
  const recentPosts = blogPosts.slice(0, 6).reverse(); // Reverse to show newest first

  const handleViewAllNotes = () => {
    navigate('/notes');
  };

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 mb-8">
          {recentPosts.map((post) => (
            <Card key={post.id} className="bg-gray-800/30 border-gray-600/50 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-900/20 transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle 
                  className="text-xl text-white hover:text-purple-400 transition-colors cursor-pointer"
                  onClick={() => navigate(`/notes/${post.id}`)}
                >
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col h-full">
                <p className="text-gray-300 text-sm mb-4 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                
                {/* Date and Read Time at Bottom */}
                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto border-t border-gray-700 pt-3">
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
          ))}
        </div>

        <div className="text-center">
                    <Button 
            onClick={() => navigate('/notes')}
            className="bg-gradient-to-r from-purple-500 to-purple-500 hover:from-purple-600 hover:to-purple-600 text-white"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            View All Notes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
