import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import type { ForceGraphMethods } from 'react-force-graph-2d';

interface SmoothZoomOptions {
  minZoom?: number;
  maxZoom?: number;
  sensitivity?: number;
  smoothing?: number;
  damping?: number;
  momentum?: number;
  /** e.g. resume canvas redraw after idle pause */
  onZoomInteraction?: () => void;
}

export type ForceGraphInstance<
  NodeType = Record<string, unknown>,
  LinkType = Record<string, unknown>
> = ForceGraphMethods<NodeType, LinkType> & {
  d3AlphaTarget: (
    alphaTarget?: number
  ) => number | ForceGraphMethods<NodeType, LinkType>;
  canvas: () => HTMLCanvasElement | null;
  enableZoomInteraction?: (
    enable?: boolean | ((event: MouseEvent) => boolean)
  ) => boolean | ForceGraphMethods<NodeType, LinkType>;
  pauseAnimation?: () => void;
  resumeAnimation?: () => void;
};

export const useSmoothForceGraphZoom = <
  NodeType = Record<string, unknown>,
  LinkType = Record<string, unknown>
>(
  graphRef: MutableRefObject<ForceGraphInstance<NodeType, LinkType> | null>,
  containerRef: MutableRefObject<HTMLElement | null>,
  options: SmoothZoomOptions = {}
) => {
  const {
    minZoom = 0.3,
    maxZoom = 6,
    sensitivity = 0.0007,
    smoothing = 0.04,
    damping: dampingOverride,
    onZoomInteraction,
  } = options;

  // Damping is the Lerp factor that controls how heavy the camera feels.
  const damping = Math.min(0.6, Math.max(0.01, dampingOverride ?? smoothing * 5));
  const zoomSpeed = sensitivity;

  // Track target (where we want to be) and current (where we are)
  const target = useRef({ k: 1, x: 0, y: 0 });
  const current = useRef({ k: 1, x: 0, y: 0 });
  const reqAnimFrame = useRef<number>();
  const isAnimating = useRef(false);

  useEffect(() => {
    const fg = graphRef.current;
    if (!fg) return;

    // Initialize positions based on current graph state
    const initialZoom = fg.zoom();
    const initialCenter = fg.centerAt();

    current.current = { k: initialZoom, x: initialCenter.x, y: initialCenter.y };
    target.current = { k: initialZoom, x: initialCenter.x, y: initialCenter.y };

    // Animation loop - the physics engine
    const animate = () => {
      const c = current.current;
      const t = target.current;

      // Linear interpolation: current + (target - current) * damping
      const diffK = t.k - c.k;
      const diffX = t.x - c.x;
      const diffY = t.y - c.y;

      if (Math.abs(diffK) < 0.0001 && Math.abs(diffX) < 0.05 && Math.abs(diffY) < 0.05) {
        isAnimating.current = false;
        return;
      }

      c.k += diffK * damping;
      c.x += diffX * damping;
      c.y += diffY * damping;

      // Apply to graph (0 duration = instant, we handle animation)
      fg.zoom(c.k, 0);
      fg.centerAt(c.x, c.y, 0);

      reqAnimFrame.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      reqAnimFrame.current = requestAnimationFrame(animate);
    };

    // Custom wheel handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }

      onZoomInteraction?.();

      // Sync to actual camera in case of external panning
      const liveZoom = fg.zoom();
      const liveCenter = fg.centerAt();
      current.current = { k: liveZoom, x: liveCenter.x, y: liveCenter.y };
      target.current = { k: liveZoom, x: liveCenter.x, y: liveCenter.y };

      // Calculate zoom factor
      const direction = e.deltaY > 0 ? -1 : 1;
      const factor = Math.max(0.05, 1 + (direction * zoomSpeed * Math.abs(e.deltaY)));

      // Clamp zoom limits
      const newZoom = Math.max(minZoom, Math.min(maxZoom, target.current.k * factor));

      // Zoom towards the mouse pointer
      const canvas = fg.canvas();
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      
      // Mouse position relative to canvas
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Convert mouse screen pos to graph coordinates before zoom
      const graphMouse = fg.screen2GraphCoords(mouseX, mouseY);

      // Update target zoom
      target.current.k = newZoom;

      // Pan correction: shift center so the point under mouse stays static
      const base = current.current;
      const factorFromCurrent = newZoom / base.k;
      target.current.x = base.x + (graphMouse.x - base.x) * (1 - 1 / factorFromCurrent);
      target.current.y = base.y + (graphMouse.y - base.y) * (1 - 1 / factorFromCurrent);

      // Start animation loop if not running
      startAnimation();
    };

    // Attach native event listener to canvas to override default behavior
    const canvasEl = fg.canvas();
    if (canvasEl) {
      canvasEl.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    }

    const previousZoomInteraction = fg.enableZoomInteraction?.();
    if (fg.enableZoomInteraction) {
      fg.enableZoomInteraction(false);
    }

    return () => {
      if (canvasEl) canvasEl.removeEventListener('wheel', handleWheel, { capture: true });
      if (fg.enableZoomInteraction && typeof previousZoomInteraction !== 'undefined') {
        fg.enableZoomInteraction(previousZoomInteraction);
      }
      if (reqAnimFrame.current) cancelAnimationFrame(reqAnimFrame.current);
      isAnimating.current = false;
    };
  }, [graphRef, damping, zoomSpeed, minZoom, maxZoom, onZoomInteraction]);
};
