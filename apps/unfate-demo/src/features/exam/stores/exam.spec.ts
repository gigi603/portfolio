import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { PASS_MARK, QUESTIONS_PER_CHAPTER, questions } from '../data/questions'
import { drawPaper, useExamStore } from './exam'

/** Answers every question of the current paper, getting `wrongAnswers` of them wrong */
function answerAll(exam: ReturnType<typeof useExamStore>, wrongAnswers: number) {
  exam.paper.forEach((question, i) => {
    exam.select(i < wrongAnswers ? (question.correct + 1) % question.answers.length : question.correct)
    exam.check()
    exam.next()
  })
}

/** Small seeded random generator, so shuffles are repeatable in tests */
function seeded(seed: number): () => number {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

describe('question bank', () => {
  it('has 10 questions for each of the 5 chapters, each with 4 answers and a valid right answer', () => {
    expect(questions).toHaveLength(50)
    for (let chapter = 0; chapter < 5; chapter++) {
      expect(questions.filter(q => q.chapter === chapter)).toHaveLength(QUESTIONS_PER_CHAPTER)
    }
    questions.forEach(q => {
      expect(q.answers).toHaveLength(4)
      expect(new Set(q.answers).size).toBe(4)
      expect(q.answers[q.correct]).toBeDefined()
    })
    expect(new Set(questions.map(q => q.text)).size).toBe(50)
  })
})

describe('drawPaper', () => {
  it('asks every question once, in a shuffled order, and keeps the right answer right', () => {
    const paper = drawPaper(seeded(42))
    expect(paper).toHaveLength(questions.length)
    expect(new Set(paper.map(q => q.text))).toEqual(new Set(questions.map(q => q.text)))
    expect(paper.map(q => q.text)).not.toEqual(questions.map(q => q.text))
    paper.forEach(q => {
      const original = questions.find(o => o.text === q.text)!
      expect(q.answers[q.correct]).toBe(original.answers[original.correct])
    })
  })

  it('gives a different order on each attempt', () => {
    expect(drawPaper(seeded(1)).map(q => q.text)).not.toEqual(drawPaper(seeded(2)).map(q => q.text))
  })
})

describe('exam store', () => {
  beforeEach(() => setActivePinia(createPinia()))

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

  it('passes with 40 right answers out of 50', () => {
    const exam = useExamStore()
    exam.start()
    answerAll(exam, 10)
    expect(exam.step).toBe('score')
    expect(exam.score).toBe(PASS_MARK)
    expect(exam.passed).toBe(true)
  })

  it('fails under the pass mark, and a retry starts from scratch with a new order', () => {
    const exam = useExamStore()
    exam.start(seeded(7))
    const firstOrder = exam.paper.map(q => q.text)
    answerAll(exam, 11)
    expect(exam.score).toBe(78)
    expect(exam.passed).toBe(false)
    exam.start(seeded(8))
    expect(exam.current).toBe(0)
    expect(exam.answers).toHaveLength(0)
    expect(exam.paper.map(q => q.text)).not.toEqual(firstOrder)
  })
})
