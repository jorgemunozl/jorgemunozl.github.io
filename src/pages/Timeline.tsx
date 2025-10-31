import React from 'react';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';

const timelineSections = [
  {
    year: '2025',
    events: [
      {
        title: 'Prototype assistants for research sprints',
        description:
          'Launched small agent workflows that convert raw papers into structured study plans, speeding up how I explore new ideas.',
        image: '/images/deep.png',
        imageAlt: 'Prototype multimodal AI interface preview',
      },
      {
        title: 'Multimodal physics tutor demo',
        description:
          'Connected vision models with symbolic solvers to walk through many-electron problems and explain each reasoning step.',
        image: '/images/project-external.svg',
        imageAlt: 'Interface mockup highlighting collaborative tutoring flow',
      },
      {
        title: 'Community learning sessions',
        description:
          'Kicked off weekly livestreams to share progress, answer questions, and build an open learning roadmap around advanced AI topics.',
        image: '/images/project-university.svg',
        imageAlt: 'Group of people studying around a large display',
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
      },
      {
        title: 'Built note-to-video scripts',
        description:
          'Experimented with scripts that transform blog posts into narrated videos, mixing AI voiceovers with rendered diagrams.',
        image: '/images/deep.png',
        imageAlt: 'Storyboard preview for note-driven video script',
      },
      {
        title: 'Monthly research digest',
        description:
          'Started shipping a short email that curates breakthroughs, personal experiments, and upcoming ideas to explore next.',
        image: '/images/project-external.svg',
        imageAlt: 'Newsletter preview with highlighted research headlines',
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
      },
      {
        title: 'Hugging Face contributions',
        description:
          'Shared datasets and sample notebooks on Hugging Face to document my experiments and invite feedback.',
        image: '/images/project-university.svg',
        imageAlt: 'Hugging Face themed illustration for community sharing',
      },
      {
        title: 'Local inference pipeline',
        description:
          'Assembled a reproducible setup for running open models locally with custom tooling, enabling faster experimentation loops.',
        image: '/images/deep.png',
        imageAlt: 'Laptop running local inference dashboards',
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
      },
      {
        title: 'Started personal tooling stack',
        description:
          'Began building the internal tools that now power this blog: markdown workflows, note generators, and visual debuggers.',
        image: '/images/project-external.svg',
        imageAlt: 'Screens showcasing early personal tooling interfaces',
      },
      {
        title: 'Documented PC builds',
        description:
          'Captured every iteration of my desktop builds, linking parts, benchmarks, and lessons learned for future upgrades.',
        image: '/images/project-university.svg',
        imageAlt: 'Custom PC build on a desk with components laid out',
      },
    ],
  },
];

const TimelinePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background gradient-bg">
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

      <div className="relative z-10 pb-24">
        <TopControls title="Timeline" />

        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <header className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Learning Timeline</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                          className="rounded-2xl border border-border/40 bg-background/60 p-6 space-y-4"
                        >
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                          </div>
                          <figure className="overflow-hidden rounded-2xl border border-border/60 bg-muted/40 shadow-inner">
                            <img
                              src={event.image}
                              alt={event.imageAlt}
                              className="h-36 w-full object-cover"
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
