
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import BlogPreview from '@/components/BlogPreview';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import GlobalGraphView from '@/components/GlobalGraphView';
import { normalizeTitle } from '@/utils/wikiLinks';
import { blogPosts } from '@/components/data/notes';

const Index = () => {
  const navigate = useNavigate();
  
  // Handler for graph node clicks
  const handleGraphNodeClick = (nodeId: string) => {
    const targetNorm = normalizeTitle(nodeId);
    const matchingPost = blogPosts.find(post => normalizeTitle(post.title) === targetNorm);
    if (matchingPost) {
      navigate(`/notes/${matchingPost.id}`);
    }
  };

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
          
          {/* Centered Graph Section */}
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
              Knowledge Graph
            </h2>
            <div className="flex justify-center items-center">
              <GlobalGraphView
                isVisible={true}
                onClose={() => {}}
                onNodeClick={handleGraphNodeClick}
                inline={true}
              />
            </div>
          </div>
          
          <BlogPreview />
        </div>
      </div>
    </div>
  );
};

export default Index;
