import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X, Maximize2, Minimize2, RefreshCw, Network, Settings } from 'lucide-react';
import { buildGraphFromPosts, GraphData, GraphNode, GraphLink, findRelatedNotes } from '@/utils/wikiLinks';
import { blogPosts, BlogPost } from '@/data/notes';

interface LocalGraphViewProps {
  isVisible: boolean;
  onClose: () => void;
  onNodeClick?: (nodeId: string) => void;
  currentNote: string; // The current note title
}

const LocalGraphView: React.FC<LocalGraphViewProps> = ({ 
  isVisible, 
  onClose, 
  onNodeClick,
  currentNote 
}) => {
  const graphRef = useRef<any>(null);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 350, height: 250 });
  const [showControls, setShowControls] = useState(false);
  
  // Graph customization options
  const [nodeSize, setNodeSize] = useState(8);
  const [linkThickness, setLinkThickness] = useState(1);
  const [textThreshold, setTextThreshold] = useState(2.0);

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      
      // Build local graph data focusing on the current note
      const relatedNotes = findRelatedNotes(currentNote, blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content
      })));

      // Include current note and its immediate connections
      const localPosts = blogPosts.filter(post => 
        post.title === currentNote || relatedNotes.includes(post.title)
      );

      const data = buildGraphFromPosts(localPosts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content
      })));

      // Highlight the current note
      data.nodes = data.nodes.map(node => ({
        ...node,
        color: node.id === currentNote ? '#EF4444' : node.color, // Red for current note
        size: node.id === currentNote ? (node.size || 10) + 4 : node.size
      }));

      setGraphData(data);
      setIsLoading(false);
    }
  }, [isVisible, currentNote]);

  useEffect(() => {
    const updateDimensions = () => {
      if (isFullscreen) {
        setDimensions({
          width: window.innerWidth - 100,
          height: window.innerHeight - 100
        });
      } else {
        setDimensions({ width: 350, height: 250 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isFullscreen]);

  const handleNodeClick = (node: GraphNode) => {
    if (onNodeClick) {
      onNodeClick(node.id);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const refreshGraph = () => {
    setIsLoading(true);
    setTimeout(() => {
      const relatedNotes = findRelatedNotes(currentNote, blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content
      })));

      const localPosts = blogPosts.filter(post => 
        post.title === currentNote || relatedNotes.includes(post.title)
      );

      const data = buildGraphFromPosts(localPosts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content
      })));

      data.nodes = data.nodes.map(node => ({
        ...node,
        color: node.id === currentNote ? '#EF4444' : node.color,
        size: node.id === currentNote ? (node.size || 10) + 4 : node.size
      }));

      setGraphData(data);
      setIsLoading(false);
    }, 500);
  };

  if (!isVisible) return null;

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center'
    : 'fixed bottom-4 right-4 z-40';

  return (
    <div className={containerClasses}>
      <Card className={`bg-gray-900/95 border-gray-700/50 shadow-lg backdrop-blur-sm ${isFullscreen ? 'w-full h-full max-w-none' : 'w-[350px] h-[280px]'}`}>
        <CardHeader className="pb-2 px-3 py-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-300 text-xs font-normal">
              Local Graph
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-300 p-0 h-4 w-4"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className={`relative overflow-hidden ${isFullscreen ? 'h-full' : 'h-56'}`}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="text-gray-500 text-xs">Loading...</div>
              </div>
            ) : graphData.nodes.length === 0 ? (
              <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="text-gray-500 text-xs">No connections</div>
              </div>
            ) : (
              <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="#1f2937"
                nodeColor={(node: GraphNode) => node.id === currentNote ? '#ef4444' : '#6366f1'}
                nodeVal={(node: GraphNode) => node.id === currentNote ? 12 : 8}
                nodeLabel={(node: GraphNode) => node.title}
                linkColor={() => '#4b5563'}
                linkWidth={() => 1}
                onNodeClick={handleNodeClick}
                cooldownTicks={50}
                d3AlphaDecay={0.05}
                d3VelocityDecay={0.3}
                enablePanInteraction={true}
                enableZoomInteraction={true}
              />
            )}
          </div>
          
          {/* Simple Stats */}
          {!isLoading && graphData.nodes.length > 0 && (
            <div className="px-3 py-1 bg-gray-800 text-xs text-gray-500 border-t border-gray-700">
              {graphData.nodes.length} nodes
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalGraphView;
