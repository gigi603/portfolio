import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { lessons, useProgressStore } from '@/features/course'
import { useExamStore } from '@/features/exam'

/**
 * Where the learner is in the course, for the buttons and progress gauges outside the lessons:
 * lessons in progress, exam to take, exam started (resume where they left off), or course completed.
 */
export function useCourseStatus() {
  const { t } = useI18n()
  const progress = useProgressStore()
  const exam = useExamStore()

  /** Exam started and not finished yet: the banners show its gauge instead of the lessons one */
  const examProgress = computed(() => (!progress.examPassed && exam.ongoing ? { done: exam.answeredCount, total: exam.paper.length } : null))

  /** Label of the main "go on" button */
  const actionLabel = computed(() => {
    if (progress.examPassed) return t('catalog.review')
    if (exam.ongoing) return t('exam.resume')
    if (progress.allLessonsDone) return t('exam.start')
    return progress.started ? t('course.continue') : t('course.start')
  })

  /** Gauge shown on course banners: exam once started, else lessons once the course is started */
  const banner = computed(() => {
    if (progress.examPassed || !progress.started) return undefined
    if (examProgress.value) return { ...examProgress.value, text: t('common.examProgress', examProgress.value) }
    return { done: progress.lessonsDone, total: lessons.length }
  })

  return { examProgress, actionLabel, banner }
}
