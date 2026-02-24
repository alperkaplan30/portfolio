<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div
    class="mb-12 md:mb-16"
    :class="align === 'center' ? 'text-center' : 'text-left'"
  >
    <h2 class="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mt-4 max-w-2xl text-lg text-surface-500 dark:text-surface-400"
      :class="{ 'mx-auto': align === 'center' }"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
