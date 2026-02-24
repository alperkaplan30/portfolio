<script setup lang="ts">
import skills from '~/data/skills.json'

const { t } = useI18n()

useHead({
  title: 'About | Portfolio',
  meta: [
    { name: 'description', content: 'Learn about my journey as a creative developer — my skills, tools, and the philosophy behind my work.' },
  ],
})

const { heroEntrance, scrollReveal } = useGsap()

onMounted(() => {
  heroEntrance('.page-header-animate', {
    y: 20,
    stagger: 0.1,
    delay: 0.2,
  })

  scrollReveal('.about-reveal', {
    y: 30,
    stagger: 0.12,
  })
})
</script>

<template>
  <div class="pt-24">
    <!-- Page Header -->
    <section class="container-page py-16 md:py-20">
      <div class="max-w-2xl">
        <h1 class="page-header-animate font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {{ t.about.title }}
        </h1>
        <p class="page-header-animate mt-4 text-lg text-surface-500 dark:text-surface-400">
          {{ t.about.subtitle }}
        </p>
      </div>
    </section>

    <!-- Bio Section -->
    <section class="container-page pb-16">
      <div class="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <!-- Portrait -->
        <div class="about-reveal lg:col-span-2">
          <div class="aspect-[4/5] overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-800">
            <img
              src="/images/about.jpg"
              alt="Alper Kaplan"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <!-- Bio Content -->
        <div class="about-reveal space-y-6 lg:col-span-3">
          <h2 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {{ t.about.bioTitle1 }}
            <span class="text-gradient">{{ t.about.bioTitle2 }}</span>
          </h2>

          <div class="space-y-4 text-base leading-relaxed text-surface-600 dark:text-surface-400">
            <p>{{ t.about.bio1 }}</p>
            <p>{{ t.about.bio2 }}</p>
            <p>{{ t.about.bio3 }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="section-padding border-t border-surface-200 dark:border-surface-800">
      <div class="container-page">
        <div class="about-reveal">
          <UiSectionHeading
            :title="t.about.skillsTitle"
            :subtitle="t.about.skillsSub"
          />
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="skillGroup in skills"
            :key="skillGroup.category"
            class="about-reveal group/card rounded-2xl border border-surface-200/60 bg-white/50 p-6 transition-all duration-300 hover:border-surface-300 hover:shadow-lg hover:shadow-surface-200/50 dark:border-surface-800/60 dark:bg-surface-900/50 dark:hover:border-surface-700 dark:hover:shadow-surface-950/50"
          >
            <UiSkillIcon :category="skillGroup.category" />

            <h3 class="mb-4 text-center font-display text-sm font-semibold uppercase tracking-wider text-surface-900 dark:text-surface-100">
              {{ skillGroup.category }}
            </h3>
            <div class="flex flex-wrap justify-center gap-2">
              <UiSkillBadge
                v-for="skill in skillGroup.items"
                :key="skill"
                :label="skill"
                :category="skillGroup.category"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
