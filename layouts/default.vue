<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <TheNavbar />

    <main class="flex-1">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
