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
              <svg className="w-5 h-5 text-foreground mr-2" viewBox="0 0 32 32" fill="currentColor">
                <path fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.9" d="M8 10 Q12 6 16 10 Q20 14 24 10 Q20 14 16 18 Q12 22 8 18 Q12 14 8 10"/>
                <path fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.9" d="M24 22 Q20 26 16 22 Q12 18 8 22 Q12 18 16 14 Q20 10 24 14 Q20 18 24 22"/>
                <circle cx="16" cy="12" r="1" fill="currentColor" opacity="0.6"/>
                <circle cx="16" cy="20" r="1" fill="currentColor" opacity="0.6"/>
              </svg>
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
