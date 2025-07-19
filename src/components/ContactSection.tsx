import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Twitter } from 'lucide-react';

const ContactSection = () => {
  const contactLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/yourprofile',
      description: 'Connect with me professionally',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: 'https://x.com/jorgemunozla',
      description: 'Follow my thoughts and updates',
      bgColor: 'bg-black hover:bg-gray-800',
      textColor: 'text-white'
    },
    {
      name: 'Gmail',
      icon: Mail,
      url: 'mailto:your.email@gmail.com',
      description: 'Send me an email directly',
      bgColor: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      name: 'Hugging Face',
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      url: 'https://huggingface.co/yourusername',
      description: 'Check out my AI models and datasets',
      bgColor: 'bg-yellow-500 hover:bg-yellow-600',
      textColor: 'text-white'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I'm always excited to discuss mathematics, physics, computer science, 
            or any interesting ideas. Reach out through any of these platforms!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactLinks.map((contact, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <a 
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className={`${contact.bgColor} ${contact.textColor} p-8 text-center transition-colors duration-300`}>
                    <contact.icon className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{contact.name}</h3>
                    <p className="text-lg opacity-90">{contact.description}</p>
                  </div>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Open to Collaboration
            </h3>
            <p className="text-gray-600 mb-6">
              Whether it's discussing a complex mathematical proof, exploring new physics concepts, 
              collaborating on a coding project, or sharing knowledge about machine learning, 
              I'm always open to meaningful conversations and collaborations.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                onClick={() => window.open('mailto:your.email@gmail.com', '_blank')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
