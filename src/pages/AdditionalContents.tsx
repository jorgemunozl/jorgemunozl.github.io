import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye } from 'lucide-react';

interface PDFDocument {
  id: string;
  title: string;
  description: string;
  filePath: string;
  uploadDate: string;
  category: string;
  thumbnailUrl?: string;
}

// Sample PDF documents - replace with your actual data
const pdfDocuments: PDFDocument[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    description: 'Comprehensive guide to machine learning concepts and algorithms',
    filePath: '/pdfs/ml-fundamentals.pdf',
    uploadDate: '2025-08-15',
    category: 'Computer Science'
  },
  {
    id: '2',
    title: 'Linear Algebra Reference',
    description: 'Essential linear algebra concepts for data science',
    filePath: '/pdfs/linear-algebra.pdf',
    uploadDate: '2025-08-20',
    category: 'Mathematics'
  },
  {
    id: '3',
    title: 'Deep Learning Architecture',
    description: 'Modern deep learning architectures and implementations',
    filePath: '/pdfs/deep-learning.pdf',
    uploadDate: '2025-08-25',
    category: 'Computer Science'
  },
  {
    id: '4',
    title: 'Research Methodology',
    description: 'Guide to academic research and paper writing',
    filePath: '/pdfs/research-methods.pdf',
    uploadDate: '2025-09-01',
    category: 'Academic'
  },
  {
    id: '5',
    title: 'Statistics and Probability',
    description: 'Statistical methods and probability theory',
    filePath: '/pdfs/statistics.pdf',
    uploadDate: '2025-08-10',
    category: 'Mathematics'
  },
  {
    id: '6',
    title: 'Neural Network Optimization',
    description: 'Advanced optimization techniques for neural networks',
    filePath: '/pdfs/nn-optimization.pdf',
    uploadDate: '2025-08-30',
    category: 'Computer Science'
  }
];

const AdditionalContents = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(pdfDocuments.map(doc => doc.category)))];
  
  const filteredDocuments = selectedCategory === 'All' 
    ? pdfDocuments 
    : pdfDocuments.filter(doc => doc.category === selectedCategory);

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
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">
                Additional Contents
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our collection of PDF documents, research papers, and supplementary materials
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                      : "border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-300 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-950 dark:hover:text-purple-200 dark:hover:border-purple-700"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* PDF Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((document) => (
                <Card 
                  key={document.id} 
                  className="group border-purple-200 dark:border-purple-800/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 bg-card/50 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    {/* Document Icon/Thumbnail */}
                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                      <FileText className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                    </div>

                    {/* Document Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                          {document.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {document.description}
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-purple-200 dark:border-purple-800/50 pt-3">
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                          {document.category}
                        </span>
                        <span>{document.uploadDate}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          onClick={() => handleView(document.filePath)}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(document.filePath, document.title)}
                          className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-300 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-950 dark:hover:text-purple-200 dark:hover:border-purple-700"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No documents found
                </h3>
                <p className="text-muted-foreground">
                  No documents match the selected category.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdditionalContents;
