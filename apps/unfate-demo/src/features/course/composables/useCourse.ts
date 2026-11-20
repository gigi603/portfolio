import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { isLocale } from '@/shared/i18n'
import { contents, lessonsOf, lessonsOfChapter } from '../data/course'

/** Course texts in the current language: they switch as soon as the visitor changes language */
export function useCourse() {
  const { locale } = useI18n()
  const content = computed(() => contents[isLocale(locale.value) ? locale.value : 'en'])
  const course = computed(() => content.value.course)
  const chapters = computed(() => content.value.chapters)
  const lessons = computed(() => lessonsOf(content.value))

  return {
    course,
    chapters,
    lessons,
    lessonsOfChapter: (chapterIndex: number) => lessonsOfChapter(chapterIndex, lessons.value),
  }
}
