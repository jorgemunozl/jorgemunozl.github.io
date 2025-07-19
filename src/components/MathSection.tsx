import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Square, SquareRadical, Code } from 'lucide-react';

const MathSection = () => {
  const mathTopics = [
    {
      title: "Calculus",
      description: "Master derivatives, integrals, and limits with interactive visualizations",
      icon: Square,
      color: "text-blue-500",
      difficulty: "Advanced"
    },
    {
      title: "Linear Algebra",
      description: "Explore matrices, vectors, and transformations through hands-on practice",
      icon: SquareRadical,
      color: "text-green-500",
      difficulty: "Intermediate"
    },
    {
      title: "Statistics",
      description: "Learn probability, distributions, and data analysis techniques",
      icon: Calculator,
      color: "text-purple-500",
      difficulty: "All Levels"
    },
    {
      title: "Discrete Math",
      description: "Study combinatorics, graph theory, and logic fundamentals",
      icon: Code,
      color: "text-orange-500",
      difficulty: "Intermediate"
    }
  ];

  return (
    <section id="math" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mathematics Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore mathematical concepts through interactive learning and problem-solving
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mathTopics.map((topic, index) => {
            const IconComponent = topic.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all border-gray-200 hover:border-orange-300 group">
                <CardHeader className="text-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                    <IconComponent className={`w-16 h-16 mx-auto relative ${topic.color}`} />
                  </div>
                  <CardTitle className="text-lg text-gray-900">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="mb-4">
                    <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded border">
                      {topic.difficulty}
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MathSection;
