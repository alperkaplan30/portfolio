<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  to?: string
  href?: string
}>()

const btnRef = ref<HTMLElement>()

onMounted(() => {
  if (!btnRef.value) return
  const el = (btnRef.value as any).$el ?? btnRef.value
  const { applyHover } = useSmoothHover()
  applyHover(el, { scale: 1.03, y: -1 })
})

const baseClass = 'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-50 dark:focus-visible:ring-offset-surface-950'
</script>

<template>
  <NuxtLink
    v-if="to"
    ref="btnRef"
    :to="to"
    :class="[baseClass, {
      'bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30': variant === 'primary' || !variant,
      'border border-surface-300 bg-white text-surface-900 hover:border-accent hover:text-accent dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:hover:border-accent dark:hover:text-accent': variant === 'secondary',
      'text-surface-600 hover:text-accent dark:text-surface-400 dark:hover:text-accent': variant === 'ghost',
    }]"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    ref="btnRef"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="[baseClass, {
      'bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30': variant === 'primary' || !variant,
      'border border-surface-300 bg-white text-surface-900 hover:border-accent hover:text-accent dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:hover:border-accent dark:hover:text-accent': variant === 'secondary',
      'text-surface-600 hover:text-accent dark:text-surface-400 dark:hover:text-accent': variant === 'ghost',
    }]"
  >
    <slot />
  </a>
  <button
    v-else
    ref="btnRef"
    :class="[baseClass, {
      'bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30': variant === 'primary' || !variant,
      'border border-surface-300 bg-white text-surface-900 hover:border-accent hover:text-accent dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:hover:border-accent dark:hover:text-accent': variant === 'secondary',
      'text-surface-600 hover:text-accent dark:text-surface-400 dark:hover:text-accent': variant === 'ghost',
    }]"
  >
    <slot />
  </button>
</template>
