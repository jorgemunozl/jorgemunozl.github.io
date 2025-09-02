import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useGlobalRotation } from '@/hooks/useGlobalRotation';

interface PageHeaderProps {
  title: string;
  showHomeButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, showHomeButton = true }) => {
  const navigate = useNavigate();
  const { rotation, rotateIcon } = useGlobalRotation();

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    rotateIcon();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Home icon only */}
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="hover:opacity-80 transition-opacity cursor-pointer"
            title="Go to homepage"
          >
            <img 
              src="/path412.svg" 
              alt="" 
              className="w-10 h-10 dark:invert cursor-pointer transition-transform duration-500 ease-in-out"
              style={{ transform: `rotate(${rotation}deg)` }}
              onClick={handleIconClick}
            />
          </button>
        </div>

        {/* Right side - Theme toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
