
import React from 'react';
import { Github, Twitter, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-transparent backdrop-blur-sm border-t border-gray-200/20 dark:border-gray-800/20 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="flex space-x-6">
            <a 
              href="https://github.com/jorgemunozl" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple-500 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/jorgemunozlar/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple-500 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/jorgemunozl" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple-500 transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="mailto:alvaro18ml@gmail.com" 
              className="text-muted-foreground hover:text-purple-500 transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
