<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import ProgressLine from '@/shared/ui/ProgressLine.vue'
import { faCheck, faCircleArrowRight, faClock, faCoins, faStar, faStarOutline, faTrophy } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  title: string
  meta: string
  duration: string
  price: string
  image: string
  teacher: string
  actionLabel: string
  favorite: boolean
  /** Shown once the course is started (Figma: Ongoing card) */
  progress?: { done: number; total: number; text?: string }
  /** Exam passed: "Completed" pill next to the title and "Certificate earned" under the price */
  completed?: boolean
}>()

const emit = defineEmits<{ open: []; toggleFavorite: [] }>()
</script>

<template>
  <article class="course-card">
    <img :src="image" alt="" class="course-bg" />
    <div class="course-body">
      <h2 class="course-title">{{ title }}</h2>
      <p>{{ meta }}</p>
      <p class="course-meta"><FontAwesomeIcon :icon="faClock" /> {{ duration }}</p>
      <p class="course-meta"><FontAwesomeIcon :icon="faCoins" /> {{ price }}</p>
      <p v-if="completed" class="course-meta course-cert"><FontAwesomeIcon :icon="faTrophy" /> {{ t('catalog.certificateEarned') }}</p>
      <template v-if="progress">
        <p class="course-meta course-left">{{ progress.text ?? t('common.lessonsLeft', { n: progress.total - progress.done }, progress.total - progress.done) }}</p>
        <ProgressLine class="course-bar" :value="progress.done" :total="progress.total" :label="progress.text ? t('common.exam') : t('common.courseProgress')" />
      </template>
    </div>
    <!-- Top right, next to the favourite star -->
    <span v-if="completed" class="done-pill"><FontAwesomeIcon :icon="faCheck" /> {{ t('common.completed') }}</span>
    <button
      type="button"
      class="star"
      :class="{ 'is-on': favorite }"
      :aria-pressed="favorite"
      :aria-label="favorite ? t('catalog.removeFavorite') : t('catalog.addFavorite')"
      @click="emit('toggleFavorite')"
    >
      <FontAwesomeIcon :icon="favorite ? faStar : faStarOutline" />
    </button>
    <BaseButton variant="glass" class="course-action" @click="emit('open')">
      {{ actionLabel }} <FontAwesomeIcon :icon="faCircleArrowRight" />
    </BaseButton>
    <img :src="teacher" alt="" class="teacher" />
  </article>
</template>

<style scoped>
.course-card { position: relative; overflow: hidden; border-radius: var(--uf-radius); color: #fff; min-height: 340px; isolation: isolate; box-shadow: 0 18px 40px rgb(123 63 228 / 18%); }
.course-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; }
.course-body { padding: 30px 30px 96px; display: flex; flex-direction: column; gap: 8px; font-size: 17px; font-weight: 500; }
.course-title { font-size: clamp(28px, 3.8vw, 44px); font-weight: 800; line-height: 1.12; max-width: 540px; margin-bottom: 6px; text-shadow: 0 2px 12px rgb(0 0 0 / 12%); }
.course-meta { color: rgb(255 255 255 / 88%); display: flex; gap: 8px; align-items: center; }
/* Same pill as a completed chapter on the course page: light green, dark green text and check */
.done-pill { position: absolute; top: 31px; right: 78px; display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 999px; background: var(--uf-green-soft); color: var(--uf-green-dark); font-size: 14px; font-weight: 700; text-shadow: none; }
.course-cert { color: #fff; font-weight: 700; }
.course-cert svg { color: #ffd23f; }
.course-left { margin-top: 4px; font-weight: 600; }
.course-bar { margin-top: 6px; }
.star { position: absolute; top: 24px; right: 24px; width: 44px; height: 44px; border-radius: 50%; font-size: 22px; color: rgb(255 255 255 / 80%); }
.star:hover, .star.is-on { color: #ffd23f; }
.course-action { position: absolute; left: 24px; bottom: 24px; }
.teacher { position: absolute; right: 26px; bottom: 24px; width: 46px; height: 46px; border-radius: 50%; border: 2px solid rgb(255 255 255 / 80%); object-fit: cover; }
@media (max-width: 760px) {
  .course-card { min-height: 300px; }
  .course-body { padding: 22px 22px 90px; font-size: 15px; }
  .star { top: 14px; right: 14px; }
  .done-pill { top: 21px; right: 62px; }
  /* Room for the pill above the title on narrow cards */
  .course-card:has(.done-pill) .course-body { padding-top: 66px; }
}
</style>
