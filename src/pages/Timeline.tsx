
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: string;
  impact: 'High' | 'Medium' | 'Revolutionary';
}

const Timeline = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      year: "600 BC",
      title: "Thales Predicts Solar Eclipse",
      description: "Greek philosopher Thales becomes the first person to predict a solar eclipse, marking the beginning of scientific astronomy.",
      category: "Astronomy",
      impact: "High"
    },
    {
      year: "500 BC",
      title: "Pythagorean Theorem",
      description: "Pythagoras formulates the famous theorem relating the sides of right triangles, fundamental to mathematics.",
      category: "Mathematics",
      impact: "Revolutionary"
    },
    {
      year: "350 BC",
      title: "Aristotle's Scientific Method",
      description: "Aristotle develops systematic observation and classification methods, laying groundwork for scientific methodology.",
      category: "Philosophy",
      impact: "Revolutionary"
    },
    {
      year: "250 BC",
      title: "Archimedes' Principle",
      description: "Archimedes discovers the principle of buoyancy and develops the screw pump.",
      category: "Physics",
      impact: "High"
    },
    {
      year: "150 AD",
      title: "Ptolemy's Almagest",
      description: "Ptolemy creates a comprehensive model of the universe that dominated astronomy for 1,400 years.",
      category: "Astronomy",
      impact: "Revolutionary"
    },
    {
      year: "1543",
      title: "Copernican Revolution",
      description: "Nicolaus Copernicus publishes 'On the Revolutions of Celestial Spheres', proposing a heliocentric universe.",
      category: "Astronomy",
      impact: "Revolutionary"
    },
    {
      year: "1609",
      title: "Galileo's Telescope",
      description: "Galileo Galilei uses the telescope to observe celestial bodies, confirming Copernican theory.",
      category: "Astronomy",
      impact: "Revolutionary"
    },
    {
      year: "1687",
      title: "Newton's Principia",
      description: "Isaac Newton publishes laws of motion and universal gravitation, revolutionizing physics.",
      category: "Physics",
      impact: "Revolutionary"
    },
    {
      year: "1859",
      title: "Darwin's Origin of Species",
      description: "Charles Darwin publishes his theory of evolution by natural selection.",
      category: "Biology",
      impact: "Revolutionary"
    },
    {
      year: "1865",
      title: "Mendel's Laws of Heredity",
      description: "Gregor Mendel discovers the basic principles of heredity through pea plant experiments.",
      category: "Biology",
      impact: "Revolutionary"
    },
    {
      year: "1905",
      title: "Einstein's Special Relativity",
      description: "Albert Einstein publishes the theory of special relativity, transforming physics.",
      category: "Physics",
      impact: "Revolutionary"
    },
    {
      year: "1915",
      title: "General Relativity",
      description: "Einstein completes his theory of general relativity, describing gravity as spacetime curvature.",
      category: "Physics",
      impact: "Revolutionary"
    },
    {
      year: "1953",
      title: "DNA Double Helix",
      description: "Watson, Crick, Franklin, and Wilkins discover the structure of DNA.",
      category: "Biology",
      impact: "Revolutionary"
    },
    {
      year: "1969",
      title: "Moon Landing",
      description: "Apollo 11 mission successfully lands humans on the Moon for the first time.",
      category: "Space Exploration",
      impact: "Revolutionary"
    },
    {
      year: "1990",
      title: "Human Genome Project Begins",
      description: "International effort to map and sequence the entire human genome launches.",
      category: "Biology",
      impact: "Revolutionary"
    },
    {
      year: "2012",
      title: "Higgs Boson Discovery",
      description: "CERN confirms the existence of the Higgs boson, completing the Standard Model of particle physics.",
      category: "Physics",
      impact: "Revolutionary"
    },
    {
      year: "2020",
      title: "CRISPR Gene Editing",
      description: "CRISPR-Cas9 technology revolutionizes genetic engineering with precise DNA editing capabilities.",
      category: "Biology",
      impact: "Revolutionary"
    },
    {
      year: "2024",
      title: "Quantum Computing Breakthrough",
      description: "Major advances in quantum error correction bring practical quantum computers closer to reality.",
      category: "Physics",
      impact: "High"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Revolutionary': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Physics': return 'border-l-blue-500';
      case 'Biology': return 'border-l-green-500';
      case 'Astronomy': return 'border-l-purple-500';
      case 'Mathematics': return 'border-l-yellow-500';
      case 'Philosophy': return 'border-l-indigo-500';
      case 'Space Exploration': return 'border-l-cyan-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-orange-500 font-medium uppercase tracking-wide text-sm">Scientific History</span>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Clock className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-white">Timeline of Scientific Discoveries</h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Journey through the most significant scientific breakthroughs from 600 BC to the present day
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-purple-500 to-blue-500"></div>
          
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-16 h-16 bg-gray-900 border-4 border-orange-500 rounded-full flex items-center justify-center z-10">
                  <Calendar className="w-6 h-6 text-orange-500" />
                </div>
                
                {/* Event card */}
                <div className="ml-8 flex-1">
                  <Card className={`bg-gray-900 border-gray-800 border-l-4 ${getCategoryColor(event.category)} hover:border-orange-500/50 transition-all`}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-orange-500 text-black font-bold">
                            {event.year}
                          </Badge>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {event.category}
                          </Badge>
                          <Badge className={`${getImpactColor(event.impact)} text-white border-0`}>
                            {event.impact}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl text-white">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Timeline;
