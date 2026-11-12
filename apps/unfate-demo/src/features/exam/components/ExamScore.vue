<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { faAward, faChartSimple, faRotateLeft } from '@/shared/icons'

const props = defineProps<{ score: number; passMark: number; courseTitle: string }>()
const emit = defineEmits<{ results: []; certificate: []; retry: [] }>()

const RING_LENGTH = 327 // 2πr with r = 52
const passed = computed(() => props.score >= props.passMark)
const dashOffset = computed(() => RING_LENGTH - (RING_LENGTH * props.score) / 100)
</script>

<template>
  <div class="card score-card">
    <h1 class="big-title" tabindex="-1" data-page-heading>Exam Score</h1>
    <div class="score">
      <div class="ring-wrap">
        <svg viewBox="0 0 120 120" class="ring" aria-hidden="true">
          <circle cx="60" cy="60" r="52" class="ring-bg" />
          <circle cx="60" cy="60" r="52" class="ring-fg" :class="{ 'is-fail': !passed }" :style="{ strokeDashoffset: dashOffset }" />
        </svg>
        <p class="ring-value" aria-hidden="true">{{ score }}</p>
      </div>
      <p class="message" :class="{ 'is-fail': !passed }">
        <template v-if="passed"><b>Congratulations!</b> You passed the test with a score of <b>{{ score }}</b>.</template>
        <template v-else><b>Almost there.</b> You scored <b>{{ score }}</b>. You need {{ passMark }} to pass.</template>
      </p>
    </div>
    <p class="lead">
      {{ passed ? `You did it! You are now competent in ${courseTitle}. Your certificate is ready.` : 'Review your answers, reread the lessons you need, then try again.' }}
    </p>
  </div>
  <div class="actions actions-split">
    <BaseButton variant="secondary" @click="emit('results')">Show my results <FontAwesomeIcon :icon="faChartSimple" /></BaseButton>
    <BaseButton v-if="passed" variant="success" @click="emit('certificate')">Show my certificate <FontAwesomeIcon :icon="faAward" /></BaseButton>
    <BaseButton v-else @click="emit('retry')">Try again <FontAwesomeIcon :icon="faRotateLeft" /></BaseButton>
  </div>
</template>

<style scoped>
.score-card { text-align: center; }
.big-title { font-size: clamp(26px, 3.4vw, 34px); font-weight: 800; margin-bottom: 20px; }
.score { display: grid; grid-template-columns: 170px 1fr; gap: 32px; align-items: center; text-align: left; margin: 10px 0; }
.ring-wrap { position: relative; width: 170px; height: 170px; }
.ring { width: 170px; height: 170px; transform: rotate(-90deg); }
.ring circle { fill: none; stroke-width: 12; }
.ring-bg { stroke: #f0f1f6; }
.ring-fg { stroke: var(--uf-green); stroke-linecap: round; stroke-dasharray: 327; transition: stroke-dashoffset .8s ease; }
.ring-fg.is-fail { stroke: #f59e0b; }
.ring-value { position: absolute; inset: 0; display: grid; place-items: center; font-size: 46px; font-weight: 800; }
.message { font-size: 22px; line-height: 1.35; color: var(--uf-muted); font-weight: 600; }
.message b { color: var(--uf-green-dark); }
.message.is-fail b { color: #a35f00; }
.lead { text-align: left; margin-top: 16px; font-size: 17px; line-height: 1.75; }
@media (max-width: 760px) {
  .score { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 16px; }
}
</style>
