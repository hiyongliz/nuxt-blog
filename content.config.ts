import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: '**/*.md',
      type: 'page',
      // Define custom schema for docs collection
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
        date: z.date(),
        author: z.string().optional(),
      }),
    }),
  },
})
