import React from 'react';
import { Link } from 'react-router-dom';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, MapPin, Sparkles, Calendar, FileText } from 'lucide-react';

const AboutPage = () => {
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
        <TopControls title="About Me" />

        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <header className="text-center space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/40 bg-emerald-100/30 px-4 py-1 text-sm font-medium text-emerald-900 dark:border-purple-500/30 dark:bg-purple-900/30 dark:text-purple-200">
                <Sparkles className="h-4 w-4" />
                Curious builder & lifelong learner
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Hey, I&apos;m Jorge Munoz</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I love exploring the intersection of machine learning, physics, and creative coding. This space is
                where I document experiments, share notes, and reflect on the projects that keep me up at night.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
                <Button
                  asChild
                  variant="outline"
                  className="border-black text-black hover:bg-black/10 hover:text-black hover:border-black dark:border-purple-800 dark:text-purple-200 dark:hover:bg-purple-950 dark:hover:text-purple-100"
                >
                  <Link to="/timeline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Timeline
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-black text-black hover:bg-black/10 hover:text-black hover:border-black dark:border-purple-800 dark:text-purple-200 dark:hover:bg-purple-950 dark:hover:text-purple-100"
                >
                  <a href="/pdfs/jorge-munoz-cv.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    CV
                  </a>
                </Button>
              </div>
            </header>

            <section className="grid gap-8 md:grid-cols-[2fr,1fr]">
              <article className="rounded-3xl border border-border/50 bg-card/70 p-8 shadow-lg shadow-emerald-900/5 backdrop-blur">
                <h2 className="text-2xl font-semibold text-foreground mb-4">What I&apos;m focused on</h2>
                <p className="text-muted-foreground leading-relaxed">
                  I'm currently building learning systems that help me reason about complex topics faster--think
                  transformers for physics problems, visual tools for understanding research papers, and mini-agents
                  that automate my study routines. I believe the best way to learn is by making things, so everything
                  here is the result of scratching a real itch.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Outside the keyboard, I enjoy exploring Lima, tinkering with hardware, and finding good coffee spots
                  to turn ideas into experiments. My long-term goal is to add a playful, human touch to how we interact
                  with AI systems.
                </p>
              </article>

              <aside className="rounded-3xl border border-border/50 bg-card/70 p-8 shadow-lg shadow-emerald-900/5 backdrop-blur space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Quick facts</h3>
                  <ul className="mt-3 space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600 dark:text-purple-400" />
                      Based in Lima, Peru
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-600 dark:text-purple-400" />
                      Currently diving deep into multimodal AI and tooling
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground">Let&apos;s connect</h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Button asChild variant="secondary" className="gap-2">
                      <a href="mailto:alvaro18ml@gmail.com">
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                    </Button>
                    <Button asChild variant="secondary" className="gap-2">
                      <a href="https://github.com/jorgemunozl" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button asChild variant="secondary" className="gap-2">
                      <a href="https://www.linkedin.com/in/jorgemunozlar/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </aside>
            </section>

            <section className="rounded-3xl border border-border/50 bg-card/70 p-8 shadow-lg shadow-emerald-900/5 backdrop-blur">
              <h2 className="text-2xl font-semibold text-foreground mb-6">How I got here</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  My journey started with building scrappy hardware projects and documenting the lessons in Spanish
                  notebooks. Over time that curiosity spilled into software, and eventually into machine learning. The
                  blog became a way to keep myself honest: if I can teach it, I probably understand it.
                </p>
                <p>
                  Today I split my time between prototyping visualizations for complex systems, contributing to open
                  source, and exploring how agents can augment human problem-solving. Every article, repo, and sketch on
                  this site is part of that ongoing exploration.
                </p>
                <p>
                  If you&apos;re into the same things--or just want to say hi--feel free to reach out. I&apos;m always up
                  for swapping notes and ideas.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
