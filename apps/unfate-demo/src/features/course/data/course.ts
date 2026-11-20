// The demo course in French and English. Both languages share the same structure
// (5 chapters, 11 lessons, same order), so progress and routes do not depend on the language.
import type { Locale } from '@/shared/i18n'
import type { Chapter, CourseContent, Lesson } from '../types'
import en from './content/en'
import fr from './content/fr'

export const contents: Record<Locale, CourseContent> = { en, fr }

const WORDS_PER_MINUTE = 130

function readingMinutes(lesson: Chapter['lessons'][number]): number {
  const text = lesson.blocks
    .map(block => {
      switch (block.type) {
        case 'heading':
        case 'paragraph':
          return block.text
        case 'list':
          return block.items.join(' ')
        case 'table':
          return block.rows.flat().join(' ')
        case 'box':
          return [block.text ?? '', ...(block.items ?? [])].join(' ')
        default:
          return ''
      }
    })
    .join(' ')
  return Math.max(3, Math.round(text.split(/\s+/).length / WORDS_PER_MINUTE))
}

/** Every lesson of a language in order, with its global index (0 to 10). Reading time comes from the English text, so both languages show the same. */
export function lessonsOf(content: CourseContent): Lesson[] {
  return content.chapters
    .flatMap((chapter, chapterIndex) => chapter.lessons.map(lesson => ({ lesson, chapterIndex })))
    .map(({ lesson, chapterIndex }, index) => ({ ...lesson, chapter: chapterIndex, index, minutes: minutes[index] ?? 3 }))
}

const minutes = en.chapters.flatMap(chapter => chapter.lessons.map(readingMinutes))

/** Structure shared by both languages, for logic only (progress, routes). Use useCourse() for texts. */
export const lessons: Lesson[] = lessonsOf(en)
export const chapterCount = en.chapters.length

export function lessonsOfChapter(chapterIndex: number, list: Lesson[] = lessons): Lesson[] {
  return list.filter(lesson => lesson.chapter === chapterIndex)
}
