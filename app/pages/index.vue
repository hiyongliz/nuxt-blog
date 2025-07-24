<script setup lang="ts">
// Import shared utilities
import { formatDate, getPostReadingTime } from '~/utils/blogHelpers'
// Import the composable
const { generateAltText } = useAccessibleImage()

useHead({
  meta: [
    { name: 'description', content: 'Browse our latest blog posts and articles.' },
    { property: 'og:title', content: 'Recent posts' },
    { property: 'og:description', content: 'Browse our latest blog posts and articles.' },
    { name: 'twitter:card', content: 'summary' },
  ],
})

const { data: posts } = await useAsyncData('blog-all', async () => {
  const allPosts = await queryCollection('blog').all()
  // 按日期降序排序（最新的在前）
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>

<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-10">
      <h1 class="text-3xl text-body font-bold mb-3 md:text-4xl">
        Recent posts
      </h1>
    </div>

    <!-- 文章列表 -->
    <div class="space-y-8">
      <article
        v-for="(post, index) in posts"
        :key="post.id"
        class="group"
      >
        <!-- 引言类型文章 -->
        <div
          v-if="post.type === 'speech'"
          class="pb-6" :class="[
            index < posts.length - 1 ? 'border-b border-b-gray-200 dark:border-b-gray-700' : '',
          ]"
        >
          <div class="px-6 py-4 border border-gray-200 rounded-lg bg-gray-50 relative dark:border-gray-700 dark:bg-gray-800/50">
            <!-- 开始引号 -->
            <div class="text-5xl text-muted leading-none font-serif select-none left-4 top-2 absolute">
              "
            </div>

            <!-- 引言内容 -->
            <div class="pl-8 pt-2 relative z-10">
              <div class="text-gray-700 leading-normal italic prose prose dark:text-gray-300">
                <ContentRenderer :value="post" />
              </div>
            </div>

            <!-- 结束引号 -->
            <div class="text-5xl text-muted leading-none font-serif select-none rotate-180 transform bottom-0 right-4 absolute">
              "
            </div>
          </div>

          <!-- 作者和日期信息 -->
          <div class="text-sm text-gray-600 mt-2 pl-1 text-left dark:text-gray-400" flex="~" items-center justify-between>
            <div class="text-gray-800 font-semibold dark:text-gray-200">
              — {{ post.author || 'Anonymous' }}
            </div>
            <div class="text-xs opacity-75">
              {{ formatDate(post.date) }}
            </div>
          </div>
        </div>

        <!-- 普通文章 -->
        <article
          v-else
          class="pb-4 transition-all duration-200" :class="[
            index < posts.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : '',
          ]"
        >
          <!-- 文章标题和元信息 -->
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

          <!-- 文章封面图片 -->
          <div v-if="post.image" class="mb-4">
            <img
              :src="post.image"
              :alt="generateAltText(post.title, post.meta?.imageCaption as string)"
              class="border border-gray-200 rounded-lg h-48 w-full transition-all duration-200 object-cover dark:border-gray-700 hover:opacity-90 md:h-56"
              loading="lazy"
            >
          </div>

          <!-- 文章描述 -->
          <p v-if="post.description" class="text-sm text-muted leading-relaxed">
            {{ post.description }}
          </p>

          <!-- 标签 -->
          <div v-if="post.tags && post.tags.length" class="mt-4">
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="tag in post.tags"
                :key="tag"
                :to="`/tags/${encodeURIComponent(tag)}`"
                class="text-xs text-gray-700 px-2 py-1 rounded bg-gray-100 transition-colors dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {{ tag }}
              </NuxtLink>
            </div>
          </div>
        </article>
      </article>
    </div>

    <!-- 空状态 -->
    <div v-if="!posts || posts.length === 0" class="py-12 text-center">
      <p class="text-muted">
        No posts yet.
      </p>
    </div>
  </div>
</template>
