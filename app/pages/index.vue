<script setup lang="ts">
useHead({
  title: 'Recent posts',
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

// 格式化日期
function formatDate(date: string | Date) {
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 获取阅读时间
function getReadingTime(content: string) {
  const wordsPerMinute = 200
  const textContent = content.replace(/<[^>]*>/g, '') // 移除HTML标签
  const wordCount = textContent.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readingTime} min read`
}

function getPostReadingTime(post: any) {
  // 优先使用 frontmatter 中的 duration 字段
  if (post.meta?.duration) {
    return post.meta.duration
  }

  // 计算基于文章内容的阅读时间
  if (post.body) {
    // 确保 body 是字符串类型
    const bodyContent = typeof post.body === 'string' ? post.body : JSON.stringify(post.body)
    return getReadingTime(bodyContent)
  }

  // 如果没有 duration，返回默认值
  return ''
}
</script>

<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-10">
      <h1 class="text-body text-3xl font-bold mb-3 md:text-4xl">
        Recent posts
      </h1>
    </div>

    <!-- 文章列表 -->
    <div class="space-y-8">
      <article
        v-for="post in posts"
        :key="post.id"
        class="group"
      >
        <!-- 引言类型文章 -->
        <div v-if="post.meta.type === 'speech'" class="pb-6 border-b border-b-gray-200 dark:border-b-gray-700">
          <div class="py-4 px-6 rounded-lg relative bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <!-- 开始引号 -->
            <div class="text-muted text-5xl leading-none font-serif select-none left-4 top-2 absolute">
              "
            </div>

            <!-- 引言内容 -->
            <div class="relative z-10 pt-2 pl-8">
              <div class="prose text-gray-700 leading-normal italic prose dark:text-gray-300">
                <ContentRenderer :value="post" />
              </div>
            </div>

            <!-- 结束引号 -->
            <div class="text-muted text-5xl leading-none font-serif select-none rotate-180 transform bottom-0 right-4 absolute">
              "
            </div>
          </div>

          <!-- 作者和日期信息 -->
          <div class="text-sm text-gray-600 pl-2 text-left dark:text-gray-400 mt-2">
            <div class="text-gray-800 font-semibold dark:text-gray-200">
              — {{ post.meta.author || 'Anonymous' }}
            </div>
            <div class="text-xs opacity-75">
              {{ formatDate(post.date) }}
            </div>
          </div>
        </div>

        <!-- 普通文章 -->
        <article v-else class="pb-4 border-b border-gray-200 transition-all duration-200 dark:border-gray-700">
          <!-- 文章标题和元信息 -->
          <div class="mb-3">
            <div class="mb-1 flex items-center justify-between">
              <h2 class="text-body text-2xl leading-tight font-semibold">
                <a :href="post.path" class="link-accent transition-colors" target="_self">
                  {{ post.title }}
                </a>
              </h2>
              <div flex="~ gap-1.5" items-center>
                <time class="text-muted text-sm ml-4 flex-shrink-0 whitespace-nowrap">
                  {{ formatDate(post.date) }}
                </time>
                <div i-carbon:circle-solid text-muted text="1" />
                <div class="text-muted text-sm">
                  {{ getPostReadingTime(post) }}
                </div>
              </div>
            </div>
          </div>

          <!-- 文章封面图片 -->
          <div v-if="post.image" class="mb-4">
            <a :href="post.path" class="block rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
              <img
                :src="post.image"
                :alt="post.title"
                class="border border-gray-200 h-48 w-full transition-all duration-200 object-cover dark:border-gray-700 hover:opacity-90 md:h-56"
                loading="lazy"
              >
            </a>
          </div>

          <!-- 文章描述 -->
          <p v-if="post.description" class="text-muted text-sm leading-relaxed">
            {{ post.description }}
          </p>

          <!-- 标签和阅读更多 -->
          <div v-if="post.tags && post.tags.length" class="mt-4 flex items-center justify-between">
            <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2" items-center>
              <span
                v-for="tag in post.tags.slice(0, 3)"
                :key="tag"
                class="text-xs text-gray-700 px-2 py-1 bg-gray-100 rounded dark:text-gray-300 dark:bg-gray-800"
              >
                {{ tag }}
              </span>
              <span v-if="post.tags.length > 3" class="text-muted text-xs">
                +{{ post.tags.length - 3 }} more
              </span>
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