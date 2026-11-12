<script setup lang="ts">
import ProgressLine from '@/shared/ui/ProgressLine.vue'
import { faClock } from '@/shared/icons'

withDefaults(defineProps<{
  title: string
  subtitle: string
  image: string
  teacher?: string
  minutes?: number
  /** Course banner only: lessons done, shown once the course is started */
  progress?: { done: number; total: number }
  /** Title at the top of the banner (course details) instead of the bottom */
  top?: boolean
}>(), { teacher: undefined, minutes: undefined, progress: undefined, top: false })
</script>

<template>
  <header class="banner" :class="{ 'is-top': top }">
    <img :src="image" alt="" class="banner-bg" />
    <div class="banner-text">
      <h1 tabindex="-1" data-page-heading>{{ title }}</h1>
      <p class="banner-subtitle">{{ subtitle }}</p>
      <template v-if="progress">
        <p class="banner-left">{{ progress.total - progress.done }} {{ progress.total - progress.done === 1 ? 'lesson' : 'lessons' }} left</p>
        <ProgressLine :value="progress.done" :total="progress.total" label="Course progress" />
      </template>
    </div>
    <p v-if="minutes" class="banner-time"><FontAwesomeIcon :icon="faClock" /> {{ minutes }}mins</p>
    <img v-if="teacher" :src="teacher" alt="" class="banner-teacher" />
  </header>
</template>

<style scoped>
.banner { position: relative; overflow: hidden; border-radius: var(--uf-radius); min-height: 200px; color: #fff; margin-bottom: 24px; display: flex; align-items: flex-end; isolation: isolate; }
.banner::before { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgb(20 20 43 / 45%), rgb(20 20 43 / 0%) 75%); }
.banner-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; }
.banner-text { padding: 26px; max-width: 80%; }
.banner.is-top { align-items: flex-start; }
.banner.is-top::before { background: linear-gradient(180deg, rgb(20 20 43 / 35%), rgb(20 20 43 / 0%) 70%); }
.banner.is-top .banner-text { padding-top: 30px; }
.banner-left { font-size: 15px; font-weight: 600; margin: 14px 0 8px; }
h1 { font-size: clamp(26px, 3.4vw, 38px); font-weight: 800; line-height: 1.15; }
.banner-subtitle { font-size: 20px; font-weight: 800; margin-top: 10px; }
.banner-time { position: absolute; top: 18px; right: 22px; display: flex; gap: 6px; align-items: center; font-size: 14px; font-weight: 600; }
.banner-teacher { position: absolute; right: 22px; bottom: 20px; width: 42px; height: 42px; border-radius: 50%; border: 2px solid #fff; object-fit: cover; }
@media (max-width: 760px) {
  .banner { min-height: 170px; }
  .banner-text { padding: 20px 70px 20px 20px; max-width: 100%; }
  .banner-subtitle { font-size: 16px; }
}
</style>
