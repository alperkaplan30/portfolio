<script setup lang="ts">
import projects from '~/data/projects.json'

const { t } = useI18n()

useHead({
  title: 'Projects | Portfolio',
  meta: [
    { name: 'description', content: 'Explore my portfolio of web development projects — from e-commerce platforms to creative agency sites.' },
  ],
})

const { heroEntrance, scrollReveal } = useGsap()

onMounted(() => {
  heroEntrance('.page-header-animate', {
    y: 20,
    stagger: 0.1,
    delay: 0.2,
  })

  scrollReveal('.project-card', {
    y: 30,
    stagger: 0.1,
    start: 'top 90%',
  })
})
</script>

<template>
  <div class="pt-24">
    <!-- Page Header -->
    <section class="container-page py-16 md:py-20">
      <div class="max-w-2xl">
        <h1 class="page-header-animate font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {{ t.projects.title }}
        </h1>
        <p class="page-header-animate mt-4 text-lg text-surface-500 dark:text-surface-400">
          {{ t.projects.description }}
        </p>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="container-page pb-20">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in projects"
          :key="project.id"
          class="project-card"
        >
          <UiProjectCard :project="project" :link-to="`/projects/${project.slug}`" />
        </div>
      </div>
    </section>
  </div>
</template>
