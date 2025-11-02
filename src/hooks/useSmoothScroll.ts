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
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      return Math.max(0, Math.min(value, maxScroll));
    };

    const step = () => {
      const distance = targetScroll - currentScroll;

      if (Math.abs(distance) < FRAME_THRESHOLD) {
        window.cancelAnimationFrame(animationFrame);
        currentScroll = targetScroll;
        isAnimating = false;
        window.scrollTo(0, currentScroll);
        return;
      }

      currentScroll += distance * SMOOTHING_FACTOR;
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
      targetScroll = clampScroll(targetScroll + delta);
      startAnimation();
    };

    const syncScrollPositions = () => {
      if (!isAnimating) {
        currentScroll = targetScroll = window.scrollY;
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

