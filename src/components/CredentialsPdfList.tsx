import React from 'react';
import { ExternalLink, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CredentialPdf } from '@/content/credentials';

type CredentialsPdfListProps = {
  items: CredentialPdf[];
  emptyHeading: string;
  emptyBody: string;
};

const filenameFromUrl = (url: string): string => {
  try {
    const base = url.split('/').pop() ?? 'document.pdf';
    return base.includes('.') ? base : `${base}.pdf`;
  } catch {
    return 'document.pdf';
  }
};

const CredentialsPdfList: React.FC<CredentialsPdfListProps> = ({ items, emptyHeading, emptyBody }) => {
  if (items.length === 0) {
    return (
      <div className="glass-panel mx-auto max-w-2xl p-8 text-center space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{emptyHeading}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-200/80 leading-relaxed">{emptyBody}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Put files in <code className="rounded bg-slate-200/80 px-1.5 py-0.5 dark:bg-white/10">public/pdfs/</code>, then
          add entries in{' '}
          <code className="rounded bg-slate-200/80 px-1.5 py-0.5 dark:bg-white/10">src/content/credentials.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <ul className="mx-auto max-w-3xl space-y-4">
      {items.map((item) => (
        <li key={item.id}>
          <article className="glass-panel flex flex-col gap-4 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              {(item.issuer || item.date) && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {item.issuer}
                  {item.issuer && item.date ? ' · ' : ''}
                  {item.date}
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View
                </a>
              </Button>
              <Button size="sm" asChild>
                <a href={item.pdfUrl} download={filenameFromUrl(item.pdfUrl)}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default CredentialsPdfList;
