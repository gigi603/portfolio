<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import { faClock, faCoins } from '@/shared/icons'
import type { UpcomingCourse } from '../data/catalog'

defineProps<{ course: UpcomingCourse }>()
</script>

<template>
  <article class="upcoming" :class="{ 'is-dotted': !course.image }">
    <img v-if="course.image" :src="course.image" alt="" class="upcoming-bg" />
    <div class="upcoming-body">
      <h2 class="upcoming-title">{{ course.title }}</h2>
      <p>{{ course.meta }}</p>
      <p class="upcoming-meta"><FontAwesomeIcon :icon="faClock" /> {{ course.duration }}</p>
      <p class="upcoming-meta"><FontAwesomeIcon :icon="faCoins" /> {{ course.price }}</p>
    </div>
    <BaseButton variant="glass" class="upcoming-badge" disabled>Coming Soon</BaseButton>
  </article>
</template>

<style scoped>
.upcoming { position: relative; overflow: hidden; border-radius: var(--uf-radius); color: #fff; min-height: 300px; background: #222; isolation: isolate; }
.upcoming.is-dotted { background: radial-gradient(circle at 30% 30%, #4a4a4a 0 9px, transparent 10px) 0 0 / 26px 26px, #1d1d1f; }
.upcoming-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; filter: grayscale(1) brightness(.75); }
.upcoming-body { padding: 30px 30px 96px; display: flex; flex-direction: column; gap: 8px; font-size: 17px; font-weight: 500; }
.upcoming-title { font-size: 26px; font-weight: 800; line-height: 1.12; margin-bottom: 6px; }
.upcoming-meta { color: rgb(255 255 255 / 88%); display: flex; gap: 8px; align-items: center; }
.upcoming-badge { position: absolute; left: 24px; bottom: 24px; }
@media (max-width: 760px) {
  .upcoming { min-height: 250px; }
  .upcoming-body { padding: 22px 22px 90px; font-size: 15px; }
}
</style>
