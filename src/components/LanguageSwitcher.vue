<template>
  <div class="language-switcher inline-flex items-center">
    <button
      v-for="lang in languages"
      :key="lang.code"
      type="button"
      class="flag rounded-full overflow-hidden bg-white shadow-sm"
      :class="{ active: $i18n.locale === lang.code }"
      :aria-label="lang.label"
      :title="lang.label"
      :aria-pressed="$i18n.locale === lang.code ? 'true' : 'false'"
      @click="select(lang.code)"
    >
      <svg v-if="lang.code === 'fr'" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="11" height="32" fill="#002395" />
        <rect x="11" width="10" height="32" fill="#fff" />
        <rect x="21" width="11" height="32" fill="#ED2939" />
      </svg>
      <svg v-else viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" fill="#fff" />
        <g fill="#B22234">
          <rect y="0" width="32" height="2.5" />
          <rect y="5" width="32" height="2.5" />
          <rect y="10" width="32" height="2.5" />
          <rect y="15" width="32" height="2.5" />
          <rect y="20" width="32" height="2.5" />
          <rect y="25" width="32" height="2.5" />
          <rect y="30" width="32" height="2" />
        </g>
        <rect width="15" height="17.5" fill="#3C3B6E" />
        <g fill="#fff">
          <circle cx="3" cy="3" r="1" /><circle cx="7.5" cy="3" r="1" /><circle cx="12" cy="3" r="1" />
          <circle cx="5.25" cy="6.5" r="1" /><circle cx="9.75" cy="6.5" r="1" />
          <circle cx="3" cy="10" r="1" /><circle cx="7.5" cy="10" r="1" /><circle cx="12" cy="10" r="1" />
          <circle cx="5.25" cy="13.5" r="1" /><circle cx="9.75" cy="13.5" r="1" />
        </g>
      </svg>
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
    gap: 12px;
  }
  .flag {
    border: 1px solid #e9dcf7;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    opacity: 0.5;
    transition: opacity 150ms ease, box-shadow 150ms ease;
  }
  .flag svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  .flag:hover,
  .flag:focus-visible {
    opacity: 1;
  }
  .flag:focus {
    outline: none;
  }
  .flag:focus-visible {
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #383a3c;
  }
  .flag.active {
    opacity: 1;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #9535d7;
  }
</style>
