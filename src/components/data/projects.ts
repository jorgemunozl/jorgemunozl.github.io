export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: 'project-graph-notes',
    title: 'Graph Notes Explorer',
    description:
      'An experimental UI that turns markdown notes into an interactive graph, highlighting the relationships across topics.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/jorgemunozl?tab=repositories',
    repo: 'https://github.com/jorgemunozl',
  },
  {
    id: 'project-llm-lab',
    title: 'Solving the many electron Schrodinger Equation with Transformer',
    description:
      'Prototyping workflows for large language models with evaluation dashboards and prompt libraries.',
    technologies: ['Next.js', 'Vercel', 'OpenAI API'],
    link: 'https://github.com/jorgemunozl',
    repo: 'https://github.com/jorgemunozl',
  },
  {
    id: 'project-quant-lab',
    title: 'Training a VLLM to recognise flowcharts',
    description:
      'Mermaid',
    technologies: ['Python', 'Jupyter', 'Plotly'],
    link: 'https://github.com/jorgemunozl',
    repo: 'git@github.com:jorgemunozl/vllm.git',
  },
];
