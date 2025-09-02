import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye } from 'lucide-react';

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
  const handleView = (filePath: string) => {
    // Open PDF in a new tab
    window.open(filePath, '_blank');
  };

  const handleDownload = (filePath: string, title: string) => {
    // Create download link
    const link = document.createElement('a');
    link.href = filePath;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background gradient-bg">
      {/* Lightbulb glow effect - fixed to viewport bottom (dark mode only) */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0 hidden dark:block">
        <div className="w-96 h-96 rounded-full blur-3xl" style={{background: 'radial-gradient(circle, #030d630c, #47020209, transparent)'}}></div>
      </div>
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-0 hidden dark:block">
        <div className="w-48 h-48 rounded-full blur-2xl" style={{background: 'radial-gradient(circle, #9900000c, #01039b0c, #b902a005)'}}></div>
      </div>
      
      <div className="relative z-10">
        <PageHeader title="Additional Contents" showHomeButton={false} />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore our collection of PDF documents, research papers, and supplementary materials
                </p>
              </div>

              {/* PDF Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pdfDocuments.map((document) => (
                  <Card 
                    key={document.id} 
                    className="group relative bg-card/20 border-0 backdrop-blur-sm hover:bg-card/40 transition-all duration-500 cursor-pointer overflow-visible"
                    onClick={() => handleView(document.filePath)}
                  >
                    {/* Subtle hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                    
                    <CardContent className="relative p-4">
                      {/* Document Info */}
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-medium text-base text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                            {document.title}
                          </h3>
                          <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-2">
                            {document.description}
                          </p>
                        </div>

                        {/* Minimal metadata and actions */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-muted-foreground/60">{document.uploadDate}</span>
                          
                          {/* Minimal action icons */}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleView(document.filePath);
                              }}
                              className="p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors duration-200"
                              title="View PDF"
                            >
                              <Eye className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(document.filePath, document.title);
                              }}
                              className="p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors duration-200"
                              title="Download PDF"
                            >
                              <Download className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    {/* Detachable image at bottom - appears on hover */}
                    {document.imagePath && (
                      <div className="absolute bottom-0 left-0 right-0 transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 z-10">
                        <div className="mx-4 mb-2 rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50">
                          <img 
                            src={document.imagePath} 
                            alt={document.title}
                            className="w-full object-cover"
                            style={{ aspectRatio: '1.618 / 1' }}
                            onError={(e) => {
                              // Hide image container if it fails to load
                              const target = e.target as HTMLImageElement;
                              const container = target.closest('div');
                              if (container) container.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}
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
