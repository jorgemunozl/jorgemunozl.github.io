import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { ForceLink, ForceManyBody } from 'd3';
import ForceGraph2D, { type NodeObject } from 'react-force-graph-2d';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X, Maximize2, Minimize2, RefreshCw, Network, Settings, Home } from 'lucide-react';
import {
  cloneGraphData,
  filterGraphToNeighborhood,
  GraphData,
  GraphNode,
  GraphLink,
} from '@/utils/wikiLinks';
import { prebuiltGraphData } from '@/components/data/prebuiltGraph';
import { useTheme } from 'next-themes';
import { useSmoothForceGraphZoom, type ForceGraphInstance } from '@/hooks/useSmoothForceGraphZoom';

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
  const graphRef = useRef<ForceGraphInstance<GraphNode, GraphLink> | null>(null);
  const graphContainerRef = useRef<HTMLDivElement | null>(null);
  const settleAnimationRef = useRef<number | null>(null);
  const alphaResetTimeoutRef = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();
  const isLightGraph = resolvedTheme !== 'dark';
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 350, height: 250 });
  const [showControls, setShowControls] = useState(false);
  const [resetNonce, setResetNonce] = useState(0);
  const dragCooldownTimeout = useRef<number | null>(null);
  const nodeDragResumedRef = useRef(false);

  const resumeGraphAnimation = useCallback(() => {
    graphRef.current?.resumeAnimation?.();
  }, []);

  // Graph customization options — defaults are tuned to match Obsidian.
  const [nodeSize, setNodeSize] = useState(5);
  const [linkThickness, setLinkThickness] = useState(1);
  const [textThreshold, setTextThreshold] = useState(2.0);

  // Physics forces — calibrated to feel close to Obsidian's living layout.
  const [centerForce, setCenterForce] = useState(0); // start with no radial pull
  const [repelForce, setRepelForce] = useState(-90);
  const [linkForce, setLinkForce] = useState(1);
  const [linkDistance, setLinkDistance] = useState(50);

  // Tiny non-zero alpha keeps the layout breathing, like Obsidian's graph.
  const IDLE_ALPHA_TARGET = 0.015;

  // Simpler drag behavior to avoid jumps/teleport

  const buildLocalGraph = useCallback((centerTitle: string) => {
    const data = filterGraphToNeighborhood(cloneGraphData(prebuiltGraphData), centerTitle);
    data.nodes = data.nodes.map((node) => ({
      ...node,
      color: node.id === centerTitle ? '#EF4444' : node.color,
      size: node.id === centerTitle ? (node.size || 10) + 4 : node.size,
    }));
    return data;
  }, []);

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      setGraphData(buildLocalGraph(currentNote));
      setIsLoading(false);
    }
  }, [isVisible, currentNote, buildLocalGraph]);

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

  useEffect(() => {
    return () => {
      if (dragCooldownTimeout.current) {
        clearTimeout(dragCooldownTimeout.current);
        dragCooldownTimeout.current = null;
      }
      if (settleAnimationRef.current !== null) {
        cancelAnimationFrame(settleAnimationRef.current);
        settleAnimationRef.current = null;
      }
      if (alphaResetTimeoutRef.current !== null) {
        clearTimeout(alphaResetTimeoutRef.current);
        alphaResetTimeoutRef.current = null;
      }
    };
  }, []);

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
      setGraphData(buildLocalGraph(currentNote));
      setIsLoading(false);
    }, 500);
  };

  const resetGraph = useCallback(() => {
    // "F5" behavior: rebuild the local graph from source data + reset camera.
    setIsLoading(true);
    setGraphData(buildLocalGraph(currentNote));
    setIsLoading(false);
    setResetNonce((n) => n + 1);
  }, [buildLocalGraph, currentNote]);

  useEffect(() => {
    if (isLoading || graphData.nodes.length === 0) return;
    const fg = graphRef.current;
    if (!fg) return;
    fg.resumeAnimation?.();
    fg.d3AlphaTarget(0.08);
    fg.zoomToFit(isFullscreen ? 900 : 600, isFullscreen ? 120 : 36);
    const t = window.setTimeout(() => {
      if (graphRef.current === fg) fg.d3AlphaTarget(IDLE_ALPHA_TARGET);
    }, 900);
    return () => window.clearTimeout(t);
  }, [resetNonce, isLoading, graphData.nodes.length, isFullscreen]);

  const handleNodeDrag = (node: NodeObject<GraphNode>) => {
    if (!nodeDragResumedRef.current) {
      nodeDragResumedRef.current = true;
      graphRef.current?.resumeAnimation?.();
    }
    node.fx = node.x;
    node.fy = node.y;
    if (graphRef.current) {
      graphRef.current.d3AlphaTarget(0.25);
      graphRef.current.d3ReheatSimulation();
    }
  };

  const handleNodeDragEnd = (node: NodeObject<GraphNode>) => {
    nodeDragResumedRef.current = false;
    node.fx = undefined;
    node.fy = undefined;
    if (graphRef.current) {
      const fg = graphRef.current;
      // Brief settle phase, then relax to the idle baseline (instead of 0)
      // so the simulation continues to breathe.
      fg.d3AlphaTarget(0.08);
      fg.d3ReheatSimulation();
      if (dragCooldownTimeout.current) {
        clearTimeout(dragCooldownTimeout.current);
      }
      dragCooldownTimeout.current = window.setTimeout(() => {
        if (graphRef.current === fg) {
          fg.d3AlphaTarget(IDLE_ALPHA_TARGET);
        }
        dragCooldownTimeout.current = null;
      }, 2000);
    }
  };

  // Smoothly re-center graph when data or layout context changes
  useEffect(() => {
    if (isLoading || graphData.nodes.length === 0) {
      return;
    }

    if (settleAnimationRef.current !== null) {
      cancelAnimationFrame(settleAnimationRef.current);
      settleAnimationRef.current = null;
    }
    if (alphaResetTimeoutRef.current !== null) {
      clearTimeout(alphaResetTimeoutRef.current);
      alphaResetTimeoutRef.current = null;
    }

    settleAnimationRef.current = requestAnimationFrame(() => {
      const fg = graphRef.current;
      if (!fg) return;

      fg.resumeAnimation?.();

      const container = graphContainerRef.current;
      const containerHasSize =
        container && container.offsetWidth > 0 && container.offsetHeight > 0;
      const padding = isFullscreen ? 120 : 36;
      const duration = isFullscreen ? 900 : 520;

      if (containerHasSize) {
        fg.zoomToFit(duration, padding);
      }

      fg.d3AlphaTarget(0.15);
      alphaResetTimeoutRef.current = window.setTimeout(() => {
        if (graphRef.current === fg) {
          // Settle back to the idle baseline so subtle drift continues.
          fg.d3AlphaTarget(IDLE_ALPHA_TARGET);
        }
        alphaResetTimeoutRef.current = null;
      }, duration + 160);
    });

    return () => {
      if (settleAnimationRef.current !== null) {
        cancelAnimationFrame(settleAnimationRef.current);
        settleAnimationRef.current = null;
      }
      if (alphaResetTimeoutRef.current !== null) {
        clearTimeout(alphaResetTimeoutRef.current);
        alphaResetTimeoutRef.current = null;
      }
    };
  }, [graphData, isLoading, isFullscreen]);

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black/90 dark:bg-black/90 flex items-center justify-center'
    : 'fixed bottom-4 right-4 z-40';

  useSmoothForceGraphZoom(graphRef, graphContainerRef, {
    minZoom: 0.25,
    maxZoom: 6,
    onZoomInteraction: resumeGraphAnimation,
    resetKey: resetNonce,
    attachKey: isVisible ? 1 : 0,
  });

  if (!isVisible) return null;

  return (
    <div className={containerClasses}>
      <Card className={`group graph-card-light card-hover-glow rounded-lg border border-slate-300/80 shadow-sm dark:border-gray-700/30 ${isFullscreen ? 'w-full h-full max-w-none' : ''} ${showControls ? (isFullscreen ? 'h-full' : 'h-auto') : (isFullscreen ? 'h-full' : '')}`}
        style={!isFullscreen ? { width: dimensions.width } : undefined}
      >
        
        {/* Detachable Controls Arrow - appears on hover */}
        <div className="absolute -top-2 -right-2 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300 z-50">
          <div className="flex items-center space-x-1 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 border border-slate-300/80 dark:border-gray-700/50 shadow-sm">
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
          <div className="absolute top-4 left-4 right-4 p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg border border-slate-300/80 dark:border-gray-700/50 shadow-lg space-y-2 z-40">
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
          <div
            ref={graphContainerRef}
            className={`relative overflow-hidden touch-none overscroll-contain ${isFullscreen ? 'h-full' : ''}`}
            style={!isFullscreen ? { height: dimensions.height } : undefined}
          >
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
                  return isLightGraph ? '#059669' : '#6366f1';
                }}
                nodeVal={(node: GraphNode) => {
                  const base = node.size ?? 6;
                  const scaled = base * (nodeSize / 5) * (node.id === currentNote ? 1.5 : 1);
                  return scaled * scaled;
                }}
                nodeLabel={(node: GraphNode) => node.title}
                linkColor={() => (isLightGraph ? '#94a3b8' : '#4b5563')}
                linkWidth={() => linkThickness}
                onNodeClick={handleNodeClick}
                enableNodeDrag={true}
                onNodeDrag={handleNodeDrag}
                onNodeDragEnd={handleNodeDragEnd}
                onEngineStop={() => {
                  // Keep the simulation idling so pan/zoom redraws stay
                  // crisp; freezing causes stale frames during interactions.
                  graphRef.current?.d3AlphaTarget(IDLE_ALPHA_TARGET);
                }}
                nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
                  const label = node.title;
                  const fontSize = 10 / globalScale;
                  const base = node.size ?? 6;
                  const radius = (base * (nodeSize / 5) * (node.id === currentNote ? 1.5 : 1)) / 2;

                  ctx.beginPath();
                  ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
                  if (node.id === currentNote) {
                    ctx.fillStyle = '#ef4444';
                  } else {
                    ctx.fillStyle = isLightGraph ? '#059669' : '#6366f1';
                  }
                  ctx.fill();

                  if (globalScale > textThreshold) {
                    ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = isLightGraph ? '#1e293b' : '#e5e7eb';
                    ctx.fillText(label, node.x!, node.y! + radius + fontSize / 2 + 4);
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
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalGraphView;
