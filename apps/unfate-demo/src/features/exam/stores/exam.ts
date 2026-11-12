import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { PASS_MARK, questions, type Question } from '../data/questions'
import { shuffle } from '../lib/shuffle'

export type ExamStep = 'intro' | 'question' | 'score' | 'results' | 'certificate'

/** A new exam paper: every question in a random order, and the answers of each question shuffled too */
export function drawPaper(random: () => number = Math.random): Question[] {
  return shuffle(questions, random).map(question => {
    const order = shuffle(question.answers.map((_, index) => index), random)
    return {
      ...question,
      answers: order.map(index => question.answers[index]!),
      correct: order.indexOf(question.correct),
    }
  })
}

export const useExamStore = defineStore('exam', () => {
  /** Questions of the current attempt, in the order they are asked */
  const paper = ref<Question[]>(drawPaper())
  const step = ref<ExamStep>('intro')
  const current = ref(0)
  const selected = ref<number | null>(null)
  const checked = ref(false)
  const answers = ref<number[]>([])

  const question = computed(() => paper.value[current.value]!)
  const isLastQuestion = computed(() => current.value === paper.value.length - 1)
  const rightAnswers = computed(() => paper.value.filter((q, i) => answers.value[i] === q.correct).length)
  /** Score out of 100 */
  const score = computed(() => Math.round((rightAnswers.value / paper.value.length) * 100))
  const passed = computed(() => step.value !== 'question' && answers.value.length === paper.value.length && score.value >= PASS_MARK)
  const isRight = computed(() => checked.value && selected.value === question.value.correct)

  /** Starts (or restarts) the exam with a freshly shuffled paper */
  function start(random?: () => number): void {
    paper.value = drawPaper(random)
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

  return { paper, step, current, selected, checked, answers, question, isLastQuestion, rightAnswers, score, passed, isRight, start, select, check, next, show, reset }
})
