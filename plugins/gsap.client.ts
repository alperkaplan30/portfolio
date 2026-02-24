import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Global GSAP defaults for consistent feel
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
