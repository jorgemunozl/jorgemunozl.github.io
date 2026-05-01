import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';

const GlobalGraphView = lazy(() => import('@/components/GlobalGraphView'));

const GraphPlaceholder = () => (
  <div
    className="w-full rounded-lg border border-slate-400/50 dark:border-white/20 bg-muted/25 animate-pulse min-h-[400px]"
    aria-hidden
  />
);

class GraphErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback: React.ReactNode }>,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// Defer loading the ~500 KB graph chunk until the container scrolls near the viewport.
function useInViewOnce<T extends Element>(rootMargin = '300px'): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);
  return [ref, inView];
}
import { normalizeTitle } from '@/utils/wikiLinks';
import { blogPostsMeta } from '@/components/data/notesMeta';
import type { BlogPostMeta } from '@/types/notes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [graphSlotRef, graphInView] = useInViewOnce<HTMLDivElement>('300px');

  // Handler for graph node clicks
  const handleGraphNodeClick = (nodeId: string) => {
    const targetNorm = normalizeTitle(nodeId);
    const matchingPost = blogPostsMeta.find(post => normalizeTitle(post.title) === targetNorm);
    if (matchingPost) {
      navigate(`/notes/${matchingPost.id}`);
    }
  };

  // Get featured posts and split them for left and right sides
  const featuredPosts = blogPostsMeta
    .filter((p: BlogPostMeta) => p.featured === true)
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  
  const leftPosts = featuredPosts.slice(0, Math.ceil(featuredPosts.length / 2));
  const rightPosts = featuredPosts.slice(Math.ceil(featuredPosts.length / 2));

  return (
    <div className="page-shell">
      {/* Relativity field lines background */}
      <RelativityFieldLines />
      
      {/* Lightbulb glow effect - fixed to viewport bottom (dark mode only) */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0 hidden dark:block">
        <div className="w-96 h-96 rounded-full blur-3xl" style={{background: 'radial-gradient(circle, #030d630c, #47020209, transparent)'}}></div>
      </div>
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-0 hidden dark:block">
        <div className="w-48 h-48 rounded-full blur-2xl" style={{background: 'radial-gradient(circle, #9900000c, #01039b0c, #b902a005)'}}></div>
      </div>
      
      <div className="page-surface">
        <TopControls />
        <div className="pt-16 sm:pt-20">
          <Hero />
          
          {/* Graph with Notes on Sides */}
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
              Knowledge Graph
            </h2>

            {/* Three column layout: Notes | Graph | Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Notes Column */}
              <div className="lg:col-span-3 space-y-4">
                {leftPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group cursor-pointer border border-slate-600 bg-white/40 backdrop-blur-sm shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900/10"
                    onClick={() => navigate(`/notes/${post.id}`)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.uploadDate).toLocaleString('en-US', { 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-base font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-purple-300 transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Center Graph Column */}
              <div className="lg:col-span-6" ref={graphSlotRef}>
                {graphInView ? (
                  <Suspense fallback={<GraphPlaceholder />}>
                    <GraphErrorBoundary
                      fallback={
                        <div
                          role="alert"
                          className="flex min-h-[400px] w-full items-center justify-center rounded-lg border border-dashed border-slate-400/60 px-4 text-center text-sm text-slate-600 dark:border-white/20 dark:text-slate-300"
                        >
                          The knowledge graph could not be displayed. Try refreshing the page.
                        </div>
                      }
                    >
                      <GlobalGraphView
                        isVisible={true}
                        onClose={() => {}}
                        onNodeClick={handleGraphNodeClick}
                        inline={true}
                      />
                    </GraphErrorBoundary>
                  </Suspense>
                ) : (
                  <GraphPlaceholder />
                )}
              </div>

              {/* Right Notes Column */}
              <div className="lg:col-span-3 space-y-4">
                {rightPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group cursor-pointer border border-slate-600 bg-white/40 backdrop-blur-sm shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900/10"
                    onClick={() => navigate(`/notes/${post.id}`)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.uploadDate).toLocaleString('en-US', { 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-base font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-purple-300 transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
