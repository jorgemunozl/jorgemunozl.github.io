import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D, { type NodeObject } from 'react-force-graph-2d';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Minimize2, RefreshCw, Network } from 'lucide-react';
import { buildGraphFromPosts, GraphData, GraphNode, GraphLink } from '@/utils/wikiLinks';
import { blogPosts } from '@/components/data/notes';
import { useSmoothForceGraphZoom, type ForceGraphInstance } from '@/hooks/useSmoothForceGraphZoom';

interface GraphViewProps {
  isVisible: boolean;
  onClose: () => void;
  onNodeClick?: (nodeId: string) => void;
  selectedNode?: string;
}

const GraphView: React.FC<GraphViewProps> = ({ 
  isVisible, 
  onClose, 
  onNodeClick,
  selectedNode 
}) => {
  const graphRef = useRef<ForceGraphInstance<GraphNode, GraphLink> | null>(null);
  const graphContainerRef = useRef<HTMLDivElement | null>(null);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNodeData, setSelectedNodeData] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      // Build graph data from blog posts
      const data = buildGraphFromPosts(blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        fileName: post.fileName
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
        setDimensions({ width: 450, height: 350 }); // Larger default size
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isFullscreen]);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNodeData(node);
    if (onNodeClick) {
      onNodeClick(node.id);
    }
  };

  // Avoid changing forces on hover; it causes jumpy behavior
  const handleNodeHover = (_node: GraphNode | null) => {};

  const handleNodeDrag = (node: NodeObject<GraphNode>) => {
    node.fx = node.x;
    node.fy = node.y;
  };

  const handleNodeDragEnd = (node: NodeObject<GraphNode>) => {
    node.fx = undefined;
    node.fy = undefined;
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
        content: post.content,
        fileName: post.fileName
      })));
      setGraphData(data);
      setIsLoading(false);
    }, 500);
  };

  useSmoothForceGraphZoom(graphRef, graphContainerRef, {
    minZoom: 0.25,
    maxZoom: 6,
    sensitivity: 0.0012,
    smoothing: 0.04,
    momentum: 0.97,
  });

  if (!isVisible) return null;

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center'
    : 'fixed top-4 right-4 z-40';

  return (
    <div className={containerClasses}>
      <Card className={`bg-gray-900 border-gray-700 ${isFullscreen ? 'w-full h-full max-w-none' : 'w-[450px] h-[400px]'}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm flex items-center">
              <Network className="w-4 h-4 mr-2" />
              Knowledge Graph
              {selectedNodeData && (
                <span className="ml-2 text-xs text-gray-400">
                  → {selectedNodeData.title}
                </span>
              )}
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
          <div
            ref={graphContainerRef}
            className={`relative overflow-hidden touch-none overscroll-contain ${isFullscreen ? 'h-full' : 'h-80'}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-gray-800">
                <div className="text-gray-400 text-sm">Loading graph...</div>
              </div>
            ) : (
              <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="#1f2937"
                nodeColor={(node: GraphNode) => {
                  if (selectedNode === node.id) return '#EF4444'; // red-500 for selected
                  return node.color || '#A855F7'; // purple-500 default
                }}
                nodeVal={(node: GraphNode) => node.size || 10}
                nodeLabel={(node: GraphNode) => node.title}
                linkColor={() => '#4B5563'} // gray-600
                linkWidth={(link: GraphLink) => Math.sqrt(link.value) * 2}
                linkDirectionalArrowLength={3}
                linkDirectionalArrowRelPos={1}
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                enableNodeDrag={true}
                onNodeDrag={handleNodeDrag}
                onNodeDragEnd={handleNodeDragEnd}
                nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
                  const label = node.title;
                  const fontSize = 12 / globalScale;
                  ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
                  
                  // Draw node circle
                  ctx.beginPath();
                  const radius = (node.size || 10) / 2;
                  ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
                  ctx.fillStyle = selectedNode === node.id ? '#EF4444' : (node.color || '#A855F7');
                  ctx.fill();
                  
                  // Add border for selected node
                  if (selectedNode === node.id) {
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.lineWidth = 2 / globalScale;
                    ctx.stroke();
                  }
                  
                  // Draw label
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
                }}
                cooldownTicks={120}
                d3AlphaDecay={0.03}
                d3VelocityDecay={0.25}
                enableZoomInteraction={false}
                minZoom={0.25}
                maxZoom={6}
              />
            )}
          </div>
          
          {/* Graph Stats */}
          {!isLoading && (
            <div className="p-2 bg-gray-800 text-xs text-gray-400 border-t border-gray-700">
              <div className="flex justify-between">
                <span>{graphData.nodes.length} nodes</span>
                <span>{graphData.links.length} connections</span>
              </div>
              {selectedNodeData && (
                <div className="mt-1 text-purple-400">
                  Selected: {selectedNodeData.title}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphView;
