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
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6 sm:px-6">
      <div className="pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-slate-900/10 bg-white/80 px-4 py-3 shadow-lg shadow-emerald-500/10 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/10 dark:shadow-purple-500/10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-900/10 bg-white/70 shadow-inner shadow-emerald-400/20 transition-transform duration-500 ease-out hover:-translate-y-0.5 hover:shadow-emerald-400/40 dark:border-white/10 dark:bg-white/5 dark:shadow-purple-500/20 dark:hover:shadow-purple-500/35"
            style={{ transform: `rotate(${rotation}deg)` }}
            aria-label="Navigate home"
          >
            <img
              src="/path412.svg"
              alt="Home"
              className="h-7 w-7 dark:invert"
            />
          </button>
          {title && (
            <span className="hidden text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 sm:inline dark:text-white/70">
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default TopControls;
