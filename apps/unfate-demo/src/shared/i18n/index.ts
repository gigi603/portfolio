import { createI18n } from 'vue-i18n'
import en from './messages/en'
import fr from './messages/fr'

// The demo speaks French or English, like the portfolio, and shares its choice:
// both read and write the same "locale" key in localStorage (same site, same origin).
export const SUPPORTED_LOCALES = ['fr', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const STORAGE_KEY = 'locale'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

/** Saved choice, else French (the portfolio's default) */
export function savedLocale(): Locale {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return isLocale(value) ? value : 'fr'
  } catch {
    return 'fr'
  }
}

export type MessageSchema = typeof en

export const i18n = createI18n<[MessageSchema], Locale, false>({
  legacy: false,
  locale: savedLocale(),
  fallbackLocale: 'en',
  messages: { en, fr },
})

function applyDocumentLocale(locale: Locale): void {
  document.documentElement.lang = locale
  document.title = i18n.global.t('meta.title')
}

/** Changes the language of the demo and remembers it for the portfolio too */
export function setLocale(locale: Locale): void {
  i18n.global.locale.value = locale
  applyDocumentLocale(locale)
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Private mode or blocked storage: the choice just won't persist
  }
}

/**
 * Inside the case study window, follow the portfolio when the visitor switches language there:
 * the "storage" event fires in every other document of the same origin, including this iframe.
 */
export function followPortfolioLocale(): void {
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY && isLocale(event.newValue) && event.newValue !== i18n.global.locale.value) {
      i18n.global.locale.value = event.newValue
      applyDocumentLocale(event.newValue)
    }
  })
}

applyDocumentLocale(i18n.global.locale.value)
