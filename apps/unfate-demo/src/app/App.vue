<script setup lang="ts">
import AppToast from '@/shared/ui/AppToast.vue'
import { useEmbed } from '@/shared/composables/useEmbed'
import { useI18n } from 'vue-i18n'

const { embedded } = useEmbed()
const { t } = useI18n()
</script>

<template>
  <div class="shell">
    <!-- Portfolio bar: hidden when the demo is shown inside the case study window -->
    <header v-if="!embedded" class="portfolio-bar">
      <a href="/project/4#section-demo" class="portfolio-back">← {{ t('portfolio.back') }}</a>
      <p class="portfolio-note">{{ t('portfolio.note') }}</p>
    </header>
    <div class="app">
      <RouterView />
      <AppToast />
    </div>
  </div>
</template>

<style scoped>
.shell { display: flex; flex-direction: column; height: 100%; }
.portfolio-bar { flex: none; display: flex; align-items: center; gap: 16px; padding: 10px 20px; background: #160b22; color: #fff; font-size: 13px; }
.portfolio-back { flex: none; display: inline-flex; align-items: center; min-height: 36px; padding: 0 16px; border-radius: 9999px; background: #9535d7; color: #fff; font-weight: 600; text-decoration: none; }
.portfolio-back:hover { background: #7d26b9; }
.portfolio-back:focus-visible { outline-color: #fff; }
.portfolio-note { opacity: .85; line-height: 1.4; }
.app { position: relative; flex: 1; min-height: 0; overflow: hidden; }
@media (max-width: 640px) {
  .portfolio-bar { padding: 8px 12px; }
  .portfolio-note { display: none; }
}
</style>
