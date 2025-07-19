import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  showHomeButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, showHomeButton = true }) => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-700/50 bg-gray-900/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="w-5 h-5 text-blue-400 mr-2" />
            <h1 className="text-lg font-medium text-white">{title}</h1>
          </div>
          {showHomeButton && (
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="text-blue-400 hover:text-blue-300 hover:bg-gray-800/50"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
