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
  /** Key to trigger a reset of internal camera state from live graph values */
  resetKey?: number;
  /** Key to trigger re-attachment of wheel listeners (e.g., when graph becomes visible) */
  attachKey?: number | string | boolean;
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
 * Smooth wheel-zoom for `react-force-graph-2d` with momentum and
 * continuous cursor anchoring.
 *
 * Why "continuous" anchoring matters:
 *   The naive approach computes the post-zoom center once per wheel event,
 *   which works for one frame but the lerp continues for many more frames.
 *   Each new wheel event then resets the anchor to a slightly different
 *   cursor position, causing the camera to "jump" between anchor points —
 *   that is the jumpy feel the user reported.
 *
 *   This implementation re-evaluates the cursor anchor every animation
 *   frame using the library's own screen2GraphCoords mapping, so the point
 *   under the cursor stays exactly under the cursor as zoom progresses,
 *   regardless of how the lerp/momentum curve plays out.
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
    smoothing = 0.22,
    damping: dampingOverride,
    momentum = 0.86,
    maxVelocity = 0.18,
    onZoomInteraction,
    resetKey,
    attachKey,
  } = options;

  const damping = Math.min(0.6, Math.max(0.01, dampingOverride ?? smoothing));

  // Camera state ────────────────────────────────────────────────────────
  // current = where the camera is right now
  // target  = where it is heading (modified by velocity each frame)
  // velocity = exponentially-decayed zoom delta per frame
  const target = useRef({ k: 1, x: 0, y: 0 });
  const current = useRef({ k: 1, x: 0, y: 0 });
  const velocity = useRef({ k: 0 });
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const reqAnimFrame = useRef<number>();
  const isAnimating = useRef(false);
  const lastWheelTimeRef = useRef(0);

  useEffect(() => {
    const fg = graphRef.current;
    if (!fg) return;

    const initialZoom = fg.zoom();
    const initialCenter = fg.centerAt();

    if (
      typeof initialZoom !== 'number' ||
      !Number.isFinite(initialZoom) ||
      !initialCenter ||
      typeof initialCenter.x !== 'number' ||
      typeof initialCenter.y !== 'number' ||
      !Number.isFinite(initialCenter.x) ||
      !Number.isFinite(initialCenter.y)
    ) {
      return;
    }

    current.current = { k: initialZoom, x: initialCenter.x, y: initialCenter.y };
    target.current = { k: initialZoom, x: initialCenter.x, y: initialCenter.y };
    velocity.current = { k: 0 };

    const stopThresholdK = 0.00005;
    const stopThresholdXY = 0.02;

    const animate = () => {
      const fgLive = graphRef.current;
      if (!fgLive) {
        isAnimating.current = false;
        return;
      }

      const c = current.current;
      const t = target.current;
      const v = velocity.current;
      const mouse = lastMouseRef.current;

      // Decay velocity each frame so the camera coasts gently.
      v.k *= momentum;
      if (Math.abs(v.k) < stopThresholdK) v.k = 0;

      // Integrate velocity into the target zoom (exponential growth so
      // each frame contributes a fraction of the current zoom level).
      const newTargetK = t.k * (1 + v.k);
      t.k = Math.max(minZoom, Math.min(maxZoom, newTargetK));

      const diffK = t.k - c.k;
      const diffX = t.x - c.x;
      const diffY = t.y - c.y;

      const settled =
        Math.abs(diffK) < stopThresholdK &&
        Math.abs(diffX) < stopThresholdXY &&
        Math.abs(diffY) < stopThresholdXY &&
        v.k === 0;

      if (settled) {
        isAnimating.current = false;
        return;
      }

      if (
        !Number.isFinite(c.k) ||
        !Number.isFinite(c.x) ||
        !Number.isFinite(c.y) ||
        !Number.isFinite(t.k) ||
        !Number.isFinite(t.x) ||
        !Number.isFinite(t.y)
      ) {
        isAnimating.current = false;
        return;
      }

      // ── Continuous cursor anchoring ───────────────────────────────────
      // Snapshot the graph point under the cursor BEFORE we change zoom.
      let beforeGraph: { x: number; y: number } | null = null;
      if (mouse) {
        try {
          const g = fgLive.screen2GraphCoords(mouse.x, mouse.y);
          if (g && Number.isFinite(g.x) && Number.isFinite(g.y)) {
            beforeGraph = { x: g.x, y: g.y };
          }
        } catch {
          /* ignore */
        }
      }

      // Step camera toward target.
      c.k += diffK * damping;
      c.x += diffX * damping;
      c.y += diffY * damping;

      // Apply the new zoom first; centerAt happens after we know how
      // much the cursor needs to be re-anchored.
      try {
        fgLive.zoom(c.k, 0);
      } catch {
        /* ignore */
      }

      // Compensate the center so the cursor's graph coords stay constant.
      if (mouse && beforeGraph) {
        try {
          const after = fgLive.screen2GraphCoords(mouse.x, mouse.y);
          if (after && Number.isFinite(after.x) && Number.isFinite(after.y)) {
            const dx = beforeGraph.x - after.x;
            const dy = beforeGraph.y - after.y;
            // Apply correction to BOTH current and target so the lerp
            // doesn't keep trying to undo the anchor next frame.
            c.x += dx;
            c.y += dy;
            t.x += dx;
            t.y += dy;
          }
        } catch {
          /* ignore */
        }
      }

      try {
        fgLive.centerAt(c.x, c.y, 0);
      } catch {
        /* ignore */
      }

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

      // If there has been a long pause, the live camera may have changed
      // (drag-pan, zoomToFit, etc). Reseat to live values so the next zoom
      // doesn't snap back to a stale internal state.
      const now =
        typeof performance !== 'undefined' ? performance.now() : Date.now();
      if (now - lastWheelTimeRef.current > 250) {
        const liveZoom = fg.zoom();
        const liveCenter = fg.centerAt();
        if (
          typeof liveZoom === 'number' &&
          Number.isFinite(liveZoom) &&
          liveCenter &&
          typeof liveCenter.x === 'number' &&
          typeof liveCenter.y === 'number' &&
          Number.isFinite(liveCenter.x) &&
          Number.isFinite(liveCenter.y)
        ) {
          current.current = { k: liveZoom, x: liveCenter.x, y: liveCenter.y };
          target.current = { k: liveZoom, x: liveCenter.x, y: liveCenter.y };
          velocity.current = { k: 0 };
        }
      }
      lastWheelTimeRef.current = now;

      // Track the cursor in canvas coordinates. The animate loop reads
      // this every frame to keep anchoring under the cursor.
      const canvas = fg.canvas();
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        lastMouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }

      const direction = e.deltaY > 0 ? -1 : 1;
      const deltaY =
        e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 16 : e.deltaY;

      // Per-event injection, clamped to avoid touchpad fling spikes.
      let injected = direction * sensitivity * Math.abs(deltaY);
      if (injected > maxVelocity) injected = maxVelocity;
      if (injected < -maxVelocity) injected = -maxVelocity;

      velocity.current.k += injected;

      // Hard-clamp accumulated velocity so multiple fast events can't
      // produce a runaway zoom.
      if (velocity.current.k > maxVelocity) velocity.current.k = maxVelocity;
      if (velocity.current.k < -maxVelocity) velocity.current.k = -maxVelocity;

      startAnimation();
    };

    const canvasEl = fg.canvas();
    const containerEl = containerRef.current ?? null;
    // Attach to BOTH so zoom still works over overlays / when the canvas
    // gets re-created. The first one in capture phase wins because we call
    // stopImmediatePropagation in the handler.
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphRef, containerRef, damping, sensitivity, momentum, maxVelocity, minZoom, maxZoom, onZoomInteraction, attachKey]);

  // Handle external reset: re-sync internal camera state from live graph values
  // so that smooth zoom doesn't override the reset on the next animation frame.
  const lastResetKey = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (typeof resetKey === 'undefined') return;
    if (lastResetKey.current === resetKey) return;
    lastResetKey.current = resetKey;

    const fg = graphRef.current;
    if (!fg) return;

    if (reqAnimFrame.current) {
      cancelAnimationFrame(reqAnimFrame.current);
      reqAnimFrame.current = undefined;
    }
    isAnimating.current = false;
    velocity.current = { k: 0 };

    const liveZoom = fg.zoom();
    const liveCenter = fg.centerAt();
    if (
      typeof liveZoom === 'number' &&
      Number.isFinite(liveZoom) &&
      liveCenter &&
      typeof liveCenter.x === 'number' &&
      typeof liveCenter.y === 'number' &&
      Number.isFinite(liveCenter.x) &&
      Number.isFinite(liveCenter.y)
    ) {
      current.current = { k: liveZoom, x: liveCenter.x, y: liveCenter.y };
      target.current = { k: liveZoom, x: liveCenter.x, y: liveCenter.y };
    }
  }, [resetKey, graphRef]);
};
