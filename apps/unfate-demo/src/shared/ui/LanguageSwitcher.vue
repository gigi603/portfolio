<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, setLocale } from '@/shared/i18n'

// Same switcher as the portfolio: two round flags, the active one outlined.
// Each flag carries the language name in its own language for screen readers and as a tooltip.
const { locale, t } = useI18n()
</script>

<template>
  <div class="language-switcher" role="group" :aria-label="t('language.label')">
    <button
      v-for="code in SUPPORTED_LOCALES"
      :key="code"
      type="button"
      class="flag"
      :class="{ 'is-active': locale === code }"
      :lang="code"
      :aria-label="t(`language.${code}`)"
      :title="t(`language.${code}`)"
      :aria-pressed="locale === code"
      @click="setLocale(code)"
    >
      <svg v-if="code === 'fr'" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="11" height="32" fill="#002395" />
        <rect x="11" width="10" height="32" fill="#fff" />
        <rect x="21" width="11" height="32" fill="#ED2939" />
      </svg>
      <svg v-else viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" fill="#fff" />
        <g fill="#B22234">
          <rect y="0" width="32" height="2.5" /><rect y="5" width="32" height="2.5" /><rect y="10" width="32" height="2.5" />
          <rect y="15" width="32" height="2.5" /><rect y="20" width="32" height="2.5" /><rect y="25" width="32" height="2.5" />
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

<style scoped>
.language-switcher { display: inline-flex; align-items: center; gap: 10px; flex: none; }
.flag { width: 28px; height: 28px; padding: 0; border-radius: 50%; overflow: hidden; border: 1px solid #dfe3ee; background: #fff; opacity: .5; transition: opacity .15s, box-shadow .15s; }
.flag svg { display: block; width: 100%; height: 100%; }
.flag:hover, .flag:focus-visible { opacity: 1; }
.flag:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--uf-text); }
.flag.is-active { opacity: 1; box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--uf-blue); }
</style>
