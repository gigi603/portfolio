<script setup lang="ts">
import { ProfileForm, WalletCard } from '@/features/settings'
import { useSessionStore, type Profile } from '@/features/auth'
import { useToast } from '@/shared/composables/useToast'
import alex from '@/assets/images/alex.webp'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ProgressCard } from '@/features/catalog'
import { useCourse, useProgressStore } from '@/features/course'
import { useContinueCourse } from '@/shared/composables/useContinueCourse'
import { useCourseStatus } from '@/shared/composables/useCourseStatus'

const { t } = useI18n()

const session = useSessionStore()
const toast = useToast()
const progress = useProgressStore()
const continueCourse = useContinueCourse(useRouter())
const { course, lessons } = useCourse()
const { examProgress } = useCourseStatus()

function toggleWallet(): void {
  session.toggleWallet()
  toast.show(session.walletConnected ? t('account.walletConnected') : t('account.walletDisconnected'))
}

function save(profile: Profile): void {
  session.updateProfile(profile)
  toast.show(t('settings.saved'))
}
</script>

<template>
  <section class="page">
    <h1 class="page-title" tabindex="-1" data-page-heading>{{ t('settings.title') }}</h1>
    <!-- On tablets and phones the right panel is hidden: the progress card moves here, as on the catalogue -->
    <ProgressCard
      v-if="progress.started && !progress.examPassed"
      class="narrow-progress"
      :title="course.title"
      :image="course.image"
      :lessons-done="progress.lessonsDone"
      :total="lessons.length"
      :exam="examProgress"
      :action-label="examProgress ? t('exam.resume') : undefined"
      @continue="continueCourse"
    />
    <ProfileForm :profile="session.profile" :avatar="alex" @save="save" />
    <WalletCard :connected="session.walletConnected" :address="session.walletAddress" @toggle="toggleWallet" />
  </section>
</template>

<style scoped>
.narrow-progress { display: none; margin-bottom: 22px; max-width: 420px; }
@media (max-width: 1180px) { .narrow-progress { display: block; } }
@media (max-width: 760px) { .narrow-progress { max-width: none; } }
</style>
