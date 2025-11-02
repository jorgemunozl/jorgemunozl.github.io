import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, Clock, ArrowRight } from 'lucide-react';
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
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col-reverse items-center gap-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600/80 dark:text-purple-200/70">
              Latest highlights
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
              Featured explorations worth your time
            </h2>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-200/80">
              Hand-picked notes that blend experiments, research write-ups, and deep-dives into the technologies
              shaping AI, computing, and engineering systems.
            </p>
          </div>

          <div className="flex w-full justify-center gap-3 md:w-auto md:justify-end">
            <Button 
              onClick={() => navigate('/notes')}
              className="h-11 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 transition hover:shadow-emerald-500/30 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700 dark:shadow-purple-500/30 dark:hover:shadow-purple-500/40"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              View All Notes
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/notes/featured')}
              className="h-11 rounded-full border border-slate-900/15 px-5 text-sm font-medium text-slate-900 transition hover:border-slate-900/35 hover:bg-slate-900/5 dark:border-purple-300/30 dark:text-purple-100 dark:hover:border-purple-200/50 dark:hover:bg-purple-500/10"
            >
              Featured Notes
            </Button>
            <Button 
              onClick={() => navigate('/additional-contents')}
              variant="ghost"
              className="h-11 rounded-full px-5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-purple-200 dark:hover:text-white"
            >
              Additional Contents
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {recentPosts.map((post) => (
            <Card
              key={post.id}
              className="group relative overflow-hidden border border-slate-900/10 bg-white/80 backdrop-blur-lg shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-slate-900/60 dark:hover:shadow-[0_28px_60px_-28px_rgba(139,92,246,0.45)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-blue-500/10 dark:from-purple-500/15 dark:via-transparent dark:to-indigo-500/20" />
              </div>
              <CardHeader className="relative space-y-3 pb-0">
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.25em] text-emerald-600/80 dark:text-purple-200/70">
                  <div className="flex items-center gap-2 tracking-normal text-slate-500 dark:text-slate-200/70">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.uploadDate).toLocaleString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2 tracking-normal text-slate-500 dark:text-slate-200/70">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle 
                  className="text-2xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-purple-300 cursor-pointer"
                  onClick={() => navigate(`/notes/${post.id}`)}
                >
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative flex h-full flex-col gap-6 pt-4">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200/80">
                  {post.excerpt}
                </p>

                <Button
                  variant="ghost"
                  className="group flex items-center gap-2 p-0 text-sm font-semibold text-emerald-700 hover:text-emerald-600 dark:text-purple-300 dark:hover:text-purple-200"
                  onClick={() => navigate(`/notes/${post.id}`)}
                >
                  Read the note
                  <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
