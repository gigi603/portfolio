<script setup lang="ts">
import { computed } from 'vue'
import { faCircleArrowRight, faCircleCheck, faFolderOpen, faLock, faStar, faStarOutline } from '@/shared/icons'
import SegmentedBar from '@/shared/ui/SegmentedBar.vue'
import type { CatalogFilter } from '../data/catalog'
import { useI18n } from 'vue-i18n'

// Empty "Ongoing", "Favorites" or "Completed" list: say what will show here, then one clear action, no dead end.
// Ongoing: the course to start. Favorites: the same course with its star, to add it right here.
// Completed: a locked preview of the certificate, then where the learner stands and the next step.
const props = defineProps<{
  filter: Exclude<CatalogFilter, 'all'>
  course: { title: string; image: string; meta: string }
  actionLabel: string
  lessonsDone?: number
  total?: number
}>()
const emit = defineEmits<{ open: []; favorite: [] }>()
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
    <div v-if="filter === 'completed'" class="suggestion reward">
      <div class="cert" aria-hidden="true">
        <div class="cert-band" :style="{ backgroundImage: `url(${course.image})` }">
          <span class="cert-lock"><FontAwesomeIcon :icon="faLock" /></span>
        </div>
        <div class="cert-body">
          <span class="cert-eyebrow">{{ t('exam.certificate') }}</span>
          <span class="cert-title">{{ course.title }}</span>
          <span class="cert-line"></span>
          <span class="cert-line short"></span>
        </div>
      </div>
      <div class="next">
        <p class="eyebrow">{{ t('catalog.emptyState.yourCourse') }}</p>
        <p class="next-title">{{ course.title }}</p>
        <p class="next-meta">{{ lessonsDone && total && lessonsDone >= total ? t('catalog.examToPass') : t('catalog.lessonsCompleted', { done: lessonsDone ?? 0, total: total ?? 0 }) }}</p>
        <SegmentedBar class="next-bar" :value="lessonsDone ?? 0" :total="total ?? 0" :label="t('common.courseProgress')" />
        <button type="button" class="pick-go" @click="emit('open')">{{ actionLabel }} <FontAwesomeIcon :icon="faCircleArrowRight" /></button>
      </div>
    </div>
    <div v-else class="suggestion">
      <p class="eyebrow">{{ t('catalog.emptyState.suggestion') }}</p>
      <div v-if="filter === 'favorites'" class="pick is-static">
        <img :src="course.image" alt="" class="thumb" />
        <span class="pick-text">
          <span class="pick-title">{{ course.title }}</span>
          <span class="pick-meta">{{ course.meta }}</span>
        </span>
        <button type="button" class="pick-star" @click="emit('favorite')"><FontAwesomeIcon :icon="faStarOutline" /> {{ t('catalog.addFavorite') }}</button>
      </div>
      <button v-else type="button" class="pick" @click="emit('open')">
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
/* Favorites: the row itself is not a link, the star button is the action */
.pick.is-static:hover { border-color: var(--uf-line); background: var(--uf-field); }
.pick-star { flex: none; display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 10px; background: #fff; border: 1.5px solid var(--uf-yellow, #f5b800); color: var(--uf-text); font-weight: 700; font-size: 14px; transition: background-color .15s; }
.pick-star svg { color: #f5b800; }
.pick-star:hover { background: var(--uf-yellow-bg); }
/* Completed: locked certificate preview + where the learner stands */
.reward { display: flex; gap: 28px; align-items: center; }
.cert { flex: none; width: 240px; border-radius: 14px; overflow: hidden; background: #fff; border: 1px solid var(--uf-line); box-shadow: 0 10px 24px rgb(20 20 43 / 8%); }
.cert-band { position: relative; height: 70px; background-size: cover; background-position: center; filter: grayscale(1); opacity: .55; }
.cert-lock { position: absolute; left: 50%; bottom: -18px; transform: translateX(-50%); display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: var(--uf-text); color: #fff; font-size: 14px; box-shadow: 0 0 0 4px #fff; filter: none; }
.cert-body { display: grid; justify-items: center; gap: 6px; padding: 26px 18px 18px; text-align: center; }
.cert-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; color: var(--uf-soft); }
.cert-title { font-size: 13px; font-weight: 700; color: var(--uf-muted); line-height: 1.3; }
.cert-line { width: 70%; height: 6px; border-radius: 3px; background: #eceef4; }
.cert-line.short { width: 45%; }
.next { flex: 1; min-width: 0; }
.next-title { font-weight: 700; font-size: 16px; }
.next-meta { font-size: 13px; color: var(--uf-muted); margin: 2px 0 10px; }
.next-bar { --bar-track: #e1e4ec; --bar-fill: var(--uf-green); max-width: 360px; margin-bottom: 16px; }
.next .pick-go { border: 0; }
.next .pick-go:hover { background: var(--uf-blue-dark); }
@media (max-width: 760px) {
  .reward { flex-direction: column; align-items: stretch; gap: 20px; }
  .cert { width: 100%; max-width: 280px; align-self: center; }
  .next .pick-go { width: 100%; justify-content: center; }
  .message { padding: 28px 18px 20px; }
  .icon { width: 52px; height: 52px; font-size: 21px; margin-bottom: 14px; box-shadow: 0 0 0 7px #f3f9ff; }
  .title { font-size: 18px; }
  .text { font-size: 14px; }
  .suggestion { padding: 16px 16px 18px; }
  .pick { flex-wrap: wrap; }
  .pick-go { width: 100%; justify-content: center; }
}
</style>
