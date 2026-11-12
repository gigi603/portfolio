<script setup lang="ts">
import { ProfileForm } from '@/features/settings'
import { useSessionStore, type Profile } from '@/features/auth'
import { useToast } from '@/shared/composables/useToast'
import alex from '@/assets/images/alex.webp'

const session = useSessionStore()
const toast = useToast()

function save(profile: Profile): void {
  session.updateProfile(profile)
  toast.show('Your information has been saved')
}
</script>

<template>
  <section class="page">
    <h1 class="page-title" tabindex="-1" data-page-heading>Settings</h1>
    <ProfileForm :profile="session.profile" :avatar="alex" @save="save" />
  </section>
</template>
