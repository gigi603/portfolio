import type { Router } from 'vue-router'
import { examRoute, lessonRoute, useProgressStore } from '@/features/course'
import { useExamStore } from '@/features/exam'

/** "Continue": opens the first lesson still to do, or the exam when every lesson is done (at the same question if it was left midway) */
export function useContinueCourse(router: Router) {
  const progress = useProgressStore()
  const exam = useExamStore()

  return async function continueCourse(): Promise<void> {
    progress.start()
    const next = progress.nextLessonIndex
    // Exam left midway: straight back to the question where the learner stopped
    if (next === null) exam.resume()
    await router.push(next === null ? examRoute() : lessonRoute(next))
  }
}
