<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/ui/BaseButton.vue'
import { LessonBanner, LessonBody, chapters, course, examRoute, lessonRoute, lessons, lessonsOfChapter, useProgressStore } from '@/features/course'
import { useToast } from '@/shared/composables/useToast'
import { faChevronLeft, faCircleArrowRight, faCircleCheck } from '@/shared/icons'

// The route guard only lets valid, unlocked lesson numbers through (see app/router.ts)
const props = defineProps<{ lesson: string }>()

const router = useRouter()
const progress = useProgressStore()
const toast = useToast()

const index = computed(() => Number(props.lesson) - 1)
const current = computed(() => lessons[index.value]!)
const chapter = computed(() => chapters[current.value.chapter]!)
const isLast = computed(() => index.value === lessons.length - 1)
const done = computed(() => progress.isDone(index.value))

// Opening any lesson starts the course: it shows in "Ongoing" right away, not only after a first completion
onMounted(() => progress.start())

function complete(): void {
  progress.completeLesson(index.value)
  const chapterLessons = lessonsOfChapter(current.value.chapter)
  const endsChapter = chapterLessons[chapterLessons.length - 1]?.index === index.value && progress.isChapterDone(current.value.chapter)
  toast.show(endsChapter ? `Chapter ${current.value.chapter + 1} completed!` : 'Lesson completed')
}

async function goNext(): Promise<void> {
  await router.push(isLast.value ? examRoute() : lessonRoute(index.value + 1))
}
</script>

<template>
  <section class="page">
    <RouterLink :to="{ name: 'course' }" class="back-link"><FontAwesomeIcon :icon="faChevronLeft" /> Chapter {{ current.chapter + 1 }}</RouterLink>
    <LessonBanner :title="current.title" :subtitle="chapter.title" :image="current.banner" :teacher="course.teacher" :minutes="current.minutes" />
    <LessonBody :blocks="current.blocks" />
    <div class="actions actions-split">
      <BaseButton v-if="!done" @click="complete">Completed <FontAwesomeIcon :icon="faCircleCheck" /></BaseButton>
      <p v-else class="done"><FontAwesomeIcon :icon="faCircleCheck" /> Lesson completed</p>
      <BaseButton :disabled="!done" @click="goNext">{{ isLast ? 'Go to the exam' : 'Next Lesson' }} <FontAwesomeIcon :icon="faCircleArrowRight" /></BaseButton>
    </div>
  </section>
</template>

<style scoped>
.done { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; border-radius: 12px; background: var(--uf-green-bg); color: var(--uf-green-dark); font-weight: 700; }
</style>
