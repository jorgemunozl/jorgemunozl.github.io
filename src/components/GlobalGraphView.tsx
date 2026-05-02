import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ForceGraph2D, { type NodeObject } from 'react-force-graph-2d';
import * as d3 from 'd3';
import type { ForceLink, ForceManyBody } from 'd3';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X, Maximize2, Minimize2, RefreshCw, Network, Settings, Home } from 'lucide-react';
import { cloneGraphData, GraphData, GraphNode, GraphLink } from '@/utils/wikiLinks';
import { prebuiltGraphData } from '@/components/data/prebuiltGraph';
import { useTheme } from 'next-themes';
import { useSmoothForceGraphZoom, type ForceGraphInstance } from '@/hooks/useSmoothForceGraphZoom';
import { cn } from '@/lib/utils';

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
  const [resetNonce, setResetNonce] = useState(0);
  
  // Graph customization options
  const [nodeSize, setNodeSize] = useState(5);
  const [linkThickness, setLinkThickness] = useState(1);
  const [textThreshold, setTextThreshold] = useState(2.0);

  // Physics forces — calibrated to feel close to Obsidian's living layout.
  const [centerForce, setCenterForce] = useState(0);
  const [repelForce, setRepelForce] = useState(-90);
  const [linkForce, setLinkForce] = useState(1);
  const [linkDistance, setLinkDistance] = useState(40);
  
  // Drag rearrangement timer
  const rearrangeTimeoutRef = useRef<number | null>(null);
  const middlePanStateRef = useRef<{ x: number; y: number } | null>(null);
  const isMiddlePanningRef = useRef(false);
  const nodeDragResumedRef = useRef(false);
  const idleAlphaTimeoutRef = useRef<number | null>(null);

  const resumeGraphAnimation = useCallback(() => {
    graphRef.current?.resumeAnimation?.();
  }, []);

  // Set alpha target to 0 so simulation pauses when settled.
  // This saves CPU when the graph is not being interacted with.
  const IDLE_ALPHA_TARGET = 0;

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      setGraphData(cloneGraphData(prebuiltGraphData));
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

      fg.d3AlphaTarget(IDLE_ALPHA_TARGET);
      fg.d3ReheatSimulation();
    }
  }, [centerForce, repelForce, linkForce, linkDistance]);

  // Establish the idle baseline once the graph has stabilised, instead of
  // pausing the animation outright. This prevents the canvas from going stale
  // between interactions.
  useEffect(() => {
    if (isLoading || graphData.nodes.length === 0) return;
    const fg = graphRef.current;
    if (!fg) return;

    if (idleAlphaTimeoutRef.current !== null) {
      window.clearTimeout(idleAlphaTimeoutRef.current);
    }

    idleAlphaTimeoutRef.current = window.setTimeout(() => {
      if (graphRef.current === fg) {
        fg.d3AlphaTarget(IDLE_ALPHA_TARGET);
      }
      idleAlphaTimeoutRef.current = null;
    }, 600);

    return () => {
      if (idleAlphaTimeoutRef.current !== null) {
        window.clearTimeout(idleAlphaTimeoutRef.current);
        idleAlphaTimeoutRef.current = null;
      }
    };
  }, [isLoading, graphData.nodes.length]);

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
      setGraphData(cloneGraphData(prebuiltGraphData));
      setIsLoading(false);
    }, 500);
  };

  const resetGraph = useCallback(() => {
    // "F5" behavior: reload graph data + reset camera.
    setIsLoading(true);
    setGraphData(cloneGraphData(prebuiltGraphData));
    // Delay so the loading state change is processed and effects fire
    setTimeout(() => {
      setIsLoading(false);
      setResetNonce((n) => n + 1);
    }, 50);
  }, []);

  useEffect(() => {
    if (isLoading || graphData.nodes.length === 0) return;
    const fg = graphRef.current;
    if (!fg) return;
    try {
      fg.resumeAnimation?.();
      fg.d3AlphaTarget(0.08);
      fg.zoomToFit(650, inline ? 20 : isFullscreen ? 120 : 36);
    } catch {
      /* ignore zoom errors before the graph is fully laid out */
    }
    const t = window.setTimeout(() => {
      if (graphRef.current === fg) fg.d3AlphaTarget(IDLE_ALPHA_TARGET);
    }, 900);
    return () => window.clearTimeout(t);
  }, [resetNonce, isLoading, graphData.nodes.length, inline, isFullscreen]);

  const handleNodeDrag = useCallback(() => {
    if (!nodeDragResumedRef.current) {
      nodeDragResumedRef.current = true;
      graphRef.current?.resumeAnimation?.();
    }
    graphRef.current?.d3AlphaTarget(0.25);
  }, []);

  // Smooth release after dragging (Obsidian-like)
  const handleNodeDragEnd = (node: NodeObject<GraphNode>) => {
    nodeDragResumedRef.current = false;
    if (rearrangeTimeoutRef.current) {
      window.clearTimeout(rearrangeTimeoutRef.current);
    }

    // Let neighbours nudge for a moment, then release the fixed position and
    // relax back to the idle alpha baseline so the layout keeps drifting.
    rearrangeTimeoutRef.current = window.setTimeout(() => {
      node.fx = undefined;
      node.fy = undefined;
      graphRef.current?.d3AlphaTarget(IDLE_ALPHA_TARGET);
    }, 2000);
  };

  useSmoothForceGraphZoom(graphRef, graphContainerRef, {
    minZoom: 0.25,
    maxZoom: 6,
    onZoomInteraction: resumeGraphAnimation,
    resetKey: resetNonce,
    attachKey: isVisible ? 1 : 0,
  });

  // Enable middle-mouse panning (prevents browser auto-scroll)
  useEffect(() => {
    const container = graphContainerRef.current;
    if (!container) return;

    const startMiddlePan = (event: MouseEvent) => {
      if (event.button !== 1) return;
      event.preventDefault();
      graphRef.current?.resumeAnimation?.();
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
        const g = graphRef.current;
        if (!g) return;
        try {
          g.resumeAnimation?.();
          g.zoomToFit(400, 20); // Reduced padding from 50 to 20 for closer zoom
        } catch {
          /* ignore */
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
      <Card
        className={cn(
          'group graph-card-light card-hover-glow overflow-hidden rounded-xl shadow-lg',
          inline
            ? '!border-2 !border-slate-300/50 dark:!border-white/20 bg-white/70 dark:bg-gray-900/70'
            : 'border border-slate-200/60 dark:border-gray-700/40 bg-white/80 dark:bg-gray-900/80',
          inline && 'w-full',
          isFullscreen && 'h-full max-w-none w-full bg-black/85 dark:bg-black/85',
          showControls ? (isFullscreen ? 'h-full' : 'h-auto') : isFullscreen ? 'h-full' : undefined
        )}
        style={!isFullscreen && !inline ? { width: dimensions.width } : undefined}
      >
        
        {/* Detachable Controls Arrow - appears on hover (hide close button if inline) */}
        <div className="absolute -top-2 -right-2 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300 z-50">
          <div className="flex items-center space-x-1 bg-white/95 dark:bg-gray-800/90 rounded-full px-2 py-1 border border-slate-200/60 dark:border-gray-600/40 shadow-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetGraph}
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white p-1 h-6 w-6 rounded-full"
              title="Reset graph"
            >
              <Home className="w-3 h-3" />
            </Button>
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
          <div className="absolute top-4 left-4 right-4 p-3 bg-white/95 dark:bg-gray-800/95 rounded-xl border border-slate-200/60 dark:border-gray-600/40 shadow-xl space-y-2 z-40">
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
            {/* Decorative backdrop behind the canvas (stays under nodes/links) */}
            <div
              className={cn(
                'pointer-events-none absolute inset-0 z-0',
                isLightGraph
                  ? 'bg-[radial-gradient(ellipse_85%_55%_at_50%_-12%,rgba(16,185,129,0.16),transparent_58%),radial-gradient(ellipse_50%_48%_at_98%_92%,rgba(59,130,246,0.11),transparent_52%),radial-gradient(ellipse_42%_40%_at_4%_88%,rgba(20,184,166,0.10),transparent_48%),linear-gradient(168deg,rgba(248,250,252,0.97)_0%,rgba(236,253,245,0.65)_42%,rgba(240,253,250,0.5)_100%)]'
                  : 'bg-[radial-gradient(ellipse_78%_48%_at_50%_-8%,rgba(139,92,246,0.28),transparent_56%),radial-gradient(ellipse_52%_42%_at_96%_96%,rgba(59,130,246,0.18),transparent_50%),radial-gradient(ellipse_48%_38%_at_6%_45%,rgba(236,72,153,0.12),transparent_46%),radial-gradient(ellipse_65%_45%_at_50%_110%,rgba(14,165,233,0.10),transparent_55%),linear-gradient(185deg,rgba(15,23,42,0.98)_0%,rgba(49,46,129,0.45)_55%,rgba(15,23,42,0.92)_100%)]'
              )}
              aria-hidden
            />
            <div
              className={cn(
                'pointer-events-none absolute inset-0 z-0',
                isLightGraph ? 'opacity-[0.5]' : 'opacity-[0.28]'
              )}
              style={{
                backgroundImage: isLightGraph
                  ? 'radial-gradient(rgba(15, 118, 110, 0.09) 1.5px, transparent 1.5px)'
                  : 'radial-gradient(rgba(196, 181, 253, 0.16) 1.5px, transparent 1.5px)',
                backgroundSize: '22px 22px',
              }}
              aria-hidden
            />
            <div className="relative z-[1] h-full w-full min-h-0">
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
                nodeVal={(node: GraphNode) => {
                  const base = node.size ?? 6;
                  const scaled = base * (nodeSize / 5);
                  return scaled * scaled; // nodeVal represents area in react-force-graph
                }}
                nodeLabel={(node: GraphNode) => node.title}
                linkColor={() => (isLightGraph ? '#94a3b8' : '#4b5563')}
                linkWidth={() => linkThickness}
                onNodeClick={handleNodeClick}
                enableNodeDrag={true}
                onNodeDrag={handleNodeDrag}
                onNodeDragEnd={handleNodeDragEnd}
                onEngineStop={() => {
                  // Stay alive at a low idle alpha so pan/zoom redraws stay
                  // crisp; the simulation effectively idles instead of freezing.
                  graphRef.current?.d3AlphaTarget(IDLE_ALPHA_TARGET);
                }}
                nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
                  const label = node.title;
                  const nx = node.x;
                  const ny = node.y;

                  if (
                    typeof nx !== 'number' ||
                    typeof ny !== 'number' ||
                    !Number.isFinite(nx) ||
                    !Number.isFinite(ny) ||
                    !Number.isFinite(globalScale) ||
                    globalScale <= 0
                  ) {
                    return;
                  }

                  const fontSize = 10 / globalScale;
                  const base = node.size ?? 6;
                  const radius = (base * (nodeSize / 5)) / 2;

                  ctx.beginPath();
                  ctx.arc(nx, ny, radius, 0, 2 * Math.PI);
                  ctx.fillStyle = resolveNodeFill(node);
                  ctx.fill();

                  if (globalScale > textThreshold) {
                    ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = isLightGraph ? '#1e293b' : '#e5e7eb';
                    ctx.fillText(label, nx, ny + radius + fontSize / 2 + 4);
                  }
                }}
                cooldownTicks={Infinity}
                cooldownTime={Infinity}
                d3AlphaDecay={0.0228}
                d3VelocityDecay={0.4}
                d3AlphaMin={0.001}
                enablePanInteraction={true}
                enableZoomInteraction={true}
                minZoom={0.25}
                maxZoom={6}
              />
            )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalGraphView;
