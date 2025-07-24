import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: '**/*.md',
      type: 'page',
      // Define comprehensive schema for blog collection
      schema: z.object({
        title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
        description: z.string().max(500, 'Description too long').optional(),
        tags: z.array(z.string().min(1).max(50)).max(10, 'Too many tags').optional(),
        image: z.string().url('Invalid image URL').optional(),
        imageCaption: z.string().max(200, 'Image caption too long').optional(),
        date: z.date(),
        author: z.string().max(100, 'Author name too long').optional(),
        duration: z.string().regex(/^\d+\s?(min|mins|minute|minutes)\s?read$/i, 'Invalid duration format').optional(),
        type: z.enum(['note', 'speech', 'tutorial', 'review']).optional(),
        lang: z.enum(['en', 'zh', 'zh-CN']).default('en'),
        draft: z.boolean().default(false),
        featured: z.boolean().default(false),
        category: z.string().max(50, 'Category name too long').optional(),
        series: z.string().max(100, 'Series name too long').optional(),
        seriesOrder: z.number().int().positive().optional(),
        lastModified: z.date().optional(),
        readingTime: z.number().int().positive().optional(),
        wordCount: z.number().int().positive().optional(),
      }),
    }),
  },
})
