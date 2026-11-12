<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CourseOutline, course, lessons, useProgressStore } from '@/features/course'
import { DonateCard, ProgressCard } from '@/features/catalog'
import { useToast } from '@/shared/composables/useToast'
import { useContinueCourse } from '@/shared/composables/useContinueCourse'
import AccountMenu from './AccountMenu.vue'

const route = useRoute()
const router = useRouter()
const progress = useProgressStore()
const toast = useToast()
const continueCourse = useContinueCourse(router)

const learning = computed(() => ['course', 'lesson', 'exam'].includes(String(route.name)))
</script>

<template>
  <aside class="side" aria-label="Your progress">
    <AccountMenu />
    <CourseOutline v-if="learning" />
    <template v-else>
      <section>
        <h2 class="side-title">Progress</h2>
        <ProgressCard
          v-if="progress.started && !progress.examPassed"
          :title="course.title"
          :image="course.image"
          :lessons-done="progress.lessonsDone"
          :total="lessons.length"
          @continue="continueCourse"
        />
        <p v-else-if="progress.examPassed" class="muted">Course completed. Well done!</p>
        <p v-else class="muted">No progress</p>
      </section>
      <DonateCard class="donate" @donate="toast.show('Donations are not part of this demo.')" />
    </template>
  </aside>
</template>

<style scoped>
.side { padding: 28px 24px 24px; display: flex; flex-direction: column; gap: 28px; overflow-y: auto; }
.side-title { font-size: 16px; font-weight: 700; margin-bottom: 14px; }
.muted { color: var(--uf-muted); font-size: 14px; }
.donate { margin-top: auto; }
@media (max-width: 1180px) {
  .side { display: none; }
}
</style>
