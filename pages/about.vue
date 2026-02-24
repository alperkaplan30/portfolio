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
  <div class="pt-16 md:pt-20 lg:pt-24">
    <!-- Page Header -->
    <section class="container-page py-10 md:py-14 lg:py-20">
      <div class="max-w-2xl">
        <h1 class="page-header-animate font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
          {{ t.about.title }}
        </h1>
        <p class="page-header-animate mt-3 text-base text-surface-500 dark:text-surface-400 sm:mt-4 sm:text-lg">
          {{ t.about.subtitle1 }} <span class="text-accent">{{ t.about.subtitle2 }}</span>
        </p>
      </div>
    </section>

    <!-- Bio Section -->
    <section class="container-page pb-10 md:pb-14 lg:pb-16">
      <div class="grid gap-8 md:gap-12 lg:grid-cols-5 lg:gap-16">
        <!-- Portrait -->
        <div class="about-reveal mx-auto w-full max-w-xs sm:max-w-sm lg:col-span-2 lg:mx-0 lg:max-w-none">
          <div class="aspect-square overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-800 sm:aspect-[4/5]">
            <img
              src="/images/about.jpg"
              alt="Alper Kaplan"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <!-- Bio Content -->
        <div class="about-reveal space-y-5 lg:col-span-3 lg:space-y-6">
          <h2 class="font-display text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
            {{ t.about.bioTitle1 }}
            <span class="text-gradient">{{ t.about.bioTitle2 }}</span>
          </h2>

          <div class="space-y-3 text-sm leading-relaxed text-surface-600 dark:text-surface-400 sm:text-base sm:leading-relaxed">
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

        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <div
            v-for="skillGroup in skills"
            :key="skillGroup.category"
            class="about-reveal group/card rounded-2xl border border-surface-200/60 bg-white/50 p-4 transition-all duration-300 hover:border-surface-300 hover:shadow-lg hover:shadow-surface-200/50 dark:border-surface-800/60 dark:bg-surface-900/50 dark:hover:border-surface-700 dark:hover:shadow-surface-950/50 sm:p-6"
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
