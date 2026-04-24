import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { siteUpdates } from '@/components/data/siteUpdates';
import { cn } from '@/lib/utils';

function formatUpdateDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

interface SiteUpdatesPanelProps {
  className?: string;
}

const SiteUpdatesPanel: React.FC<SiteUpdatesPanelProps> = ({ className }) => {
  const sorted = React.useMemo(
    () => [...siteUpdates].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  return (
    <Link
      to="/updates"
      className={cn(
        'block w-full max-w-sm rounded-lg border border-dashed border-slate-600 bg-slate-50/70 px-3 py-2.5 text-left shadow-sm transition-colors hover:border-slate-700 hover:bg-slate-100/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-slate-500/40 dark:bg-slate-950/50 dark:hover:border-slate-500/70 dark:hover:bg-slate-900/60 dark:focus-visible:ring-purple-400/40 sm:max-w-md',
        className
      )}
      aria-label="View full site updates"
    >
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        Updates
      </p>
      <ScrollArea className="max-h-24 pr-2">
        <div>
          {sorted.length === 0 ? (
            <p className="text-[11px] leading-snug text-slate-500 dark:text-slate-500">
              No updates yet.
            </p>
          ) : (
            <ul className="flex flex-col gap-0">
              {sorted.map((entry, index) => (
                <li key={`${entry.date}-${entry.title ?? ''}-${index}`}>
                  {index > 0 ? (
                    <Separator className="my-2 bg-slate-300/60 dark:bg-slate-600/60" />
                  ) : null}
                  <div className="space-y-0.5">
                    <p className="text-[10px] tabular-nums text-slate-500 dark:text-slate-500">
                      {formatUpdateDate(entry.date)}
                    </p>
                    {entry.title ? (
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                        {entry.title}
                      </p>
                    ) : null}
                    <p className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                      {entry.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>
    </Link>
  );
};

export default SiteUpdatesPanel;
