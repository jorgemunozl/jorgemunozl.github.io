import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X, Maximize2, Minimize2, RefreshCw, Network, Settings } from 'lucide-react';
import { buildGraphFromPosts, GraphData, GraphNode, GraphLink } from '@/utils/wikiLinks';
import { blogPosts } from '@/data/notes';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 450, height: 400 });
  const [showControls, setShowControls] = useState(false);
  
  // Graph customization options
  const [nodeSize, setNodeSize] = useState(6);
  const [linkThickness, setLinkThickness] = useState(1);
  const [textThreshold, setTextThreshold] = useState(2.0);
  
  // Physics forces
  const [centerForce, setCenterForce] = useState(0);
  const [repelForce, setRepelForce] = useState(-2);
  const [linkForce, setLinkForce] = useState(1);
  const [linkDistance, setLinkDistance] = useState(30);
  
  // Drag rearrangement timer
  const rearrangeTimeoutRef = useRef<number | null>(null);

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

  // Update graph forces when parameters change
  useEffect(() => {
    if (graphRef.current) {
      const fg = graphRef.current;
      
      // Update forces
      fg.d3Force('center').strength(centerForce);
      fg.d3Force('charge').strength(repelForce);
      fg.d3Force('link').strength(linkForce).distance(linkDistance);
      
      // Restart simulation
      fg.d3ReheatSimulation();
    }
  }, [centerForce, repelForce, linkForce, linkDistance]);

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

  // Obsidian-like drag handlers
  const handleNodeDrag = (node: any, translate: { x: number; y: number }) => {
    // Fix node position during drag
    node.fx = translate.x;
    node.fy = translate.y;
    
    // Gently heat simulation for responsiveness without too much chaos
    const fg: any = graphRef.current;
    if (fg) {
      fg.d3AlphaTarget(0.1);
    }
  };

  const handleNodeDragEnd = (node: any) => {
    // Keep node fixed for a moment
    // Clear any existing rearrangement timeout
    if (rearrangeTimeoutRef.current) {
      window.clearTimeout(rearrangeTimeoutRef.current);
    }

    const fg: any = graphRef.current;
    if (fg) {
      // Cool down simulation immediately
      fg.d3AlphaTarget(0);
      
      // After 2 seconds, start smooth rearrangement like Obsidian
      rearrangeTimeoutRef.current = window.setTimeout(() => {
        // Release the fixed position
        node.fx = undefined;
        node.fy = undefined;
        
        // Gently reheat simulation for smooth rearrangement
        fg.d3AlphaTarget(0.3);
        
        // Let it run for a bit then gradually cool down
        setTimeout(() => {
          fg.d3AlphaTarget(0.1);
          setTimeout(() => {
            fg.d3AlphaTarget(0.05);
            setTimeout(() => {
              fg.d3AlphaTarget(0);
            }, 1000);
          }, 1000);
        }, 500);
      }, 2000);
    }
  };

  if (!isVisible) return null;

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black/90 dark:bg-black/90 flex items-center justify-center'
    : 'fixed bottom-20 right-4 z-40';

  return (
    <div className={containerClasses}>
      <Card className={`group bg-transparent border border-gray-200/30 dark:border-gray-700/30 shadow-sm backdrop-blur-none rounded-lg ${isFullscreen ? 'w-full h-full max-w-none' : 'w-[400px]'} ${showControls ? (isFullscreen ? 'h-full' : 'h-auto') : (isFullscreen ? 'h-full' : 'h-[350px]')}`}>
        
        {/* Detachable Controls Arrow - appears on hover */}
        <div className="absolute -top-2 -right-2 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300 z-50">
          <div className="flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowControls(!showControls)}
              className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 p-1 h-6 w-6 rounded-full"
              title="Settings"
            >
              <Settings className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 p-1 h-6 w-6 rounded-full"
              title="Close"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Graph Controls - floating overlay when visible */}
        {showControls && (
          <div className="absolute top-4 left-4 right-4 p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-lg space-y-2 z-40">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">Node Size</span>
                <span className="text-xs text-gray-700 dark:text-gray-500">{nodeSize}</span>
              </div>
              <Slider
                value={[nodeSize]}
                onValueChange={(value) => setNodeSize(value[0])}
                max={20}
                min={4}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">Link Thickness</span>
                <span className="text-xs text-gray-500">{linkThickness}</span>
              </div>
              <Slider
                value={[linkThickness]}
                onValueChange={(value) => setLinkThickness(value[0])}
                max={5}
                min={0.5}
                step={0.5}
                className="w-full"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">Text Threshold</span>
                <span className="text-xs text-gray-500">{textThreshold.toFixed(1)}</span>
              </div>
              <Slider
                value={[textThreshold]}
                onValueChange={(value) => setTextThreshold(value[0])}
                max={5}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>
            
            {/* Physics Forces */}
            <div className="pt-2 border-t border-gray-700">
              <div className="text-xs text-gray-300 mb-2">Physics Forces</div>
              
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Center Force</span>
                    <span className="text-xs text-gray-500">{centerForce.toFixed(2)}</span>
                  </div>
                  <Slider
                    value={[centerForce]}
                    onValueChange={(value) => setCenterForce(value[0])}
                    max={1}
                    min={0}
                    step={0.05}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Repel Force</span>
                    <span className="text-xs text-gray-500">{repelForce}</span>
                  </div>
                  <Slider
                    value={[repelForce]}
                    onValueChange={(value) => setRepelForce(value[0])}
                    max={-10}
                    min={-300}
                    step={10}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Link Force</span>
                    <span className="text-xs text-gray-500">{linkForce.toFixed(1)}</span>
                  </div>
                  <Slider
                    value={[linkForce]}
                    onValueChange={(value) => setLinkForce(value[0])}
                    max={3}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Link Distance</span>
                    <span className="text-xs text-gray-500">{linkDistance}</span>
                  </div>
                  <Slider
                    value={[linkDistance]}
                    onValueChange={(value) => setLinkDistance(value[0])}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <CardContent className="p-0 bg-transparent">
          <div className={`relative overflow-hidden bg-transparent ${isFullscreen ? 'h-full' : showControls ? 'h-80' : 'h-80'}`}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-transparent">
                <div className="text-gray-500 text-xs">Loading...</div>
              </div>
            ) : graphData.nodes.length === 0 ? (
              <div className="flex items-center justify-center h-full bg-transparent">
                <div className="text-gray-500 text-xs">No notes</div>
              </div>
            ) : (
              <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="transparent"
                nodeColor={(node: GraphNode) => node.color || '#6366f1'}
                nodeVal={(node: GraphNode) => (node.size || nodeSize)}
                nodeLabel={(node: GraphNode) => node.title}
                linkColor={() => '#4b5563'}
                linkWidth={() => linkThickness}
                onNodeClick={handleNodeClick}
                enableNodeDrag={true}
                onNodeDrag={handleNodeDrag}
                onNodeDragEnd={handleNodeDragEnd}
                nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
                  const label = node.title;
                  const fontSize = 10 / globalScale;
                  const radius = (node.size || nodeSize) / 2;
                  
                  // Draw node circle
                  ctx.beginPath();
                  ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
                  ctx.fillStyle = node.color || '#6366f1';
                  ctx.fill();
                  
                  // Draw label when zoomed in enough
                  if (globalScale > textThreshold) {
                    const textWidth = ctx.measureText(label).width;
                    const padding = 4;
                    
                    // Text (no background - fully transparent)
                    ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#e5e7eb';
                    ctx.fillText(label, node.x!, node.y! + radius + fontSize / 2 + 4);
                  }
                }}
                cooldownTicks={120}
                d3AlphaDecay={0.0228}
                d3VelocityDecay={0.4}
                d3AlphaMin={0.001}
                enablePanInteraction={true}
                enableZoomInteraction={true}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalGraphView;
