<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import UnfateLogo from '@/shared/ui/UnfateLogo.vue'
import MainNav from './components/MainNav.vue'
import SearchField from './components/SearchField.vue'
import SidePanel from './components/SidePanel.vue'
import MobileProgress from './components/MobileProgress.vue'
import AccountMenu from './components/AccountMenu.vue'
import LanguageSwitcher from '@/shared/ui/LanguageSwitcher.vue'

// Shell of the signed-in app: navigation, header, page, and the right panel (Figma: All Courses)
const route = useRoute()
const main = ref<HTMLElement | null>(null)

// After each navigation: back to the top, and focus on the page title for keyboard and screen reader users
watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    main.value?.scrollTo({ top: 0 })
    main.value?.querySelector<HTMLElement>('[data-page-heading]')?.focus({ preventScroll: true })
  },
)
</script>

<template>
  <div class="layout">
    <MainNav />
    <main ref="main" class="main">
      <!-- Centred column, like the 800 px content of the Figma screens: even outer margins on wide screens -->
      <div class="main-inner">
        <div class="topbar">
          <UnfateLogo class="top-logo" :size="26" />
          <SearchField />
          <LanguageSwitcher class="top-language" />
          <AccountMenu class="top-account" compact />
        </div>
        <MobileProgress />
        <RouterView />
      </div>
    </main>
    <SidePanel />
  </div>
</template>

<style scoped>
.layout { display: grid; grid-template-columns: 220px minmax(0, 1fr) 280px; height: 100%; }
.main { background: var(--uf-bg); overflow-y: auto; padding: 28px clamp(20px, 3vw, 40px) 48px; }
.main-inner { max-width: 840px; margin-inline: auto; }
.topbar { display: flex; align-items: center; gap: 16px; margin-bottom: 26px; }
.top-logo, .top-account { display: none; }
.top-language { margin-left: auto; }
@media (max-width: 1180px) {
  .layout { grid-template-columns: 200px minmax(0, 1fr); }
  .top-account { display: block; }
}
@media (max-width: 760px) {
  .layout { grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr) auto; }
  .main { padding: 16px 16px 32px; }
  .topbar { flex-wrap: wrap; gap: 12px; margin-bottom: 18px; }
  .top-logo { display: inline-flex; }
}
</style>
