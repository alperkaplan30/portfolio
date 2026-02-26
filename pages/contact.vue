<script setup lang="ts">
import emailjs from '@emailjs/browser'
import socials from '~/data/socials.json'

const { t } = useI18n()
const config = useRuntimeConfig()

useHead({
  title: 'Contact | Portfolio',
  meta: [
    { name: 'description', content: 'Get in touch — I\'m always open to discussing new projects, creative ideas, or opportunities.' },
  ],
})

const { heroEntrance, scrollReveal } = useGsap()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const focusedField = ref<string | null>(null)
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

async function handleSubmit() {
  status.value = 'loading'
  try {
    await emailjs.send(
      config.public.emailjsServiceId,
      config.public.emailjsTemplateId,
      {
        name: form.name,
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      },
      config.public.emailjsPublicKey,
    )
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  }
  catch {
    status.value = 'error'
  }
}

onMounted(() => {
  heroEntrance('.page-header-animate', {
    y: 20,
    stagger: 0.1,
    delay: 0.2,
  })

  scrollReveal('.contact-reveal', {
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
          {{ t.contact.title }}
        </h1>
        <p class="page-header-animate mt-3 text-base text-surface-500 dark:text-surface-400 sm:mt-4 sm:text-lg">
          {{ t.contact.subtitle }}
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="container-page pb-14 md:pb-20">
      <div class="grid gap-8 md:gap-12 lg:grid-cols-5 lg:gap-16">
        <!-- Contact Form -->
        <div class="contact-reveal lg:col-span-3">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Name -->
            <div>
              <label
                for="name"
                class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300"
              >
                {{ t.contact.nameLabel }}
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                :placeholder="t.contact.namePlaceholder"
                class="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 outline-none transition-all duration-200 placeholder:text-surface-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-600 dark:focus:border-accent"
                :class="{ 'border-accent ring-2 ring-accent/20': focusedField === 'name' }"
                @focus="focusedField = 'name'"
                @blur="focusedField = null"
              />
            </div>

            <!-- Email -->
            <div>
              <label
                for="email"
                class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300"
              >
                {{ t.contact.emailLabel }}
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                :placeholder="t.contact.emailPlaceholder"
                class="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 outline-none transition-all duration-200 placeholder:text-surface-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-600 dark:focus:border-accent"
                :class="{ 'border-accent ring-2 ring-accent/20': focusedField === 'email' }"
                @focus="focusedField = 'email'"
                @blur="focusedField = null"
              />
            </div>

            <!-- Subject -->
            <div>
              <label
                for="subject"
                class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300"
              >
                {{ t.contact.subjectLabel }}
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                :placeholder="t.contact.subjectPlaceholder"
                class="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 outline-none transition-all duration-200 placeholder:text-surface-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-600 dark:focus:border-accent"
                :class="{ 'border-accent ring-2 ring-accent/20': focusedField === 'subject' }"
                @focus="focusedField = 'subject'"
                @blur="focusedField = null"
              />
            </div>

            <!-- Message -->
            <div>
              <label
                for="message"
                class="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300"
              >
                {{ t.contact.messageLabel }}
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                :placeholder="t.contact.messagePlaceholder"
                class="w-full resize-none rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 outline-none transition-all duration-200 placeholder:text-surface-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-600 dark:focus:border-accent"
                :class="{ 'border-accent ring-2 ring-accent/20': focusedField === 'message' }"
                @focus="focusedField = 'message'"
                @blur="focusedField = null"
              />
            </div>

            <!-- Submit -->
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <UiBaseButton variant="primary" class="w-full sm:w-auto" :disabled="status === 'loading'">
                <span v-if="status === 'loading'">{{ t.contact.sending }}</span>
                <span v-else>{{ t.contact.send }}</span>
                <svg v-if="status !== 'loading'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </UiBaseButton>
              <p v-if="status === 'success'" class="text-sm text-accent">
                {{ t.contact.successMsg }}
              </p>
              <p v-if="status === 'error'" class="text-sm text-red-500">
                {{ t.contact.errorMsg }}
              </p>
            </div>
          </form>
        </div>

        <!-- Contact Info Sidebar -->
        <div class="contact-reveal space-y-6 md:space-y-8 lg:col-span-2">
          <!-- Direct Contact -->
          <div>
            <h3 class="mb-4 font-display text-lg font-semibold">
              {{ t.contact.directContact }}
            </h3>
            <div class="space-y-3 text-surface-600 dark:text-surface-400">
              <a
                href="mailto:aalperkaplan30@gmail.com"
                class="flex items-center gap-3 transition-colors hover:text-accent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span class="text-sm">aalperkaplan30@gmail.com</span>
              </a>
              <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-sm">{{ t.contact.location }}</span>
              </div>
              <a
                href="tel:+905469524248"
                class="flex items-center gap-3 transition-colors hover:text-accent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="text-sm">+90 546 952 42 48</span>
              </a>
            </div>
          </div>

          <!-- Social Links -->
          <div>
            <h3 class="mb-4 font-display text-lg font-semibold">
              {{ t.contact.social }}
            </h3>
            <div class="flex flex-wrap gap-3">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                :aria-label="social.name"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-200 text-surface-500 transition-all hover:border-accent/30 hover:text-accent dark:border-surface-800 dark:text-surface-400 dark:hover:border-accent/30 dark:hover:text-accent"
              >
                <!-- GitHub -->
                <svg v-if="social.icon === 'github'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <!-- LinkedIn -->
                <svg v-else-if="social.icon === 'linkedin'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <!-- Twitter / X -->
                <svg v-else-if="social.icon === 'twitter'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <!-- Instagram -->
                <svg v-else-if="social.icon === 'instagram'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Availability -->
          <div class="rounded-2xl border border-surface-200 bg-surface-50 p-6 dark:border-surface-800 dark:bg-surface-900">
            <div class="flex items-center gap-3">
              <span class="relative flex h-3 w-3">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>
              <span class="text-sm font-medium text-surface-700 dark:text-surface-300">
                {{ t.contact.available }}
              </span>
            </div>
            <p class="mt-3 text-sm text-surface-500 dark:text-surface-400">
              {{ t.contact.availableDesc }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
