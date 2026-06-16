import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      enabled: true,
      provider: 'v8',
      include: [
        'src/stores/**',
        'src/components/todo/**',
        'src/components/task/**',
        'src/components/reminders/**',
        'src/components/IoT/**'
      ],
      reporter: ['text', 'html']
    }
  }
})
