import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

const resolve = (val: string) => new URL(val, import.meta.url).pathname

export default defineConfig({
  plugins: [Vue()],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'html'],
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
    ],
    include: ['**/test/*.test.{js,tsx,ts}'],
    alias: {
      '~': resolve('./src'),
    },
  },
})
