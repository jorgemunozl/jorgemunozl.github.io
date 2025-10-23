import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/components/data/projects';

type PortfolioProps = {
  id?: string;
  showHeading?: boolean;
};

const Portfolio = ({ id = 'portfolio', showHeading = true }: PortfolioProps) => {
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
              className="bg-card/30 border-black/70 dark:border-purple-800/60 backdrop-blur-sm hover:shadow-lg hover:shadow-black/15 dark:hover:shadow-purple-500/20 transition-shadow duration-300"
            >
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
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </a>
                    </Button>
                  )}

                  {project.repo && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.repo} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Repo
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
