import React from 'react';
import { Link } from 'react-router-dom';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';
import { Sparkles, Calendar, FileText, Award, BadgeCheck, ChevronRight, Lightbulb } from 'lucide-react';
import { aboutFacts } from '@/content/aboutFacts';

const AboutPage = () => {
  const destinations = [
    {
      to: '/about/timeline',
      title: 'Timeline',
      description: 'Milestones, academic path, and projects — the full learning timeline.',
      icon: Calendar,
    },
    {
      to: '/about/awards',
      title: 'Awards',
      description: 'Honors and competition results as PDFs — view or download each document.',
      icon: Award,
    },
    {
      to: '/about/certifications',
      title: 'Certifications',
      description: 'Courses and platform certificates — stored as PDFs for easy sharing.',
      icon: BadgeCheck,
    },
  ] as const;

  return (
    <div className="page-shell">
      <RelativityFieldLines />

      <div className="fixed bottom-0 left-1/2 z-0 hidden -translate-x-1/2 translate-y-1/2 transform dark:block">
        <div
          className="h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #030d630c, #47020209, transparent)' }}
        />
      </div>
      <div className="fixed bottom-10 left-1/2 z-0 hidden -translate-x-1/2 transform dark:block">
        <div
          className="h-48 w-48 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, #9900000c, #01039b0c, #b902a005)' }}
        />
      </div>

      <div className="page-surface pb-32">
        <TopControls title="About Me" />

        <main className="pb-24 pt-40">
          <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
            <header className="space-y-4 text-center">
              <span className="section-eyebrow mx-auto inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Curious builder & lifelong learner
              </span>
              <h1 className="text-4xl font-semibold text-slate-900 dark:text-white sm:text-5xl">
                Hey, I&apos;m Jorge Munoz
              </h1>
              <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-200/80">
                I love exploring the intersection of machine learning, physics, and creative coding. This space is where
                I document experiments, share notes, and reflect on the projects that keep me up at night.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-4">
                <a
                  href="/pdfs/jorge-munoz-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center"
                >
                  <div className="absolute -inset-1 animate-gradient-xy rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 opacity-40 blur-lg transition duration-500 group-hover:opacity-100 group-hover:duration-200 dark:from-purple-400 dark:via-pink-400 dark:to-sky-400" />
                  <div className="relative flex items-center gap-2 rounded-lg border-2 border-emerald-500/50 bg-white px-6 py-3 leading-none transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-500 group-hover:shadow-2xl group-hover:shadow-emerald-500/30 dark:border-purple-400/50 dark:bg-slate-900 dark:group-hover:border-purple-400 dark:group-hover:shadow-purple-500/40">
                    <FileText className="h-5 w-5 text-emerald-600 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 dark:text-purple-400" />
                    <span className="font-semibold text-slate-900 transition-colors duration-300 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-purple-400">
                      Download CV
                    </span>
                  </div>
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 sm:max-w-xs sm:text-left">
                  CV opens in a new tab. Timeline, awards, and certifications each have their own page below.
                </p>
              </div>
            </header>

            <section aria-labelledby="about-facts-heading" className="space-y-8">
              <header className="space-y-3 text-center">
                <span className="section-eyebrow mx-auto inline-flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  At a glance
                </span>
                <h2
                  id="about-facts-heading"
                  className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl"
                >
                  Some facts
                </h2>
                <p className="mx-auto max-w-xl text-sm text-slate-600 dark:text-slate-200/80">
                  Tiny snapshots — the kind of things that don&apos;t fit neatly into a CV line.
                </p>
              </header>

              <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
                {aboutFacts.map((fact, index) => (
                  <article
                    key={fact.id}
                    className={`group relative overflow-hidden rounded-3xl border border-slate-600/70 bg-white/70 shadow-md shadow-emerald-500/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-emerald-500/35 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-purple-500/5 dark:hover:border-purple-400/30 dark:hover:shadow-purple-500/15 ${
                      index === 0 ? 'sm:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0' : ''
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        index === 0 ? 'lg:min-h-[220px]' : 'aspect-[16/10] sm:aspect-[5/3]'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-80 dark:from-black/60" />
                      <img
                        src={fact.image}
                        alt={fact.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div
                      className={`flex flex-col justify-center space-y-2 p-6 sm:p-7 ${
                        index === 0 ? 'lg:py-8 lg:pr-8' : ''
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
                        {fact.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200/85">
                        {fact.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="about-sections-heading" className="space-y-6">
              <h2 id="about-sections-heading" className="text-center text-2xl font-semibold text-slate-900 dark:text-white">
                Explore
              </h2>
              <ul className="grid gap-4 sm:grid-cols-1 md:gap-6">
                {destinations.map(({ to, title, description, icon: Icon }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="group relative block overflow-hidden rounded-2xl border border-slate-600/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/15 dark:border-white/10 dark:bg-white/5 dark:hover:border-purple-400/40 dark:hover:shadow-purple-500/20 sm:p-8"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/[0.03] to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-purple-500/0 dark:via-purple-500/[0.05] dark:to-purple-500/0" />
                      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 dark:border-purple-400/30 dark:bg-purple-500/10">
                            <Icon className="h-6 w-6 text-emerald-700 dark:text-purple-300" />
                          </div>
                          <div className="space-y-1 text-left">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-200/80">{description}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-6 w-6 shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-600 dark:group-hover:text-purple-300" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                The same timeline is also available at{' '}
                <Link to="/timeline" className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-300">
                  /timeline
                </Link>
                .
              </p>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
