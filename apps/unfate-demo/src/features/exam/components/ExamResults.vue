<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import { computed } from 'vue'
import { faCircleArrowLeft, faCircleCheck, faCircleXmark, faRotateLeft } from '@/shared/icons'
import type { Question } from '../data/questions'

const props = defineProps<{ paper: Question[]; answers: number[]; score: number; passed: boolean }>()
const emit = defineEmits<{ back: []; retry: [] }>()

const isRight = (index: number) => props.answers[index] === props.paper[index]?.correct
const rightCount = computed(() => props.paper.filter((_, i) => isRight(i)).length)
</script>

<template>
  <div class="card">
    <h1 class="big-title" tabindex="-1" data-page-heading>My results · {{ score }}/100</h1>
    <p class="summary">{{ rightCount }} right answers out of {{ paper.length }}.</p>
    <ol class="results">
      <li v-for="(question, i) in paper" :key="question.text" :class="isRight(i) ? 'is-ok' : 'is-ko'">
        <FontAwesomeIcon :icon="isRight(i) ? faCircleCheck : faCircleXmark" class="icon" />
        <div>
          <p class="q">{{ question.text }}</p>
          <p>
            <span class="sr-only">{{ isRight(i) ? 'Right.' : 'Wrong.' }}</span>
            Your answer: {{ question.answers[answers[i] ?? -1] ?? '—' }}<template v-if="!isRight(i)"> · Right answer: <b>{{ question.answers[question.correct] }}</b></template>
          </p>
        </div>
      </li>
    </ol>
  </div>
  <div class="actions actions-split">
    <BaseButton variant="secondary" @click="emit('back')"><FontAwesomeIcon :icon="faCircleArrowLeft" /> Back to my score</BaseButton>
    <BaseButton v-if="!passed" @click="emit('retry')">Try again <FontAwesomeIcon :icon="faRotateLeft" /></BaseButton>
  </div>
</template>

<style scoped>
.big-title { font-size: clamp(24px, 3vw, 30px); font-weight: 800; margin-bottom: 6px; }
.summary { color: var(--uf-muted); margin-bottom: 20px; }
.results { display: grid; gap: 12px; }
.results li { display: flex; gap: 14px; padding: 14px 16px; border-radius: 12px; font-size: 14px; line-height: 1.6; }
.is-ok { background: var(--uf-green-bg); }
.is-ko { background: var(--uf-red-bg); }
.icon { margin-top: 4px; font-size: 18px; }
.is-ok .icon { color: var(--uf-green-dark); }
.is-ko .icon { color: var(--uf-red-dark); }
.q { font-weight: 700; }
</style>
