<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { CertificateCard, ExamIntro, ExamQuestion, ExamResults, ExamScore, PASS_MARK, questions, useExamStore } from '@/features/exam'
import { lessonRoute, lessons, useCourse, useProgressStore } from '@/features/course'
import { useSessionStore } from '@/features/auth'
import BaseButton from '@/shared/ui/BaseButton.vue'
import DemoShortcut from '@/shared/ui/DemoShortcut.vue'
import { faChevronLeft, faCircleArrowRight } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const router = useRouter()
const exam = useExamStore()
const progress = useProgressStore()
const session = useSessionStore()

const { course } = useCourse()
const today = computed(() => new Date().toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }))
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
    <RouterLink :to="{ name: 'course' }" class="back-link"><FontAwesomeIcon :icon="faChevronLeft" /> {{ t('exam.back') }}</RouterLink>
    <ExamIntro v-if="exam.step === 'intro'" :question-count="questions.length" :pass-mark="PASS_MARK" @start="exam.start()" @back="router.push(lessonRoute(lessons.length - 1))" />
    <ExamQuestion v-else-if="exam.step === 'question'" @leave="exam.show('intro')" />
    <!-- Demo-only shortcut, like the one on the course page: see the final result without answering the 50 questions -->
    <DemoShortcut v-if="exam.step === 'intro' || exam.step === 'question'" :title="t('course.shortcutTitle')" :text="t('exam.shortcutText', { n: questions.length })" :action="t('exam.shortcutButton')" @run="exam.answerAllForDemo()" />
    <ExamScore v-else-if="exam.step === 'score'" :score="exam.score" :pass-mark="PASS_MARK" :course-title="course.title" @results="exam.show('results')" @certificate="exam.show('certificate')" @retry="exam.start()" />
    <ExamResults v-else-if="exam.step === 'results'" :paper="exam.paper" :answers="exam.answers" :score="exam.score" :passed="passed" @back="exam.show('score')" @retry="exam.start()" />
    <template v-else>
      <CertificateCard :name="session.fullName" :course-title="course.title" :score="exam.score" :date="today" />
      <div class="actions">
        <BaseButton @click="router.push({ name: 'completed' })">{{ t('exam.seeCompleted') }} <FontAwesomeIcon :icon="faCircleArrowRight" /></BaseButton>
      </div>
    </template>
  </section>
</template>
