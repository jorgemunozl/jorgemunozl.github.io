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

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

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
        <TopControls title="Project Detail" />
        <div className="pt-24 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/portfolio" className="inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to portfolio
                </Link>
              </Button>
            </div>

            <Card className="bg-card/30 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8 space-y-8">
                <header className="space-y-6">
                  <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>
                    <p className="text-lg text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-black/60 dark:border-purple-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </header>

                {project.heroImage && (
                  <figure className="overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm shadow-2xl shadow-black/10 dark:shadow-purple-500/10">
                    <img
                      src={project.heroImage}
                      alt={project.imageAlt || project.title}
                      className="w-full h-72 md:h-96 object-cover transform transition-transform duration-700 ease-out hover:scale-[1.02]"
                    />
                  </figure>
                )}

                {project.highlights && project.highlights.length > 0 && (
                  <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">Highlights</h2>
                    <div className="rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm p-4">
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
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
                        <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{section.description}</p>
                      </article>
                    ))}
                  </section>
                )}

                {(project.link || project.repo) && (
                  <section className="flex flex-wrap gap-3">
                    {project.link && (
                      <Button
                        variant="secondary"
                        asChild
                        className="bg-gradient-to-r from-black-500/10 to-black-600/30 text-black hover:from-black-500/20 hover:to-black-600/40 dark:from-purple-500/10 dark:to-purple-600/20 dark:text-purple-200"
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View live project
                        </a>
                      </Button>
                    )}

                    {project.repo && (
                      <Button variant="outline" asChild>
                        <a href={project.repo} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View repository
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
