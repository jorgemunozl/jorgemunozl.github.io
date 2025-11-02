
import React from 'react';
import { Github, Twitter, Mail, Linkedin } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-6 sm:px-6">
      <div className="pointer-events-auto flex w-full max-w-5xl flex-col items-center gap-3 rounded-full border border-slate-900/10 bg-white/85 px-6 py-3 text-xs text-slate-500 shadow-lg shadow-emerald-500/10 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/10 dark:text-white/60 dark:shadow-purple-500/10">
        <div className="flex items-center gap-5">
          <a 
            href="https://github.com/jorgemunozl" 
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-slate-900 dark:hover:text-purple-200"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a 
            href="https://www.linkedin.com/in/jorgemunozlar/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-slate-900 dark:hover:text-purple-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a 
            href="https://x.com/jorgemunozla"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-slate-900 dark:hover:text-purple-200"
            aria-label="X (Twitter)"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a 
            href="mailto:alvaro18ml@gmail.com"
            className="transition-colors hover:text-slate-900 dark:hover:text-purple-200"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
        <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400 dark:text-white/40">
          © {new Date().getFullYear()} Jorge Munoz
        </p>
      </div>
    </footer>
  );
};

export default Footer;
