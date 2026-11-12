<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { ChapterList, LessonBanner, chapters, course, lessons, useProgressStore } from '@/features/course'
import { PASS_MARK, questions } from '@/features/exam'
import { useToast } from '@/shared/composables/useToast'
import { useContinueCourse } from '@/shared/composables/useContinueCourse'
import { faChevronLeft, faCircleArrowRight } from '@/shared/icons'

const router = useRouter()
const progress = useProgressStore()
const toast = useToast()
const continueCourse = useContinueCourse(router)

function completeAll(): void {
  progress.completeAll()
  toast.show('All lessons marked as completed. The exam is open.')
}
</script>

<template>
  <section class="page">
    <RouterLink :to="{ name: 'catalog' }" class="back-link"><FontAwesomeIcon :icon="faChevronLeft" /> All courses</RouterLink>
    <LessonBanner :title="course.title" :subtitle="`${lessons.length} lessons · ${chapters.length} chapters + exam · ${course.duration}`" :image="course.image" />
    <div class="card">
      <p class="lead">{{ course.description }}</p>
      <ChapterList :exam-pass-mark="PASS_MARK" :exam-questions="questions.length" />
      <div class="actions">
        <BaseButton @click="continueCourse">{{ progress.started ? 'Continue course' : 'Start the course' }} <FontAwesomeIcon :icon="faCircleArrowRight" /></BaseButton>
      </div>
    </div>
    <!-- Demo-only shortcut, clearly labelled, so a recruiter can reach the exam quickly -->
    <aside v-if="!progress.allLessonsDone" class="shortcut">
      <p><b>Short on time?</b> This shortcut exists only in the demo: it marks every lesson as completed so you can go straight to the exam.</p>
      <BaseButton variant="ghost" @click="completeAll">Mark all lessons as completed</BaseButton>
    </aside>
  </section>
</template>

<style scoped>
.lead { font-size: 17px; line-height: 1.75; }
.shortcut { margin-top: 24px; padding: 18px 20px; border-radius: 14px; border: 2px dashed #9ccaf7; background: #f5faff; display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap; font-size: 14px; line-height: 1.6; }
.shortcut p { flex: 1 1 300px; }
</style>
