import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  environments: {
    prisma: {}
  },
  test: {
    // @ts-ignore
    environmentMatchGlobs: [
      ['src/http/controllers/**/*.spec.ts', 'prisma']
    ]
  }
})