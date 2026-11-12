import type { Router } from 'vue-router'
import { examRoute, lessonRoute, useProgressStore } from '@/features/course'

/** "Continue": opens the first lesson still to do, or the exam when every lesson is done */
export function useContinueCourse(router: Router) {
  const progress = useProgressStore()

  return async function continueCourse(): Promise<void> {
    progress.start()
    const next = progress.nextLessonIndex
    await router.push(next === null ? examRoute() : lessonRoute(next))
  }
}
