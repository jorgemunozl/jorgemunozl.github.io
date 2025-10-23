import { useState } from 'react';
import Footer from '@/components/Footer';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface PDFDocument {
  id: string;
  title: string;
  description: string;
  filePath: string;
  imagePath?: string;
  uploadDate: string;
  category: string;
  thumbnailUrl?: string;
}

// Sample PDF documents - replace with your actual data
const pdfDocuments: PDFDocument[] = [
  {
    id: '1',
    title: 'Depseek',
    description: 'Comprehensive guide to machine learning concepts and algorithms',
    filePath: '/pdfs/DeepSeekV2.pdf',
    imagePath: '/images/deep.png',
    uploadDate: '2025-08-15',
    category: 'Computer Science'
  },
  {
    id: '2',
    title: 'Dirac Braket Notation',
    description: 'Essential linear algebra concepts for data science',
    filePath: '/pdfs/linear-algebra.pdf',
    imagePath: '/images/dirac.png',
    uploadDate: '2025-08-20',
    category: 'Mathematics'
  },
  {
    id: '3',
    title: 'El dia D',
    description: 'estuff',
    filePath: '/pdfs/deep-learning.pdf',
    imagePath: '/images/dia-d.png',
    uploadDate: '2025-08-25',
    category: 'Computer Science'
  }
];

const AdditionalContents = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background gradient-bg flex flex-col">
      <RelativityFieldLines />
      {/* Dark mode glows */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0 hidden dark:block pointer-events-none">
        <div className="w-96 h-96 rounded-full blur-3xl" style={{background: 'radial-gradient(circle, #030d630c, #47020209, transparent)'}}></div>
      </div>
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-0 hidden dark:block pointer-events-none">
        <div className="w-48 h-48 rounded-full blur-2xl" style={{background: 'radial-gradient(circle, #9900000c, #01039b0c, #b902a005)'}}></div>
      </div>
      {/* Light mode glows */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 z-0 block dark:hidden pointer-events-none">
        <div className="w-[34rem] h-[34rem] rounded-full blur-3xl opacity-60" style={{background: 'radial-gradient(circle, rgba(139,92,246,0.12), rgba(59,130,246,0.08), transparent)'}}></div>
      </div>
      <div className="fixed top-16 right-10 z-0 block dark:hidden pointer-events-none">
        <div className="w-64 h-64 rounded-full blur-2xl opacity-70" style={{background: 'radial-gradient(circle, rgba(253,186,116,0.12), rgba(236,72,153,0.08), transparent)'}}></div>
      </div>
      
      <div className="relative z-10 flex-1">
        <TopControls title="Additional Contents" />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 pt-20">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-6">
                  Some content that I consider interesting
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    AI generated content that was curated, review it by myself.  
                </p>
              </div>

              {/* PDF Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pdfDocuments.map((document) => (
                  <Card 
                    key={document.id} 
                    className="group relative bg-card/20 border-0 backdrop-blur-sm hover:bg-card/40 transition-all duration-500 overflow-hidden flex flex-col card-hover-glow"
                  >
                    {/* Neon glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-sm"></div>
                      <div className="absolute inset-0 rounded-xl border border-purple-400/50 shadow-[0_0_20px_rgba(139,69,255,0.3)]"></div>
                    </div>

                    {/* Subtle hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl z-20"></div>
                    
                    <CardContent className="relative p-4 z-30 flex-1 flex flex-col">
                      {/* Document Info */}
                      <div className="space-y-2 flex-1">
                        <div>
                          <h3 className="font-medium text-base text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                            {document.title}
                          </h3>
                          <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-2">
                            {document.description}
                          </p>
                        </div>

                        {/* Minimal metadata */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-muted-foreground/60">{document.uploadDate}</span>
                        </div>
                      </div>

                      {/* Image and buttons at bottom - only appear on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        {/* Action buttons */}
                        <div className="flex gap-2 mb-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs h-7 border-purple-300/50 text-purple-600 hover:bg-purple-50 dark:border-purple-700/50 dark:text-purple-400 dark:hover:bg-purple-950/50"
                            onClick={() => window.open(document.filePath, '_blank')}
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs h-7 border-blue-300/50 text-blue-600 hover:bg-blue-50 dark:border-blue-700/50 dark:text-blue-400 dark:hover:bg-blue-950/50"
                            onClick={() => {
                              const link = globalThis.document.createElement('a');
                              link.href = document.filePath;
                              link.download = document.title;
                              link.click();
                            }}
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>

                        {/* Image at bottom */}
                        {document.imagePath && (
                          <div className="rounded-lg overflow-hidden">
                            <img 
                              src={document.imagePath} 
                              alt={document.title}
                              className="w-full h-32 object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const container = target.closest('div');
                                if (container) container.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdditionalContents;
