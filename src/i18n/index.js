import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import fr from './fr'

Vue.use(VueI18n)

const STORAGE_KEY = 'locale'
const SUPPORTED = ['fr', 'en']

function savedLocale() {
  try {
    const locale = localStorage.getItem(STORAGE_KEY)
    return SUPPORTED.includes(locale) ? locale : null
  } catch (e) {
    return null
  }
}

const i18n = new VueI18n({
  locale: savedLocale() || 'fr',
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  messages: { en, fr },
})

function applyDocumentLocale() {
  document.documentElement.lang = i18n.locale
  document.title = i18n.t('meta.title')
  const description = document.querySelector('meta[name="description"]')
  if (description) description.setAttribute('content', i18n.t('meta.description'))
}

export function setLocale(locale) {
  if (!SUPPORTED.includes(locale)) return
  i18n.locale = locale
  applyDocumentLocale()
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch (e) {
    // Private mode or blocked storage: the choice just won't persist
  }
}

applyDocumentLocale()

export default i18n
