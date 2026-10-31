import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import fr from './fr'
import projects from '../db/projects'

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

let currentRoute = null

// Tab title for the current page, e.g. « SPCoach · Gilbert Trinidad »
function pageTitle(route) {
  const site = 'Gilbert Trinidad'
  if (!route) return i18n.t('meta.title')
  if (route.name === 'ProjectDetailComponent') {
    const project = projects.find(p => p.id === route.params.id)
    return `${project ? project.name : i18n.t('notFound.title')} · ${site}`
  }
  if (route.name === 'ProjectsComponent') return `${i18n.t('nav.projects')} · ${site}`
  if (route.name === 'PolitiqueComponent') return `${i18n.t('privacy.title')} · ${site}`
  if (route.name === 'NotFoundComponent') return `${i18n.t('notFound.title')} · ${site}`
  return i18n.t('meta.title')
}

export function setPageRoute(route) {
  currentRoute = route
  document.title = pageTitle(route)
}

function applyDocumentLocale() {
  document.documentElement.lang = i18n.locale
  document.title = pageTitle(currentRoute)
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
