import { useCallback, useEffect } from 'react';
import type { MutableRefObject } from 'react';
import type { ForceGraphMethods } from 'react-force-graph-2d';

interface SmoothZoomOptions {
  minZoom?: number;
  maxZoom?: number;
  sensitivity?: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export type ForceGraphInstance<
  NodeType = Record<string, unknown>,
  LinkType = Record<string, unknown>
> = ForceGraphMethods<NodeType, LinkType> & {
  d3AlphaTarget: (
    alphaTarget?: number
  ) => number | ForceGraphMethods<NodeType, LinkType>;
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
    sensitivity = 0.0012,
  } = options;

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      const graph = graphRef.current;
      const container = containerRef.current;

      if (
        !graph ||
        !container ||
        typeof graph.zoom !== 'function' ||
        typeof graph.centerAt !== 'function' ||
        typeof graph.screen2GraphCoords !== 'function'
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const currentZoom = graph.zoom();
      if (typeof currentZoom !== 'number' || !isFinite(currentZoom)) {
        return;
      }

      const scale = Math.exp(-event.deltaY * sensitivity);
      const unclampedZoom = currentZoom * scale;
      const newZoom = clamp(unclampedZoom, minZoom, maxZoom);

      if (Math.abs(newZoom - currentZoom) < 1e-4) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;
      const graphCoords = graph.screen2GraphCoords(pointerX, pointerY);

      if (
        !graphCoords ||
        typeof graphCoords.x !== 'number' ||
        typeof graphCoords.y !== 'number'
      ) {
        return;
      }

      graph.zoom(newZoom);

      const newCenterX = graphCoords.x - (pointerX - rect.width / 2) / newZoom;
      const newCenterY =
        graphCoords.y - (pointerY - rect.height / 2) / newZoom;

      graph.centerAt(newCenterX, newCenterY);
    },
    [graphRef, containerRef, minZoom, maxZoom, sensitivity]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const listener = (event: WheelEvent) => {
      handleWheel(event);
    };

    container.addEventListener('wheel', listener, { passive: false });

    return () => {
      container.removeEventListener('wheel', listener);
    };
  }, [containerRef, handleWheel]);
};
