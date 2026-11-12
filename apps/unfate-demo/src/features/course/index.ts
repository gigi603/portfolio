// Public API of the course feature
export { course, chapters, lessons, lessonsOfChapter } from './data/course'
export { useProgressStore } from './stores/progress'
export { courseRoute, lessonRoute, examRoute } from './routes'
export type { Course, Chapter, Lesson, LessonBlock } from './types'
export { default as ChapterList } from './components/ChapterList.vue'
export { default as CourseOutline } from './components/CourseOutline.vue'
export { default as LessonBanner } from './components/LessonBanner.vue'
export { default as LessonBody } from './components/LessonBody.vue'
