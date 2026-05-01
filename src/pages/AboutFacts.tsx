import React from 'react';
import { Link } from 'react-router-dom';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';
import AboutFactsSection from '@/components/AboutFactsSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AboutFactsPage = () => {
  return (
    <div className="page-shell">
      <RelativityFieldLines />

      <div className="fixed bottom-0 left-1/2 z-0 hidden -translate-x-1/2 translate-y-1/2 transform dark:block">
        <div
          className="h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #030d630c, #47020209, transparent)' }}
        />
      </div>
      <div className="fixed bottom-10 left-1/2 z-0 hidden -translate-x-1/2 transform dark:block">
        <div
          className="h-48 w-48 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, #9900000c, #01039b0c, #b902a005)' }}
        />
      </div>

      <div className="page-surface pb-32">
        <TopControls title="Some facts" />

        <main className="pb-24 pt-40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="ghost" size="sm" className="w-fit gap-2 text-slate-600 dark:text-slate-300" asChild>
                <Link to="/about">
                  <ArrowLeft className="h-4 w-4" />
                  Back to About
                </Link>
              </Button>
            </div>

            <AboutFactsSection />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AboutFactsPage;
