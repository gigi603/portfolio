<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/ui/BaseButton.vue'
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
    <aside v-if="!progress.allLessonsDone" class="shortcut">
      <p><b>{{ t('course.shortcutTitle') }}</b> {{ t('course.shortcutText') }}</p>
      <BaseButton variant="ghost" @click="completeAll">{{ t('course.shortcutButton') }}</BaseButton>
    </aside>
  </section>
</template>

<style scoped>
.lead { font-size: 17px; line-height: 1.75; }
.shortcut { margin-top: 24px; padding: 18px 20px; border-radius: 14px; border: 2px dashed #9ccaf7; background: #f5faff; display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap; font-size: 14px; line-height: 1.6; }
.shortcut p { flex: 1 1 300px; }
</style>
