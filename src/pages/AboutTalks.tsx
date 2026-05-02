import React from 'react';
import { Link } from 'react-router-dom';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';
import TalksList from '@/components/TalksList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mic } from 'lucide-react';
import { talks } from '@/content/talks';

const AboutTalksPage = () => {
  return (
    <div className="page-shell">
      <RelativityFieldLines />

      {/* Simplified background glow - no blur for better performance */}
      <div className="fixed bottom-0 left-1/2 z-0 hidden -translate-x-1/2 translate-y-1/2 transform opacity-40 dark:block">
        <div
          className="h-96 w-96 rounded-full"
          style={{ background: 'radial-gradient(circle, #030d6315, #47020210, transparent)' }}
        />
      </div>
      <div className="fixed bottom-10 left-1/2 z-0 hidden -translate-x-1/2 transform opacity-40 dark:block">
        <div
          className="h-48 w-48 rounded-full"
          style={{ background: 'radial-gradient(circle, #99000012, #01039b12, #b902a010)' }}
        />
      </div>

      <div className="page-surface pb-32">
        <TopControls title="Talks & lectures" />

        <main className="pb-24 pt-40">
          <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="ghost" size="sm" className="w-fit gap-2 text-slate-600 dark:text-slate-300" asChild>
                <Link to="/about">
                  <ArrowLeft className="h-4 w-4" />
                  Back to About
                </Link>
              </Button>
            </div>

            <header className="space-y-4 text-center">
              <span className="section-eyebrow mx-auto inline-flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Speaking
              </span>
              <h1 className="text-4xl font-semibold text-slate-900 dark:text-white sm:text-5xl">Talks & lectures</h1>
              <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-200/80">
                Upcoming and past appearances — titles, venues, and links when available.
              </p>
            </header>

            <TalksList
              items={talks}
              emptyHeading="No talks listed yet"
              emptyBody="When you schedule a lecture or talk, add it to the list and it will show up here."
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AboutTalksPage;
