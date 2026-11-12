<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import donateImage from '@/assets/images/donate.webp'
import { faHeart } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits<{ donate: [] }>()
</script>

<template>
  <div class="donate">
    <img :src="donateImage" alt="" />
    <p>{{ t('side.donate') }}</p>
    <BaseButton variant="glass" class="donate-btn" @click="emit('donate')">{{ t('side.donateButton') }} <FontAwesomeIcon :icon="faHeart" /></BaseButton>
  </div>
</template>

<style scoped>
.donate { position: relative; border-radius: 12px; overflow: hidden; min-height: 230px; color: #fff; padding: 22px; isolation: isolate; }
.donate img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; }
.donate p { font-size: 26px; font-weight: 800; line-height: 1.1; max-width: 160px; }
.donate-btn { position: absolute; left: 22px; bottom: 22px; }
</style>
