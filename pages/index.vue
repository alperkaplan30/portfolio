<script setup lang="ts">
import projects from '~/data/projects.json'

const { t } = useI18n()

useHead({
  title: 'Home | Portfolio',
  meta: [
    { name: 'description', content: 'Creative developer building modern, performant web experiences with Vue, Nuxt, and cutting-edge frontend technologies.' },
  ],
})

const { heroEntrance, scrollReveal } = useGsap()

const featuredProjects = projects.slice(0, 3)

// Typewriter
const typingTexts = ['Software Engineer', 'Frontend Developer', 'Android Developer']
const typedText = ref('')

let typingTimer: ReturnType<typeof setTimeout>

onMounted(() => {
  heroEntrance('.hero-animate', {
    y: 30,
    stagger: 0.12,
    delay: 0.3,
    duration: 0.9,
  })

  scrollReveal('.reveal-section', {
    y: 40,
    stagger: 0.15,
  })

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  const tick = () => {
    const current = typingTexts[textIndex]
    if (isDeleting) {
      charIndex--
      typedText.value = current.slice(0, charIndex)
    } else {
      charIndex++
      typedText.value = current.slice(0, charIndex)
    }

    let delay = isDeleting ? 55 : 100

    if (!isDeleting && charIndex === current.length) {
      delay = 1600
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % typingTexts.length
      delay = 400
    }

    typingTimer = setTimeout(tick, delay)
  }

  typingTimer = setTimeout(tick, 800)
})

onUnmounted(() => {
  clearTimeout(typingTimer)
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="section-padding relative flex min-h-[85vh] items-center pt-20 md:pt-28 lg:pt-32">
      <!-- Subtle background gradient -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div class="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div class="container-page relative">
        <div class="max-w-3xl">
          <p class="hero-animate mb-3 text-xs font-medium uppercase tracking-widest text-accent sm:mb-4 sm:text-sm">
            {{ t.home.greeting }}
          </p>

          <h1 class="hero-animate font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            {{ t.home.heroTitle1 }}
            <span class="text-gradient">{{ t.home.heroTitle2 }}</span>
          </h1>

          <p class="hero-animate mt-2 text-lg font-medium text-surface-500 dark:text-surface-400 sm:mt-3 sm:text-xl md:text-2xl">
            <span>{{ typedText }}</span><span class="typewriter-cursor">|</span>
          </p>

          <p class="hero-animate mt-4 max-w-sm text-base leading-relaxed text-surface-500 dark:text-surface-400 sm:mt-6 sm:max-w-xl sm:text-lg md:text-xl">
            {{ t.home.tagline }}
          </p>

          <div class="hero-animate mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <UiBaseButton to="/projects" variant="primary">
              {{ t.home.viewProjects }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </UiBaseButton>

            <UiBaseButton to="/contact" variant="secondary">
              {{ t.home.getInTouch }}
            </UiBaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Work Preview -->
    <section class="section-padding">
      <div class="container-page">
        <div class="reveal-section">
          <UiSectionHeading
            :title="t.home.selectedWork"
            :subtitle="t.home.selectedWorkSub"
          />
        </div>

        <div class="reveal-section grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <UiProjectCard
            v-for="project in featuredProjects"
            :key="project.id"
            :project="project"
            :link-to="`/projects/${project.slug}`"
          />
        </div>

        <div class="reveal-section mt-12 text-center">
          <UiBaseButton to="/projects" variant="ghost">
            {{ t.home.viewAll }} &rarr;
          </UiBaseButton>
        </div>
      </div>
    </section>

    <!-- Brief About -->
    <section class="section-padding">
      <div class="container-page">
        <div class="reveal-section mx-auto max-w-3xl text-center">
          <h2 class="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {{ t.home.aboutTitle1 }}
            <span class="text-gradient">{{ t.home.aboutTitle2 }}</span>
          </h2>
          <p class="mt-6 text-lg leading-relaxed text-surface-500 dark:text-surface-400">
            {{ t.home.aboutDesc }}
          </p>
          <div class="mt-8">
            <UiBaseButton to="/about" variant="secondary">
              {{ t.home.learnMore }}
            </UiBaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
