<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { LessonBanner, LessonBody, examRoute, lessonRoute, useCourse, useProgressStore } from '@/features/course'
import { useToast } from '@/shared/composables/useToast'
import { faChevronLeft, faCircleArrowRight, faCircleCheck } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// The route guard only lets valid, unlocked lesson numbers through (see app/router.ts)
const props = defineProps<{ lesson: string }>()

const router = useRouter()
const { course, chapters, lessons, lessonsOfChapter } = useCourse()
const progress = useProgressStore()
const toast = useToast()

const index = computed(() => Number(props.lesson) - 1)
const current = computed(() => lessons.value[index.value]!)
const chapter = computed(() => chapters.value[current.value.chapter]!)
const isLast = computed(() => index.value === lessons.value.length - 1)
const done = computed(() => progress.isDone(index.value))
// Last lesson of its chapter (but not of the course): the next step is a new chapter
const endsChapter = computed(() => !isLast.value && lessons.value[index.value + 1]?.chapter !== current.value.chapter)
const nextLabel = computed(() => t(isLast.value ? 'lesson.toExam' : endsChapter.value ? 'lesson.nextChapter' : 'lesson.next'))

// Opening any lesson starts the course: it shows in "Ongoing" right away, not only after a first completion
onMounted(() => progress.start())

function complete(): void {
  progress.completeLesson(index.value)
  const chapterLessons = lessonsOfChapter(current.value.chapter)
  const endsChapter = chapterLessons[chapterLessons.length - 1]?.index === index.value && progress.isChapterDone(current.value.chapter)
  toast.show(endsChapter ? t('lesson.toastChapter', { n: current.value.chapter + 1 }) : t('lesson.toastLesson'))
}

async function goNext(): Promise<void> {
  await router.push(isLast.value ? examRoute() : lessonRoute(index.value + 1))
}
</script>

<template>
  <section class="page">
    <RouterLink :to="{ name: 'course' }" class="back-link"><FontAwesomeIcon :icon="faChevronLeft" /> {{ t('common.chapter', { n: current.chapter + 1 }) }}</RouterLink>
    <LessonBanner :title="current.title" :subtitle="chapter.title" :image="current.banner" :teacher="course.teacher" :minutes="current.minutes" />
    <LessonBody :blocks="current.blocks" />
    <div class="actions actions-split">
      <BaseButton v-if="!done" @click="complete">{{ t('lesson.markDone') }} <FontAwesomeIcon :icon="faCircleCheck" /></BaseButton>
      <p v-else class="done"><FontAwesomeIcon :icon="faCircleCheck" /> {{ t('lesson.done') }}</p>
      <BaseButton :disabled="!done" @click="goNext">{{ nextLabel }} <FontAwesomeIcon :icon="faCircleArrowRight" /></BaseButton>
    </div>
  </section>
</template>

<style scoped>
.done { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; border-radius: 12px; background: var(--uf-green-bg); color: var(--uf-green-dark); font-weight: 700; }
</style>
