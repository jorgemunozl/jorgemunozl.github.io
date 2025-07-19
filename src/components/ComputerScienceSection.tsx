
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Computer, Calculator, Square } from 'lucide-react';

const ComputerScienceSection = () => {
  const csTopics = [
    {
      title: "Data Structures",
      description: "Master arrays, linked lists, trees, and graphs with visual examples",
      icon: Square,
      color: "text-indigo-500",
      difficulty: "Intermediate"
    },
    {
      title: "Algorithms",
      description: "Learn sorting, searching, and optimization algorithms step by step",
      icon: Calculator,
      color: "text-green-500",
      difficulty: "Advanced"
    },
    {
      title: "Programming Languages",
      description: "Explore syntax and concepts across Python, JavaScript, and more",
      icon: Code,
      color: "text-blue-500",
      difficulty: "All Levels"
    },
    {
      title: "System Design",
      description: "Understand scalable architecture and distributed systems",
      icon: Computer,
      color: "text-red-500",
      difficulty: "Advanced"
    }
  ];

  return (
    <section id="computer-science" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Computer Science Lab
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dive into programming, algorithms, and computational thinking
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {csTopics.map((topic, index) => {
            const IconComponent = topic.icon;
            return (
              <Card key={index} className="bg-white hover:shadow-xl transition-all border-gray-200 hover:border-blue-300 group">
                <CardHeader className="text-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                    <IconComponent className={`w-16 h-16 mx-auto relative ${topic.color}`} />
                  </div>
                  <CardTitle className="text-lg text-gray-900">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="mb-4">
                    <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                      {topic.difficulty}
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0">
                    Start Coding
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

export default ComputerScienceSection;
