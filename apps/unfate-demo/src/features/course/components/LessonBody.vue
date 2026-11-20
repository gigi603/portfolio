<script setup lang="ts">
import type { LessonBlock } from '../types'
import LessonTable from './blocks/LessonTable.vue'
import LessonBox from './blocks/LessonBox.vue'
import PoolFlow from './blocks/PoolFlow.vue'

defineProps<{ blocks: LessonBlock[] }>()
</script>

<template>
  <article class="card lesson-body">
    <template v-for="(block, i) in blocks" :key="i">
      <h2 v-if="block.type === 'heading'">{{ block.text }}</h2>
      <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>
      <ul v-else-if="block.type === 'list'" class="bullets">
        <li v-for="item in block.items" :key="item">{{ item }}</li>
      </ul>
      <figure v-else-if="block.type === 'image'" class="figure"><img :src="block.src" :alt="block.alt" loading="lazy" /></figure>
      <LessonTable v-else-if="block.type === 'table'" :caption="block.caption" :head="block.head" :rows="block.rows" />
      <LessonBox v-else-if="block.type === 'box'" :tone="block.tone" :title="block.title" :text="block.text" :items="block.items" />
      <PoolFlow v-else-if="block.type === 'poolFlow'" />
    </template>
  </article>
</template>

<style scoped>
h2 { font-size: 22px; font-weight: 800; margin: 30px 0 14px; line-height: 1.3; }
h2:first-child { margin-top: 0; }
p { font-size: 17px; line-height: 1.85; letter-spacing: .3px; margin-bottom: 16px; }
.bullets { margin: 0 0 18px; display: grid; gap: 10px; }
.bullets li { position: relative; padding-left: 20px; font-size: 17px; line-height: 1.7; }
.bullets li::before { content: ''; position: absolute; left: 4px; top: .75em; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.figure { margin: 8px 0 22px; }
.figure img { width: 100%; max-height: 300px; object-fit: cover; border-radius: 12px; }
@media (max-width: 760px) {
  p, .bullets li { font-size: 16px; line-height: 1.75; letter-spacing: 0; }
  h2 { font-size: 20px; }
}
</style>
