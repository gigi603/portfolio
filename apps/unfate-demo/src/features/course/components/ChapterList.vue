<script setup lang="ts">
import { ref } from 'vue'
import { useCourse } from '../composables/useCourse'
import { useProgressStore } from '../stores/progress'
import { examRoute, lessonRoute } from '../routes'
import { faCheck, faChevronDown, faLock } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Overview of the course on the course page: every chapter, lesson state and the exam
defineProps<{ examPassMark: number; examQuestions: number }>()
const progress = useProgressStore()
const { chapters, lessonsOfChapter } = useCourse()

// Every chapter starts unfolded; its arrow folds or unfolds its lessons
const collapsed = ref(new Set<number>())
function toggle(chapterIndex: number): void {
  if (collapsed.value.has(chapterIndex)) collapsed.value.delete(chapterIndex)
  else collapsed.value.add(chapterIndex)
}

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
      <h2 class="chapter-title">
        <button type="button" class="chapter-toggle" :aria-expanded="!collapsed.has(c)" :aria-controls="`course-chapter-${c}`" @click="toggle(c)">
          <span class="num" :class="`is-${chapterState(c)}`">{{ c + 1 }}</span>
          <span>{{ chapter.title }}</span>
          <span v-if="chapterState(c) === 'done'" class="badge"><FontAwesomeIcon :icon="faCheck" /> {{ t('common.completed') }}</span>
          <FontAwesomeIcon :icon="faChevronDown" class="arrow" :class="{ 'is-closed': collapsed.has(c) }" />
        </button>
      </h2>
      <ul v-show="!collapsed.has(c)" :id="`course-chapter-${c}`">
        <li v-for="lesson in lessonsOfChapter(c)" :key="lesson.index">
          <RouterLink v-if="lessonState(lesson.index) !== 'locked'" :to="lessonRoute(lesson.index)" class="row" :class="{ 'is-done': lessonState(lesson.index) === 'done' }">
            <span class="state" :class="`is-${lessonState(lesson.index)}`"><FontAwesomeIcon v-if="lessonState(lesson.index) === 'done'" :icon="faCheck" /></span>
            <span class="name">{{ lesson.title }}<span class="sr-only">{{ lessonState(lesson.index) === 'done' ? t('course.completedSr') : '' }}</span></span>
            <span class="min">{{ t('common.minutes', { n: lesson.minutes }) }}</span>
          </RouterLink>
          <p v-else class="row is-locked">
            <span class="state is-locked"><FontAwesomeIcon :icon="faLock" /></span>
            <span class="name">{{ lesson.title }}<span class="sr-only">{{ t('course.lockedSr') }}</span></span>
            <span class="min">{{ t('common.minutes', { n: lesson.minutes }) }}</span>
          </p>
        </li>
      </ul>
    </li>
    <li>
      <h2 class="chapter-title"><span class="num" :class="progress.examPassed ? 'is-done' : progress.allLessonsDone ? 'is-current' : 'is-locked'">{{ chapters.length + 1 }}</span>{{ t('common.exam') }}<span v-if="progress.examPassed" class="badge"><FontAwesomeIcon :icon="faCheck" /> {{ t('common.completed') }}</span></h2>
      <RouterLink v-if="progress.allLessonsDone" :to="examRoute()" class="row" :class="{ 'is-done': progress.examPassed }">
        <span class="state" :class="progress.examPassed ? 'is-done' : 'is-open'"><FontAwesomeIcon v-if="progress.examPassed" :icon="faCheck" /></span>
        <span class="name">{{ t('course.examRow', { n: examQuestions, mark: examPassMark }) }}</span>
      </RouterLink>
      <p v-else class="row is-locked">
        <span class="state is-locked"><FontAwesomeIcon :icon="faLock" /></span>
        <span class="name">{{ t('course.examLocked', { n: examQuestions }) }}</span>
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
/* Completed chapter: the title stays as is, a green "Completed" label sits on its right */
.chapter-toggle { display: flex; align-items: center; gap: 12px; width: 100%; padding: 4px 14px 4px 0; font: inherit; color: inherit; text-align: left; border-radius: 10px; }
.chapter-toggle:hover .arrow { color: var(--uf-blue-dark); }
/* Arrow down while the lessons show, turned to the right once they are hidden */
.arrow { margin-left: auto; font-size: 14px; color: var(--uf-muted); transition: transform .2s; }
.arrow.is-closed { transform: rotate(-90deg); }
.badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; background: var(--uf-green-soft); color: var(--uf-green-dark); font-size: 12px; font-weight: 700; }
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
