
import React from 'react';
import Hero from '@/components/Hero';
import BlogPreview from '@/components/BlogPreview';
import PageHeader from '@/components/PageHeader';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-black">
      <PageHeader title="Learning Notes" showHomeButton={false} />
      <Hero />
      <BlogPreview />
    </div>
  );
};

export default Index;
