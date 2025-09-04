import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X, Maximize2, Minimize2, RefreshCw, Network, Settings } from 'lucide-react';
import { buildGraphFromPosts, GraphData, GraphNode, GraphLink, findRelatedNotes } from '@/utils/wikiLinks';
import { blogPosts, BlogPost } from '@/components/data/notes';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 350, height: 250 });
  const [showControls, setShowControls] = useState(false);
  
  // Graph customization options
  const [nodeSize, setNodeSize] = useState(8);
  const [linkThickness, setLinkThickness] = useState(1);
  const [textThreshold, setTextThreshold] = useState(2.0);
  
  // Physics forces
  const [centerForce, setCenterForce] = useState(0); // start with no radial pull
  const [repelForce, setRepelForce] = useState(-120);
  const [linkForce, setLinkForce] = useState(1);
  const [linkDistance, setLinkDistance] = useState(60);

  // Simpler drag behavior to avoid jumps/teleport

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

  // Update graph forces when parameters change
  useEffect(() => {
    if (graphRef.current) {
      const fg = graphRef.current;
      
      // Center attraction via radial force (forceCenter has no strength)
      if (centerForce > 0) {
        fg.d3Force('radial', d3.forceRadial(0).strength(centerForce));
      } else {
        fg.d3Force('radial', null);
      }

      // Update charge and link forces
      const charge = fg.d3Force('charge');
      if (charge && typeof (charge as any).strength === 'function') {
        (charge as any).strength(repelForce);
      }
      const link = fg.d3Force('link');
      if (link && typeof (link as any).strength === 'function') {
        (link as any).strength(linkForce).distance(linkDistance);
      }
      
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

  const handleNodeDrag = (node: any) => {
    // Let force-graph compute the translate; we just fix to current layout coords
    node.fx = node.x;
    node.fy = node.y;
  };

  const handleNodeDragEnd = (node: any) => {
    node.fx = undefined;
    node.fy = undefined;
  };

  if (!isVisible) return null;

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black/90 dark:bg-black/90 flex items-center justify-center'
    : 'fixed bottom-4 right-4 z-40';

  return (
    <div className={containerClasses}>
      <Card className={`group graph-card-light card-hover-glow border border-gray-400/60 dark:border-gray-700/30 shadow-sm rounded-lg ${isFullscreen ? 'w-full h-full max-w-none' : ''} ${showControls ? (isFullscreen ? 'h-full' : 'h-auto') : (isFullscreen ? 'h-full' : '')}`}
        style={!isFullscreen ? { width: dimensions.width } : undefined}
      >
        
        {/* Detachable Controls Arrow - appears on hover */}
        <div className="absolute -top-2 -right-2 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300 z-50">
          <div className="flex items-center space-x-1 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 border border-gray-400/60 dark:border-gray-700/50 shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowControls(!showControls)}
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-purple-400 p-1 h-6 w-6 rounded-full"
              title="Settings"
            >
              <Settings className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-600 hover:text-red-700 dark:text-gray-400 dark:hover:text-red-400 p-1 h-6 w-6 rounded-full"
              title="Close"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Graph Controls - floating overlay when visible */}
        {showControls && (
          <div className="absolute top-4 left-4 right-4 p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg border border-gray-400/60 dark:border-gray-700/50 shadow-lg space-y-2 z-40">
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
                <span className="text-xs text-gray-700 dark:text-gray-500">{linkThickness}</span>
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
                <span className="text-xs text-gray-700 dark:text-gray-500">{textThreshold.toFixed(1)}</span>
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
            <div className="pt-2 border-t border-gray-600/50 dark:border-gray-700">
              <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">Physics Forces</div>
              
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Center Force</span>
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
                    <span className="text-xs text-gray-700 dark:text-gray-500">{repelForce}</span>
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
                    <span className="text-xs text-gray-700 dark:text-gray-500">{linkForce.toFixed(1)}</span>
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
                    <span className="text-xs text-gray-700 dark:text-gray-500">{linkDistance}</span>
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
          <div className={`relative overflow-hidden ${isFullscreen ? 'h-full' : ''}`} style={!isFullscreen ? { height: dimensions.height } : undefined}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-gray-50/50 dark:bg-gray-900/50">
                <div className="text-gray-500 dark:text-gray-500 text-xs">Loading...</div>
              </div>
            ) : graphData.nodes.length === 0 ? (
              <div className="flex items-center justify-center h-full bg-gray-50/50 dark:bg-gray-900/50">
                <div className="text-gray-500 dark:text-gray-500 text-xs">No connections</div>
              </div>
            ) : (
              <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="transparent"
                nodeColor={(node: GraphNode) => {
                  if (node.id === currentNote) return '#ef4444';
                  return theme === 'dark' ? '#6366f1' : '#8b5cf6';
                }}
                nodeVal={(node: GraphNode) => node.id === currentNote ? nodeSize * 1.5 : nodeSize}
                nodeLabel={(node: GraphNode) => node.title}
                linkColor={() => theme === 'dark' ? '#4b5563' : '#6b7280'}
                linkWidth={() => linkThickness}
                onNodeClick={handleNodeClick}
                enableNodeDrag={true}
                onNodeDrag={handleNodeDrag}
                onNodeDragEnd={handleNodeDragEnd}
                nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
                  const label = node.title;
                  const fontSize = 10 / globalScale;
                  const radius = (node.id === currentNote ? nodeSize * 1.5 : nodeSize) / 2;
                  
                  // Draw node circle
                  ctx.beginPath();
                  ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
                  if (node.id === currentNote) {
                    ctx.fillStyle = '#ef4444';
                  } else {
                    ctx.fillStyle = theme === 'dark' ? '#6366f1' : '#8b5cf6';
                  }
                  ctx.fill();
                  
                  // Draw label when zoomed in enough
                  if (globalScale > textThreshold) {
                    const textWidth = ctx.measureText(label).width;
                    const padding = 4;
                    
                    // Text (no background - fully transparent)
                    ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = theme === 'dark' ? '#e5e7eb' : '#374151';
                    ctx.fillText(label, node.x!, node.y! + radius + fontSize / 2 + 4);
                  }
                }}
                // Let it settle and stop to avoid constant jitter
                cooldownTicks={120}
                d3AlphaDecay={0.03}
                d3VelocityDecay={0.25}
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

export default LocalGraphView;
