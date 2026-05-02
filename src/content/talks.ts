/**
 * Talks and lectures shown on /about/talks.
 * Add entries here as engagements are scheduled; optional url can point to an event page or slides.
 */
export type TalkEntry = {
  id: string;
  title: string;
  /** Display string, e.g. "June 2026" or "15 Jun 2026" */
  date?: string;
  venue?: string;
  location?: string;
  description?: string;
  url?: string;
};

export const talks: TalkEntry[] = [];
