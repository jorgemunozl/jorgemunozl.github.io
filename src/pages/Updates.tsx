import React from 'react';
import { Link } from 'react-router-dom';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { siteUpdates } from '@/components/data/siteUpdates';
import { ChevronLeft } from 'lucide-react';

function formatDetailDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const Updates: React.FC = () => {
  const sorted = React.useMemo(
    () => [...siteUpdates].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  return (
    <div className="page-shell">
      <RelativityFieldLines />
      <div className="page-surface pb-32">
        <TopControls title="Updates" />
        <div className="mx-auto max-w-3xl px-6 pb-12 pt-20 sm:pt-24">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-1 text-sm text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-purple-300"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to home
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Updates
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Changelog for note batches and site changes.
          </p>

          <div className="mt-10 space-y-8">
            {sorted.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-400">No updates yet.</p>
            ) : (
              sorted.map((entry, index) => (
                <article key={`${entry.date}-${entry.title ?? ''}-${index}`}>
                  {index > 0 ? <Separator className="mb-8" /> : null}
                  <header className="space-y-1">
                    <time
                      dateTime={entry.date}
                      className="text-sm font-medium text-slate-500 dark:text-slate-400"
                    >
                      {formatDetailDate(entry.date)}
                    </time>
                    {entry.title ? (
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {entry.title}
                      </h2>
                    ) : null}
                  </header>
                  <div className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {entry.body}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Updates;
