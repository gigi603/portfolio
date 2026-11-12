<script setup lang="ts">
import UnfateLogo from '@/shared/ui/UnfateLogo.vue'

defineProps<{ name: string; courseTitle: string; score: number; date: string }>()
</script>

<template>
  <section class="certificate" aria-label="Certificate of completion">
    <UnfateLogo :size="26" />
    <p class="kicker">Certificate of completion</p>
    <h1 class="name" tabindex="-1" data-page-heading>{{ name }}</h1>
    <p>has completed the course</p>
    <p class="course">{{ courseTitle }}</p>
    <p class="meta">Score {{ score }}/100 · {{ date }}</p>
  </section>
</template>

<style scoped>
.certificate { background: #fff; border-radius: var(--uf-radius); padding: clamp(28px, 5vw, 56px); text-align: center; border: 10px solid #fff; outline: 2px solid #d9c27a; outline-offset: -18px; box-shadow: 0 10px 30px rgb(20 20 43 / 8%); display: flex; flex-direction: column; align-items: center; gap: 10px; }
.kicker { margin-top: 14px; color: #8a6d14; font-weight: 700; letter-spacing: 2px; font-size: 13px; }
.name { font-size: clamp(30px, 4vw, 42px); font-weight: 800; margin: 6px 0; }
.course { font-size: 20px; font-weight: 700; }
.meta { color: var(--uf-muted); font-size: 14px; margin-top: 6px; }
</style>
