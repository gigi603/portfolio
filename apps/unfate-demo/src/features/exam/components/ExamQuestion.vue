<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { faCircleArrowLeft, faCircleArrowRight, faCircleCheck, faCircleXmark } from '@/shared/icons'
import { questions } from '../data/questions'
import { useExamStore } from '../stores/exam'

const emit = defineEmits<{ leave: [] }>()
const exam = useExamStore()

const progressPercent = computed(() => ((exam.current + 1) / questions.length) * 100)
const feedback = computed(() => {
  if (!exam.checked) return ''
  return exam.isRight ? 'Correct!' : 'Not quite. The right answer is highlighted in green.'
})

function answerState(index: number): string {
  if (!exam.checked) return exam.selected === index ? 'is-selected' : ''
  if (index === exam.question.correct) return 'is-right'
  return index === exam.selected ? 'is-wrong' : ''
}
</script>

<template>
  <div class="card">
    <p class="count">Question {{ exam.current + 1 }}/{{ questions.length }}</p>
    <div class="bar" role="progressbar" aria-label="Exam progress" aria-valuemin="1" :aria-valuemax="questions.length" :aria-valuenow="exam.current + 1">
      <span :style="{ width: `${progressPercent}%` }"></span>
    </div>
    <fieldset>
      <legend><h1 class="question" tabindex="-1" data-page-heading>{{ exam.question.text }}</h1></legend>
      <label v-for="(answer, index) in exam.question.answers" :key="answer" class="answer" :class="answerState(index)">
        <input type="radio" name="answer" :value="index" :checked="exam.selected === index" :disabled="exam.checked" @change="exam.select(index)" />
        <span>{{ answer }}</span>
        <FontAwesomeIcon v-if="exam.checked && index === exam.question.correct" :icon="faCircleCheck" class="answer-icon" />
        <FontAwesomeIcon v-else-if="exam.checked && index === exam.selected" :icon="faCircleXmark" class="answer-icon" />
      </label>
    </fieldset>
    <p class="feedback" role="status">{{ feedback }}</p>
  </div>
  <div class="actions actions-split">
    <BaseButton variant="secondary" @click="emit('leave')"><FontAwesomeIcon :icon="faCircleArrowLeft" /> Leave the exam</BaseButton>
    <BaseButton v-if="!exam.checked" variant="success" :disabled="exam.selected === null" @click="exam.check()">
      Validate my answer <FontAwesomeIcon :icon="faCircleCheck" />
    </BaseButton>
    <BaseButton v-else @click="exam.next()">
      {{ exam.isLastQuestion ? 'See my score' : 'Next question' }} <FontAwesomeIcon :icon="faCircleArrowRight" />
    </BaseButton>
  </div>
</template>

<style scoped>
.count { text-align: center; font-weight: 700; }
.bar { height: 8px; max-width: 360px; margin: 16px auto 28px; background: var(--uf-green-bg); border-radius: 8px; overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--uf-green); border-radius: 8px; transition: width .3s; }
fieldset { border: 0; margin: 0; padding: 0; min-width: 0; }
legend { padding: 0; margin-bottom: 18px; width: 100%; }
.question { font-size: clamp(19px, 2.4vw, 22px); font-weight: 700; line-height: 1.4; }
.answer { position: relative; display: flex; align-items: center; gap: 12px; padding: 20px; margin-bottom: 12px; border-radius: 10px; background: #f5f6fa; border: 2px solid transparent; cursor: pointer; font-size: 16px; letter-spacing: .3px; transition: background-color .15s, border-color .15s; }
.answer:hover { border-color: #d6d8e7; }
.answer input { position: absolute; opacity: 0; pointer-events: none; }
.answer:focus-within { outline: 3px solid var(--uf-blue); outline-offset: 2px; }
.answer.is-selected, .answer.is-right { background: var(--uf-green-bg); color: var(--uf-green-dark); font-weight: 600; border-color: var(--uf-green); }
.answer.is-wrong { background: var(--uf-red-bg); color: var(--uf-red-dark); border-color: var(--uf-red); }
.answer-icon { margin-left: auto; font-size: 18px; }
.feedback { min-height: 24px; font-weight: 600; margin-top: 6px; }
</style>
