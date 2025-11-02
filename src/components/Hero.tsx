import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Twitter, Github, Briefcase, BookOpen, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
  const contactLinks = [
    { href: 'mailto:alvaro18ml@gmail.com', title: 'Email', icon: Mail },
    { href: 'https://www.linkedin.com/in/jorgemunozlar/', title: 'LinkedIn', icon: Linkedin },
    { href: 'https://x.com/jorgemunozla', title: 'X (Twitter)', icon: Twitter },
    { href: 'https://github.com/jorgemunozl', title: 'GitHub', icon: Github },
    { href: 'https://huggingface.co/jorgemunozl', title: 'Hugging Face', icon: Globe },
  ];

  const highlights = [
    {
      eyebrow: 'Learning in public',
      description: 'Long-form notes on AI research, scientific computing, and engineering craft.',
    },
    {
      eyebrow: 'Building things that scale',
      description: 'From GPUs and model tooling to infrastructure for ambitious teams.',
    },
    {
      eyebrow: 'Community first',
      description: 'Collaborating with researchers, builders, and founders across the globe.',
    },
  ];

  return (
    <section className="relative py-0 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-transparent via-black/5 to-transparent dark:from-transparent dark:via-white/5 dark:to-transparent" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white/80">
          Learning in public since 2020
        </Badge>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-slate-900 dark:text-white">
          Curiosity-fueled notes on{' '}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 bg-clip-text font-semibold text-transparent dark:from-purple-300 dark:via-pink-300 dark:to-sky-300">
            AI, physics, and engineering craft
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-200/80 max-w-3xl mx-auto">
          I'm Jorge Muñoz — building tools, exploring research, and documenting the messy process along the way. Expect real experiments, lessons learned, and plenty of typos that prove a human is still behind the keyboard.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Button
            asChild
            className="h-12 rounded-full px-6 text-base font-medium shadow-sm shadow-emerald-500/20 transition hover:shadow-emerald-500/30 dark:shadow-purple-500/30 dark:hover:shadow-purple-500/40"
          >
            <Link to="/portfolio">
              <Briefcase className="mr-2 h-5 w-5" />
              View Portfolio
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-12 rounded-full border border-slate-800/15 px-6 text-base font-medium text-slate-900 transition hover:border-slate-800/30 hover:bg-slate-900/5 dark:border-purple-400/30 dark:text-purple-100 dark:hover:border-purple-300/50 dark:hover:bg-purple-500/10"
          >
            <Link to="/notes">
              <BookOpen className="mr-2 h-5 w-5" />
              Read Notes
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="h-12 rounded-full px-6 text-base font-medium text-slate-600 hover:text-slate-900 dark:text-purple-200 dark:hover:text-white"
          >
            <Link to="/about">
              <User className="mr-2 h-5 w-5" />
              About Me
            </Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-slate-900/10 bg-white/80 px-6 py-3 text-slate-600 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/70">
            {contactLinks.map(({ href, title, icon: Icon }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="transition-colors hover:text-slate-900 dark:hover:text-purple-200"
                title={title}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.eyebrow}
              className="rounded-2xl border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/15 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-purple-500/20"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-purple-200/70">
                {item.eyebrow}
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-100">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
