<script setup lang="ts">
import panel from '@/assets/images/login-panel.webp'
import courseImage from '@/assets/images/course-defi.webp'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <!-- Decorative right half of the login screen (Figma: Login V2) -->
  <div class="showcase" aria-hidden="true">
    <img :src="panel" alt="" class="showcase-bg" />
    <p class="claim">{{ t('login.claim') }}</p>
    <div class="teaser">
      <div>
        <p class="teaser-title">{{ t('login.teaserTitle') }}</p>
        <p class="teaser-text">{{ t('login.teaserText') }}</p>
      </div>
      <img :src="courseImage" alt="" />
    </div>
  </div>
</template>

<style scoped>
.showcase { position: relative; border-radius: 0 0 0 28px; overflow: hidden; min-height: 100%; }
.showcase-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.claim { position: relative; margin: 72px 0 0 clamp(24px, 8%, 64px); max-width: 320px; color: #fff; font-size: clamp(36px, 4.6vw, 60px); line-height: 1.12; font-weight: 800; text-shadow: 0 4px 24px rgb(0 0 0 / 15%); }
.teaser { position: absolute; left: clamp(24px, 8%, 64px); right: clamp(24px, 8%, 64px); bottom: 12%; max-width: 480px; display: flex; gap: 20px; align-items: center; background: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 20px 40px rgb(0 0 0 / 12%); }
.teaser > div { flex: 1; }
.teaser img { width: 46%; aspect-ratio: 1; object-fit: cover; border-radius: 12px; }
.teaser-title { font-size: 24px; font-weight: 800; line-height: 1.1; margin-bottom: 12px; }
.teaser-text { font-size: 13px; line-height: 1.6; }
</style>
