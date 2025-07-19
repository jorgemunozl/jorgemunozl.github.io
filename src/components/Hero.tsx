import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Linkedin, Twitter } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const handleViewNotes = () => {
    navigate('/notes');
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Learning
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> Notes</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-xl mx-auto mb-8">
            Mathematics, physics, and computer science discoveries.
          </p>
        </div>
        
        <div className="mb-12">
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 text-lg px-10 py-4"
            onClick={handleViewNotes}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Read Notes
          </Button>
        </div>

        {/* Contact Links */}
        <div className="flex justify-center space-x-8 text-gray-400">
          <a 
            href="mailto:your.email@gmail.com" 
            className="hover:text-blue-400 transition-colors p-2"
            title="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a 
            href="https://linkedin.com/in/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors p-2"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="https://x.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors p-2"
            title="X (Twitter)"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a 
            href="https://huggingface.co/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors p-2"
            title="Hugging Face"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-2-13c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm4 0c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm-2 6c-1.3 0-2.5.9-2.9 2.1-.1.4.1.8.5.9.4.1.8-.1.9-.5.2-.7.8-1.2 1.5-1.2s1.3.5 1.5 1.2c.1.4.5.6.9.5.4-.1.6-.5.5-.9-.4-1.2-1.6-2.1-2.9-2.1z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
