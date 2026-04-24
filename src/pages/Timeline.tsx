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
        title: 'Academic computing association',
        description:
          'Joined ACECOM (Asociación Científica de Computación). Entry into an organized scientific community. Work shifted toward collective technical initiatives and peer exchange.',
        image: '/images/acecom.jpg',
        imageAlt: 'ACECOM association',
        date: '2026-01-15',
      },
    ],
  },
  {
    year: '2025',
    events: [
      {
        title: 'Research poster presentation',
        description:
          'Presented a poster at a project competition on Neural Wave Functions (Pisformer, DeepMind line of work). First experience formalizing and communicating research ideas publicly. Focus moved toward reproducibility and explanation.',
        image: '/images/uni.jpeg',
        imageAlt: 'Neural Wave Functions poster presentation',
        date: '2025-12-15',
      },
      {
        title: 'Independent research group',
        description:
          'Joined NONHUMAN as a Deep Learning Researcher. Daily activity centered on experiments, model behavior, and iteration. Research became a primary mode of work.',
        image: '/images/nonhuman_2.jpg',
        imageAlt: 'NONHUMAN research group',
        date: '2025-11-01',
      },
      {
        title: 'External administrative constraint',
        description:
          'United States visa application denied. Academic trajectory redirected toward local and remote paths. Increased emphasis on autonomy and long-term planning.',
        image: '/images/uni.jpeg',
        imageAlt: 'Academic redirection',
        date: '2025-10-15',
      },
      {
        title: 'Industry-oriented technical training',
        description:
          'Internship at PyMut on Deep Learning fundamentals. Acquired practical understanding of neural networks, training loops, and tooling.',
        image: '/images/pymut.png',
        imageAlt: 'PyMut internship',
        date: '2025-01-20',
      },
    ],
  },
  {
    year: '2024',
    events: [
      {
        title: 'Public university admission exam',
        description:
          'Entered National University of Engineering (UNI), Physics program. Ranked first in national admission for the faculty. Consolidation of academic focus on physics, mathematics, and theoretical foundations.',
        image: '/images/uni.jpeg',
        imageAlt: 'UNI Physics program admission',
        date: '2024-02-15',
      },
    ],
  },
  {
    year: '2023',
    events: [
      {
        title: 'Engineering program enrollment',
        description:
          'Entered UNSMN as a Telecommunications Engineering student. Exposure to signals, communication systems, and network-oriented thinking.',
        image: '/images/unsm.png',
        imageAlt: 'UNSMN Telecommunications Engineering',
        date: '2023-12-01',
      },
      {
        title: 'Interdisciplinary engineering curriculum',
        description:
          'Entered UTEC as a Mechatronics Engineering student. Completed capstone project using omnidirectional wheels. Initial contact with system-level thinking across mechanical, electrical, and computational domains. Integration of mechanics, control, and system implementation in a working prototype.',
        image: '/images/utec.png',
        imageAlt: 'UTEC Mechatronics program and capstone project',
        date: '2023-03-15',
      },
    ],
  },
  {
    year: '2022',
    events: [
      {
        title: 'First university enrollment',
        description:
          'Entered National University of the Center of Peru. Transition from secondary education to formal higher education.',
        image: '/images/uncp.jpg',
        imageAlt: 'UNCP enrollment',
        date: '2022-12-01',
      },
      {
        title: 'Academic selection program',
        description:
          'Selected for an advanced high school group. Early orientation toward structured learning and problem-focused study.',
        image: '/images/ingeneria_college.jpg',
        imageAlt: 'Advanced high school program',
        date: '2022-03-15',
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
                          <figure className="overflow-hidden rounded-2xl border border-slate-600 bg-white/60 shadow-inner dark:border-white/15 dark:bg-white/10">
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
