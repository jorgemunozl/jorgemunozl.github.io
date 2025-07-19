
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Plus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedSection = () => {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([
    {
      title: "Example Research Paper",
      authors: "Dr. Smith, Dr. Johnson",
      journal: "Nature",
      year: "2024",
      category: "Physics"
    }
  ]);

  const handleTimelineClick = () => {
    navigate('/timeline');
  };

  const handleAddPaper = () => {
    const newPaper = {
      title: "New Research Paper",
      authors: "Author Name",
      journal: "Journal Name",
      year: "2024",
      category: "Research Field"
    };
    setPapers([...papers, newPaper]);
  };

  return (
    <section id="discoveries" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest Scientific Discoveries
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Stay updated with the most recent breakthroughs and discoveries from the scientific community
          </p>
          
          {/* Timeline Button */}
          <div className="mb-8">
            <Button 
              onClick={handleTimelineClick}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-6 py-3 text-lg"
            >
              <Clock className="w-5 h-5 mr-2" />
              View Timeline
            </Button>
          </div>
        </div>
        
        {/* Papers Section */}
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              Research Papers
            </h3>
            <Button 
              onClick={handleAddPaper}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Paper
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600 hover:border-orange-500/50 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-gray-500 text-gray-300">
                      {paper.category}
                    </Badge>
                    <span className="text-gray-400 text-sm">{paper.year}</span>
                  </div>
                  <CardTitle className="text-lg text-white">{paper.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-2">
                    <span className="font-medium">Authors:</span> {paper.authors}
                  </p>
                  <p className="text-gray-400 mb-4">
                    <span className="font-medium">Journal:</span> {paper.journal}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                  >
                    View Paper
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
