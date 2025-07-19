import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, ArrowRight } from 'lucide-react';
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
            <Card key={post.id} className="bg-gray-700 border-gray-600 hover:shadow-lg hover:shadow-gray-900/20 transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-end mb-2">
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl mb-2 text-white hover:text-blue-400 transition-colors">
                  {post.title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.uploadDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <Button 
                  variant="ghost" 
                  className="text-blue-400 hover:text-blue-300 p-0 hover:bg-transparent"
                  onClick={() => navigate(`/notes/${post.id}`)}
                >
                  Read more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleViewAllNotes}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
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
