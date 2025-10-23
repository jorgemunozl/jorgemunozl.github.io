import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import { useGlobalRotation } from '@/hooks/useGlobalRotation';

interface TopControlsProps {
  title?: string;
}

const TopControls: React.FC<TopControlsProps> = ({ title }) => {
  const navigate = useNavigate();
  const { rotation, rotateIcon } = useGlobalRotation();

  const handleLogoClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    rotateIcon();
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 pointer-events-auto">
          <img
            src="/path412.svg"
            alt="Home"
            className="w-10 h-10 dark:invert cursor-pointer transition-transform duration-500 ease-in-out"
            style={{ transform: `rotate(${rotation}deg)` }}
            onClick={handleLogoClick}
          />
          {title && (
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden sm:inline">
              {title}
            </span>
          )}
        </div>
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default TopControls;
