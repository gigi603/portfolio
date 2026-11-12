export type BoxTone = 'blue' | 'green' | 'yellow'

export type LessonBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] }
  | { type: 'box'; tone: BoxTone; title: string; text?: string; items?: string[] }
  | { type: 'poolFlow' }

export interface LessonContent {
  title: string
  banner: string
  blocks: LessonBlock[]
}

export interface Chapter {
  title: string
  lessons: LessonContent[]
}

export interface Lesson extends LessonContent {
  /** Position in the whole course, from 0 */
  index: number
  /** Chapter position, from 0 */
  chapter: number
  minutes: number
}

export interface Course {
  id: string
  title: string
  level: string
  duration: string
  price: string
  image: string
  teacher: string
  description: string
}

/** Course texts in one language */
export type CourseText = Course

/** Everything a language needs: the course card texts and the chapters with their lessons */
export interface CourseContent {
  course: CourseText
  chapters: Chapter[]
}
