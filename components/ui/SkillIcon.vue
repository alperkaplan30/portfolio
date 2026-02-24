<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps<{
  category: string
}>()

const containerRef = ref<HTMLElement>()
const iconRef = ref<HTMLElement>()
const isHovered = ref(false)

// Map categories to icon config
const iconConfig = computed(() => {
  const map: Record<string, { gradient: string; bgLight: string; bgDark: string }> = {
    'Programming Languages': {
      gradient: 'from-orange-500 to-red-600',
      bgLight: 'bg-orange-50',
      bgDark: 'dark:bg-orange-950/40',
    },
    'Technologies': {
      gradient: 'from-cyan-500 to-blue-600',
      bgLight: 'bg-cyan-50',
      bgDark: 'dark:bg-cyan-950/40',
    },
    'Tools & Workflow': {
      gradient: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50',
      bgDark: 'dark:bg-emerald-950/40',
    },
    'Other': {
      gradient: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50',
      bgDark: 'dark:bg-amber-950/40',
    },
  }
  return map[props.category] ?? map['Other']
})

let floatTween: gsap.core.Tween | null = null

onMounted(() => {
  if (!containerRef.value || !iconRef.value) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  // Idle floating animation
  floatTween = gsap.to(iconRef.value, {
    y: -4,
    duration: 2.2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
})

function onEnter() {
  isHovered.value = true
  if (!iconRef.value) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  // Pause float, play bounce-rotate
  floatTween?.pause()

  gsap.to(iconRef.value, {
    scale: 1.15,
    rotate: 8,
    y: -8,
    duration: 0.4,
    ease: 'back.out(2)',
  })

  // Animate inner paths
  const paths = iconRef.value.querySelectorAll('.icon-part')
  gsap.fromTo(paths, {
    scale: 0.8,
    opacity: 0.5,
  }, {
    scale: 1,
    opacity: 1,
    stagger: 0.06,
    duration: 0.35,
    ease: 'back.out(3)',
  })

  // Ring pulse
  const ring = containerRef.value?.querySelector('.hover-ring')
  if (ring) {
    gsap.fromTo(ring, {
      scale: 0.8,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }
}

function onLeave() {
  isHovered.value = false
  if (!iconRef.value) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  gsap.to(iconRef.value, {
    scale: 1,
    rotate: 0,
    y: 0,
    duration: 0.5,
    ease: 'power2.out',
    onComplete: () => floatTween?.resume(),
  })

  const ring = containerRef.value?.querySelector('.hover-ring')
  if (ring) {
    gsap.to(ring, { scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in' })
  }
}

onUnmounted(() => {
  floatTween?.kill()
})
</script>

<template>
  <div
    ref="containerRef"
    class="group relative mb-5 flex justify-center"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <!-- Hover ring -->
    <div
      class="hover-ring pointer-events-none absolute inset-0 m-auto h-20 w-20 rounded-2xl opacity-0"
      :class="[`bg-gradient-to-br ${iconConfig.gradient}`]"
      style="filter: blur(16px);"
    />

    <!-- Icon container -->
    <div
      ref="iconRef"
      class="relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-shadow duration-300 group-hover:shadow-md"
      :class="[iconConfig.bgLight, iconConfig.bgDark]"
    >
      <!-- Programming Languages — code brackets with cursor -->
      <svg
        v-if="category === 'Programming Languages'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path class="icon-part" d="M10 8L4 16l6 8" stroke="url(#lang-grad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path class="icon-part" d="M22 8l6 8-6 8" stroke="url(#lang-grad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path class="icon-part" d="M18 6l-4 20" stroke="url(#lang-grad)" stroke-width="2.5" stroke-linecap="round" opacity="0.7" />
        <defs>
          <linearGradient id="lang-grad" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
            <stop stop-color="#f97316" />
            <stop offset="1" stop-color="#dc2626" />
          </linearGradient>
        </defs>
      </svg>

      <!-- Technologies — layered stack / circuit -->
      <svg
        v-else-if="category === 'Technologies'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        viewBox="0 0 32 32"
        fill="none"
      >
        <rect class="icon-part" x="6" y="6" width="20" height="20" rx="4" stroke="url(#tech-grad)" stroke-width="2" />
        <circle class="icon-part" cx="16" cy="16" r="4" stroke="url(#tech-grad)" stroke-width="2" />
        <line class="icon-part" x1="16" y1="6" x2="16" y2="12" stroke="url(#tech-grad)" stroke-width="2" stroke-linecap="round" />
        <line class="icon-part" x1="16" y1="20" x2="16" y2="26" stroke="url(#tech-grad)" stroke-width="2" stroke-linecap="round" />
        <line class="icon-part" x1="6" y1="16" x2="12" y2="16" stroke="url(#tech-grad)" stroke-width="2" stroke-linecap="round" />
        <line class="icon-part" x1="20" y1="16" x2="26" y2="16" stroke="url(#tech-grad)" stroke-width="2" stroke-linecap="round" />
        <defs>
          <linearGradient id="tech-grad" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop stop-color="#06b6d4" />
            <stop offset="1" stop-color="#2563eb" />
          </linearGradient>
        </defs>
      </svg>

      <!-- Tools & Workflow — wrench + gear -->
      <svg
        v-else-if="category === 'Tools & Workflow'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        viewBox="0 0 32 32"
        fill="none"
      >
        <circle class="icon-part" cx="20" cy="12" r="5" stroke="url(#tool-grad)" stroke-width="2" />
        <path class="icon-part" d="M20 7V5M20 19v-2M25 12h2M13 12h2M24 8l1.5-1.5M15 17l-1.5 1.5M24 16l1.5 1.5M15 7l-1.5-1.5" stroke="url(#tool-grad)" stroke-width="1.5" stroke-linecap="round" />
        <path class="icon-part" d="M5 27l8-8M7 22l3 3" stroke="url(#tool-grad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <defs>
          <linearGradient id="tool-grad" x1="5" y1="5" x2="27" y2="27" gradientUnits="userSpaceOnUse">
            <stop stop-color="#10b981" />
            <stop offset="1" stop-color="#0d9488" />
          </linearGradient>
        </defs>
      </svg>

      <!-- Other — sparkle / star -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path class="icon-part" d="M16 4l2.5 8.5L27 16l-8.5 3.5L16 28l-2.5-8.5L5 16l8.5-3.5L16 4z" stroke="url(#other-grad)" stroke-width="2" stroke-linejoin="round" />
        <circle class="icon-part" cx="25" cy="7" r="2" stroke="url(#other-grad)" stroke-width="1.5" />
        <circle class="icon-part" cx="7" cy="25" r="1.5" stroke="url(#other-grad)" stroke-width="1.5" />
        <defs>
          <linearGradient id="other-grad" x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
            <stop stop-color="#f59e0b" />
            <stop offset="1" stop-color="#ea580c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>
