<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { chapters, course, lessons, lessonsOfChapter } from '../data/course'
import { useProgressStore } from '../stores/progress'
import { examRoute, lessonRoute } from '../routes'
import { faCheck, faChevronRight, faCircle, faCircleCheck, faLock, faTrophy } from '@/shared/icons'

// Right panel while learning: steps completed, chapters, and the lessons of the open chapter
const progress = useProgressStore()
const route = useRoute()

const currentLesson = computed(() => (route.name === 'lesson' ? Number(route.params.lesson) - 1 : null))
const currentChapter = computed(() => {
  if (route.name === 'exam') return null
  const index = currentLesson.value ?? progress.nextLessonIndex
  if (index === null) return null
  return lessons[index]?.chapter ?? null
})

function firstLessonOf(chapterIndex: number): number {
  return lessonsOfChapter(chapterIndex)[0]?.index ?? 0
}
</script>

<template>
  <nav class="outline" aria-label="Course outline">
    <p class="course-title">{{ course.title }}</p>
    <p class="count">{{ progress.stepsDone }}/{{ progress.totalSteps }} COMPLETED <FontAwesomeIcon :icon="faTrophy" :class="progress.examPassed ? 'text-green' : 'text-soft'" /></p>
    <div class="segments" aria-hidden="true"><span v-for="n in progress.totalSteps" :key="n" :class="{ 'is-on': n <= progress.stepsDone }"></span></div>
    <ol>
      <li v-for="(chapter, c) in chapters" :key="chapter.title">
        <component
          :is="progress.canOpen(firstLessonOf(c)) ? 'RouterLink' : 'span'"
          :to="progress.canOpen(firstLessonOf(c)) ? lessonRoute(firstLessonOf(c)) : undefined"
          class="chapter"
          :class="{ 'is-done': progress.isChapterDone(c), 'is-current': currentChapter === c, 'is-locked': !progress.canOpen(firstLessonOf(c)) }"
        >
          <span class="num">{{ c + 1 }}</span><span class="label">{{ chapter.title }}</span>
          <FontAwesomeIcon v-if="progress.isChapterDone(c)" :icon="faCheck" class="text-green" />
          <FontAwesomeIcon v-else-if="!progress.canOpen(firstLessonOf(c))" :icon="faLock" class="text-soft" />
          <FontAwesomeIcon v-else-if="currentChapter === c" :icon="faChevronRight" class="text-blue" />
        </component>
        <ul v-if="currentChapter === c && currentLesson !== null">
          <li v-for="lesson in lessonsOfChapter(c)" :key="lesson.index">
            <component
              :is="progress.canOpen(lesson.index) ? 'RouterLink' : 'span'"
              :to="progress.canOpen(lesson.index) ? lessonRoute(lesson.index) : undefined"
              class="lesson"
              :class="{ 'is-current': lesson.index === currentLesson, 'is-done': progress.isDone(lesson.index) }"
              :aria-current="lesson.index === currentLesson ? 'page' : undefined"
            >
              <FontAwesomeIcon :icon="progress.isDone(lesson.index) ? faCircleCheck : faCircle" /> {{ lesson.title }}
            </component>
          </li>
        </ul>
      </li>
      <li>
        <component
          :is="progress.allLessonsDone ? 'RouterLink' : 'span'"
          :to="progress.allLessonsDone ? examRoute() : undefined"
          class="chapter"
          :class="{ 'is-done': progress.examPassed, 'is-current': route.name === 'exam', 'is-locked': !progress.allLessonsDone }"
        >
          <span class="num">{{ chapters.length + 1 }}</span><span class="label">Exam</span>
          <FontAwesomeIcon v-if="progress.examPassed" :icon="faCheck" class="text-green" />
          <FontAwesomeIcon v-else-if="!progress.allLessonsDone" :icon="faLock" class="text-soft" />
        </component>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.course-title { font-weight: 700; font-size: 15px; line-height: 1.3; }
.count { display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: var(--uf-muted); letter-spacing: .6px; margin: 18px 0 8px; }
.segments { display: grid; grid-template-columns: repeat(6, 1fr); gap: 3px; margin-bottom: 18px; }
.segments span { height: 5px; background: #e1e4ec; border-radius: 3px; }
.segments span.is-on { background: var(--uf-green); }
ol { display: grid; gap: 4px; }
.chapter { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 4px; font-size: 13px; font-weight: 600; color: var(--uf-muted); text-decoration: none; border-radius: 8px; }
.chapter .label { flex: 1; }
a.chapter:hover, a.lesson:hover { background: var(--uf-field); }
.chapter.is-current { color: var(--uf-blue-dark); }
.chapter.is-locked { color: var(--uf-soft); }
.num { display: inline-grid; place-items: center; flex: none; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid #c8cedb; font-size: 10px; font-weight: 700; }
.is-done > .num { border-color: var(--uf-green); color: var(--uf-green-dark); }
.is-current > .num { border-color: var(--uf-blue); }
ul { margin: 2px 0 6px 14px; display: grid; gap: 2px; }
.lesson { display: flex; gap: 8px; align-items: center; width: 100%; padding: 6px 8px; font-size: 12px; font-weight: 600; color: var(--uf-muted); text-decoration: none; border-radius: 6px; }
.lesson.is-current { color: var(--uf-blue-dark); }
.lesson.is-done svg { color: var(--uf-green-strong); }
</style>
