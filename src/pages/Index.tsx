
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import GlobalGraphView from '@/components/GlobalGraphView';
import { normalizeTitle } from '@/utils/wikiLinks';
import { blogPosts, BlogPost } from '@/components/data/notes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const notesSectionRef = useRef<HTMLDivElement>(null);
  
  // Handler for graph node clicks
  const handleGraphNodeClick = (nodeId: string) => {
    const targetNorm = normalizeTitle(nodeId);
    const matchingPost = blogPosts.find(post => normalizeTitle(post.title) === targetNorm);
    if (matchingPost) {
      navigate(`/notes/${matchingPost.id}`);
    }
  };

  // Get featured posts and split them for left and right sides
  const featuredPosts = blogPosts
    .filter((p: BlogPost) => (p as any).featured === true)
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  
  const leftPosts = featuredPosts.slice(0, Math.ceil(featuredPosts.length / 2));
  const rightPosts = featuredPosts.slice(Math.ceil(featuredPosts.length / 2));

  // Scroll-based animation for graph
  useEffect(() => {
    const handleScroll = () => {
      if (!graphContainerRef.current || !notesSectionRef.current) return;

      const notesSection = notesSectionRef.current;
      const graphContainer = graphContainerRef.current;
      const windowHeight = window.innerHeight;
      
      // Get the position of the notes section relative to viewport
      const notesTop = notesSection.getBoundingClientRect().top;
      const notesHeight = notesSection.offsetHeight;
      
      // Calculate when we're in the notes section
      // Start moving when notes section enters viewport
      if (notesTop < windowHeight && notesTop > -notesHeight) {
        // Calculate scroll progress through the notes section
        // When notesTop is at top of viewport, progress = 1
        // When notesTop is at bottom of viewport, progress = 0
        const progress = Math.max(0, Math.min(1, (windowHeight - notesTop) / (windowHeight + notesHeight)));
        
        // Move the graph along with scroll (parallax effect)
        // Adjust the multiplier to control the speed of movement
        const translateY = progress * notesHeight * 0.5; // 0.5 = 50% of scroll distance
        
        graphContainer.style.transform = `translateY(${translateY}px)`;
      } else if (notesTop >= windowHeight) {
        // Before notes section - reset transform
        graphContainer.style.transform = 'translateY(0px)';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <div ref={notesSectionRef} className="max-w-7xl mx-auto px-6 py-12">
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
                    className="group cursor-pointer border border-slate-900/10 bg-white/40 backdrop-blur-lg shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900/10"
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
              <div ref={graphContainerRef} className="lg:col-span-6 transition-transform duration-75 ease-out">
                <GlobalGraphView
                  isVisible={true}
                  onClose={() => {}}
                  onNodeClick={handleGraphNodeClick}
                  inline={true}
                />
              </div>

              {/* Right Notes Column */}
              <div className="lg:col-span-3 space-y-4">
                {rightPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group cursor-pointer border border-slate-900/10 bg-white/40 backdrop-blur-lg shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900/10"
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
