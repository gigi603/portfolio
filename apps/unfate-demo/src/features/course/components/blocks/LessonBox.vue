<script setup lang="ts">
import type { BoxTone } from '../../types'

withDefaults(defineProps<{ tone: BoxTone; title: string; text?: string; items?: string[] }>(), { text: undefined, items: () => [] })
</script>

<template>
  <aside class="box" :class="`box-${tone}`">
    <p class="box-title">{{ title }}</p>
    <p v-if="text" class="box-text">{{ text }}</p>
    <ul v-else>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </aside>
</template>

<style scoped>
.box { border-radius: 12px; padding: 18px 20px; margin: 8px 0 22px; font-size: 15px; line-height: 1.7; }
.box-title { font-weight: 700; margin-bottom: 10px; }
.box ul { display: grid; gap: 6px; }
.box li { position: relative; padding-left: 20px; }
.box li::before { content: ''; position: absolute; left: 4px; top: .75em; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.box-blue { background: var(--uf-blue-bg); }
.box-green { background: var(--uf-green-bg); }
.box-yellow { background: var(--uf-yellow-bg); }
</style>
