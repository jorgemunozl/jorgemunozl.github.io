
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LatexEditor = () => {
  const [latexCode, setLatexCode] = useState('\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\n% Write your LaTeX code here\n\\title{My Document}\n\\author{Your Name}\n\\date{\\today}\n\\maketitle\n\n\\section{Introduction}\nThis is an example document.\n\n\\[E = mc^2\\]\n\n\\end{document}');
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(latexCode);
    toast({
      title: "Copied!",
      description: "LaTeX code copied to clipboard",
    });
  };

  const downloadLatex = () => {
    const blob = new Blob([latexCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "LaTeX file downloaded successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            LaTeX Editor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Write and edit your LaTeX documents with syntax highlighting and easy export
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                LaTeX Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={latexCode}
                onChange={(e) => setLatexCode(e.target.value)}
                placeholder="Write your LaTeX code here..."
                className="font-mono text-sm min-h-[500px] resize-none"
              />
              <div className="flex gap-2 mt-4">
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={downloadLatex} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download .tex
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview/Help Panel */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>LaTeX Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Common Commands:</h4>
                  <div className="text-sm space-y-1 font-mono bg-gray-50 p-3 rounded">
                    <div>\\section{'{'}Title{'}'}</div>
                    <div>\\subsection{'{'}Subtitle{'}'}</div>
                    <div>\\textbf{'{'}Bold text{'}'}</div>
                    <div>\\textit{'{'}Italic text{'}'}</div>
                    <div>\\underline{'{'}Underlined{'}'}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">Math Formulas:</h4>
                  <div className="text-sm space-y-1 font-mono bg-gray-50 p-3 rounded">
                    <div>\\[E = mc^2\\]</div>
                    <div>\\frac{'{'}a{'}'}{'{'}b{'}'}</div>
                    <div>\\sqrt{'{'}x{'}'}</div>
                    <div>\\sum_{'{'}i=1{'}'}^{'{'}n{'}'} x_i</div>
                    <div>\\int_{'{'}0{'}'}^{'{'}1{'}'} f(x) dx</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Lists:</h4>
                  <div className="text-sm space-y-1 font-mono bg-gray-50 p-3 rounded">
                    <div>\\begin{'{'}itemize{'}'}</div>
                    <div>&nbsp;&nbsp;\\item First item</div>
                    <div>&nbsp;&nbsp;\\item Second item</div>
                    <div>\\end{'{'}itemize{'}'}</div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-4">
                  <p><strong>Tip:</strong> Use online LaTeX compilers like Overleaf to compile and view your document.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LatexEditor;
