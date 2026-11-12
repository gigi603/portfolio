<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { lessons } from '../data/course'
import { useCourse } from '../composables/useCourse'
import { useProgressStore } from '../stores/progress'
import { examRoute, lessonRoute } from '../routes'
import { faCheck, faChevronDown, faCircle, faCircleCheck, faLock, faTrophy } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Right panel while learning: steps completed, then each chapter as an accordion.
// Clicking a chapter only unfolds its lessons; the page changes only when a lesson is clicked.
const progress = useProgressStore()
const route = useRoute()
const { course, chapters, lessonsOfChapter } = useCourse()

const currentLesson = computed(() => (route.name === 'lesson' ? Number(route.params.lesson) - 1 : null))
const currentChapter = computed(() => (currentLesson.value === null ? null : (lessons[currentLesson.value]?.chapter ?? null)))

const expanded = ref(new Set<number>())

// The chapter of the open lesson unfolds by itself, so the visitor always sees where they are
watch(currentChapter, chapter => {
  if (chapter !== null) expanded.value.add(chapter)
}, { immediate: true })

function toggle(chapterIndex: number): void {
  if (expanded.value.has(chapterIndex)) expanded.value.delete(chapterIndex)
  else expanded.value.add(chapterIndex)
}

function chapterLocked(chapterIndex: number): boolean {
  const first = lessonsOfChapter(chapterIndex)[0]
  return !first || !progress.canOpen(first.index)
}
</script>

<template>
  <nav class="outline" :aria-label="t('course.outline')">
    <p class="course-title">{{ course.title }}</p>
    <p class="count">{{ t('course.stepsCompleted', { done: progress.stepsDone, total: progress.totalSteps }) }} <FontAwesomeIcon :icon="faTrophy" :class="progress.examPassed ? 'text-green' : 'text-soft'" /></p>
    <div class="segments" aria-hidden="true"><span v-for="n in progress.totalSteps" :key="n" :class="{ 'is-on': n <= progress.stepsDone }"></span></div>
    <ol>
      <li v-for="(chapter, c) in chapters" :key="chapter.title">
        <button
          type="button"
          class="chapter"
          :class="{ 'is-done': progress.isChapterDone(c), 'is-current': currentChapter === c, 'is-locked': chapterLocked(c) }"
          :aria-expanded="expanded.has(c)"
          :aria-controls="`outline-chapter-${c}`"
          @click="toggle(c)"
        >
          <span class="num">{{ c + 1 }}</span><span class="label">{{ chapter.title }}</span>
          <FontAwesomeIcon v-if="progress.isChapterDone(c)" :icon="faCheck" class="text-green" />
          <FontAwesomeIcon v-else-if="chapterLocked(c)" :icon="faLock" class="text-soft" />
          <FontAwesomeIcon :icon="faChevronDown" class="chevron" :class="{ 'is-open': expanded.has(c) }" />
        </button>
        <ul v-show="expanded.has(c)" :id="`outline-chapter-${c}`">
          <li v-for="lesson in lessonsOfChapter(c)" :key="lesson.index">
            <RouterLink
              v-if="progress.canOpen(lesson.index)"
              :to="lessonRoute(lesson.index)"
              class="lesson"
              :class="{ 'is-current': lesson.index === currentLesson, 'is-done': progress.isDone(lesson.index) }"
              :aria-current="lesson.index === currentLesson ? 'page' : undefined"
            >
              <FontAwesomeIcon v-if="progress.isDone(lesson.index)" :icon="faCircleCheck" />
              <!-- Lesson being read: a selected blue dot, like a checked radio button -->
              <span v-else-if="lesson.index === currentLesson" class="dot is-selected" aria-hidden="true"></span>
              <FontAwesomeIcon v-else :icon="faCircle" />
              <span>{{ lesson.title }}<span v-if="progress.isDone(lesson.index)" class="sr-only">{{ t('course.completedSr') }}</span></span>
            </RouterLink>
            <span v-else class="lesson is-locked">
              <FontAwesomeIcon :icon="faLock" />
              <span>{{ lesson.title }}<span class="sr-only">{{ t('course.lockedSr') }}</span></span>
            </span>
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
          <span class="num">{{ chapters.length + 1 }}</span><span class="label">{{ t('common.exam') }}</span>
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
.chapter { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 6px; font: inherit; font-size: 13px; font-weight: 600; text-align: left; color: var(--uf-muted); text-decoration: none; border-radius: 8px; }
.chapter .label { flex: 1; }
button.chapter:hover, a.chapter:hover { background: var(--uf-blue-bg); }
.chapter.is-done:hover { background: var(--uf-blue-bg); }
.chapter.is-current { color: var(--uf-blue-dark); }
.chapter.is-locked { color: var(--uf-soft); }
/* Completed chapter (and passed exam): all green, like the completed lessons */
.chapter { border: 1.5px solid transparent; }
.chapter.is-done { color: var(--uf-green-dark); background: var(--uf-green-soft); border-color: var(--uf-green-border); }
.chapter.is-done .chevron { color: var(--uf-green-dark); }
.chapter.is-done > .num { background: var(--uf-green-dark); border-color: var(--uf-green-dark); color: #fff; }
.chevron { font-size: 10px; color: var(--uf-muted); transition: transform .2s; }
.chevron.is-open { transform: rotate(180deg); }
.num { display: inline-grid; place-items: center; flex: none; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid #c8cedb; font-size: 10px; font-weight: 700; }
.is-current > .num { border-color: var(--uf-blue); }
ul { margin: 4px 0 8px 14px; display: grid; gap: 4px; }
.lesson { display: flex; gap: 8px; align-items: center; width: 100%; padding: 6px 8px; font-size: 12px; font-weight: 600; color: var(--uf-muted); text-decoration: none; border-radius: 8px; border: 1.5px solid transparent; transition: background-color .15s, border-color .15s; }
a.lesson:hover { background: var(--uf-blue-bg); }
.lesson.is-current { color: var(--uf-blue-dark); }
.dot { flex: none; width: 1em; height: 1em; border-radius: 50%; }
.dot.is-selected { border: 2px solid var(--uf-blue); background: radial-gradient(circle, var(--uf-blue) 0 40%, #fff 44%); box-shadow: 0 0 0 3px var(--uf-blue-bg); }
.lesson.is-locked { color: var(--uf-soft); }
/* Completed lesson: title in the same green as its check icon, inside a light green frame */
.lesson.is-done { color: var(--uf-green-dark); background: var(--uf-green-soft); border-color: var(--uf-green-border); }
a.lesson.is-done:hover { background: var(--uf-blue-bg); }
</style>
