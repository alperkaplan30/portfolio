import { gsap } from 'gsap'

/**
 * Micro-interaction composable for hover effects.
 * Applies a subtle scale + lift on hover with GSAP.
 */
export function useSmoothHover() {
  function applyHover(el: HTMLElement, options?: { scale?: number; y?: number; duration?: number }) {
    const { scale = 1.02, y = -2, duration = 0.3 } = options ?? {}

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const onEnter = () => {
      gsap.to(el, { scale, y, duration, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(el, { scale: 1, y: 0, duration, ease: 'power2.out' })
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    // Return cleanup function
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }

  return { applyHover }
}
