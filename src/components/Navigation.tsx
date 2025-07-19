
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNotesClick = () => {
    navigate('/notes');
  };

  const handleLatexEditorClick = () => {
    navigate('/latex-editor');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <BookOpen className="w-7 h-7 text-blue-500" />
            <span className="text-xl font-bold text-gray-900">Learning Notes</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={handleLogoClick}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={handleNotesClick}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              All Notes
            </button>
            <a href="#latex" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">LaTeX</a>
            <button 
              onClick={handleLatexEditorClick}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Editor
            </button>
          </div>
          
          <Button 
            onClick={handleNotesClick}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
          >
            Read Notes
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
