
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, MapPin, Calendar, GraduationCap, Briefcase, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact & About
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get to know more about the person behind ScienceHub and connect with them
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      DR
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl mb-2">Dr. Sarah Chen</CardTitle>
                <p className="text-gray-600">Physics Researcher & Educator</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>29 years old</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>sarah.chen@sciencehub.com</span>
                  </div>
                </div>

                {/* Social Networks */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="icon" className="hover:bg-blue-50">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-gray-50">
                      <Github className="w-4 h-4 text-gray-700" />
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-blue-50">
                      <Twitter className="w-4 h-4 text-blue-500" />
                    </Button>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>@sarahchen_physics</p>
                    <p>github.com/sarahchen</p>
                    <p>linkedin.com/in/sarahchen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Me */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-orange-500" />
                  <span>About Me</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  I'm a passionate physicist and educator with a PhD in Theoretical Physics from Stanford University. 
                  My research focuses on quantum mechanics and particle physics, and I love making complex scientific 
                  concepts accessible to everyone. I created ScienceHub to bridge the gap between advanced research 
                  and public understanding of science.
                </p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-orange-500" />
                  <span>Education</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">PhD in Theoretical Physics</h4>
                    <p className="text-gray-600">Stanford University • 2019-2023</p>
                    <p className="text-sm text-gray-500">Dissertation: "Quantum Entanglement in Multi-Particle Systems"</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">M.S. in Physics</h4>
                    <p className="text-gray-600">MIT • 2017-2019</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">B.S. in Physics & Mathematics</h4>
                    <p className="text-gray-600">UC Berkeley • 2013-2017</p>
                    <p className="text-sm text-gray-500">Magna Cum Laude, Phi Beta Kappa</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-orange-500" />
                  <span>Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Research Scientist</h4>
                    <p className="text-gray-600">CERN • 2023-Present</p>
                    <p className="text-sm text-gray-500">Working on particle physics experiments and data analysis</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Teaching Assistant</h4>
                    <p className="text-gray-600">Stanford University • 2019-2023</p>
                    <p className="text-sm text-gray-500">Quantum Mechanics, Statistical Physics, and Mathematical Methods</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Research Intern</h4>
                    <p className="text-gray-600">NASA Jet Propulsion Laboratory • Summer 2018</p>
                    <p className="text-sm text-gray-500">Space physics and satellite instrumentation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests & Hobbies */}
            <Card>
              <CardHeader>
                <CardTitle>Interests & Hobbies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Scientific Interests</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Quantum Computing</li>
                      <li>• Particle Physics</li>
                      <li>• Astrophysics</li>
                      <li>• Science Communication</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Personal Hobbies</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Rock Climbing</li>
                      <li>• Photography</li>
                      <li>• Playing Piano</li>
                      <li>• Hiking</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
