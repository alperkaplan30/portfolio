<script setup lang="ts">
const props = defineProps<{
  label: string
  category?: string
}>()

const hoverClasses = computed(() => {
  const map: Record<string, string> = {
    'Programming Languages': 'hover:text-orange-500 hover:border-orange-500/30 dark:hover:text-orange-400 dark:hover:border-orange-500/30',
    'Technologies': 'hover:text-cyan-500 hover:border-cyan-500/30 dark:hover:text-cyan-400 dark:hover:border-cyan-500/30',
    'Tools & Workflow': 'hover:text-emerald-500 hover:border-emerald-500/30 dark:hover:text-emerald-400 dark:hover:border-emerald-500/30',
    'Other': 'hover:text-amber-500 hover:border-amber-500/30 dark:hover:text-amber-400 dark:hover:border-amber-500/30',
  }
  return map[props.category ?? ''] ?? 'hover:text-accent hover:border-accent/30 dark:hover:text-accent dark:hover:border-accent/30'
})
</script>

<template>
  <span
    class="rounded-lg border border-surface-200 bg-surface-50 px-3 py-1.5 text-sm font-medium text-surface-700 transition-colors dark:border-surface-800 dark:bg-surface-850 dark:text-surface-300"
    :class="hoverClasses"
  >
    {{ label }}
  </span>
</template>
