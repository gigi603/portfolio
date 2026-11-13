<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { faAward, faChartSimple, faRotateLeft } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ score: number; passMark: number; courseTitle: string }>()
const emit = defineEmits<{ results: []; certificate: []; retry: [] }>()

const RING_LENGTH = 327 // 2πr with r = 52
const passed = computed(() => props.score >= props.passMark)
const dashOffset = computed(() => RING_LENGTH - (RING_LENGTH * props.score) / 100)
</script>

<template>
  <div class="card score-card" :class="passed ? 'is-pass' : 'is-fail'">
    <h1 class="big-title" tabindex="-1" data-page-heading>{{ t('exam.scoreTitle') }}</h1>
    <div class="score">
      <div class="ring-wrap">
        <svg viewBox="0 0 120 120" class="ring" aria-hidden="true">
          <circle cx="60" cy="60" r="52" class="ring-bg" />
          <circle cx="60" cy="60" r="52" class="ring-fg" :style="{ strokeDashoffset: dashOffset }" />
        </svg>
        <p class="ring-value" aria-hidden="true">{{ score }}</p>
      </div>
      <!-- The score in the sentence takes the gauge colour: green when passed, amber when not -->
      <p class="message">
        <template v-if="passed">
          <b>{{ t('exam.congrats') }}</b>{{ ' ' }}
          <i18n-t keypath="exam.passed" tag="span" scope="global"><template #score><strong class="score-num">{{ score }}</strong></template></i18n-t>
        </template>
        <template v-else>
          <b>{{ t('exam.almost') }}</b>{{ ' ' }}
          <i18n-t keypath="exam.failed" tag="span" scope="global">
            <template #score><strong class="score-num">{{ score }}</strong></template>
            <template #mark>{{ passMark }}</template>
          </i18n-t>
        </template>
      </p>
    </div>
    <p class="lead">
      {{ passed ? t('exam.passedLead', { course: courseTitle }) : t('exam.failedLead') }}
    </p>
  </div>
  <div class="actions actions-split">
    <BaseButton variant="secondary" @click="emit('results')">{{ t('exam.showResults') }} <FontAwesomeIcon :icon="faChartSimple" /></BaseButton>
    <BaseButton v-if="passed" variant="success" @click="emit('certificate')">{{ t('exam.showCertificate') }} <FontAwesomeIcon :icon="faAward" /></BaseButton>
    <BaseButton v-else @click="emit('retry')">{{ t('exam.retry') }} <FontAwesomeIcon :icon="faRotateLeft" /></BaseButton>
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
/* One colour for the gauge, the number inside it and the score in the sentence (contrast ≥ 3:1 for large text) */
.is-pass { --score-color: var(--uf-green-strong); }
.is-fail { --score-color: #d97706; }
.ring-fg { stroke: var(--score-color); stroke-linecap: round; stroke-dasharray: 327; transition: stroke-dashoffset .8s ease; }
.ring-value { position: absolute; inset: 0; display: grid; place-items: center; font-size: 46px; font-weight: 800; color: var(--score-color); }
.message { font-size: 22px; line-height: 1.35; color: var(--uf-muted); font-weight: 600; }
.message b { color: var(--uf-green-dark); }
.is-fail .message b { color: #a35f00; }
.score-num { color: var(--score-color); font-weight: 800; }
.lead { text-align: left; margin-top: 16px; font-size: 17px; line-height: 1.75; }
@media (max-width: 760px) {
  .score { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 16px; }
}
</style>
