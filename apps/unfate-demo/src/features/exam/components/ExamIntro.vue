<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import { faCircleArrowLeft, faCircleArrowRight, faCircleCheck, faRotateLeft } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

withDefaults(defineProps<{
  questionCount: number
  passMark: number
  courseTitle: string
  image: string
  lessonCount: number
  chapterCount: number
  resumeAt?: number | null
}>(), { resumeAt: null })
const emit = defineEmits<{ start: []; resume: []; back: [] }>()
</script>

<template>
  <!-- Exam start page: course banner like the lessons, key figures, then what to expect -->
  <div class="card intro">
    <header class="banner">
      <img :src="image" alt="" class="banner-bg" />
      <span class="done-pill"><FontAwesomeIcon :icon="faCircleCheck" /> {{ t('exam.lessonsDone', { n: lessonCount }) }}</span>
      <div class="banner-text">
        <p class="banner-course">{{ courseTitle }}</p>
        <h1 class="banner-title" tabindex="-1" data-page-heading>{{ t('exam.finalTitle') }}</h1>
      </div>
    </header>
    <div class="body">
      <p class="lead"><span class="text-blue">{{ t('exam.congrats') }}</span> {{ t('exam.introShort', { chapters: chapterCount, mark: passMark }) }}</p>
      <dl class="stats">
        <div><dt>{{ t('exam.statQuestions') }}</dt><dd>{{ questionCount }}</dd></div>
        <div><dt>{{ t('exam.statPass') }}</dt><dd>{{ passMark }}/100</dd></div>
        <div><dt>{{ t('exam.statChapters') }}</dt><dd>{{ chapterCount }}</dd></div>
      </dl>
      <ul class="rules">
        <li v-for="n in 4" :key="n"><FontAwesomeIcon :icon="faCircleCheck" class="rule-icon" />{{ t(`exam.rule${n}`, { mark: passMark }) }}</li>
      </ul>
      <p v-if="resumeAt" class="resume-note"><b>{{ t('exam.resumeAt', { n: resumeAt, total: questionCount }) }}</b></p>
    </div>
  </div>
  <div class="actions actions-split">
    <template v-if="resumeAt">
      <BaseButton variant="secondary" @click="emit('start')"><FontAwesomeIcon :icon="faRotateLeft" /> {{ t('exam.restart') }}</BaseButton>
      <BaseButton @click="emit('resume')">{{ t('exam.resume') }} <FontAwesomeIcon :icon="faCircleArrowRight" /></BaseButton>
    </template>
    <template v-else>
      <BaseButton variant="secondary" @click="emit('back')"><FontAwesomeIcon :icon="faCircleArrowLeft" /> {{ t('exam.previous') }}</BaseButton>
      <BaseButton @click="emit('start')">{{ t('exam.start') }} <FontAwesomeIcon :icon="faCircleCheck" /></BaseButton>
    </template>
  </div>
</template>

<style scoped>
.intro { padding: 0; overflow: hidden; }
.banner { position: relative; min-height: 190px; display: flex; align-items: flex-end; color: #fff; isolation: isolate; }
.banner::before { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgb(20 20 43 / 45%), rgb(20 20 43 / 0%) 75%); }
.banner-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; }
.banner-text { padding: 26px 32px; }
.banner-course { font-size: 15px; font-weight: 700; }
.banner-title { font-size: clamp(28px, 3.4vw, 36px); font-weight: 800; line-height: 1.15; text-shadow: 0 1px 8px rgb(0 0 0 / 25%); }
.banner-title:focus { outline: none; }
.done-pill { position: absolute; top: 18px; right: 20px; display: inline-flex; gap: 8px; align-items: center; padding: 7px 14px; border-radius: 999px; background: rgb(255 255 255 / 28%); backdrop-filter: blur(8px); font-size: 14px; font-weight: 700; }
.body { padding: 26px 32px 32px; }
.lead { font-size: 17px; line-height: 1.7; }
.lead .text-blue { font-weight: 600; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 22px 0; }
.stats div { display: flex; flex-direction: column-reverse; align-items: flex-start; text-align: left; padding: 16px 18px; border-radius: 14px; background: #f5f6fa; }
.stats dd { margin: 0; font-size: 28px; font-weight: 800; color: var(--uf-text); }
.stats dt { font-size: 14px; color: var(--uf-muted); }
.rules { display: grid; gap: 12px; font-size: 15px; }
.rules li { display: flex; gap: 10px; align-items: flex-start; }
.rule-icon { margin-top: 4px; color: var(--uf-blue, #1e96fc); flex-shrink: 0; }
.resume-note { margin-top: 18px; padding: 12px 16px; border-radius: 12px; background: #eef6ff; }
@media (max-width: 760px) {
  .banner { min-height: 170px; }
  .banner-text, .body { padding-left: 20px; padding-right: 20px; }
  .done-pill { top: 14px; right: 14px; font-size: 13px; }
  .stats { grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .stats div { padding: 12px; }
  .stats dd { font-size: 22px; }
  .stats dt { font-size: 12px; }
}
</style>
