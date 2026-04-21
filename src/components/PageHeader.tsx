import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import { useGlobalRotation } from '@/hooks/useGlobalRotation';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  showHomeButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, showHomeButton = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rotation, rotateIcon } = useGlobalRotation();

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    rotateIcon();
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'All Notes', path: '/notes' },
    { label: 'Additional Contents', path: '/additional-contents' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border-b border-slate-600 dark:border-purple-500/10">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Home icon only */}
        <div className="flex items-center gap-3">
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
          {showHomeButton && (
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground hidden sm:inline">
              {title}
            </span>
          )}
        </div>

        {/* Center - Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'text-sm font-medium transition-colors',
                isActive(item.path)
                  ? 'text-black dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-purple-400'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side - Theme toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden px-6 pb-3">
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'text-sm font-medium px-3 py-1.5 rounded-full border transition-colors',
                isActive(item.path)
                  ? 'border-black text-black dark:border-purple-400 dark:text-purple-200'
                  : 'border-transparent text-gray-600 dark:text-gray-300 hover:border-black/40 hover:text-black dark:hover:border-purple-500/50 dark:hover:text-purple-200'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
