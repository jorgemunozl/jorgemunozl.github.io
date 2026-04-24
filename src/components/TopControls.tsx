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

  const handleLogoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    rotateIcon();
    navigate('/');
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-4 pt-2 sm:px-6">
      <button
        type="button"
        onClick={handleLogoClick}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-slate-600 bg-white/85 shadow-inner shadow-emerald-400/20 transition-transform duration-500 ease-out hover:-translate-y-0.5 hover:shadow-emerald-400/40 dark:border-white/10 dark:bg-transparent dark:shadow-purple-500/20 dark:hover:shadow-purple-500/35"
        style={{ transform: `rotate(${rotation}deg)` }}
        aria-label={title ? `Go to ${title}` : 'Navigate home'}
      >
        <img
          src="/path412.svg"
          alt="Home"
          className="h-8 w-8 dark:invert"
        />
      </button>
      <div className="pointer-events-auto flex items-center gap-3">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default TopControls;
