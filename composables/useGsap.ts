import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Reusable GSAP composable for scroll-based reveal animations.
 * Automatically cleans up ScrollTrigger instances on unmount.
 * Respects prefers-reduced-motion.
 */
export function useGsap() {
  const triggers: ScrollTrigger[] = []

  const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  /**
   * Reveal elements as they scroll into view.
   */
  function scrollReveal(
    elements: string | Element | Element[],
    options: {
      y?: number
      x?: number
      opacity?: number
      duration?: number
      stagger?: number
      delay?: number
      start?: string
    } = {},
  ) {
    if (prefersReducedMotion()) return

    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 0.8,
      stagger = 0.1,
      delay = 0,
      start = 'top 85%',
    } = options

    nextTick(() => {
      // Resolve elements to an array so each gets its own ScrollTrigger
      const els = typeof elements === 'string'
        ? gsap.utils.toArray<Element>(elements)
        : Array.isArray(elements) ? elements : [elements]

      els.forEach((el, i) => {
        gsap.from(el, {
          y,
          x,
          opacity,
          duration,
          delay: delay + i * stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        })
      })

      // Track triggers for cleanup
      const allTriggers = ScrollTrigger.getAll()
      allTriggers.slice(-els.length).forEach((st) => triggers.push(st))
    })
  }

  /**
   * Animate hero entrance (no scroll trigger).
   */
  function heroEntrance(
    elements: string | Element | Element[],
    options: {
      y?: number
      opacity?: number
      duration?: number
      stagger?: number
      delay?: number
    } = {},
  ) {
    if (prefersReducedMotion()) {
      // Still show elements, just without animation
      gsap.set(elements, { opacity: 1, y: 0 })
      return
    }

    const {
      y = 30,
      opacity = 0,
      duration = 0.9,
      stagger = 0.12,
      delay = 0.2,
    } = options

    nextTick(() => {
      gsap.from(elements, {
        y,
        opacity,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
      })
    })
  }

  /**
   * Create a GSAP timeline for complex sequences.
   */
  function createTimeline(options?: gsap.TimelineVars) {
    return gsap.timeline(options)
  }

  // Cleanup on component unmount
  onUnmounted(() => {
    triggers.forEach((trigger) => trigger.kill())
    triggers.length = 0
  })

  return {
    scrollReveal,
    heroEntrance,
    createTimeline,
    gsap,
    ScrollTrigger,
  }
}
