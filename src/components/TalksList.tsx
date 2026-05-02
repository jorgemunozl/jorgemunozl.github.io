import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { TalkEntry } from '@/content/talks';

type TalksListProps = {
  items: TalkEntry[];
  emptyHeading: string;
  emptyBody: string;
};

const TalksList: React.FC<TalksListProps> = ({ items, emptyHeading, emptyBody }) => {
  if (items.length === 0) {
    return (
      <div className="glass-panel mx-auto max-w-2xl space-y-4 p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{emptyHeading}</h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200/80">{emptyBody}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Add entries in{' '}
          <code className="rounded bg-slate-200/80 px-1.5 py-0.5 dark:bg-white/10">src/content/talks.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <ul className="mx-auto max-w-3xl space-y-4">
      {items.map((item) => {
        const metaParts = [item.date, item.venue, item.location].filter(Boolean);
        const metaLine = metaParts.join(' · ');

        return (
          <li key={item.id}>
            <article className="glass-panel flex flex-col gap-4 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                {metaLine ? (
                  <p className="text-sm text-slate-600 dark:text-slate-300">{metaLine}</p>
                ) : null}
                {item.description ? (
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200/80">{item.description}</p>
                ) : null}
              </div>
              {item.url ? (
                <div className="flex shrink-0 flex-wrap gap-2 sm:pt-0.5">
                  <Button variant="outline" size="sm" asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Link
                    </a>
                  </Button>
                </div>
              ) : null}
            </article>
          </li>
        );
      })}
    </ul>
  );
};

export default TalksList;
