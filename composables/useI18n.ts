import { en, tr, type TranslationMap } from '~/data/i18n/messages'

type Locale = 'tr' | 'en'

const locale = ref<Locale>('en')

const messages: Record<Locale, TranslationMap> = { en, tr }

/**
 * Simple reactive i18n composable.
 * Shared state across all components via module-level ref.
 */
export function useI18n() {
  const t = computed(() => messages[locale.value])

  function toggleLocale() {
    locale.value = locale.value === 'en' ? 'tr' : 'en'
  }

  function setLocale(l: Locale) {
    locale.value = l
  }

  return {
    locale: readonly(locale),
    t,
    toggleLocale,
    setLocale,
  }
}
