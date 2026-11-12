<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { CourseCard, ProgressCard, UpcomingCourseCard, upcomingCourses, usePreferencesStore, type CatalogFilter } from '@/features/catalog'
import { course, lessons, useProgressStore } from '@/features/course'
import { useToast } from '@/shared/composables/useToast'
import { useContinueCourse } from '@/shared/composables/useContinueCourse'

const props = defineProps<{ filter: CatalogFilter }>()

const router = useRouter()
const preferences = usePreferencesStore()
const progress = useProgressStore()
const toast = useToast()
const continueCourse = useContinueCourse(router)

const titles: Record<CatalogFilter, string> = { all: 'All courses', ongoing: 'Ongoing', favorites: 'Favorites', completed: 'Completed' }
const emptyMessages: Record<CatalogFilter, string> = {
  all: 'No course.',
  ongoing: 'No course in progress yet. Start one from All courses.',
  favorites: 'No favorites yet. Tap the star on a course to keep it here.',
  completed: 'No completed course yet. Pass the exam to see your course here.',
}

const query = computed(() => preferences.search.trim().toLowerCase())
const matches = (title: string) => !query.value || title.toLowerCase().includes(query.value) || (title === course.title && 'defi'.includes(query.value))

const showMainCourse = computed(() => {
  if (!matches(course.title)) return false
  switch (props.filter) {
    case 'ongoing': return progress.started && !progress.examPassed
    case 'favorites': return preferences.favorite
    case 'completed': return progress.examPassed
    default: return true
  }
})
const visibleUpcoming = computed(() => (props.filter === 'all' ? upcomingCourses.filter(c => matches(c.title)) : []))
const isEmpty = computed(() => !showMainCourse.value && visibleUpcoming.value.length === 0)
const emptyMessage = computed(() => (query.value ? `No course matches “${preferences.search.trim()}”.` : emptyMessages[props.filter]))
const actionLabel = computed(() => (progress.examPassed ? 'Review' : progress.started ? 'Continue' : 'Get Started'))

function toggleFavorite(): void {
  preferences.toggleFavorite()
  toast.show(preferences.favorite ? 'Added to your favorites' : 'Removed from your favorites')
}
</script>

<template>
  <section class="catalog" aria-labelledby="catalog-title">
    <h1 id="catalog-title" class="page-title" tabindex="-1" data-page-heading>{{ titles[filter] }}</h1>

    <!-- On tablets and phones the right panel is hidden: the progress card moves here -->
    <ProgressCard
      v-if="progress.started && !progress.examPassed"
      class="narrow-progress"
      :title="course.title"
      :image="course.image"
      :lessons-done="progress.lessonsDone"
      :total="lessons.length"
      @continue="continueCourse"
    />

    <p v-if="isEmpty" class="empty">{{ emptyMessage }}</p>

    <CourseCard
      v-if="showMainCourse"
      class="main-course"
      :title="course.title"
      :meta="`${lessons.length} lessons - ${course.level}`"
      :duration="course.duration"
      :price="course.price"
      :image="course.image"
      :teacher="course.teacher"
      :action-label="actionLabel"
      :favorite="preferences.favorite"
      :progress="progress.started && !progress.examPassed ? { done: progress.lessonsDone, total: lessons.length } : undefined"
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
