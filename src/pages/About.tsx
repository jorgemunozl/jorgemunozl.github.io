import React from 'react';
import { Link } from 'react-router-dom';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, MapPin, Sparkles, Calendar, FileText } from 'lucide-react';

const AboutPage = () => {
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
                <Button
                  asChild
                  variant="outline"
                >
                  <a href="/pdfs/jorge-munoz-cv.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    CV
                  </a>
                </Button>
              </div>
            </header>

            <section className="grid gap-8 md:grid-cols-[2fr,1fr]">
              <article className="glass-panel p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">My History</h2>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Young Life, curiosity</h3>
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

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Confussions</h3>
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

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Convergence</h3>
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
              </article>

              <aside className="glass-panel space-y-6 p-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick facts</h3>
                  <ul className="mt-3 space-y-3 text-slate-600 dark:text-slate-200/80">
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
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Let&apos;s connect</h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Button asChild variant="outline" className="gap-2">
                      <a href="mailto:alvaro18ml@gmail.com">
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="gap-2">
                      <a href="https://github.com/jorgemunozl" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="gap-2">
                      <a href="https://www.linkedin.com/in/jorgemunozlar/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </aside>
            </section>

            <section className="glass-panel p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">How I got here</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed dark:text-slate-200/80">
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
