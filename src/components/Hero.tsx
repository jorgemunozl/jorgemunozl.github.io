import React from 'react';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              👋 welcome to mun
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Blog</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Hi there, this is jorge munoz. I'm documenting my learning notes in this blog since 2020. Based on the number of grammar mistakes in my posts, you can tell how much ChatGPT is involved 😉.
          </p>
        </div>

        {/* Contact Links */}
        <div className="flex justify-center space-x-8 text-muted-foreground">
          <a 
            href="mailto:alvaro18ml@gmail.com" 
            className="hover:text-purple-400 transition-colors p-2"
            title="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/jorgemunozlar/"
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors p-2"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="https://x.com/jorgemunozla" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors p-2"
            title="X (Twitter)"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a 
            href="https://github.com/jorgemunozl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors p-2"
            title="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="https://huggingface.co/jorgemunozl"
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors p-2"
            title="Hugging Face"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
              <circle cx="8.5" cy="9" r="1.5"/>
              <circle cx="15.5" cy="9" r="1.5"/>
              <path d="M12 17c-2.5 0-4.5-1.5-4.5-3.5 0-0.5 0.4-1 1-1s1 0.5 1 1c0 1 1.1 1.5 2.5 1.5s2.5-0.5 2.5-1.5c0-0.5 0.4-1 1-1s1 0.5 1 1c0 2-2 3.5-4.5 3.5z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
