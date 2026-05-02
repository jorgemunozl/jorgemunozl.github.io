import { useEffect } from 'react';

/**
 * useSmoothScroll - Optimized lightweight smooth scroll implementation.
 *
 * Key performance optimizations vs. naive implementations:
 * - Higher smoothing factor (0.18) for faster settling, feels responsive not laggy
 * - Larger frame threshold (1px) to snap to target quickly, saves frames
 * - Deadzone for tiny wheel deltas (skips trackpad jitter)
 * - Pauses when tab/page loses visibility (saves CPU when in background)
 * - Skips when there's a scrollable ancestor (lets nested scrolls work natively)
 * - Bails out for touch devices and reduced-motion preference
 * - Caps maximum delta per event to prevent huge animation chains
 * - Only attaches RAF loop when actively animating (no idle work)
 * - Uses passive scroll listener for sync; only wheel uses passive: false
 */

const SMOOTHING_FACTOR = 0.18;
const FRAME_THRESHOLD = 1;
const WHEEL_DEADZONE = 2;
const MAX_DELTA_PER_EVENT = 200;

const isScrollableContainer = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  const overflowY = style.overflowY;
  if (overflowY !== 'auto' && overflowY !== 'scroll') return false;
  return element.scrollHeight > element.clientHeight;
};

const findScrollableAncestor = (element: HTMLElement | null): HTMLElement | null => {
  let current = element;
  while (current && current !== document.body) {
    if (isScrollableContainer(current)) return current;
    current = current.parentElement;
  }
  return null;
};

export const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchPrimary = window.matchMedia('(hover: none)').matches;

    if (prefersReducedMotion || isTouchPrimary) {
      return;
    }

    let animationFrame = 0;
    let currentScroll = window.scrollY;
    let targetScroll = currentScroll;
    let isAnimating = false;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clampScroll = (value: number): number => {
      if (!Number.isFinite(value)) return window.scrollY;
      return Math.max(0, Math.min(value, getMaxScroll()));
    };

    const stopAnimation = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
      isAnimating = false;
    };

    const step = () => {
      const distance = targetScroll - currentScroll;

      if (Math.abs(distance) < FRAME_THRESHOLD) {
        currentScroll = targetScroll;
        window.scrollTo(0, currentScroll);
        stopAnimation();
        return;
      }

      currentScroll += distance * SMOOTHING_FACTOR;
      window.scrollTo(0, currentScroll);
      animationFrame = requestAnimationFrame(step);
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        animationFrame = requestAnimationFrame(step);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      const target = event.target as HTMLElement | null;
      if (target && findScrollableAncestor(target)) {
        return;
      }

      let delta = event.deltaY;
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        delta *= 16;
      } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        delta *= window.innerHeight;
      }

      if (Math.abs(delta) < WHEEL_DEADZONE) return;

      delta = Math.max(-MAX_DELTA_PER_EVENT, Math.min(MAX_DELTA_PER_EVENT, delta));

      event.preventDefault();
      targetScroll = clampScroll(targetScroll + delta);
      startAnimation();
    };

    const syncScrollPosition = () => {
      if (!isAnimating) {
        currentScroll = targetScroll = window.scrollY;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        currentScroll = targetScroll = window.scrollY;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = ['PageDown', 'PageUp', 'Home', 'End', 'ArrowUp', 'ArrowDown', ' '];
      if (keys.includes(event.key)) {
        stopAnimation();
        currentScroll = targetScroll = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', syncScrollPosition, { passive: true });
    window.addEventListener('resize', syncScrollPosition, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('keydown', handleKeyDown, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', syncScrollPosition);
      window.removeEventListener('resize', syncScrollPosition);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('keydown', handleKeyDown);
      stopAnimation();
    };
  }, []);
};
