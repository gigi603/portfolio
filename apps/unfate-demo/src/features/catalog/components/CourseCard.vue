<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import { faCircleArrowRight, faClock, faCoins, faStar, faStarOutline } from '@/shared/icons'

defineProps<{
  title: string
  meta: string
  duration: string
  price: string
  image: string
  teacher: string
  actionLabel: string
  favorite: boolean
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
    </div>
    <button
      type="button"
      class="star"
      :class="{ 'is-on': favorite }"
      :aria-pressed="favorite"
      :aria-label="favorite ? 'Remove from favorites' : 'Add to favorites'"
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
.star { position: absolute; top: 24px; right: 24px; width: 44px; height: 44px; border-radius: 50%; font-size: 22px; color: rgb(255 255 255 / 80%); }
.star:hover, .star.is-on { color: #ffd23f; }
.course-action { position: absolute; left: 24px; bottom: 24px; }
.teacher { position: absolute; right: 26px; bottom: 24px; width: 46px; height: 46px; border-radius: 50%; border: 2px solid rgb(255 255 255 / 80%); object-fit: cover; }
@media (max-width: 760px) {
  .course-card { min-height: 300px; }
  .course-body { padding: 22px 22px 90px; font-size: 15px; }
  .star { top: 14px; right: 14px; }
}
</style>
