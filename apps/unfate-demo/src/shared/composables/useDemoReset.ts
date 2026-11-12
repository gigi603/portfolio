import { useSessionStore } from '@/features/auth'
import { usePreferencesStore } from '@/features/catalog'
import { useProgressStore } from '@/features/course'
import { useExamStore } from '@/features/exam'

/** Puts the whole demo back to its first state, like a page reload */
export function useDemoReset() {
  const session = useSessionStore()
  const preferences = usePreferencesStore()
  const progress = useProgressStore()
  const exam = useExamStore()

  return function resetDemo(): void {
    session.reset()
    preferences.reset()
    progress.reset()
    exam.reset()
  }
}
