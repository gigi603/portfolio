<script setup lang="ts">
import { computed } from 'vue'
import { faCircleArrowRight, faCircleCheck, faFolderOpen, faStar } from '@/shared/icons'
import type { CatalogFilter } from '../data/catalog'
import { useI18n } from 'vue-i18n'

// Empty "Ongoing", "Favorites" or "Completed" list: say what will show here, then suggest the course to start
// (one clear action, no dead end).
const props = defineProps<{
  filter: Exclude<CatalogFilter, 'all'>
  course: { title: string; image: string; meta: string }
  actionLabel: string
}>()
const emit = defineEmits<{ open: [] }>()
const { t } = useI18n()

const icon = computed(() => ({ ongoing: faFolderOpen, favorites: faStar, completed: faCircleCheck })[props.filter])
</script>

<template>
  <div class="empty-catalog">
    <div class="message">
      <span class="icon" aria-hidden="true"><FontAwesomeIcon :icon="icon" /></span>
      <h2 class="title">{{ t(`catalog.emptyState.${filter}.title`) }}</h2>
      <p class="text">{{ t(`catalog.emptyState.${filter}.text`) }}</p>
    </div>
    <div class="suggestion">
      <p class="eyebrow">{{ t('catalog.emptyState.suggestion') }}</p>
      <button type="button" class="pick" @click="emit('open')">
        <img :src="course.image" alt="" class="thumb" />
        <span class="pick-text">
          <span class="pick-title">{{ course.title }}</span>
          <span class="pick-meta">{{ course.meta }}</span>
        </span>
        <span class="pick-go">{{ actionLabel }} <FontAwesomeIcon :icon="faCircleArrowRight" /></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.empty-catalog { background: #fff; border-radius: var(--uf-radius); box-shadow: var(--uf-shadow); }
.message { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 44px 24px 28px; }
.icon { display: grid; place-items: center; width: 64px; height: 64px; margin-bottom: 18px; border-radius: 50%; background: var(--uf-blue-bg); color: var(--uf-blue-dark); font-size: 26px; box-shadow: 0 0 0 10px #f3f9ff; }
.title { font-size: 20px; font-weight: 800; margin-bottom: 6px; }
.text { max-width: 420px; color: var(--uf-muted); font-size: 15px; line-height: 1.5; }
.suggestion { border-top: 1px solid var(--uf-line); padding: 20px 24px 24px; }
.eyebrow { font-size: 12px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; color: var(--uf-muted); margin-bottom: 12px; }
.pick { display: flex; align-items: center; gap: 16px; width: 100%; padding: 12px; border: 1px solid var(--uf-line); border-radius: 14px; background: var(--uf-field); text-align: left; font: inherit; color: var(--uf-text); transition: border-color .15s, background-color .15s; }
.pick:hover { border-color: var(--uf-blue); background: #fff; }
.thumb { width: 72px; height: 56px; border-radius: 10px; object-fit: cover; flex: none; }
.pick-text { flex: 1; min-width: 0; display: grid; gap: 2px; }
.pick-title { font-weight: 700; font-size: 15px; }
.pick-meta { font-size: 13px; color: var(--uf-muted); }
.pick-go { flex: none; display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 10px; background: var(--uf-blue); color: #fff; font-weight: 700; font-size: 14px; box-shadow: 0 8px 20px rgb(30 150 252 / 28%); }
@media (max-width: 760px) {
  .message { padding: 28px 18px 20px; }
  .icon { width: 52px; height: 52px; font-size: 21px; margin-bottom: 14px; box-shadow: 0 0 0 7px #f3f9ff; }
  .title { font-size: 18px; }
  .text { font-size: 14px; }
  .suggestion { padding: 16px 16px 18px; }
  .pick { flex-wrap: wrap; }
  .pick-go { width: 100%; justify-content: center; }
}
</style>
