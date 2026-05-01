import React from 'react';
import { Lightbulb } from 'lucide-react';
import { aboutFacts } from '@/content/aboutFacts';

/**
 * Full “Some facts” content — used on `/about/facts` (and safe to embed elsewhere).
 */
const AboutFactsSection = () => {
  return (
    <section
      id="about-facts"
      aria-labelledby="about-facts-heading"
      className="relative scroll-mt-28"
    >
      {/* Soft section wash behind the card (full-width feel on the About page) */}
      <div
        className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-[2.25rem] bg-gradient-to-b from-emerald-500/[0.07] via-teal-500/[0.04] to-transparent dark:from-purple-500/15 dark:via-fuchsia-500/5 dark:to-sky-500/10 sm:-inset-x-6 md:-inset-x-8"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-slate-600/35 bg-gradient-to-br from-white/75 via-white/55 to-emerald-50/40 px-5 py-10 shadow-lg shadow-emerald-500/[0.07] ring-1 ring-white/60 backdrop-blur-md dark:border-white/12 dark:from-slate-950/80 dark:via-slate-900/70 dark:to-purple-950/50 dark:shadow-purple-500/10 dark:ring-white/[0.06] md:px-9 md:py-12">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl dark:bg-purple-500/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-teal-400/15 blur-3xl dark:bg-sky-500/20"
          aria-hidden
        />

        <header className="relative space-y-3 text-center">
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

        <div className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-6">
          {aboutFacts.map((fact, index) => (
            <article
              key={fact.id}
              className={`group relative overflow-hidden rounded-2xl border border-slate-600/50 bg-white/65 shadow-md shadow-slate-900/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-white/[0.07] dark:shadow-black/20 dark:hover:border-purple-400/35 dark:hover:shadow-purple-500/15 ${
                index === 0 ? 'sm:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0' : ''
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? 'lg:min-h-[220px]' : 'aspect-[16/10] sm:aspect-[5/3]'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90 dark:from-black/65" />
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
      </div>
    </section>
  );
};

export default AboutFactsSection;
