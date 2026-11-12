// Public API of the catalog feature
export { upcomingCourses, cardColors } from './data/catalog'
export type { CatalogFilter } from './data/catalog'
export { usePreferencesStore } from './stores/preferences'
export { default as CourseCard } from './components/CourseCard.vue'
export { default as UpcomingCourseCard } from './components/UpcomingCourseCard.vue'
export { default as ProgressCard } from './components/ProgressCard.vue'
export { default as DonateCard } from './components/DonateCard.vue'
