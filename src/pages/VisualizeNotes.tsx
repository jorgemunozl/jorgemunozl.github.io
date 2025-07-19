
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { BookOpen, Calendar, ArrowLeft, BarChart3, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const VisualizeNotes = () => {
  const navigate = useNavigate();
  const [notes] = useState<Note[]>([
    {
      id: '1',
      title: 'Newton\'s Second Law',
      content: 'F = ma\n\nForce equals mass times acceleration. This fundamental principle describes the relationship between the forces acting on a body and its motion due to those forces.',
      date: new Date().toLocaleDateString()
    },
    {
      id: '2',
      title: 'Quantum Mechanics Basics',
      content: 'Key principles:\n- Wave-particle duality\n- Uncertainty principle\n- Superposition\n\nQuantum mechanics describes the behavior of matter and energy at the molecular, atomic, nuclear, and even smaller microscopic levels.',
      date: new Date().toLocaleDateString()
    }
  ]);
  
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0] || null);

  const handleBackToNotes = () => {
    navigate('/notes');
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleBackToNotes}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Button>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-orange-500" />
              <h1 className="text-2xl font-bold text-white">Notes Visualization</h1>
            </div>
          </div>
        </div>

        {/* Notes Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-3">Select a note to view:</h3>
          <div className="flex flex-wrap gap-2">
            {notes.map((note) => (
              <Button
                key={note.id}
                onClick={() => setSelectedNote(note)}
                variant={selectedNote?.id === note.id ? "default" : "outline"}
                className={
                  selectedNote?.id === note.id
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                {note.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Resizable Layout */}
        <div className="h-[600px]">
          <ResizablePanelGroup direction="horizontal" className="rounded-lg border border-gray-800">
            {/* Content Panel (Larger) */}
            <ResizablePanel defaultSize={70} minSize={50}>
              <Card className="h-full bg-gray-900 border-0 rounded-none">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-orange-500" />
                    Note Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-[calc(100%-80px)] overflow-y-auto">
                  {selectedNote ? (
                    <div>
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold text-white mb-2">{selectedNote.title}</h2>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar className="w-4 h-4 mr-1" />
                          {selectedNote.date}
                        </div>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                          {selectedNote.content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-500 mb-2">No Note Selected</h3>
                        <p className="text-gray-600">Select a note from the list above to view its content.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Graph Panel (Smaller) */}
            <ResizablePanel defaultSize={30} minSize={25}>
              <Card className="h-full bg-gray-900 border-0 rounded-none">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
                    Visualization Graph
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-[calc(100%-80px)] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Graph Visualization</h3>
                    <p className="text-gray-600 text-sm">Graph content will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VisualizeNotes;
