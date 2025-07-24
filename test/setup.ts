// test/setup.ts
import { vi } from 'vitest'

// Mock composables that rely on Nuxt-specific features
vi.mock('~/composables/useAccessibleImage', () => ({
  useAccessibleImage: () => ({
    generateAltText: vi.fn((title: string, caption?: string, isDecorative: boolean = false) => {
      if (isDecorative)
        return ''
      return caption || title || ''
    }),
  }),
}))

// Mock Nuxt composables
vi.mock('#imports', () => ({
  useRuntimeConfig: () => ({
    public: {
      mdc: {
        headings: {
          anchorLinks: {
            h1: true,
            h2: true,
            h3: true,
          },
        },
      },
    },
  }),
  useHead: vi.fn(),
  useAsyncData: vi.fn(),
  useRoute: vi.fn(() => ({
    params: { slug: 'test-post' },
  })),
}))
