import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { PASS_MARK, questions } from '../data/questions'
import { useExamStore } from './exam'

function answerAll(exam: ReturnType<typeof useExamStore>, wrongAnswers: number) {
  questions.forEach((question, i) => {
    exam.select(i < wrongAnswers ? (question.correct + 1) % question.answers.length : question.correct)
    exam.check()
    exam.next()
  })
}

describe('exam store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('has 10 questions with a valid right answer each', () => {
    expect(questions).toHaveLength(10)
    questions.forEach(q => expect(q.answers[q.correct]).toBeDefined())
  })

  it('needs an answer before checking, and locks it once checked', () => {
    const exam = useExamStore()
    exam.start()
    exam.check()
    expect(exam.checked).toBe(false)
    exam.select(0)
    exam.check()
    exam.select(2)
    expect(exam.selected).toBe(0)
    expect(exam.answers[0]).toBe(0)
  })

  it('passes with 8 right answers out of 10', () => {
    const exam = useExamStore()
    exam.start()
    answerAll(exam, 2)
    expect(exam.step).toBe('score')
    expect(exam.score).toBe(PASS_MARK)
    expect(exam.passed).toBe(true)
  })

  it('fails under the pass mark, and a retry starts from scratch', () => {
    const exam = useExamStore()
    exam.start()
    answerAll(exam, 3)
    expect(exam.score).toBe(70)
    expect(exam.passed).toBe(false)
    exam.start()
    expect(exam.current).toBe(0)
    expect(exam.answers).toHaveLength(0)
  })
})
