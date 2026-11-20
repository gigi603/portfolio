<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import TextField from '@/shared/ui/TextField.vue'
import { validateProfile, type ProfileError } from '../validation'
import type { Profile } from '@/features/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ profile: Profile; avatar: string }>()
const emit = defineEmits<{ save: [profile: Profile] }>()

const draft = reactive<Profile>({ ...props.profile })
const error = ref<ProfileError | null>(null)
const errorText = computed(() => (error.value === 'name' ? t('settings.errorName') : error.value === 'email' ? t('settings.errorEmail') : ''))

function submit(): void {
  error.value = validateProfile(draft)
  if (!error.value) emit('save', { ...draft })
}
</script>

<template>
  <form class="card profile" novalidate @submit.prevent="submit">
    <div class="head">
      <img :src="avatar" alt="" class="avatar" />
      <div>
        <p class="name">{{ profile.firstName }} {{ profile.lastName }}</p>
        <p class="email">{{ profile.email }}</p>
      </div>
    </div>
    <div class="grid">
      <TextField v-model.trim="draft.firstName" :label="t('settings.firstName')" autocomplete="given-name" />
      <TextField v-model.trim="draft.lastName" :label="t('settings.lastName')" autocomplete="family-name" />
      <TextField v-model.trim="draft.email" class="full" :label="t('settings.email')" type="email" autocomplete="email" :invalid="!!error" described-by="profile-error" />
    </div>
    <p id="profile-error" class="error" role="alert">{{ errorText }}</p>
    <BaseButton type="submit">{{ t('settings.save') }}</BaseButton>
  </form>
</template>

<style scoped>
.profile { max-width: 620px; }
.head { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
.avatar { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; }
.name { font-weight: 700; }
.email { color: var(--uf-muted); font-size: 14px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18px; }
.full { grid-column: 1 / -1; }
.error { color: #c4262c; font-size: 14px; font-weight: 500; min-height: 20px; margin: 8px 0; }
@media (max-width: 760px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
