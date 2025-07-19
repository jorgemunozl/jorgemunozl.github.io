import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Code, Calculator, BookOpen } from 'lucide-react';

const AboutSection = () => {
  const skills = [
    'Mathematics', 'Physics', 'Computer Science', 'LaTeX', 'React', 'TypeScript',
    'Python', 'Machine Learning', 'Algorithms', 'Data Structures'
  ];

  const interests = [
    {
      icon: Calculator,
      title: 'Mathematics',
      description: 'Linear algebra, calculus, discrete mathematics, and mathematical modeling'
    },
    {
      icon: Brain,
      title: 'Physics',
      description: 'Quantum mechanics, classical mechanics, electromagnetism, and thermodynamics'
    },
    {
      icon: Code,
      title: 'Programming',
      description: 'Web development, algorithms, data structures, and software architecture'
    },
    {
      icon: BookOpen,
      title: 'Learning',
      description: 'Documenting knowledge, sharing insights, and continuous learning'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About This Blog
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Welcome to my personal learning space where I document my journey through 
            mathematics, physics, and computer science. This blog serves as both a 
            knowledge repository and a way to share insights with fellow learners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {interests.map((interest, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 text-center hover:shadow-lg hover:shadow-gray-900/20 transition-shadow duration-300">
              <CardContent className="pt-6">
                <interest.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {interest.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {interest.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Topics I Explore
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-sm py-1 px-3 bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
