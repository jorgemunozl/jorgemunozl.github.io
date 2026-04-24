import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

type TimelineEvent = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  date?: string;
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
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

const timelineSections: TimelineSection[] = [
  {
    year: '2026',
    events: [
      {
        title: 'Join ACECOM',
        description: 'Description of ACECOM',
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
        description: 'Launched small agent workflows that convert raw papers into structured study plans, speeding up how I explore new ideas.',
        image: '/images/deep.png',
        imageAlt: 'Prototype multimodal AI interface preview',
        date: '2025-03-15',
      },
      {
        title: 'Multimodal physics tutor demo',
        description: 'Connected vision models with symbolic solvers to walk through many-electron problems and explain each reasoning step.',
        image: '/images/project-external.svg',
        imageAlt: 'Interface mockup highlighting collaborative tutoring flow',
        date: '2025-02-20',
      },
      {
        title: 'Community learning sessions',
        description: 'Kicked off weekly livestreams to share progress, answer questions, and build an open learning roadmap around advanced AI topics.',
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
        description: 'Rolled out an interactive graph for my notes, letting me cluster concepts and surface context while writing.',
        image: '/images/project-university.svg',
        imageAlt: 'Graph illustration representing connected research notes',
        date: '2024-11-05',
      },
      {
        title: 'Built note-to-video scripts',
        description: 'Experimented with scripts that transform blog posts into narrated videos, mixing AI voiceovers with rendered diagrams.',
        image: '/images/deep.png',
        imageAlt: 'Storyboard preview for note-driven video script',
        date: '2024-08-22',
      },
      {
        title: 'Monthly research digest',
        description: 'Started shipping a short email that curates breakthroughs, personal experiments, and upcoming ideas to explore next.',
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
        description: 'Recreated core transformer blocks from scratch and published long-form writeups to cement intuition.',
        image: '/images/project-external.svg',
        imageAlt: 'Code diagram referencing transformer internals',
        date: '2023-09-18',
      },
      {
        title: 'Hugging Face contributions',
        description: 'Shared datasets and sample notebooks on Hugging Face to document my experiments and invite feedback.',
        image: '/images/project-university.svg',
        imageAlt: 'Hugging Face themed illustration for community sharing',
        date: '2023-07-12',
      },
      {
        title: 'Local inference pipeline',
        description: 'Assembled a reproducible setup for running open models locally with custom tooling, enabling faster experimentation loops.',
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
        description: 'Updated my mecanum wheel robot with better sensor fusion, bridging the gap between hardware and simulation.',
        image: '/images/deep.png',
        imageAlt: 'Hardware schematic representing robotics experimentation',
        date: '2022-10-15',
      },
      {
        title: 'Started personal tooling stack',
        description: 'Began building the internal tools that now power this blog: markdown workflows, note generators, and visual debuggers.',
        image: '/images/project-external.svg',
        imageAlt: 'Screens showcasing early personal tooling interfaces',
        date: '2022-07-08',
      },
      {
        title: 'Documented PC builds',
        description: 'Captured every iteration of my desktop builds, linking parts, benchmarks, and lessons learned for future upgrades.',
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

const AboutPage = () => {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((index: number) => {
    if (sectionRefs[index].current && scrollContainerRef.current) {
      sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveIndex(index);
    }
  }, []);

  const handlePrevious = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : 2;
    scrollToSection(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < 2 ? activeIndex + 1 : 0;
    scrollToSection(newIndex);
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const observers = sectionRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(index));
              // Update active index when section is prominently visible
              if (entry.intersectionRatio > 0.5) {
                setActiveIndex(index);
              }
            }
          });
        },
        { 
          threshold: [0.1, 0.5], 
          rootMargin: '0px -20% 0px -20%',
          root: scrollContainerRef.current
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const newIndex = activeIndex > 0 ? activeIndex - 1 : 2;
        scrollToSection(newIndex);
      } else if (e.key === 'ArrowRight') {
        const newIndex = activeIndex < 2 ? activeIndex + 1 : 0;
        scrollToSection(newIndex);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [activeIndex, scrollToSection]);
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
        <TopControls title="About Me" />

        <main className="pt-40 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <header className="text-center space-y-4">
              <span className="section-eyebrow mx-auto inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Curious builder & lifelong learner
              </span>
              <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 dark:text-white">Hey, I&apos;m Jorge Munoz</h1>
              <p className="text-base text-slate-600 dark:text-slate-200/80 max-w-2xl mx-auto">
                I love exploring the intersection of machine learning, physics, and creative coding. This space is
                where I document experiments, share notes, and reflect on the projects that keep me up at night.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
                <Button
                  asChild
                  variant="outline"
                >
                  <Link to="/timeline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Timeline
                  </Link>
                </Button>
                <a 
                  href="/pdfs/jorge-munoz-cv.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative inline-flex items-center justify-center"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 dark:from-purple-400 dark:via-pink-400 dark:to-sky-400 rounded-lg blur-lg opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-gradient-xy"></div>
                  <div className="relative px-6 py-3 bg-white dark:bg-slate-900 rounded-lg leading-none flex items-center gap-2 border-2 border-emerald-500/50 dark:border-purple-400/50 group-hover:border-emerald-500 dark:group-hover:border-purple-400 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-emerald-500/30 dark:group-hover:shadow-purple-500/40">
                    <FileText className="h-5 w-5 text-emerald-600 dark:text-purple-400 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
                    <span className="text-slate-900 dark:text-white font-semibold group-hover:text-emerald-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      Download CV
                    </span>
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 dark:from-purple-500/0 dark:via-purple-500/10 dark:to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </div>
                </a>
              </div>
            </header>
          </div>

          <section className="space-y-6 mt-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">My History</h2>
              <div className="flex gap-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'w-8 bg-emerald-500 dark:bg-purple-400'
                        : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-emerald-400 dark:hover:bg-purple-500'
                    }`}
                    aria-label={`Go to section ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative w-full">
              <button
                onClick={handlePrevious}
                className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 group h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-2 border-emerald-500/30 dark:border-purple-400/30 shadow-xl shadow-emerald-500/20 dark:shadow-purple-500/20 flex items-center justify-center hover:scale-110 hover:bg-emerald-500/10 dark:hover:bg-purple-500/10 hover:border-emerald-500 dark:hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 dark:hover:shadow-purple-500/30"
                aria-label="Previous section"
              >
                <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7 text-emerald-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              </button>
              
              <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth w-full" style={{ scrollPaddingLeft: 'calc(50vw - 350px)', scrollPaddingRight: 'calc(50vw - 350px)' }}>
              <div className="flex gap-8 min-w-max py-4" style={{ paddingLeft: 'calc(50vw - 350px)', paddingRight: 'calc(50vw - 350px)' }}>
              <div
                ref={sectionRefs[0]}
                className={`group relative glass-panel p-6 sm:p-8 lg:p-10 space-y-4 overflow-hidden transition-all duration-500 flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[500px] lg:w-[700px] snap-center ${
                    activeIndex === 0
                      ? 'opacity-100 ring-2 ring-emerald-500/50 dark:ring-purple-400/50 scale-[1.01]'
                      : 'opacity-30 scale-95'
                  } hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-purple-500/30`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 dark:from-purple-500/0 dark:via-purple-500/5 dark:to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white transition-all duration-300 group-hover:text-emerald-600 group-hover:scale-105 dark:group-hover:text-purple-400 transform origin-left">
                      Young Life, curiosity
                    </h3>
                  <div className="space-y-3">
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      As a child, I was quiet and antisocial, but curious. Technology and science felt more real to me than most social spaces, so I spent a lot of time exploring them on my own.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      During the pandemic, I began making youtube videos. I enjoyed the process, but reality pushed back hard: my laptop was barely usable. Rendering videos with Vegas felt like torture—the machine overheated constantly, crashed often, and made every small task painfully slow.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      Eventually, frustration turned into a decision: I would build my own PC. So I started understanding everything about how hardware works  So I started reading everything—what each component does, how they talk to each other, and how you actually assemble a computer without killing yourself.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      Of course, that was expensive. So I worked. I painted houses, carried sand, did physical labor. Piece by piece, over nearly a year, I bought the components. The GPU was a humble GT 730, second hand (20 dollars and the keyboard around 10 dollar, after five years they still works!), but it felt like a treasure.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      When I finally had everything, I built the PC myself. Somehow, it turned on on the first try. Then I made a very dumb mistake: I forgot to install the bootloader. I thought the hardware was dead. I panicked. I cried. Later I realized the error, fixed it, and felt something click.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      That computer was more than a PC. It was the first time I really understood that with enough curiosity, stubbornness, and learning, you can build working things out of almost nothing.
                    </p>
                  </div>
                  </div>
                </div>

              <div
                ref={sectionRefs[1]}
                className={`group relative glass-panel p-6 sm:p-8 lg:p-10 space-y-4 overflow-hidden transition-all duration-500 delay-100 flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[500px] lg:w-[700px] snap-center ${
                    activeIndex === 1
                      ? 'opacity-100 ring-2 ring-emerald-500/50 dark:ring-purple-400/50 scale-[1.01]'
                      : 'opacity-30 scale-95'
                  } hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-purple-500/30`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 dark:from-purple-500/0 dark:via-purple-500/5 dark:to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white transition-all duration-300 group-hover:text-emerald-600 group-hover:scale-105 dark:group-hover:text-purple-400 transform origin-left">
                      Confussions
                    </h3>
                  <div className="space-y-3">
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      Soon after, I was finishing school. Around fourth year I started taking entrance exams seriously. I joined a small, selected group at my school where the only goal was getting into university. That made my last school year, 2022, intense but enjoyable. It felt focused, almost clean.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      I entered several universities without much trouble, but socially nothing really changed. I spent most days in libraries. I eventually joined <strong>UTEC</strong>, studying <strong>Mechatronic Engineering</strong>.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      UTEC didn't click. I was frustrated by the lack of mathematical depth and by an environment that didn't really push hard intellectually. Around that time I watched Veritasium's video on quantum computing, and it completely rewired my brain. That video mattered. It made me realize what kind of science I actually wanted to be close to.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      Leaving UTEC wasn't easy, but I did it. With some pain, I decided to try again for <strong>UNI</strong>, which meant another year of entrance exams. That was basically my 2023.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      As a backup, I also entered <strong>San Marcos</strong>. In the end, I got into <strong>UNI</strong>, ranked first, so the choice was clear. I enrolled in <strong>Engineering Physics</strong>.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      At UNI, the first year was pure obsession. Mathematics and theory took over my life. I discovered <em>3Blue1Brown</em>, which connected me with neural networks, and I found myself reading Michael Nielsen's book after physics classes. Deep Learning was amazing. That was 2024.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      During the summer, I began studying large language models and reading modern papers. I worked with PyTorch and built a small project using LangGraph for a Vision–Language Model. By mid-2025, during vacation, I was honestly confused. I seriously considered leaving physics for computer science.
                    </p>
                  </div>
                  </div>
                </div>

              <div
                ref={sectionRefs[2]}
                className={`group relative glass-panel p-6 sm:p-8 lg:p-10 space-y-4 overflow-hidden transition-all duration-500 delay-200 flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[500px] lg:w-[700px] snap-center ${
                    activeIndex === 2
                      ? 'opacity-100 ring-2 ring-emerald-500/50 dark:ring-purple-400/50 scale-[1.01]'
                      : 'opacity-30 scale-95'
                  } hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-purple-500/30`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 dark:from-purple-500/0 dark:via-purple-500/5 dark:to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white transition-all duration-300 group-hover:text-emerald-600 group-hover:scale-105 dark:group-hover:text-purple-400 transform origin-left">
                      Convergence
                    </h3>
                  <div className="space-y-3">
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      Then I discovered <strong>Physics-Informed Neural Networks (PINNs)</strong>.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      That was the turning point. For the first time, I saw that there were people working right at the intersection of physics and computation—exactly where I wanted to be. Physics didn't have to fight machine learning. It could <em>merge</em> with it, naturally, almost inevitably.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      From there, things started to align. I built small projects and eventually completed my capstone by reverse-engineering a DeepMind paper. It was hard, slow, and messy—but it finally felt coherent.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      By the end of 2025, something interesting happened. I joined a group working on <strong>Physical AI</strong>. I already knew about LLMs and VLMs, and now the focus shifted to <strong>VLAs</strong>, doing real things with real constraints and real budgets. That shift mattered. It made the work feel concrete.
                    </p>
                    <p className="text-slate-600 leading-relaxed dark:text-slate-200/80">
                      Looking back, the contrast is striking. In 2023, I was completely lost. Now, the path feels clear. Not easy—but clear. So get excited.
                    </p>
                  </div>
                  </div>
                </div>
              </div>
              </div>
              
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 group h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-2 border-emerald-500/30 dark:border-purple-400/30 shadow-xl shadow-emerald-500/20 dark:shadow-purple-500/20 flex items-center justify-center hover:scale-110 hover:bg-emerald-500/10 dark:hover:bg-purple-500/10 hover:border-emerald-500 dark:hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 dark:hover:shadow-purple-500/30"
                aria-label="Next section"
              >
                <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7 text-emerald-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </section>

          <section className="relative mt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <header className="text-center space-y-4">
                <span className="section-eyebrow mx-auto">Milestones</span>
                <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">Learning Timeline</h2>
                <p className="text-base text-slate-600 dark:text-slate-200/80 max-w-2xl mx-auto">
                  A snapshot of the projects, experiments, and themes that shaped my learning path so far.
                </p>
              </header>

              <div className="relative">
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
                            className="glass-panel p-6 space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
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
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
