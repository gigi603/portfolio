<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CourseOutline, useCourse, useProgressStore } from '@/features/course'
import { DonateCard, EmptyProgress, ProgressCard } from '@/features/catalog'
import { useToast } from '@/shared/composables/useToast'
import { useContinueCourse } from '@/shared/composables/useContinueCourse'
import { useCourseStatus } from '@/shared/composables/useCourseStatus'
import AccountMenu from './AccountMenu.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()
const progress = useProgressStore()
const toast = useToast()
const continueCourse = useContinueCourse(router)
const { course, lessons } = useCourse()
const { examProgress } = useCourseStatus()

const learning = computed(() => ['course', 'lesson', 'exam'].includes(String(route.name)))
</script>

<template>
  <aside class="side" :aria-label="t('side.label')">
    <AccountMenu />
    <CourseOutline v-if="learning" />
    <template v-else>
      <section>
        <h2 class="side-title">{{ t('side.progress') }}</h2>
        <ProgressCard
          v-if="progress.started && !progress.examPassed"
          :title="course.title"
          :image="course.image"
          :lessons-done="progress.lessonsDone"
          :total="lessons.length"
          :exam="examProgress"
          :action-label="examProgress ? t('exam.resume') : undefined"
          @continue="continueCourse"
        />
        <p v-else-if="progress.examPassed" class="muted">{{ t('side.done') }}</p>
        <EmptyProgress
          v-else
          :title="course.title"
          :image="course.image"
          :total="lessons.length"
          @start="router.push({ name: 'course' })"
        />
      </section>
      <DonateCard class="donate" @donate="toast.show(t('common.notInDemo', { feature: t('side.donateToast') }))" />
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
