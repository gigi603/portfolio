import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { lessons } from '../data/course'
import { useProgressStore } from './progress'

describe('progress store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('starts with only the first lesson open', () => {
    const progress = useProgressStore()
    expect(progress.lessonsDone).toBe(0)
    expect(progress.canOpen(0)).toBe(true)
    expect(progress.canOpen(1)).toBe(false)
    expect(progress.nextLessonIndex).toBe(0)
  })

  it('opens the next lesson once the current one is completed', () => {
    const progress = useProgressStore()
    progress.completeLesson(0)
    expect(progress.started).toBe(true)
    expect(progress.canOpen(1)).toBe(true)
    expect(progress.canOpen(2)).toBe(false)
    expect(progress.nextLessonIndex).toBe(1)
  })

  it('counts a chapter as done when all its lessons are done', () => {
    const progress = useProgressStore()
    ;[0, 1, 2].forEach(i => progress.completeLesson(i))
    expect(progress.isChapterDone(0)).toBe(true)
    expect(progress.stepsDone).toBe(1)
  })

  it('opens the exam when every lesson is completed, and counts the exam as the 6th step', () => {
    const progress = useProgressStore()
    progress.completeAll()
    expect(progress.allLessonsDone).toBe(true)
    expect(progress.nextLessonIndex).toBeNull()
    expect(progress.stepsDone).toBe(5)
    progress.passExam()
    expect(progress.stepsDone).toBe(progress.totalSteps)
  })

  it('ignores lesson numbers outside the course and resets everything', () => {
    const progress = useProgressStore()
    progress.completeLesson(lessons.length)
    expect(progress.lessonsDone).toBe(0)
    progress.completeAll()
    progress.reset()
    expect(progress.lessonsDone).toBe(0)
    expect(progress.started).toBe(false)
  })
})
