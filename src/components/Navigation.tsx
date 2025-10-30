import React from 'react';
import { Button } from '@/components/ui/button';
import { Sun, BookOpen, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';

const Navigation = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNotesClick = () => {
    navigate('/notes');
  };

  const handlePortfolioClick = () => {
    navigate('/portfolio');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-600 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <BookOpen className="w-20 h-20 text-black dark:text-purple-500" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Learning Notes</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={handleLogoClick}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-purple-400 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={handlePortfolioClick}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-purple-400 transition-colors font-medium"
            >
              Portfolio
            </button>
            <button 
              onClick={handleNotesClick}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-purple-400 transition-colors font-medium"
            >
              All Notes
            </button>
            <a href="#latex" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-purple-400 transition-colors font-medium">LaTeX</a>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-16 w-16 text-emerald-700 hover:text-cyan-600 dark:text-emerald-300 dark:hover:text-cyan-300 transition-colors [&_svg]:size-1"
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </Button>
            <Button 
              onClick={() => navigate('/notes')}
              className="bg-gradient-to-r from-black-500 to-black-600 hover:from-black-600 hover:to-black-700 dark:bg-gradient-to-r dark:from-purple-500 dark:to-purple-500 dark:hover:from-purple-600 dark:hover:to-purple-600 text-white border-0"
            >
              Read Notes
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
