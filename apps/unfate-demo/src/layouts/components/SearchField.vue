<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { usePreferencesStore } from '@/features/catalog'
import { faMagnifyingGlass } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const preferences = usePreferencesStore()
const route = useRoute()
const router = useRouter()

// Searching always happens on the course list
async function onInput(): Promise<void> {
  if (route.name !== 'catalog') await router.push({ name: 'catalog' })
}
</script>

<template>
  <div class="search" role="search">
    <FontAwesomeIcon :icon="faMagnifyingGlass" class="icon" />
    <label for="search" class="sr-only">{{ t('search.label') }}</label>
    <input id="search" v-model="preferences.search" type="search" :placeholder="t('search.placeholder')" autocomplete="off" @input="onInput" />
  </div>
</template>

<style scoped>
.search { position: relative; flex: 0 1 380px; }
.icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--uf-muted); }
input { width: 100%; height: 46px; border: 2px solid transparent; border-radius: 6px; background: #fff; padding: 0 16px 0 44px; font-size: 15px; color: var(--uf-text); }
input:focus { outline: none; border-color: var(--uf-blue); }
@media (max-width: 760px) {
  .search { order: 3; flex: 1 1 100%; }
}
</style>
