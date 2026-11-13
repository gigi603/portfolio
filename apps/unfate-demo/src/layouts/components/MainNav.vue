<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import UnfateLogo from '@/shared/ui/UnfateLogo.vue'
import { faCircleCheck, faFolderOpen, faGear, faLayerGroup, faStar } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()

const items = [
  { name: 'catalog', icon: faLayerGroup },
  { name: 'ongoing', icon: faFolderOpen },
  { name: 'favorites', icon: faStar },
  { name: 'completed', icon: faCircleCheck },
  { name: 'settings', icon: faGear },
] as const

// Course, lesson and exam pages belong to "All courses"
const activeName = computed(() => (['course', 'lesson', 'exam'].includes(String(route.name)) ? 'catalog' : route.name))
</script>

<template>
  <nav class="nav" :aria-label="t('nav.main')">
    <UnfateLogo class="nav-logo" />
    <ul>
      <li v-for="item in items" :key="item.name">
        <RouterLink :to="{ name: item.name }" class="nav-item" :class="{ 'is-active': activeName === item.name }" :aria-current="activeName === item.name ? 'page' : undefined">
          <FontAwesomeIcon :icon="item.icon" class="nav-icon" />
          <span>{{ t(`nav.${item.name}`) }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav { padding: 32px 0 24px 40px; }
.nav-logo { margin-bottom: 52px; }
ul { display: flex; flex-direction: column; gap: 14px; }
/* Selected tab: light grey pill, bold black text and icon, black bar on the left.
   Not selected: grey, regular. Hover: dark text only. */
ul { gap: 6px; }
.nav-item { position: relative; display: flex; align-items: center; gap: 14px; margin: 0 20px 0 -14px; padding: 12px 14px; border-radius: 12px; color: #8a90a6; font-weight: 600; font-size: 15px; text-decoration: none; transition: background-color .15s, color .15s; }
.nav-item:hover { color: var(--uf-text); }
.nav-item.is-active { color: var(--uf-text); background: #f0f1f5; font-weight: 700; }
.nav-item.is-active::after { content: ''; position: absolute; left: 0; top: 10px; bottom: 10px; width: 4px; background: var(--uf-text); border-radius: 0 4px 4px 0; }
.nav-icon { width: 18px; }
@media (max-width: 1180px) {
  .nav { padding-left: 28px; }
}
@media (max-width: 760px) {
  .nav { grid-row: 2; padding: 0; background: #fff; border-top: 1px solid var(--uf-line); }
  .nav-logo { display: none; }
  ul { flex-direction: row; gap: 0; }
  li { flex: 1; }
  ul { padding: 6px 4px; }
  /* Same selected style as on desktop: bold black text and icon on a light grey pill, black bar on top */
  .nav-item { flex-direction: column; gap: 4px; margin: 0 2px; padding: 8px 2px 10px; border-radius: 12px; font-size: 11px; text-align: center; }
  .nav-item.is-active { color: var(--uf-text); background: #f0f1f5; }
  .nav-item.is-active::after { left: 30%; right: 30%; top: 0; bottom: auto; width: auto; height: 3px; background: var(--uf-text); border-radius: 0 0 3px 3px; }
  .nav-icon { font-size: 18px; width: auto; }
}
</style>
