import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

interface PageHeaderProps {
  title: string;
  showHomeButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, showHomeButton = true }) => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-background/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
              title="Go to homepage"
            >
              <img 
                src="/path412.svg" 
                alt="Home" 
                className="w-8 h-8 mr-2 dark:invert"
              />
              <h1 className="text-lg font-medium text-foreground">{title}</h1>
            </button>
          </div>
          <div className="flex items-center gap-2">
            {showHomeButton && (
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                size="sm"
                className="text-purple-400 hover:text-purple-300 hover:bg-gray-800/50"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
