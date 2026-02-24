<script setup lang="ts">
import projects from '~/data/projects.json'

const route = useRoute()
const { t } = useI18n()

interface Project {
  id: number
  slug: string
  title: string
  category: string
  description: string
  longDescription: string
  features: string[]
  tags: string[]
  image: string
  imageClass?: string
  url: string
  github: string
  githubServer?: string
  year: string
}

const project = projects.find(p => p.slug === route.params.slug) as Project | undefined

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useHead({
  title: `${project.title} | Portfolio`,
  meta: [{ name: 'description', content: project.description }],
})

const { heroEntrance, scrollReveal } = useGsap()

onMounted(() => {
  heroEntrance('.hero-detail', {
    y: 28,
    stagger: 0.1,
    delay: 0.15,
    duration: 0.8,
  })

  scrollReveal('.card-reveal', {
    y: 32,
    stagger: 0.1,
    start: 'top 88%',
  })
})

const isLive = computed(() => project.url && project.url !== '#')
const hasGithub = computed(() => project.github && project.github !== '#')
const hasGithubServer = computed(() => project.githubServer && project.githubServer !== '#')
</script>

<template>
  <div>
    <!-- ─── Hero ─── -->
    <section class="relative overflow-hidden bg-surface-950 pt-16 md:pt-20 lg:pt-24">
      <!-- Decorative blobs -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -right-48 -top-24 h-[500px] w-[500px] rounded-full bg-accent/8 blur-3xl" />
        <div class="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-orange-400/5 blur-3xl" />
      </div>

      <div class="container-page relative py-10 md:py-14 lg:py-20">
        <!-- Badges row -->
        <div class="hero-detail mb-6 flex flex-wrap items-center gap-2 md:mb-8">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {{ project.category }}
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-surface-700 bg-surface-800 px-3 py-1 text-xs font-semibold text-surface-300">
            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            {{ project.year }}
          </span>
          <span v-if="isLive" class="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            LIVE
          </span>
        </div>

        <!-- Grid: text left, image right -->
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <!-- Left -->
          <div class="space-y-6">
            <h1 class="hero-detail font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              {{ project.title }}
            </h1>
            <p class="hero-detail text-base leading-relaxed text-surface-400 sm:text-lg">
              {{ project.description }}
            </p>

            <!-- Action buttons -->
            <div class="hero-detail flex flex-wrap gap-3">
              <a
                v-if="isLive"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:bg-accent-dark hover:shadow-accent/40"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                {{ t.projects.liveDemo }}
              </a>
              <a
                v-if="hasGithub"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-xl border border-surface-600 bg-surface-800 px-5 py-2.5 text-sm font-semibold text-surface-100 transition-all hover:border-accent/50 hover:text-accent"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                {{ hasGithubServer ? t.projects.frontendRepo : 'GitHub' }}
              </a>
              <a
                v-if="hasGithubServer"
                :href="project.githubServer"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-xl border border-surface-600 bg-surface-800 px-5 py-2.5 text-sm font-semibold text-surface-100 transition-all hover:border-accent/50 hover:text-accent"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                {{ t.projects.backendRepo }}
              </a>
            </div>
          </div>

          <!-- Right: Project image -->
          <div class="hero-detail">
            <div class="overflow-hidden rounded-2xl border border-surface-700/50 shadow-2xl shadow-black/50">
              <div class="aspect-video bg-surface-900">
                <img
                  v-if="project.image"
                  :src="project.image"
                  :alt="project.title"
                  class="h-full w-full opacity-90"
                  :class="project.imageClass ?? 'object-cover'"
                  @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave separator -->
      <div class="relative h-10 md:h-14">
        <svg class="absolute bottom-0 w-full" viewBox="0 0 1440 56" fill="none" preserveAspectRatio="none">
          <path d="M0 56L1440 56L1440 28C1200 0 960 56 720 28C480 0 240 56 0 28L0 56Z" class="fill-surface-50 dark:fill-surface-950" />
        </svg>
      </div>
    </section>

    <!-- ─── Body ─── -->
    <section class="container-page py-10 md:py-14 lg:py-16">
      <div class="grid gap-6 lg:grid-cols-3 lg:gap-8">

        <!-- Main column -->
        <div class="space-y-6 lg:col-span-2">
          <!-- About card -->
          <div class="card-reveal rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900 md:p-8">
            <div class="mb-5 flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
                <svg class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 class="font-display text-lg font-bold tracking-tight sm:text-xl">{{ t.projects.aboutProject }}</h2>
            </div>
            <p class="text-sm leading-relaxed text-surface-600 dark:text-surface-400 sm:text-base">
              {{ project.longDescription }}
            </p>
          </div>

          <!-- Features card -->
          <div class="card-reveal rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900 md:p-8">
            <div class="mb-5 flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
                <svg class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 class="font-display text-lg font-bold tracking-tight sm:text-xl">{{ t.projects.keyFeatures }}</h2>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div
                v-for="(feature, i) in project.features"
                :key="i"
                class="flex items-start gap-3 rounded-xl border border-surface-100 p-3 transition-colors hover:border-accent/20 hover:bg-accent/3 dark:border-surface-800 dark:hover:border-accent/20 dark:hover:bg-accent/5"
              >
                <div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                  <svg class="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-sm text-surface-700 dark:text-surface-300">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-4">
          <!-- Tech Stack card -->
          <div class="card-reveal rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
            <div class="mb-4 flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <svg class="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 class="font-display text-sm font-bold uppercase tracking-wider text-surface-900 dark:text-surface-100">{{ t.projects.techStack }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-lg border border-surface-200 bg-surface-50 px-3 py-1.5 text-xs font-medium text-surface-700 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Project Info card -->
          <div class="card-reveal rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900">
            <div class="mb-4 flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <svg class="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 class="font-display text-sm font-bold uppercase tracking-wider text-surface-900 dark:text-surface-100">{{ t.projects.projectInfo }}</h3>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <svg class="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500">{{ t.projects.yearLabel }}</p>
                  <p class="text-sm font-medium text-surface-900 dark:text-surface-100">{{ project.year }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <svg class="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500">{{ t.projects.categoryLabel }}</p>
                  <p class="text-sm font-medium text-surface-900 dark:text-surface-100">{{ project.category }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Back button -->
          <NuxtLink
            to="/projects"
            class="card-reveal flex w-full items-center justify-center gap-2 rounded-2xl border border-surface-200 bg-white px-5 py-3 text-sm font-medium text-surface-600 transition-all hover:border-accent/30 hover:text-accent dark:border-surface-800 dark:bg-surface-900 dark:text-surface-400 dark:hover:border-accent/30 dark:hover:text-accent"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {{ t.projects.backToProjects }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
