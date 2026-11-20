<template>
  <div class="language-switcher">
    <button
      v-for="lang in languages"
      :key="lang.code"
      type="button"
      class="lang"
      :class="{ active: $i18n.locale === lang.code }"
      :lang="lang.code"
      :aria-label="lang.label"
      :aria-pressed="$i18n.locale === lang.code ? 'true' : 'false'"
      @click="select(lang.code)"
    >
      {{ lang.code.toUpperCase() }}
    </button>
  </div>
</template>

<script>
import { setLocale } from '../i18n'

export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      languages: [
        { code: 'fr', label: 'Français' },
        { code: 'en', label: 'English' },
      ],
    }
  },
  methods: {
    select(code) {
      setLocale(code)
    },
  },
}
</script>

<style scoped>
  .language-switcher {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: Urbanist, system-ui, sans-serif;
  }
  .lang {
    font-family: inherit;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #8f8ab5;
    padding: 4px 2px;
  }
  .lang:hover, .lang.active { color: #fff; }
  .lang:focus { outline: none; }
  .lang:focus-visible { outline: 2px solid #c58cf2; outline-offset: 3px; border-radius: 4px; }
  /* Slash between FR and EN, drawn so it isn't read aloud */
  .lang + .lang::before { content: "/"; margin-right: 8px; color: #5d5880; font-weight: 600; }
</style>
