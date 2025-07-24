<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

useHead({
  title: 'Tags',
  meta: [
    { name: 'description', content: 'Browse articles by tags.' },
    { property: 'og:title', content: 'Tags' },
    { property: 'og:description', content: 'Browse articles by tags.' },
    { name: 'twitter:card', content: 'summary' },
  ],
})

// Fetch all posts to extract tags
const { data: posts } = await useAsyncData('blog-all', async () => {
  const allPosts = await queryCollection('blog').all()
  // Sort by date descending (newest first)
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// Extract and count tags
const tagMap = computed(() => {
  const map = new Map<string, number>()

  if (!posts.value)
    return map

  posts.value.forEach((post) => {
    // Check if tags exist and is an array
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        map.set(tag, (map.get(tag) || 0) + 1)
      })
    }
  })

  return map
})

// Convert to sorted array
const tags = computed(() => {
  return Array.from(tagMap.value.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <div>
    <!-- Page title -->
    <div class="mb-10">
      <h1 class="text-3xl text-body font-bold mb-3 md:text-4xl">
        Tags
      </h1>
    </div>

    <!-- Tags list -->
    <div v-if="tags.length > 0" class="flex flex-wrap gap-3">
      <NuxtLink
        v-for="tag in tags"
        :key="tag.name"
        :to="`/tags/${encodeURIComponent(tag.name)}`"
        class="hover:bg-accent dark:hover:bg-accent text-gray-800 px-4 py-2 rounded-lg bg-gray-100 transition-colors dark:text-gray-200 hover:text-white dark:bg-gray-800"
      >
        {{ tag.name }}
        <span class="text-xs ml-1 px-2 py-0.5 rounded-full bg-white/20 dark:bg-black/20">
          {{ tag.count }}
        </span>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div v-else class="py-12 text-center">
      <p class="text-muted">
        No tags found.
      </p>
    </div>
  </div>
</template>
