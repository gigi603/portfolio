import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { chapters, lessons, lessonsOfChapter } from '../data/course'

/** Course progress. Kept in memory only, like the Figma prototype: a reload starts over. */
export const useProgressStore = defineStore('progress', () => {
  const done = ref<boolean[]>(lessons.map(() => false))
  const started = ref(false)
  const examPassed = ref(false)

  const lessonsDone = computed(() => done.value.filter(Boolean).length)
  const allLessonsDone = computed(() => lessonsDone.value === lessons.length)
  /** Index of the first lesson still to do, or null when every lesson is done */
  const nextLessonIndex = computed(() => {
    const index = done.value.indexOf(false)
    return index === -1 ? null : index
  })
  const chaptersDone = computed(() => chapters.filter((_, c) => isChapterDone(c)).length)
  /** Steps shown as "n/6 COMPLETED": the 5 chapters plus the exam */
  const stepsDone = computed(() => chaptersDone.value + (examPassed.value ? 1 : 0))
  const totalSteps = chapters.length + 1

  function isDone(index: number): boolean {
    return done.value[index] === true
  }

  /** A lesson opens once the previous one is completed */
  function canOpen(index: number): boolean {
    return index === 0 || isDone(index) || isDone(index - 1)
  }

  function isChapterDone(chapterIndex: number): boolean {
    return lessonsOfChapter(chapterIndex).every(lesson => isDone(lesson.index))
  }

  function start(): void {
    started.value = true
  }

  function completeLesson(index: number): void {
    if (index < 0 || index >= lessons.length) return
    started.value = true
    done.value[index] = true
  }

  /** Demo-only shortcut, so a visitor in a hurry can reach the exam */
  function completeAll(): void {
    started.value = true
    done.value = lessons.map(() => true)
  }

  function passExam(): void {
    examPassed.value = true
  }

  function reset(): void {
    done.value = lessons.map(() => false)
    started.value = false
    examPassed.value = false
  }

  return {
    done, started, examPassed,
    lessonsDone, allLessonsDone, nextLessonIndex, chaptersDone, stepsDone, totalSteps,
    isDone, canOpen, isChapterDone, start, completeLesson, completeAll, passExam, reset,
  }
})
