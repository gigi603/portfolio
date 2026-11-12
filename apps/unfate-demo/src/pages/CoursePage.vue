<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/ui/BaseButton.vue'
import DemoShortcut from '@/shared/ui/DemoShortcut.vue'
import { ChapterList, LessonBanner, useCourse, useProgressStore } from '@/features/course'
import { PASS_MARK, questions } from '@/features/exam'
import { useToast } from '@/shared/composables/useToast'
import { useContinueCourse } from '@/shared/composables/useContinueCourse'
import { faChevronLeft, faCircleArrowRight } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const { course, chapters, lessons } = useCourse()
const progress = useProgressStore()
const toast = useToast()
const continueCourse = useContinueCourse(router)

function completeAll(): void {
  progress.completeAll()
  toast.show(t('course.shortcutToast'))
}
</script>

<template>
  <section class="page">
    <RouterLink :to="{ name: 'catalog' }" class="back-link"><FontAwesomeIcon :icon="faChevronLeft" /> {{ t('course.back') }}</RouterLink>
    <LessonBanner :title="course.title" :subtitle="t('course.subtitle', { lessons: lessons.length, chapters: chapters.length, duration: course.duration })" :image="course.image" top :progress="progress.started && !progress.examPassed ? { done: progress.lessonsDone, total: lessons.length } : undefined" />
    <div class="card">
      <p class="lead">{{ course.description }}</p>
      <ChapterList :exam-pass-mark="PASS_MARK" :exam-questions="questions.length" />
      <div class="actions">
        <BaseButton @click="continueCourse">{{ t(progress.started ? 'course.continue' : 'course.start') }} <FontAwesomeIcon :icon="faCircleArrowRight" /></BaseButton>
      </div>
    </div>
    <!-- Demo-only shortcut, clearly labelled, so a recruiter can reach the exam quickly -->
    <DemoShortcut v-if="!progress.allLessonsDone" :title="t('course.shortcutTitle')" :text="t('course.shortcutText')" :action="t('course.shortcutButton')" @run="completeAll" />
  </section>
</template>

<style scoped>
.lead { font-size: 17px; line-height: 1.75; }
</style>
