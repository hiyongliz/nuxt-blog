<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
// Import shared utilities
import { formatDate, getPostReadingTime } from '~/utils/blogHelpers'
// Import the composable
const { generateAltText } = useAccessibleImage()
const { initCodeCopy } = useCodeCopy()

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug || ''
const { data: post } = await useAsyncData<BlogPost>(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first() as Promise<BlogPost>
})

// SEO 设置
useHead({
  title: post.value?.title,
  meta: [
    { name: 'description', content: post.value?.description },
    { property: 'og:title', content: post.value?.title },
    { property: 'og:description', content: post.value?.description },
    { property: 'og:image', content: post.value?.image },
    { property: 'og:image:alt', content: post.value?.imageCaption || post.value?.title },
    { property: 'article:published_time', content: post.value?.date },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: post.value?.image },
  ],
})

// 初始化代码复制功能
onMounted(() => {
  initCodeCopy()
})
</script>

<template>
  <div v-if="post">
    <!-- 文章头部 -->
    <header class="mb-8">
      <h1 class="text-2xl text-body leading-tight font-bold mb-4 md:text-3xl">
        {{ post.title }}
      </h1>

      <div class="text-sm text-muted mb-6 space-y-2">
        <div class="flex gap-1 items-center">
          <time>{{ formatDate(post.date) }}</time>
          <span>•</span>
          <span>{{ getPostReadingTime(post) }}</span>
        </div>
        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 items-center">
          <span class="text-xs text-muted">Tagged:</span>
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

      <!-- 文章封面图片 -->
      <div v-if="post.image" class="mb-8 -mx-4 sm:mx-0">
        <div class="border-b border-t border-gray-200 bg-gray-100 shadow-sm relative overflow-hidden sm:border dark:border-gray-700 sm:rounded-lg dark:bg-gray-800">
          <img
            :src="post.image"
            :alt="generateAltText(post.title, post.imageCaption)"
            class="h-48 w-full transition-transform duration-300 object-cover lg:h-96 md:h-80 sm:h-64 hover:scale-105"
            loading="lazy"
          >
          <!-- 图片说明 -->
          <div v-if="post.imageCaption" class="bg-gradient-to-t text-sm text-white p-4 bottom-0 left-0 right-0 absolute from-black/80 to-transparent">
            <p class="font-medium">
              {{ post.imageCaption }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="post.description" class="text-muted leading-relaxed mb-8 p-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50">
        {{ post.description }}
      </div>
    </header>

    <!-- 文章内容 -->
    <article class="max-w-none prose">
      <ContentRenderer :value="post" />
    </article>

    <footer class="pt-6">
      <div class="text-muted">
        <a href="/" class="link-accent flex items-center">
          <span class="i-carbon-arrow-left mr-1" />
          cd ..
        </a>
      </div>
    </footer>

    <!-- Giscus 评论系统 -->
    <div class="mt-8">
      <ClientOnly>
        <Giscus
          repo="hiyongliz/nuxt-blog"
          repo-id="R_kgDOPQHqtg"
          category="Announcements"
          category-id="DIC_kwDOPQHqts4CtUHF"
          mapping="pathname"
          strict="0"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          lang="zh-CN"
        />
      </ClientOnly>
    </div>
  </div>

  <!-- 加载状态 -->
  <div v-else class="py-12">
    <p class="text-muted">
      Loading...
    </p>
  </div>
</template>
