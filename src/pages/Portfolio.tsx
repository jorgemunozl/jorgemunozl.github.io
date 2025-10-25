import React from 'react';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import PortfolioGrid from '@/components/Portfolio';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background gradient-bg">
      <RelativityFieldLines />

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0 hidden dark:block">
        <div
          className="w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #030d630c, #47020209, transparent)' }}
        ></div>
      </div>
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-0 hidden dark:block">
        <div
          className="w-48 h-48 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, #9900000c, #01039b0c, #b902a005)' }}
        ></div>
      </div>

      <div className="relative z-10 pb-24">
        <TopControls title="Portfolio" />
        <div className="pt-20 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Selected Projects</h1>
            <p className="mt-4 text-muted-foreground">
              A curated list of experiments, products, and long-running notes that capture what I&apos;m
              building. Explore the live demos or dig into the repos.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Manage entries in
              <code className="ml-1 rounded bg-muted px-1 py-0.5">src/components/data/projects.ts</code>.
            </p>
          </div>
          <PortfolioGrid showHeading={false} id="portfolio-grid" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
