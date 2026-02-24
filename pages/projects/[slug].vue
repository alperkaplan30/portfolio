<script setup lang="ts">
import projects from '~/data/projects.json'

const route = useRoute()
const { t } = useI18n()

const project = projects.find(p => p.slug === route.params.slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useHead({
  title: `${project.title} | Portfolio`,
  meta: [
    { name: 'description', content: project.description },
  ],
})

const { heroEntrance } = useGsap()

onMounted(() => {
  heroEntrance('.detail-animate', {
    y: 24,
    stagger: 0.1,
    delay: 0.2,
    duration: 0.8,
  })
})
</script>

<template>
  <div class="pt-24">
    <div class="container-page py-12 md:py-16">
      <!-- Back link -->
      <NuxtLink
        to="/projects"
        class="detail-animate mb-10 inline-flex items-center gap-2 text-sm font-medium text-surface-500 transition-colors hover:text-accent dark:text-surface-400 dark:hover:text-accent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        {{ t.projects.backToProjects }}
      </NuxtLink>

      <div class="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <!-- Left: Info -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Title + year -->
          <div class="detail-animate">
            <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
              {{ project.year }}
            </p>
            <h1 class="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {{ project.title }}
            </h1>
          </div>

          <!-- Tags -->
          <div class="detail-animate flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full bg-surface-100 px-3 py-1.5 text-xs font-medium text-surface-600 dark:bg-surface-800 dark:text-surface-400"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Links -->
          <div class="detail-animate flex flex-wrap gap-3">
            <a
              v-if="project.url && project.url !== '#'"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-dark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {{ t.projects.liveDemo }}
            </a>
            <a
              v-if="project.github && project.github !== '#'"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl border border-surface-300 bg-white px-5 py-2.5 text-sm font-semibold text-surface-900 transition-all hover:border-accent hover:text-accent dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:hover:border-accent dark:hover:text-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <!-- Right: Image + Description -->
        <div class="lg:col-span-3 space-y-8">
          <!-- Image -->
          <div class="detail-animate overflow-hidden rounded-2xl border border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900">
            <div class="relative aspect-video">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="h-full w-full object-cover"
                @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
              />
            </div>
          </div>

          <!-- Description -->
          <div class="detail-animate">
            <h2 class="mb-4 font-display text-xl font-semibold tracking-tight">
              {{ t.projects.aboutProject }}
            </h2>
            <p class="text-base leading-relaxed text-surface-600 dark:text-surface-400">
              {{ project.longDescription }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
