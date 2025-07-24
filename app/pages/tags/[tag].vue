<script setup lang="ts">
// Import shared utilities
import { formatDate, getPostReadingTime } from '~/utils/blogHelpers'
// Import the composable
const { generateAltText } = useAccessibleImage()

const route = useRoute()
const tag = decodeURIComponent((route.params.tag as string) || '')

useHead({
  title: `Tag: ${tag}`,
  meta: [
    { name: 'description', content: `Browse articles tagged with "${tag}"` },
    { property: 'og:title', content: `Tag: ${tag}` },
    { property: 'og:description', content: `Browse articles tagged with "${tag}"` },
    { name: 'twitter:card', content: 'summary' },
  ],
})

// Fetch posts with the specific tag
const { data: posts } = await useAsyncData(`blog-tag-${tag}`, async () => {
  const allPosts = await queryCollection('blog').all()
  const filteredPosts = allPosts.filter(post =>
    post.tags && Array.isArray(post.tags) && post.tags.includes(tag),
  )

  // Sort by date descending (newest first)
  return filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>

<template>
  <div>
    <!-- Page title -->
    <div class="mb-10">
      <h1 class="text-3xl text-body font-bold mb-3 md:text-4xl">
        Articles tagged with "{{ tag }}"
      </h1>
      <p class="text-muted">
        {{ posts?.length || 0 }} article{{ (posts?.length || 0) !== 1 ? 's' : '' }}
      </p>
    </div>

    <!-- Articles list -->
    <div v-if="posts && posts.length > 0" class="space-y-8">
      <article
        v-for="(post, index) in posts"
        :key="post.id"
        class="pb-4 transition-all duration-200" :class="[
          index < posts.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : '',
        ]"
      >
        <!-- Article title and meta info -->
        <div class="mb-3">
          <div class="mb-1 flex items-center justify-between">
            <h2 class="text-2xl text-body leading-tight font-semibold">
              <a :href="post.path" class="link-accent transition-colors" target="_self">
                {{ post.title }}
              </a>
            </h2>
            <div flex="~ gap-1.5" items-center>
              <time class="text-sm text-muted ml-4 flex-shrink-0 whitespace-nowrap">
                {{ formatDate(post.date) }}
              </time>
              <div i-carbon:circle-solid text-muted text="1" />
              <div class="text-sm text-muted">
                {{ getPostReadingTime(post) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Article cover image -->
        <div v-if="post.image" class="mb-4">
          <img
            :src="post.image"
            :alt="generateAltText(post.title, post.meta?.imageCaption as string)"
            class="border border-gray-200 rounded-lg h-48 w-full transition-all duration-200 object-cover dark:border-gray-700 hover:opacity-90 md:h-56"
            loading="lazy"
          >
        </div>

        <!-- Article description -->
        <p v-if="post.description" class="text-sm text-muted leading-relaxed">
          {{ post.description }}
        </p>

        <!-- Tags -->
        <div v-if="post.tags && post.tags.length" class="mt-4">
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="t in post.tags"
              :key="t"
              :to="`/tags/${encodeURIComponent(t)}`"
              class="text-xs text-gray-700 px-2 py-1 rounded bg-gray-100 transition-colors dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {{ t }}
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty state -->
    <div v-else class="py-12 text-center">
      <p class="text-muted">
        No articles found with this tag.
      </p>
    </div>

    <!-- Back to tags link -->
    <div class="mt-8 pt-4">
      <NuxtLink to="/tags" class="text-sm text-muted transition-colors hover:text-body">
        ← Back to all tags
      </NuxtLink>
    </div>
  </div>
</template>
