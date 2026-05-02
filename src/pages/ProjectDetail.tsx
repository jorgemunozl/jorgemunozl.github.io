import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import TopControls from '@/components/TopControls';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projects } from '@/components/data/projects';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import ProjectHeroMedia from '@/components/ProjectHeroMedia';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="page-shell">
      <RelativityFieldLines />

      <div className="page-surface pb-32">
        <TopControls title="Project Detail" />
        <div className="pt-40 pb-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
            <div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/portfolio" className="inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to portfolio
                </Link>
              </Button>
            </div>

            <Card>
              <CardContent className="space-y-10 p-8 md:p-10">
                <header className="space-y-6">
                  <span className="section-eyebrow self-start">Project spotlight</span>
                  <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white">
                      {project.title}
                    </h1>
                    <p className="text-base leading-relaxed text-slate-600 dark:text-slate-200/80">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </header>

                {project.heroVideo ? (
                  <ProjectHeroMedia
                    variant="detail"
                    src={project.heroVideo}
                    poster={project.heroImage}
                    label={project.imageAlt || project.title}
                  />
                ) : (
                  project.heroImage && (
                  <figure className="overflow-hidden rounded-3xl border border-slate-600 bg-white/80 shadow-2xl shadow-emerald-500/10 dark:border-white/15 dark:bg-slate-900/70 dark:shadow-purple-500/10">
                    <img
                      src={project.heroImage}
                      alt={project.imageAlt || project.title}
                      className="h-72 w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02] md:h-96"
                    />
                  </figure>
                  )
                )}

                {project.highlights && project.highlights.length > 0 && (
                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Highlights</h2>
                    <div className="rounded-2xl border border-slate-600 bg-white/85 p-4 dark:border-white/15 dark:bg-slate-900/70">
                      <ul className="list-disc space-y-2 pl-4 text-slate-600 dark:text-slate-200/80">
                        {project.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </section>
                )}

                {project.sections && project.sections.length > 0 && (
                  <section className="space-y-8">
                    {project.sections.map((section) => (
                      <article key={section.title} className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{section.title}</h3>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-200/80">
                          {section.description}
                        </p>
                      </article>
                    ))}
                  </section>
                )}

                {(project.link || project.repo) && (
                  <section className="flex flex-wrap gap-3">
                    {project.link && (
                      <Button variant="default" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span>View live project</span>
                        </a>
                      </Button>
                    )}
                    {project.repo && (
                      <Button variant="outline" asChild>
                        <a href={project.repo} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span>View repository</span>
                        </a>
                      </Button>
                    )}
                  </section>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
