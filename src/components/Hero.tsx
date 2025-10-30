import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Twitter, Github, Briefcase, BookOpen, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative py-1 overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              👋 welcome to mun{' '}
              <span className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-cyan-600 dark:from-purple-400 dark:via-pink-500 dark:to-purple-600 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Hi there, this is jorge munoz. I'm documenting my learning notes in this blog since 2020. Based on the number of grammar mistakes in my posts, you can tell how much ChatGPT is involved 😉.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10">
            <Button
              asChild
              className="bg-gradient-to-r from-black-500 to-black-600 hover:from-black-600 hover:to-black-700 dark:from-purple-500 dark:to-purple-600 dark:hover:from-purple-600 dark:hover:to-purple-700 text-white"
            >
              <Link to="/portfolio">
                <Briefcase className="w-5 h-5 mr-2" />
                View Portfolio
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-black text-black hover:bg-black/10 hover:text-black hover:border-black dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-950 dark:hover:text-purple-200 dark:hover:border-purple-700"
            >
              <Link to="/notes">
                <BookOpen className="w-5 h-5 mr-2" />
                Read Notes
              </Link>
            </Button>
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex justify-center space-x-6 sm:space-x-8 text-muted-foreground">
          <a 
            href="mailto:alvaro18ml@gmail.com" 
            className="hover:text-black dark:hover:text-purple-400 transition-colors p-2"
            title="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/jorgemunozlar/"
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-purple-400 transition-colors p-2"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="https://x.com/jorgemunozla" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-purple-400 transition-colors p-2"
            title="X (Twitter)"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a 
            href="https://github.com/jorgemunozl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-purple-400 transition-colors p-2"
            title="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="https://huggingface.co/jorgemunozl"
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-purple-400 transition-colors p-2"
            title="Hugging Face"
          >
            <Globe className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
