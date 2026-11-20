import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// The demo is served by the portfolio at /demo/unfate/.
// `npm run build` writes it into the portfolio's public folder, which Vue CLI copies to dist.
export default defineConfig({
  base: '/demo/unfate/',
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    outDir: fileURLToPath(new URL('../../public/demo/unfate', import.meta.url)),
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
  },
})
