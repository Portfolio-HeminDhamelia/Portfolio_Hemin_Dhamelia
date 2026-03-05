import Lenis from '@studio-freight/lenis';

export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function requestAnimationFrameLoop(time: number) {
  lenis.raf(time);
  requestAnimationFrame(requestAnimationFrameLoop);
}
requestAnimationFrame(requestAnimationFrameLoop);
