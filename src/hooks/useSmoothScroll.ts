import { useEffect } from 'react';

type ScrollTarget = HTMLElement | null;

const SMOOTHING_FACTOR = 0.12;
const FRAME_THRESHOLD = 0.5;

const isScrollableContainer = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  const overflowY = style.overflowY;

  if (overflowY !== 'auto' && overflowY !== 'scroll') {
    return false;
  }

  return element.scrollHeight > element.clientHeight;
};

const findScrollableAncestor = (element: HTMLElement | null): ScrollTarget => {
  let current: ScrollTarget = element;

  while (current && current !== document.body) {
    if (isScrollableContainer(current)) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
};

export const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isTouchPrimary = window.matchMedia('(hover: none)').matches;

    if (prefersReducedMotion.matches || isTouchPrimary) {
      return;
    }

    let animationFrame = 0;
    let currentScroll = window.scrollY;
    let targetScroll = currentScroll;
    let isAnimating = false;

    const clampScroll = (value: number) => {
      if (!Number.isFinite(value)) return window.scrollY;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      if (!Number.isFinite(maxScroll)) return 0;
      return Math.max(0, Math.min(value, maxScroll));
    };

    const step = () => {
      if (!Number.isFinite(currentScroll) || !Number.isFinite(targetScroll)) {
        window.cancelAnimationFrame(animationFrame);
        const y = window.scrollY;
        currentScroll = Number.isFinite(y) ? y : 0;
        targetScroll = currentScroll;
        isAnimating = false;
        return;
      }

      const distance = targetScroll - currentScroll;

      if (Math.abs(distance) < FRAME_THRESHOLD) {
        window.cancelAnimationFrame(animationFrame);
        currentScroll = targetScroll;
        isAnimating = false;
        window.scrollTo(0, currentScroll);
        return;
      }

      currentScroll += distance * SMOOTHING_FACTOR;
      if (!Number.isFinite(currentScroll)) {
        window.cancelAnimationFrame(animationFrame);
        currentScroll = targetScroll = window.scrollY;
        isAnimating = false;
        return;
      }
      window.scrollTo(0, currentScroll);
      animationFrame = window.requestAnimationFrame(step);
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const scrollableAncestor = target ? findScrollableAncestor(target) : null;

      if (scrollableAncestor) {
        return;
      }

      event.preventDefault();

      const delta = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? event.deltaY * 16 : event.deltaY;
      const next = targetScroll + delta;
      targetScroll = clampScroll(Number.isFinite(next) ? next : window.scrollY);
      startAnimation();
    };

    const syncScrollPositions = () => {
      if (!isAnimating) {
        const y = window.scrollY;
        if (Number.isFinite(y)) {
          currentScroll = targetScroll = y;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', syncScrollPositions, { passive: true });
    window.addEventListener('resize', syncScrollPositions);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', syncScrollPositions);
      window.removeEventListener('resize', syncScrollPositions);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);
};

