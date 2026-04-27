import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import type { ForceGraphMethods } from 'react-force-graph-2d';

interface SmoothZoomOptions {
  minZoom?: number;
  maxZoom?: number;
  /** Per-pixel-of-wheel-delta zoom velocity injection. */
  sensitivity?: number;
  /** Lerp factor used to ease `current` towards `target`. 0..1 */
  smoothing?: number;
  damping?: number;
  /** Per-frame velocity decay (0..1). Closer to 1 = longer coast. */
  momentum?: number;
  /** Maximum |velocity| applied per wheel event, prevents fling jumps. */
  maxVelocity?: number;
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

/**
 * Smooth wheel-zoom for `react-force-graph-2d` with real momentum.
 *
 * The model has three pieces of state per axis:
 *   - velocity: gets nudged on every wheel event, then decays via `momentum`
 *   - target:   integrates velocity, the camera "destination"
 *   - current:  lerps towards target via `smoothing`, the camera "now"
 *
 * Crucially, we do NOT reset target/current to the live camera on every wheel
 * event. That was the source of the staircase feel — fast scrolls kept
 * reseating the lerp instead of compounding.
 */
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
    sensitivity = 0.0009,
    smoothing = 0.18,
    damping: dampingOverride,
    momentum = 0.92,
    maxVelocity = 0.25,
    onZoomInteraction,
  } = options;

  const damping = Math.min(0.6, Math.max(0.01, dampingOverride ?? smoothing));

  const target = useRef({ k: 1, x: 0, y: 0 });
  const current = useRef({ k: 1, x: 0, y: 0 });
  const velocity = useRef({ k: 0, x: 0, y: 0 });
  const reqAnimFrame = useRef<number>();
  const isAnimating = useRef(false);
  const lastWheelTimeRef = useRef(0);

  useEffect(() => {
    const fg = graphRef.current;
    if (!fg) return;

    const initialZoom = fg.zoom();
    const initialCenter = fg.centerAt();

    current.current = { k: initialZoom, x: initialCenter.x, y: initialCenter.y };
    target.current = { k: initialZoom, x: initialCenter.x, y: initialCenter.y };
    velocity.current = { k: 0, x: 0, y: 0 };

    const stopThresholdK = 0.00005;
    const stopThresholdXY = 0.02;

    const animate = () => {
      const c = current.current;
      const t = target.current;
      const v = velocity.current;

      // Velocity → target. Decay velocity each frame so the camera coasts
      // and gently comes to rest.
      v.k *= momentum;
      v.x *= momentum;
      v.y *= momentum;

      if (Math.abs(v.k) < stopThresholdK) v.k = 0;
      if (Math.abs(v.x) < stopThresholdXY) v.x = 0;
      if (Math.abs(v.y) < stopThresholdXY) v.y = 0;

      const newTargetK = t.k + v.k * t.k; // velocity is fractional zoom-per-frame
      t.k = Math.max(minZoom, Math.min(maxZoom, newTargetK));
      t.x += v.x;
      t.y += v.y;

      // Target → current via lerp.
      const diffK = t.k - c.k;
      const diffX = t.x - c.x;
      const diffY = t.y - c.y;

      const settled =
        Math.abs(diffK) < stopThresholdK &&
        Math.abs(diffX) < stopThresholdXY &&
        Math.abs(diffY) < stopThresholdXY &&
        v.k === 0 &&
        v.x === 0 &&
        v.y === 0;

      if (settled) {
        isAnimating.current = false;
        return;
      }

      c.k += diffK * damping;
      c.x += diffX * damping;
      c.y += diffY * damping;

      fg.zoom(c.k, 0);
      fg.centerAt(c.x, c.y, 0);

      reqAnimFrame.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      reqAnimFrame.current = requestAnimationFrame(animate);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }

      onZoomInteraction?.();

      // If the user paused for a while (no wheel events), the live camera may
      // have changed via drag/centerAt. Reseat ourselves to the live values
      // so the next zoom does not snap.
      const now =
        typeof performance !== 'undefined' ? performance.now() : Date.now();
      if (now - lastWheelTimeRef.current > 250) {
        const liveZoom = fg.zoom();
        const liveCenter = fg.centerAt();
        current.current = { k: liveZoom, x: liveCenter.x, y: liveCenter.y };
        target.current = { k: liveZoom, x: liveCenter.x, y: liveCenter.y };
        velocity.current = { k: 0, x: 0, y: 0 };
      }
      lastWheelTimeRef.current = now;

      const direction = e.deltaY > 0 ? -1 : 1;
      const deltaY =
        e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 16 : e.deltaY;

      // Inject zoom velocity (fraction of current zoom per frame).
      let injected = direction * sensitivity * Math.abs(deltaY);
      if (injected > maxVelocity) injected = maxVelocity;
      if (injected < -maxVelocity) injected = -maxVelocity;

      velocity.current.k += injected;

      // Anchor zoom toward the cursor: shift target so the point under the
      // mouse remains static after the upcoming zoom integration.
      const canvas = fg.canvas();
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const graphMouse = fg.screen2GraphCoords(mouseX, mouseY);

        const projectedTargetK = Math.max(
          minZoom,
          Math.min(maxZoom, target.current.k * (1 + velocity.current.k))
        );
        const factorFromCurrent = projectedTargetK / current.current.k;
        if (factorFromCurrent !== 0) {
          const base = current.current;
          target.current.x =
            base.x + (graphMouse.x - base.x) * (1 - 1 / factorFromCurrent);
          target.current.y =
            base.y + (graphMouse.y - base.y) * (1 - 1 / factorFromCurrent);
        }
      }

      startAnimation();
    };

    const canvasEl = fg.canvas();
    const containerEl = containerRef.current ?? null;
    // Attach wheel handler to both the canvas and the container so zoom still
    // works when the pointer is over overlays or the canvas gets re-created.
    if (canvasEl) {
      canvasEl.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    }
    if (containerEl) {
      containerEl.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    }

    const previousZoomInteraction = fg.enableZoomInteraction?.();
    if (fg.enableZoomInteraction) {
      fg.enableZoomInteraction(false);
    }

    return () => {
      if (canvasEl) canvasEl.removeEventListener('wheel', handleWheel, { capture: true });
      if (containerEl) containerEl.removeEventListener('wheel', handleWheel, { capture: true });
      if (fg.enableZoomInteraction && typeof previousZoomInteraction !== 'undefined') {
        fg.enableZoomInteraction(previousZoomInteraction);
      }
      if (reqAnimFrame.current) cancelAnimationFrame(reqAnimFrame.current);
      isAnimating.current = false;
    };
  }, [graphRef, containerRef, damping, sensitivity, momentum, maxVelocity, minZoom, maxZoom, onZoomInteraction]);
};
