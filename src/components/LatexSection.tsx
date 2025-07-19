
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Atom, Zap, Globe, Activity } from 'lucide-react';

const LatexSection = () => {
  const [copiedEquation, setCopiedEquation] = useState<string | null>(null);

  const copyToClipboard = (equation: string) => {
    navigator.clipboard.writeText(equation);
    setCopiedEquation(equation);
    setTimeout(() => setCopiedEquation(null), 2000);
  };

  const mechanicsEquations = [
    {
      name: "Newton's Second Law",
      latex: "F = ma",
      description: "Force equals mass times acceleration"
    },
    {
      name: "Kinematic Equation",
      latex: "v^2 = u^2 + 2as",
      description: "Final velocity squared equation"
    },
    {
      name: "Work-Energy Theorem",
      latex: "W = \\Delta KE = \\frac{1}{2}mv^2 - \\frac{1}{2}mu^2",
      description: "Work equals change in kinetic energy"
    },
    {
      name: "Gravitational Force",
      latex: "F = G\\frac{m_1m_2}{r^2}",
      description: "Universal law of gravitation"
    }
  ];

  const electromagnetismEquations = [
    {
      name: "Coulomb's Law",
      latex: "F = k\\frac{q_1q_2}{r^2}",
      description: "Force between two point charges"
    },
    {
      name: "Ohm's Law",
      latex: "V = IR",
      description: "Voltage equals current times resistance"
    },
    {
      name: "Electric Power",
      latex: "P = VI = I^2R = \\frac{V^2}{R}",
      description: "Electrical power formulas"
    },
    {
      name: "Magnetic Force",
      latex: "F = qvB\\sin\\theta",
      description: "Force on a moving charge in magnetic field"
    }
  ];

  const thermodynamicsEquations = [
    {
      name: "Ideal Gas Law",
      latex: "PV = nRT",
      description: "Relationship between pressure, volume, and temperature"
    },
    {
      name: "First Law of Thermodynamics",
      latex: "\\Delta U = Q - W",
      description: "Conservation of energy in thermodynamics"
    },
    {
      name: "Heat Transfer",
      latex: "Q = mc\\Delta T",
      description: "Heat required to change temperature"
    },
    {
      name: "Efficiency",
      latex: "\\eta = 1 - \\frac{T_c}{T_h}",
      description: "Carnot engine efficiency"
    }
  ];

  const wavesEquations = [
    {
      name: "Wave Equation",
      latex: "v = f\\lambda",
      description: "Wave speed equals frequency times wavelength"
    },
    {
      name: "Doppler Effect",
      latex: "f' = f\\frac{v \\pm v_o}{v \\pm v_s}",
      description: "Frequency shift due to relative motion"
    },
    {
      name: "Snell's Law",
      latex: "n_1\\sin\\theta_1 = n_2\\sin\\theta_2",
      description: "Law of refraction"
    },
    {
      name: "Energy of Photon",
      latex: "E = hf = \\frac{hc}{\\lambda}",
      description: "Energy of electromagnetic radiation"
    }
  ];

  const EquationCard = ({ equation }: { equation: { name: string; latex: string; description: string } }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{equation.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-4 rounded-lg mb-3 font-mono text-lg">
          {equation.latex}
        </div>
        <p className="text-gray-600 mb-3">{equation.description}</p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => copyToClipboard(equation.latex)}
          className={copiedEquation === equation.latex ? "bg-green-100 text-green-700" : ""}
        >
          {copiedEquation === equation.latex ? "Copied!" : "Copy LaTeX"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <section id="latex" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            LaTeX Formula Reference
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Common mathematical formulas and LaTeX notation for your notes
          </p>
        </div>

        <Tabs defaultValue="mechanics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mechanics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Mechanics
            </TabsTrigger>
            <TabsTrigger value="electromagnetism" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              E&M
            </TabsTrigger>
            <TabsTrigger value="thermodynamics" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Thermo
            </TabsTrigger>
            <TabsTrigger value="waves" className="flex items-center gap-2">
              <Atom className="w-4 h-4" />
              Waves
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mechanics" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mechanicsEquations.map((equation, index) => (
                <EquationCard key={index} equation={equation} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="electromagnetism" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {electromagnetismEquations.map((equation, index) => (
                <EquationCard key={index} equation={equation} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="thermodynamics" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {thermodynamicsEquations.map((equation, index) => (
                <EquationCard key={index} equation={equation} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="waves" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wavesEquations.map((equation, index) => (
                <EquationCard key={index} equation={equation} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LatexSection;
