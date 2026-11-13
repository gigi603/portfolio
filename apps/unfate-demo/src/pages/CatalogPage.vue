<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { CourseCard, EmptyCatalog, ProgressCard, UpcomingCourseCard, upcomingCourses, usePreferencesStore, type CatalogFilter } from '@/features/catalog'
import { useCourse, useProgressStore } from '@/features/course'
import { useToast } from '@/shared/composables/useToast'
import { useContinueCourse } from '@/shared/composables/useContinueCourse'
import { useCourseStatus } from '@/shared/composables/useCourseStatus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ filter: CatalogFilter }>()

const router = useRouter()
const preferences = usePreferencesStore()
const progress = useProgressStore()
const toast = useToast()
const continueCourse = useContinueCourse(router)

const { course, lessons } = useCourse()

const query = computed(() => preferences.search.trim().toLowerCase())
const matches = (title: string) => !query.value || title.toLowerCase().includes(query.value) || (title === course.value.title && 'defi'.includes(query.value))

const showMainCourse = computed(() => {
  if (!matches(course.value.title)) return false
  switch (props.filter) {
    case 'ongoing': return progress.started && !progress.examPassed
    case 'favorites': return preferences.favorite
    case 'completed': return progress.examPassed
    default: return true
  }
})
const visibleUpcoming = computed(() => (props.filter === 'all' ? upcomingCourses.filter(c => matches(t(`catalog.upcoming.${c.id}.title`))) : []))
const isEmpty = computed(() => !showMainCourse.value && visibleUpcoming.value.length === 0)
const emptyMessage = computed(() => (query.value ? t('catalog.noMatch', { query: preferences.search.trim() }) : t('catalog.empty.all')))
const { banner, examProgress, actionLabel: courseAction } = useCourseStatus()
// Not started: "Get Started" (catalog wording); then the same label as the course page (continue, take or resume the exam, review)
const actionLabel = computed(() => (progress.started || progress.examPassed ? courseAction.value : t('catalog.getStarted')))

function toggleFavorite(): void {
  preferences.toggleFavorite()
  toast.show(t(preferences.favorite ? 'catalog.added' : 'catalog.removed'))
}
</script>

<template>
  <section class="catalog" aria-labelledby="catalog-title">
    <h1 id="catalog-title" class="page-title" tabindex="-1" data-page-heading>{{ t(`catalog.titles.${filter}`) }}</h1>

    <!-- On tablets and phones the right panel is hidden: the progress card moves here -->
    <ProgressCard
      v-if="progress.started && !progress.examPassed"
      class="narrow-progress"
      :title="course.title"
      :image="course.image"
      :lessons-done="progress.lessonsDone"
      :total="lessons.length"
      :exam="examProgress"
      :action-label="examProgress ? t('exam.resume') : undefined"
      @continue="continueCourse"
    />

    <EmptyCatalog
      v-if="isEmpty && !query && filter !== 'all'"
      :filter="filter"
      :course="{ title: course.title, image: course.image, meta: t('catalog.meta', { n: lessons.length, level: course.level }) }"
      :action-label="actionLabel"
      :lessons-done="progress.lessonsDone"
      :total="lessons.length"
      @open="filter === 'completed' && progress.started ? continueCourse() : router.push({ name: 'course' })"
      @favorite="toggleFavorite"
    />
    <p v-else-if="isEmpty" class="empty">{{ emptyMessage }}</p>

    <CourseCard
      v-if="showMainCourse"
      class="main-course"
      :title="course.title"
      :meta="t('catalog.meta', { n: lessons.length, level: course.level })"
      :duration="course.duration"
      :price="course.price"
      :image="course.image"
      :teacher="course.teacher"
      :action-label="actionLabel"
      :favorite="preferences.favorite"
      :progress="banner"
      :completed="progress.examPassed"
      @open="router.push({ name: 'course' })"
      @toggle-favorite="toggleFavorite"
    />

    <div v-if="visibleUpcoming.length" class="grid">
      <UpcomingCourseCard v-for="upcoming in visibleUpcoming" :key="upcoming.id" :course="upcoming" />
    </div>
  </section>
</template>

<style scoped>
.main-course { margin-bottom: 30px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
.empty { padding: 32px; border-radius: var(--uf-radius); background: #fff; color: var(--uf-muted); text-align: center; }
.narrow-progress { display: none; margin-bottom: 22px; max-width: 420px; }
@media (max-width: 1180px) {
  .narrow-progress { display: block; }
}
@media (max-width: 760px) {
  .grid { grid-template-columns: 1fr; gap: 18px; }
  .narrow-progress { max-width: none; }
}
</style>
