<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { faCircleArrowLeft, faCircleArrowRight, faCircleCheck, faCircleXmark } from '@/shared/icons'
import { useCourse } from '@/features/course'
import type { Locale } from '@/shared/i18n'
import { useExamStore } from '../stores/exam'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const emit = defineEmits<{ leave: [] }>()
const exam = useExamStore()
const { chapters } = useCourse()
const lang = computed(() => locale.value as Locale)

const progressPercent = computed(() => ((exam.current + 1) / exam.paper.length) * 100)
const feedback = computed(() => {
  if (!exam.checked) return ''
  return exam.isRight ? t('exam.right') : t('exam.wrong')
})

function answerState(index: number): string {
  if (!exam.checked) return exam.selected === index ? 'is-selected' : ''
  if (index === exam.question.correct) return 'is-right'
  return index === exam.selected ? 'is-wrong' : ''
}
</script>

<template>
  <div class="card">
    <p class="count">{{ t('exam.count', { n: exam.current + 1, total: exam.paper.length }) }}</p>
    <p class="topic">{{ t('common.chapter', { n: exam.question.chapter + 1 }) }} · {{ chapters[exam.question.chapter]?.title }}</p>
    <div class="bar" role="progressbar" :aria-label="t('exam.progress')" aria-valuemin="1" :aria-valuemax="exam.paper.length" :aria-valuenow="exam.current + 1">
      <span :style="{ width: `${progressPercent}%` }"></span>
    </div>
    <fieldset>
      <legend><h1 class="question" tabindex="-1" data-page-heading>{{ exam.question.text[lang] }}</h1></legend>
      <label v-for="(answer, index) in exam.question.answers[lang]" :key="answer" class="answer" :class="answerState(index)">
        <input type="radio" name="answer" :value="index" :checked="exam.selected === index" :disabled="exam.checked" @change="exam.select(index)" />
        <span class="radio" aria-hidden="true"></span>
        <span>{{ answer }}</span>
        <FontAwesomeIcon v-if="exam.checked && index === exam.question.correct" :icon="faCircleCheck" class="answer-icon" />
        <FontAwesomeIcon v-else-if="exam.checked && index === exam.selected" :icon="faCircleXmark" class="answer-icon" />
      </label>
    </fieldset>
    <p class="feedback" role="status">{{ feedback }}</p>
  </div>
  <div class="actions actions-split">
    <BaseButton variant="secondary" @click="emit('leave')"><FontAwesomeIcon :icon="faCircleArrowLeft" /> {{ t('exam.leave') }}</BaseButton>
    <BaseButton v-if="!exam.checked" variant="success" :disabled="exam.selected === null" @click="exam.check()">
      {{ t('exam.validate') }} <FontAwesomeIcon :icon="faCircleCheck" />
    </BaseButton>
    <BaseButton v-else @click="exam.next()">
      {{ exam.isLastQuestion ? t('exam.seeScore') : t('exam.next') }} <FontAwesomeIcon :icon="faCircleArrowRight" />
    </BaseButton>
  </div>
</template>

<style scoped>
.count { text-align: center; font-weight: 700; }
.topic { text-align: center; font-size: 13px; color: var(--uf-muted); margin-top: 4px; }
.bar { height: 8px; max-width: 360px; margin: 14px auto 28px; background: var(--uf-green-bg); border-radius: 8px; overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--uf-green); border-radius: 8px; transition: width .3s; }
fieldset { border: 0; margin: 0; padding: 0; min-width: 0; }
legend { padding: 0; margin-bottom: 18px; width: 100%; }
.question { font-size: clamp(19px, 2.4vw, 22px); font-weight: 700; line-height: 1.4; }
.answer { position: relative; display: flex; align-items: center; gap: 12px; padding: 20px; margin-bottom: 12px; border-radius: 10px; background: #f5f6fa; border: 2px solid transparent; cursor: pointer; font-size: 16px; letter-spacing: .3px; transition: background-color .15s, border-color .15s; }
.answer:hover { border-color: #d6d8e7; }
.answer input { position: absolute; opacity: 0; pointer-events: none; }
/* Focus ring for keyboard users only, not after a mouse click */
.answer:has(input:focus-visible) { outline: 3px solid var(--uf-blue); outline-offset: 2px; }
/* Radio dot: empty grey ring, filled in black once chosen */
.radio { flex: none; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #b4b9c8; background: #fff; transition: border-color .15s; }
/* Chosen but not validated yet: neutral (green and red only tell right or wrong after "Validate") */
.answer.is-selected { color: var(--uf-text); font-weight: 600; border-color: var(--uf-text); }
.answer.is-selected .radio { border-color: var(--uf-text); background: radial-gradient(circle, var(--uf-text) 0 38%, #fff 44%); }
.answer.is-right { background: var(--uf-green-bg); color: var(--uf-green-dark); font-weight: 600; border-color: var(--uf-green); }
/* After validation the ring takes the answer's colour; only the answer the learner picked keeps its dot */
.answer.is-right .radio, .answer.is-wrong .radio { border-color: currentColor; }
.answer:has(input:checked) .radio { background: radial-gradient(circle, currentColor 0 38%, #fff 44%); }
.answer.is-selected:has(input:checked) .radio { background: radial-gradient(circle, var(--uf-text) 0 38%, #fff 44%); }
.answer.is-wrong { background: var(--uf-red-bg); color: var(--uf-red-dark); border-color: var(--uf-red); }
.answer-icon { margin-left: auto; font-size: 18px; }
.feedback { min-height: 24px; font-weight: 600; margin-top: 6px; }
</style>
