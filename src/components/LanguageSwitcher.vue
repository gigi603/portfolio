<template>
  <div class="language-switcher" :class="{ big: variant === 'big' }">
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
  props: {
    // 'big': two large pill buttons, for the mobile menu
    variant: { type: String, default: '' },
  },
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
  .big { gap: 0; padding: 4px; border-radius: 999px; background: rgba(255, 255, 255, .06); border: 1px solid rgba(255, 255, 255, .14); }
  .big .lang { min-width: 64px; height: 44px; padding: 0 18px; border-radius: 999px; font-size: 16px; color: #cdc9e7; }
  .big .lang + .lang::before { content: none; }
  .big .lang.active { color: #fff; background: radial-gradient(130% 150% at 85% 80%, #6E8BFF 0%, #9535D7 55%, #8A2FCB 100%); box-shadow: 0 0 20px rgba(149, 53, 215, .5); }
</style>
