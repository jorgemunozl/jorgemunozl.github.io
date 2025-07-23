
import React from 'react';
import Hero from '@/components/Hero';
import BlogPreview from '@/components/BlogPreview';
import PageHeader from '@/components/PageHeader';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #000000, #161027, #270000)'}}>
      {/* Lightbulb glow effect - fixed to viewport bottom */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0">
        <div className="w-96 h-96 rounded-full blur-3xl" style={{background: 'radial-gradient(circle, #030d630c, #47020209, transparent)'}}></div>
      </div>
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-0">
        <div className="w-48 h-48 rounded-full blur-2xl" style={{background: 'radial-gradient(circle, #9900000c, #01039b0c, #b902a005)'}}></div>
      </div>
      
      <div className="relative z-10">
        <PageHeader title="Thoughts!" showHomeButton={false} />
        <Hero />
        <BlogPreview />
      </div>
    </div>
  );
};

export default Index;
