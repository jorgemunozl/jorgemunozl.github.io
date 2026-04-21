/**
 * Manual changelog for note batches and site changes.
 * Not overwritten by `generate-notes`. Add a new entry when you publish a batch.
 */

export interface SiteUpdate {
  /** ISO date YYYY-MM-DD */
  date: string;
  title?: string;
  body: string;
}

export const siteUpdates: SiteUpdate[] = [
  {
    date: '2026-03-01',
    title: 'March 2026',
    body: 'Upload batch of notes dada.',
  },
];
