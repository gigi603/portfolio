<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { CertificateCard, ExamIntro, ExamQuestion, ExamResults, ExamScore, PASS_MARK, questions, useExamStore } from '@/features/exam'
import { course, lessonRoute, lessons, useProgressStore } from '@/features/course'
import { useSessionStore } from '@/features/auth'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { faChevronLeft, faCircleArrowRight } from '@/shared/icons'

const router = useRouter()
const exam = useExamStore()
const progress = useProgressStore()
const session = useSessionStore()

const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const passed = computed(() => exam.score >= PASS_MARK)

// Passing the exam completes the course (6/6 steps, "Completed" list)
watch(() => exam.passed, value => { if (value) progress.passExam() })

// Each exam step gets its title focused, like a page change
watch(() => [exam.step, exam.current], () => {
  requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-page-heading]')?.focus({ preventScroll: true }))
})
</script>

<template>
  <section class="page">
    <RouterLink :to="{ name: 'course' }" class="back-link"><FontAwesomeIcon :icon="faChevronLeft" /> Exam</RouterLink>
    <ExamIntro v-if="exam.step === 'intro'" :question-count="questions.length" :pass-mark="PASS_MARK" @start="exam.start()" @back="router.push(lessonRoute(lessons.length - 1))" />
    <ExamQuestion v-else-if="exam.step === 'question'" @leave="exam.show('intro')" />
    <ExamScore v-else-if="exam.step === 'score'" :score="exam.score" :pass-mark="PASS_MARK" :course-title="course.title" @results="exam.show('results')" @certificate="exam.show('certificate')" @retry="exam.start()" />
    <ExamResults v-else-if="exam.step === 'results'" :answers="exam.answers" :score="exam.score" :passed="passed" @back="exam.show('score')" @retry="exam.start()" />
    <template v-else>
      <CertificateCard :name="session.fullName" :course-title="course.title" :score="exam.score" :date="today" />
      <div class="actions">
        <BaseButton @click="router.push({ name: 'completed' })">See my completed courses <FontAwesomeIcon :icon="faCircleArrowRight" /></BaseButton>
      </div>
    </template>
  </section>
</template>
