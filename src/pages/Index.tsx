
import React from 'react';
import Hero from '@/components/Hero';
import BlogPreview from '@/components/BlogPreview';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';

const highlights = [
  {
    eyebrow: 'Learning in public',
    description: 'Long-form notes on AI research, scientific computing, and engineering craft.',
  },
  {
    eyebrow: 'Building things that scale',
    description: 'From GPUs and model tooling to infrastructure for ambitious teams.',
  },
  {
    eyebrow: 'Community first',
    description: 'Collaborating with researchers, builders, and founders across the globe.',
  },
];

const Index = () => {
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
          <BlogPreview />
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid gap-4 text-left sm:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.eyebrow}
                    className="rounded-2xl border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/15 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-purple-500/20"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-purple-200/70">
                      {item.eyebrow}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-100">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
