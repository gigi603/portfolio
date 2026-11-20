<script setup lang="ts">
defineProps<{ caption: string; head: string[]; rows: string[][] }>()
</script>

<template>
  <div class="table-wrap" tabindex="0" :aria-label="caption">
    <table>
      <caption>{{ caption }}</caption>
      <thead>
        <tr><th v-for="(cell, i) in head" :key="i" scope="col">{{ cell }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="(row, r) in rows" :key="r">
          <template v-for="(cell, c) in row" :key="c">
            <th v-if="c === 0" scope="row">{{ cell }}</th>
            <td v-else>{{ cell }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap { overflow-x: auto; margin: 6px 0 24px; border-radius: 12px; border: 1px solid var(--uf-line); }
table { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 460px; }
caption { text-align: left; font-weight: 700; padding: 14px 16px; background: var(--uf-field); }
th, td { padding: 12px 16px; text-align: left; vertical-align: top; line-height: 1.55; border-top: 1px solid var(--uf-line); }
thead th { color: var(--uf-muted); font-weight: 600; font-size: 13px; }
tbody th { font-weight: 700; }
</style>
