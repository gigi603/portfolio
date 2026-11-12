import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { PASS_MARK, POINTS_PER_QUESTION, questions } from '../data/questions'

export type ExamStep = 'intro' | 'question' | 'score' | 'results' | 'certificate'

export const useExamStore = defineStore('exam', () => {
  const step = ref<ExamStep>('intro')
  const current = ref(0)
  const selected = ref<number | null>(null)
  const checked = ref(false)
  const answers = ref<number[]>([])

  const question = computed(() => questions[current.value]!)
  const isLastQuestion = computed(() => current.value === questions.length - 1)
  const score = computed(() =>
    questions.reduce((total, q, i) => total + (answers.value[i] === q.correct ? POINTS_PER_QUESTION : 0), 0),
  )
  const passed = computed(() => step.value !== 'question' && answers.value.length === questions.length && score.value >= PASS_MARK)
  const isRight = computed(() => checked.value && selected.value === question.value.correct)

  function start(): void {
    step.value = 'question'
    current.value = 0
    selected.value = null
    checked.value = false
    answers.value = []
  }

  function select(answer: number): void {
    if (!checked.value) selected.value = answer
  }

  function check(): void {
    if (selected.value === null) return
    answers.value[current.value] = selected.value
    checked.value = true
  }

  /** Goes to the next question, or to the score after the last one */
  function next(): void {
    if (!checked.value) return
    if (isLastQuestion.value) {
      step.value = 'score'
      return
    }
    current.value += 1
    selected.value = null
    checked.value = false
  }

  function show(target: Exclude<ExamStep, 'question'>): void {
    step.value = target
  }

  function reset(): void {
    step.value = 'intro'
    current.value = 0
    selected.value = null
    checked.value = false
    answers.value = []
  }

  return { step, current, selected, checked, answers, question, isLastQuestion, score, passed, isRight, start, select, check, next, show, reset }
})
