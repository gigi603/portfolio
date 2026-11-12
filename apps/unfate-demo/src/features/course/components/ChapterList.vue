<script setup lang="ts">
import { chapters, lessonsOfChapter } from '../data/course'
import { useProgressStore } from '../stores/progress'
import { examRoute, lessonRoute } from '../routes'
import { faCheck, faLock } from '@/shared/icons'

// Overview of the course on the course page: every chapter, lesson state and the exam
defineProps<{ examPassMark: number; examQuestions: number }>()
const progress = useProgressStore()

function lessonState(index: number): 'done' | 'open' | 'locked' {
  if (progress.isDone(index)) return 'done'
  return progress.canOpen(index) ? 'open' : 'locked'
}

function chapterState(chapterIndex: number): 'done' | 'current' | 'locked' {
  if (progress.isChapterDone(chapterIndex)) return 'done'
  const first = lessonsOfChapter(chapterIndex)[0]
  return first && progress.canOpen(first.index) ? 'current' : 'locked'
}
</script>

<template>
  <ol class="chapters">
    <li v-for="(chapter, c) in chapters" :key="chapter.title">
      <h2 class="chapter-title"><span class="num" :class="`is-${chapterState(c)}`">{{ c + 1 }}</span>{{ chapter.title }}</h2>
      <ul>
        <li v-for="lesson in lessonsOfChapter(c)" :key="lesson.index">
          <RouterLink v-if="lessonState(lesson.index) !== 'locked'" :to="lessonRoute(lesson.index)" class="row" :class="{ 'is-done': lessonState(lesson.index) === 'done' }">
            <span class="state" :class="`is-${lessonState(lesson.index)}`"><FontAwesomeIcon v-if="lessonState(lesson.index) === 'done'" :icon="faCheck" /></span>
            <span class="name">{{ lesson.title }}<span class="sr-only">{{ lessonState(lesson.index) === 'done' ? ', completed' : '' }}</span></span>
            <span class="min">{{ lesson.minutes }} min</span>
          </RouterLink>
          <p v-else class="row is-locked">
            <span class="state is-locked"><FontAwesomeIcon :icon="faLock" /></span>
            <span class="name">{{ lesson.title }}<span class="sr-only">, locked</span></span>
            <span class="min">{{ lesson.minutes }} min</span>
          </p>
        </li>
      </ul>
    </li>
    <li>
      <h2 class="chapter-title"><span class="num" :class="progress.examPassed ? 'is-done' : progress.allLessonsDone ? 'is-current' : 'is-locked'">{{ chapters.length + 1 }}</span>Exam</h2>
      <RouterLink v-if="progress.allLessonsDone" :to="examRoute()" class="row" :class="{ 'is-done': progress.examPassed }">
        <span class="state" :class="progress.examPassed ? 'is-done' : 'is-open'"><FontAwesomeIcon v-if="progress.examPassed" :icon="faCheck" /></span>
        <span class="name">{{ examQuestions }} questions · pass mark {{ examPassMark }}</span>
      </RouterLink>
      <p v-else class="row is-locked">
        <span class="state is-locked"><FontAwesomeIcon :icon="faLock" /></span>
        <span class="name">{{ examQuestions }} questions · opens when every lesson is completed</span>
      </p>
    </li>
  </ol>
</template>

<style scoped>
.chapters { margin-top: 24px; display: grid; gap: 18px; }
.chapters ul { display: grid; gap: 6px; }
.chapter-title { display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 16px; margin-bottom: 8px; }
.num { display: inline-grid; place-items: center; flex: none; width: 26px; height: 26px; border-radius: 50%; border: 2px solid #c8cedb; font-size: 12px; font-weight: 700; color: var(--uf-muted); }
.num.is-done { border-color: var(--uf-green); color: var(--uf-green-dark); }
.num.is-current { border-color: var(--uf-blue); color: var(--uf-blue-dark); }
.row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 14px; border-radius: 10px; border: 1.5px solid transparent; font-size: 15px; text-decoration: none; transition: background-color .15s, border-color .15s; }
a.row:hover { background: var(--uf-blue-bg); }
/* Completed lesson: title in the same green as its check icon, inside a light green frame */
.row.is-done { color: var(--uf-green-dark); font-weight: 600; background: var(--uf-green-soft); border-color: var(--uf-green-border); }
.row.is-done .min { color: var(--uf-green-dark); }
a.row.is-done:hover { background: var(--uf-blue-bg); }
.row.is-locked { color: var(--uf-muted); }
.state { display: inline-grid; place-items: center; flex: none; width: 22px; height: 22px; border-radius: 50%; font-size: 11px; border: 2px solid var(--uf-blue); }
.state.is-done { background: var(--uf-green-dark); border-color: var(--uf-green-dark); color: #fff; }
.state.is-locked { border: 0; color: var(--uf-soft); }
.name { flex: 1; }
.min { color: var(--uf-muted); font-size: 13px; }
</style>
