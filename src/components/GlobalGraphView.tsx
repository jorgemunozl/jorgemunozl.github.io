import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ForceGraph2D, { type NodeObject } from 'react-force-graph-2d';
import * as d3 from 'd3';
import type { ForceLink, ForceManyBody } from 'd3';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X, Maximize2, Minimize2, RefreshCw, Network, Settings } from 'lucide-react';
import { buildGraphFromPosts, GraphData, GraphNode, GraphLink } from '@/utils/wikiLinks';
import { blogPosts } from '@/components/data/notes';
import { useTheme } from 'next-themes';
import { useSmoothForceGraphZoom, type ForceGraphInstance } from '@/hooks/useSmoothForceGraphZoom';

interface GlobalGraphViewProps {
  isVisible: boolean;
  onClose: () => void;
  onNodeClick?: (nodeId: string) => void;
  inline?: boolean; // New prop for inline/centered display
}

const GlobalGraphView: React.FC<GlobalGraphViewProps> = ({ 
  isVisible, 
  onClose, 
  onNodeClick,
  inline = false
}) => {
  const graphRef = useRef<ForceGraphInstance<GraphNode, GraphLink> | null>(null);
  const graphContainerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const isLightGraph = resolvedTheme !== 'dark';

  const resolveNodeFill = (node: GraphNode) => {
    if (isLightGraph) {
      if (node.group === 2) return '#34d399';
      return '#059669';
    }
    return node.color ?? '#6366f1';
  };
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
  const [repelForce, setRepelForce] = useState(-120);
  const [linkForce, setLinkForce] = useState(1);
  const [linkDistance, setLinkDistance] = useState(30);
  
  // Drag rearrangement timer
  const rearrangeTimeoutRef = useRef<number | null>(null);
  const middlePanStateRef = useRef<{ x: number; y: number } | null>(null);
  const isMiddlePanningRef = useRef(false);

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      
      // Build global graph data from all posts
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

  useLayoutEffect(() => {
    if (!inline) {
      const updateDimensions = () => {
        if (isFullscreen) {
          setDimensions({
            width: window.innerWidth - 100,
            height: window.innerHeight - 100
          });
        } else {
          setDimensions({ width: 500, height: 500 });
        }
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }

    const element = graphContainerRef.current;
    if (!element) return;

    const updateInlineDimensions = () => {
      const width = element.clientWidth;
      if (width <= 0) return;
      const height = Math.max(360, Math.min(600, Math.round(width * 0.65)));
      setDimensions({ width, height });
    };

    updateInlineDimensions();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateInlineDimensions);
      return () => window.removeEventListener('resize', updateInlineDimensions);
    }

    const resizeObserver = new ResizeObserver(updateInlineDimensions);
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [isFullscreen, inline]);

  // Update graph forces when parameters change
  useEffect(() => {
    if (graphRef.current) {
      const fg = graphRef.current;

      // Center attraction via radial force to avoid .strength on center (not supported)
      if (centerForce > 0) {
        fg.d3Force('radial', d3.forceRadial(0).strength(centerForce));
      } else {
        fg.d3Force('radial', null);
      }

      // Update charge and link forces
      const charge = fg.d3Force('charge') as ForceManyBody<NodeObject<GraphNode>> | undefined;
      if (charge) {
        charge.strength(repelForce);
      }

      const link = fg.d3Force('link') as ForceLink<NodeObject<GraphNode>, GraphLink> | undefined;
      if (link) {
        link.strength(linkForce).distance(linkDistance);
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

  // Smooth release after dragging (Obsidian-like)
  const handleNodeDragEnd = (node: NodeObject<GraphNode>) => {
    // Clear any existing rearrangement timeout
    if (rearrangeTimeoutRef.current) {
      window.clearTimeout(rearrangeTimeoutRef.current);
    }

    // After 2 seconds, start smooth rearrangement like Obsidian
    rearrangeTimeoutRef.current = window.setTimeout(() => {
      // Release the fixed position
      node.fx = undefined;
      node.fy = undefined;
    }, 2000);
  };

  useSmoothForceGraphZoom(graphRef, graphContainerRef, {
    minZoom: 0.25,
    maxZoom: 6,
    sensitivity: 0.0012,
    smoothing: 0.04,
    momentum: 0.97,
  });

  // Enable middle-mouse panning (prevents browser auto-scroll)
  useEffect(() => {
    const container = graphContainerRef.current;
    if (!container) return;

    const startMiddlePan = (event: MouseEvent) => {
      if (event.button !== 1) return;
      event.preventDefault();
      isMiddlePanningRef.current = true;
      middlePanStateRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMiddlePanningRef.current || !graphRef.current) return;
      const last = middlePanStateRef.current;
      if (!last) return;

      const dx = event.clientX - last.x;
      const dy = event.clientY - last.y;
      middlePanStateRef.current = { x: event.clientX, y: event.clientY };

      const zoom = graphRef.current.zoom?.();
      const center = graphRef.current.centerAt?.();
      if (typeof zoom !== 'number' || !center || typeof center.x !== 'number' || typeof center.y !== 'number') {
        return;
      }

      graphRef.current.centerAt(center.x - dx / zoom, center.y - dy / zoom);
    };

    const stopMiddlePan = (event?: MouseEvent) => {
      if (event && event.button !== 1) return;
      isMiddlePanningRef.current = false;
      middlePanStateRef.current = null;
    };

    const preventAuxClick = (event: MouseEvent) => {
      if (event.button === 1) {
        event.preventDefault();
      }
    };

    container.addEventListener('mousedown', startMiddlePan, { passive: false });
    container.addEventListener('auxclick', preventAuxClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopMiddlePan);
    container.addEventListener('mouseleave', stopMiddlePan);

    return () => {
      container.removeEventListener('mousedown', startMiddlePan);
      container.removeEventListener('auxclick', preventAuxClick);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopMiddlePan);
      container.removeEventListener('mouseleave', stopMiddlePan);
    };
  }, []);

  // Auto-fit graph to visible area when in inline mode
  useEffect(() => {
    if (inline && !isLoading && graphData.nodes.length > 0 && graphRef.current) {
      // Wait a bit for the graph to stabilize, then fit to view with less padding for more zoom
      const timer = setTimeout(() => {
        if (graphRef.current) {
          graphRef.current.zoomToFit(400, 20); // Reduced padding from 50 to 20 for closer zoom
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inline, isLoading, graphData.nodes.length]);

  if (!isVisible) return null;

  const containerClasses = inline 
    ? 'relative w-full'
    : isFullscreen
      ? 'fixed inset-0 z-50 bg-black/90 dark:bg-black/90 flex items-center justify-center'
      : 'fixed bottom-20 right-4 z-40';

  return (
    <div className={containerClasses}>
      <Card className={`group graph-card-light card-hover-glow ${inline ? 'border-transparent bg-transparent shadow-none' : 'border border-slate-600 dark:border-gray-700/30 shadow-sm'} rounded-lg ${inline ? 'w-full' : ''} ${isFullscreen ? 'w-full h-full max-w-none' : ''} ${showControls ? (isFullscreen ? 'h-full' : 'h-auto') : (isFullscreen ? 'h-full' : '')}`} style={!isFullscreen && !inline ? { width: dimensions.width } : undefined}>
        
        {/* Detachable Controls Arrow - appears on hover (hide close button if inline) */}
        <div className="absolute -top-2 -right-2 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300 z-50">
          <div className="flex items-center space-x-1 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 border border-slate-600 dark:border-gray-700/50 shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowControls(!showControls)}
              className="text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-400 p-1 h-6 w-6 rounded-full"
              title="Settings"
            >
              <Settings className="w-3 h-3" />
            </Button>
            {!inline && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-600 hover:text-red-700 dark:text-gray-400 dark:hover:text-red-400 p-1 h-6 w-6 rounded-full"
                title="Close"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Graph Controls - floating overlay when visible */}
        {showControls && (
          <div className="absolute top-4 left-4 right-4 p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg border border-slate-600 dark:border-gray-700/50 shadow-lg space-y-2 z-40">
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
          <div
            ref={graphContainerRef}
            className={`relative overflow-hidden touch-none overscroll-contain bg-transparent ${isFullscreen || inline ? 'h-full' : ''}`}
            style={!isFullscreen && !inline ? { height: dimensions.height } : inline ? { height: dimensions.height } : undefined}
          >
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
                nodeColor={(node: GraphNode) => resolveNodeFill(node)}
                // Scale intrinsic node size by the slider to ensure slider always has effect
                nodeVal={(node: GraphNode) => {
                  const base = node.size || 10;
                  return base * (nodeSize / 6);
                }}
                nodeLabel={(node: GraphNode) => node.title}
                linkColor={() => (isLightGraph ? '#94a3b8' : '#4b5563')}
                linkWidth={() => linkThickness}
                onNodeClick={handleNodeClick}
                enableNodeDrag={true}
                onNodeDragEnd={handleNodeDragEnd}
                nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
                  const label = node.title;
                  const fontSize = 10 / globalScale;
                  const radius = ((node.size || 10) * (nodeSize / 6)) / 2;
                  
                  // Draw node circle
                  ctx.beginPath();
                  ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
                  ctx.fillStyle = resolveNodeFill(node);
                  ctx.fill();
                  
                  // Draw label when zoomed in enough
                  if (globalScale > textThreshold) {
                    // Text (no background - fully transparent)
                    ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = isLightGraph ? '#1e293b' : '#e5e7eb';
                    ctx.fillText(label, node.x!, node.y! + radius + fontSize / 2 + 4);
                  }
                }}
                cooldownTicks={50}
                d3AlphaDecay={0.05}
                d3VelocityDecay={0.3}
                d3AlphaMin={0.001}
                enablePanInteraction={true}
                enableZoomInteraction={true}
                minZoom={0.25}
                maxZoom={6}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalGraphView;
