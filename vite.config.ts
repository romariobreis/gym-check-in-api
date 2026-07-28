import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  environments: {
    prisma: {}
  },
  test: {
    setupFiles: ['./vitest-setup.ts'],
    fileParallelism: false
  }
})