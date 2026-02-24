<script setup lang="ts">
const colorMode = useColorMode()
const route = useRoute()
const { t, locale, toggleLocale } = useI18n()
const isMenuOpen = ref(false)

const navLinks = computed(() => [
  { label: t.value.nav.home, to: '/' },
  { label: t.value.nav.projects, to: '/projects' },
  { label: t.value.nav.about, to: '/about' },
  { label: t.value.nav.contact, to: '/contact' },
])

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function closeMenu() {
  isMenuOpen.value = false
}

// Close menu on route change
watch(() => route.path, closeMenu)
</script>

<template>
  <header class="glass fixed inset-x-0 top-0 z-50">
    <nav class="container-page flex h-16 items-center justify-between">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="font-display text-xl font-bold tracking-tight transition-colors hover:text-accent"
      >
        portfolio<span class="text-accent">.</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="relative text-sm font-medium text-surface-600 transition-colors hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
          :class="{ '!text-accent': route.path === link.to }"
        >
          {{ link.label }}
          <span
            v-if="route.path === link.to"
            class="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent"
          />
        </NuxtLink>

        <!-- Download CV -->
        <a
          href="/images/AlperKaplan_CV.pdf"
          download="AlperKaplan_CV.pdf"
          class="flex items-center gap-1.5 rounded-lg border border-accent/40 px-3 py-1.5 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          CV
        </a>

        <!-- Language Toggle -->
        <button
          aria-label="Toggle language"
          class="relative flex h-8 w-16 items-center rounded-full border border-surface-200 bg-surface-100 p-0.5 transition-colors hover:border-surface-300 dark:border-surface-700 dark:bg-surface-800 dark:hover:border-surface-600"
          @click="toggleLocale"
        >
          <!-- Sliding pill -->
          <span
            class="absolute h-7 w-7 rounded-full bg-accent shadow-sm transition-transform duration-300 ease-out"
            :class="locale === 'en' ? 'translate-x-0' : 'translate-x-8'"
          />
          <!-- Labels -->
          <span
            class="relative z-10 flex-1 text-center text-xs font-bold transition-colors duration-300"
            :class="locale === 'en' ? 'text-white' : 'text-surface-500 dark:text-surface-400'"
          >
            EN
          </span>
          <span
            class="relative z-10 flex-1 text-center text-xs font-bold transition-colors duration-300"
            :class="locale === 'tr' ? 'text-white' : 'text-surface-500 dark:text-surface-400'"
          >
            TR
          </span>
        </button>

        <!-- Theme Toggle -->
        <button
          aria-label="Toggle theme"
          class="rounded-lg p-2 text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100"
          @click="toggleTheme"
        >
          <svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="rounded-lg p-2 md:hidden"
        aria-label="Toggle menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="glass border-t border-surface-200/50 dark:border-surface-800/50 md:hidden">
        <div class="container-page flex flex-col gap-4 py-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-base font-medium text-surface-600 transition-colors hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
            :class="{ '!text-accent': route.path === link.to }"
            @click="closeMenu"
          >
            {{ link.label }}
          </NuxtLink>

          <!-- Mobile Download CV -->
          <a
            href="/images/AlperKaplan_CV.pdf"
            download="AlperKaplan_CV.pdf"
            class="flex w-fit items-center gap-2 rounded-lg border border-accent/40 px-4 py-2 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-white"
            @click="closeMenu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            CV
          </a>

          <div class="mt-2 flex items-center gap-4">
            <!-- Mobile Language Toggle -->
            <button
              class="relative flex h-8 w-16 items-center rounded-full border border-surface-200 bg-surface-100 p-0.5 dark:border-surface-700 dark:bg-surface-800"
              @click="toggleLocale"
            >
              <span
                class="absolute h-7 w-7 rounded-full bg-accent shadow-sm transition-transform duration-300 ease-out"
                :class="locale === 'en' ? 'translate-x-0' : 'translate-x-8'"
              />
              <span
                class="relative z-10 flex-1 text-center text-xs font-bold transition-colors duration-300"
                :class="locale === 'en' ? 'text-white' : 'text-surface-500 dark:text-surface-400'"
              >
                EN
              </span>
              <span
                class="relative z-10 flex-1 text-center text-xs font-bold transition-colors duration-300"
                :class="locale === 'tr' ? 'text-white' : 'text-surface-500 dark:text-surface-400'"
              >
                TR
              </span>
            </button>

            <!-- Mobile Theme Toggle -->
            <button
              class="flex items-center gap-2 text-sm text-surface-500"
              @click="toggleTheme"
            >
              <span>{{ colorMode.value === 'dark' ? t.nav.lightMode : t.nav.darkMode }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
