import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/components/data/projects';
import { useNavigate } from 'react-router-dom';
import ProjectHeroMedia from '@/components/ProjectHeroMedia';
import ArxivLogo from '@/components/icons/ArxivLogo';

type PortfolioProps = {
  id?: string;
  showHeading?: boolean;
};

const Portfolio = ({ id = 'portfolio', showHeading = true }: PortfolioProps) => {
  const navigate = useNavigate();

  const handleCardActivate = (projectId: string) => {
    navigate(`/portfolio/${projectId}`);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, projectId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardActivate(projectId);
    }
  };

  return (
    <section id={id} className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Selected Projects</h2>
            <p className="text-muted-foreground">
              A compact list of experiments and products I&apos;ve been building. Update the entries in
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">src/components/data/projects.ts</code>
              to feature new work.
            </p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group bg-card/50 border-black/70 dark:border-purple-800/60 hover:shadow-lg hover:shadow-black/15 dark:hover:shadow-purple-500/20 transition-shadow duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-foreground/70 overflow-hidden"
              tabIndex={0}
              role="link"
              aria-label={`View project ${project.title}`}
              onClick={() => handleCardActivate(project.id)}
              onKeyDown={(event) => handleCardKeyDown(event, project.id)}
            >
              {project.heroVideo ? (
                <ProjectHeroMedia
                  variant="card"
                  src={project.heroVideo}
                  poster={project.heroImage}
                  label={project.imageAlt || project.title}
                />
              ) : (
                project.heroImage && (
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.heroImage}
                    alt={project.imageAlt || project.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>
                )
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-foreground">{project.title}</CardTitle>
                <CardDescription className="leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="border-black/60 dark:border-purple-700">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.link && (
                    <Button
                      variant="secondary"
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-black-500/10 to-black-600/30 text-black hover:from-black-500/20 hover:to-black-600/40 dark:from-purple-500/10 dark:to-purple-600/20 dark:text-purple-200"
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </a>
                    </Button>
                  )}

                  {project.repo && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Repo
                      </a>
                    </Button>
                  )}

                  {project.paperPdf && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.paperPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-1.5"
                      >
                        {project.showArxivLogo !== false && <ArxivLogo className="h-4 w-4 shrink-0" />}
                        Paper
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
