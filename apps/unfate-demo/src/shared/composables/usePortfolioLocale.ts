import { computed } from 'vue'

// The portfolio stores the visitor's language under this key (FR by default).
// Only the portfolio bar is translated: the Unfate app itself is in English, like the product.
const STORAGE_KEY = 'locale'

const messages = {
  fr: {
    back: 'Retour à l’étude de cas',
    note: 'Démo d’Unfate recréée en code à partir de la maquette V2. Rien n’est enregistré : tout repart à zéro au rechargement.',
  },
  en: {
    back: 'Back to the case study',
    note: 'Unfate demo rebuilt in code from the V2 design. Nothing is saved: everything resets when you reload.',
  },
} as const

type Locale = keyof typeof messages

function readLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'fr'
  } catch {
    return 'fr'
  }
}

export function usePortfolioLocale() {
  const locale = readLocale()
  const t = computed(() => messages[locale])
  return { locale, t }
}
