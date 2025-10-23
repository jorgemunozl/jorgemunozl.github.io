
import React from 'react';
import Hero from '@/components/Hero';
import BlogPreview from '@/components/BlogPreview';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background gradient-bg">
      {/* Relativity field lines background */}
      <RelativityFieldLines />
      
      {/* Lightbulb glow effect - fixed to viewport bottom (dark mode only) */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0 hidden dark:block">
        <div className="w-96 h-96 rounded-full blur-3xl" style={{background: 'radial-gradient(circle, #030d630c, #47020209, transparent)'}}></div>
      </div>
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-0 hidden dark:block">
        <div className="w-48 h-48 rounded-full blur-2xl" style={{background: 'radial-gradient(circle, #9900000c, #01039b0c, #b902a005)'}}></div>
      </div>
      
      <div className="relative z-10">
        <TopControls />
        <div className="pt-20">
          <Hero />
          <BlogPreview />
        </div>
      </div>
    </div>
  );
};

export default Index;
