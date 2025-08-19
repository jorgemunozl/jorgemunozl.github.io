import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Minimize2, RefreshCw, Globe } from 'lucide-react';
import { buildGraphFromPosts, GraphData, GraphNode, GraphLink } from '@/utils/wikiLinks';
import { blogPosts } from '@/data/notes';

interface GlobalGraphViewProps {
  isVisible: boolean;
  onClose: () => void;
  onNodeClick?: (nodeId: string) => void;
}

const GlobalGraphView: React.FC<GlobalGraphViewProps> = ({ 
  isVisible, 
  onClose, 
  onNodeClick
}) => {
  const graphRef = useRef<any>(null);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 450, height: 400 });

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      
      // Build global graph data from all posts
      const data = buildGraphFromPosts(blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content
      })));

      setGraphData(data);
      setIsLoading(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const updateDimensions = () => {
      if (isFullscreen) {
        setDimensions({
          width: window.innerWidth - 100,
          height: window.innerHeight - 100
        });
      } else {
        setDimensions({ width: 450, height: 400 });
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
      const data = buildGraphFromPosts(blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content
      })));

      setGraphData(data);
      setIsLoading(false);
    }, 500);
  };

  if (!isVisible) return null;

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center'
    : 'fixed top-4 right-4 z-40';

  return (
    <div className={containerClasses}>
      <Card className={`bg-gray-900 border-gray-700 ${isFullscreen ? 'w-full h-full max-w-none' : 'w-[480px] h-[470px]'}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Global Graph
              <span className="ml-2 text-xs text-gray-400">
                All Notes
              </span>
            </CardTitle>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshGraph}
                className="text-gray-400 hover:text-white p-1 h-6 w-6"
                disabled={isLoading}
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-gray-400 hover:text-white p-1 h-6 w-6"
              >
                {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1 h-6 w-6"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className={`relative overflow-hidden ${isFullscreen ? 'h-full' : 'h-96'}`}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-gray-800">
                <div className="text-gray-400 text-sm">Loading knowledge graph...</div>
              </div>
            ) : graphData.nodes.length === 0 ? (
              <div className="flex items-center justify-center h-full bg-gray-800">
                <div className="text-gray-400 text-sm">No notes found</div>
              </div>
            ) : (
              <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="#1f2937"
                nodeColor={(node: GraphNode) => node.color || '#A855F7'}
                nodeVal={(node: GraphNode) => node.size || 10}
                nodeLabel={(node: GraphNode) => node.title}
                linkColor={() => '#4B5563'}
                linkWidth={(link: GraphLink) => Math.sqrt(link.value) * 2}
                onNodeClick={handleNodeClick}
                nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
                  const label = node.title;
                  const fontSize = 10 / globalScale;
                  ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
                  
                  // Draw node circle
                  ctx.beginPath();
                  const radius = (node.size || 10) / 2;
                  ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
                  ctx.fillStyle = node.color || '#A855F7';
                  ctx.fill();
                  
                  // Only draw label when zoomed in significantly (globalScale > 2)
                  if (globalScale > 2) {
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);
                    
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                    ctx.fillRect(
                      node.x! - bckgDimensions[0] / 2,
                      node.y! + radius + 2,
                      bckgDimensions[0],
                      bckgDimensions[1]
                    );
                    
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillText(label, node.x!, node.y! + radius + bckgDimensions[1] / 2 + 2);
                  }
                }}
                cooldownTicks={100}
                d3AlphaDecay={0.02}
                d3VelocityDecay={0.3}
              />
            )}
          </div>
          
          {/* Graph Stats */}
          {!isLoading && (
            <div className="p-2 bg-gray-800 text-xs text-gray-400 border-t border-gray-700">
              <div className="flex justify-between">
                <span>{graphData.nodes.length} notes</span>
                <span>{graphData.links.length} connections</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalGraphView;
