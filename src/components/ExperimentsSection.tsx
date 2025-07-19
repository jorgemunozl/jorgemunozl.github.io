
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestTube, FlaskConical, Microscope, Atom } from 'lucide-react';

const ExperimentsSection = () => {
  const experiments = [
    {
      title: "Virtual Chemistry Lab",
      description: "Conduct safe chemistry experiments in a virtual environment",
      icon: FlaskConical,
      color: "text-green-500",
      difficulty: "Beginner"
    },
    {
      title: "Physics Simulations",
      description: "Explore physics concepts through interactive simulations",
      icon: Atom,
      color: "text-orange-500",
      difficulty: "Intermediate"
    },
    {
      title: "Microscopy Studies",
      description: "Examine cellular structures and microorganisms",
      icon: Microscope,
      color: "text-purple-500",
      difficulty: "Advanced"
    },
    {
      title: "Laboratory Techniques",
      description: "Learn essential laboratory skills and procedures",
      icon: TestTube,
      color: "text-red-500",
      difficulty: "All Levels"
    }
  ];

  return (
    <section id="experiments" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interactive Experiments
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hands-on learning through virtual experiments and simulations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiments.map((experiment, index) => {
            const IconComponent = experiment.icon;
            return (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-orange-500/50 transition-all hover:shadow-2xl group">
                <CardHeader className="text-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                    <IconComponent className={`w-16 h-16 mx-auto relative ${experiment.color}`} />
                  </div>
                  <CardTitle className="text-lg text-white">{experiment.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-400 mb-4">{experiment.description}</p>
                  <div className="mb-4">
                    <span className="text-sm bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">
                      {experiment.difficulty}
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                    Start Experiment
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

export default ExperimentsSection;
