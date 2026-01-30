import React from 'react';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';

type TimelineEvent = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  date?: string; // ISO date string (YYYY-MM-DD)
};

type TimelineSection = {
  year: string;
  events: TimelineEvent[];
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const sortEventsByDate = (events: TimelineEvent[]): TimelineEvent[] => {
  return [...events].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // Most recent first
  });
};

const timelineSections: TimelineSection[] = [
  {
    year: '2026',
    events: [
      {
        title: 'Join ACECOM',
        description:
          'Description of ACECOM',
        image: '/images/acecom.jpg',
        imageAlt: 'Prototype multimodal AI interface preview',
        date: '2026-01-15',
      },
       
    ],
  },
  {
    year: '2025',
    events: [
      {
        title: 'Prototype assistants for research sprints',
        description:
          'Launched small agent workflows that convert raw papers into structured study plans, speeding up how I explore new ideas.',
        image: '/images/deep.png',
        imageAlt: 'Prototype multimodal AI interface preview',
        date: '2025-03-15',
      },
      {
        title: 'Multimodal physics tutor demo',
        description:
          'Connected vision models with symbolic solvers to walk through many-electron problems and explain each reasoning step.',
        image: '/images/project-external.svg',
        imageAlt: 'Interface mockup highlighting collaborative tutoring flow',
        date: '2025-02-20',
      },
      {
        title: 'Community learning sessions',
        description:
          'Kicked off weekly livestreams to share progress, answer questions, and build an open learning roadmap around advanced AI topics.',
        image: '/images/project-university.svg',
        imageAlt: 'Group of people studying around a large display',
        date: '2025-01-10',
      },
    ],
  },
  {
    year: '2024',
    events: [
      {
        title: 'Graph powered knowledge base',
        description:
          'Rolled out an interactive graph for my notes, letting me cluster concepts and surface context while writing.',
        image: '/images/project-university.svg',
        imageAlt: 'Graph illustration representing connected research notes',
        date: '2024-11-05',
      },
      {
        title: 'Built note-to-video scripts',
        description:
          'Experimented with scripts that transform blog posts into narrated videos, mixing AI voiceovers with rendered diagrams.',
        image: '/images/deep.png',
        imageAlt: 'Storyboard preview for note-driven video script',
        date: '2024-08-22',
      },
      {
        title: 'Monthly research digest',
        description:
          'Started shipping a short email that curates breakthroughs, personal experiments, and upcoming ideas to explore next.',
        image: '/images/project-external.svg',
        imageAlt: 'Newsletter preview with highlighted research headlines',
        date: '2024-06-01',
      },
    ],
  },
  {
    year: '2023',
    events: [
      {
        title: 'Transformers study marathon',
        description:
          'Recreated core transformer blocks from scratch and published long-form writeups to cement intuition.',
        image: '/images/project-external.svg',
        imageAlt: 'Code diagram referencing transformer internals',
        date: '2023-09-18',
      },
      {
        title: 'Hugging Face contributions',
        description:
          'Shared datasets and sample notebooks on Hugging Face to document my experiments and invite feedback.',
        image: '/images/project-university.svg',
        imageAlt: 'Hugging Face themed illustration for community sharing',
        date: '2023-07-12',
      },
      {
        title: 'Local inference pipeline',
        description:
          'Assembled a reproducible setup for running open models locally with custom tooling, enabling faster experimentation loops.',
        image: '/images/deep.png',
        imageAlt: 'Laptop running local inference dashboards',
        date: '2023-04-30',
      },
    ],
  },
  {
    year: '2022',
    events: [
      {
        title: 'Robotics control refresh',
        description:
          'Updated my mecanum wheel robot with better sensor fusion, bridging the gap between hardware and simulation.',
        image: '/images/deep.png',
        imageAlt: 'Hardware schematic representing robotics experimentation',
        date: '2022-10-15',
      },
      {
        title: 'Started personal tooling stack',
        description:
          'Began building the internal tools that now power this blog: markdown workflows, note generators, and visual debuggers.',
        image: '/images/project-external.svg',
        imageAlt: 'Screens showcasing early personal tooling interfaces',
        date: '2022-07-08',
      },
      {
        title: 'Documented PC builds',
        description:
          'Captured every iteration of my desktop builds, linking parts, benchmarks, and lessons learned for future upgrades.',
        image: '/images/project-university.svg',
        imageAlt: 'Custom PC build on a desk with components laid out',
        date: '2022-03-20',
      },
    ],
  },
].map((section) => ({
  ...section,
  events: sortEventsByDate(section.events),
}));

const TimelinePage = () => {
  return (
    <div className="page-shell">
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

      <div className="page-surface pb-32">
        <TopControls title="Timeline" />

        <main className="pt-40 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <header className="text-center space-y-4">
              <span className="section-eyebrow mx-auto">Milestones</span>
              <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 dark:text-white">Learning Timeline</h1>
              <p className="text-base text-slate-600 dark:text-slate-200/80 max-w-2xl mx-auto">
                A snapshot of the projects, experiments, and themes that shaped my learning path so far. Each milestone
                ties back to what you&apos;ll find in the notes and portfolio.
              </p>
            </header>

            <section className="relative">
              <div className="absolute left-4 top-0 bottom-0 hidden sm:block">
                <div className="w-px h-full bg-gradient-to-b from-emerald-300/40 via-emerald-400/30 to-emerald-500/40 dark:from-purple-500/30 dark:via-purple-500/20 dark:to-purple-500/30" />
              </div>

              <div className="space-y-12">
                {timelineSections.map((section) => (
                  <div key={section.year} className="flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-12">
                    <div className="sm:w-32 sm:sticky sm:top-32 sm:self-start">
                      <span className="text-4xl sm:text-5xl font-bold text-foreground/80">{section.year}</span>
                    </div>
                    <div className="flex-1 space-y-6">
                      {section.events.map((event) => (
                        <article
                          key={event.title}
                          className="glass-panel p-6 space-y-4"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{event.title}</h3>
                              {event.date && (
                                <time className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                  {formatDate(event.date)}
                                </time>
                              )}
                            </div>
                            <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">{event.description}</p>
                          </div>
                          <figure className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white/60 shadow-inner dark:border-white/15 dark:bg-white/10">
                            <img
                              src={event.image}
                              alt={event.imageAlt}
                              className="h-36 w-full object-contain"
                              loading="lazy"
                            />
                          </figure>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TimelinePage;
