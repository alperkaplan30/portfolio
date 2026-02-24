<script setup lang="ts">
interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  imageClass?: string
  url: string
}

const props = defineProps<{
  project: Project
  linkTo?: string
}>()

const { t } = useI18n()

const cardRef = ref<HTMLElement>()

onMounted(() => {
  if (!cardRef.value) return
  const el = (cardRef.value as any).$el ?? cardRef.value
  const { applyHover } = useSmoothHover()
  applyHover(el, { scale: 1.02, y: -4 })
})

const cardClass = 'group block overflow-hidden rounded-2xl border border-surface-200 bg-white transition-shadow hover:shadow-lg hover:shadow-accent/5 dark:border-surface-800 dark:bg-surface-900 dark:hover:shadow-accent/10'
</script>

<template>
  <NuxtLink
    v-if="linkTo"
    ref="cardRef"
    :to="linkTo"
    :class="cardClass"
  >
    <!-- Image -->
    <div class="relative aspect-video overflow-hidden bg-white dark:bg-surface-850">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="h-full w-full object-cover"
        :class="project.imageClass"
        @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
      />
      <div class="absolute inset-0 flex items-center justify-center opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-surface-400 dark:text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <div class="absolute inset-0 flex items-center justify-center bg-accent/0 transition-all duration-300 group-hover:bg-accent/5">
        <span class="translate-y-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-surface-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-surface-800/90 dark:text-surface-100">
          {{ t.projects.viewProject }} &rarr;
        </span>
      </div>
    </div>
    <!-- Content -->
    <div class="p-5 sm:p-6">
      <h3 class="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">{{ project.title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-surface-500 dark:text-surface-400">{{ project.description }}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        <span v-for="tag in project.tags" :key="tag" class="rounded-full bg-surface-100 px-3 py-1 text-xs font-medium text-surface-600 dark:bg-surface-800 dark:text-surface-400">{{ tag }}</span>
      </div>
    </div>
  </NuxtLink>

  <a
    v-else
    ref="cardRef"
    :href="project.url"
    target="_blank"
    rel="noopener noreferrer"
    :class="cardClass"
  >
    <!-- Image -->
    <div class="relative aspect-video overflow-hidden bg-white dark:bg-surface-850">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="h-full w-full object-cover"
        :class="project.imageClass"
        @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
      />
      <div class="absolute inset-0 flex items-center justify-center opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-surface-400 dark:text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <div class="absolute inset-0 flex items-center justify-center bg-accent/0 transition-all duration-300 group-hover:bg-accent/5">
        <span class="translate-y-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-surface-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-surface-800/90 dark:text-surface-100">
          {{ t.projects.viewProject }} &rarr;
        </span>
      </div>
    </div>
    <!-- Content -->
    <div class="p-5 sm:p-6">
      <h3 class="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">{{ project.title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-surface-500 dark:text-surface-400">{{ project.description }}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        <span v-for="tag in project.tags" :key="tag" class="rounded-full bg-surface-100 px-3 py-1 text-xs font-medium text-surface-600 dark:bg-surface-800 dark:text-surface-400">{{ tag }}</span>
      </div>
    </div>
  </a>
</template>
