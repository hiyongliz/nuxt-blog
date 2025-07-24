<script setup lang="ts">
// SEO 设置
useHead({
  title: '404 - Page not found | Lazy\'s Webblog',
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})

// 设置响应状态码
setResponseStatus(404)
</script>

<template>
  <div class="py-16 text-center">
    <!-- 404 标题 -->
    <div class="mb-8">
      <h1 class="text-6xl text-gray-300 font-bold mb-4 md:text-8xl dark:text-gray-700">
        404
      </h1>
      <div class="mx-auto bg-gray-300 h-px w-16 dark:bg-gray-700" />
    </div>

    <!-- 错误信息 -->
    <div class="mb-8">
      <h2 class="text-2xl text-body font-bold mb-4 md:text-3xl">
        Page not found
      </h2>
      <p class="text-lg text-muted mb-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <p class="text-muted">
        Check the URL or browse from the homepage.
      </p>
    </div>

    <!-- 导航链接 -->
    <div class="flex flex-col gap-4 items-center justify-center sm:flex-row">
      <a
        href="/"
        class="btn-primary"
      >
        Go to homepage
      </a>

      <button
        class="btn text-muted hover:text-body"
        @click="$router.go(-1)"
      >
        ← Go back
      </button>
    </div>

    <!-- 可能感兴趣的链接 -->
    <div class="mt-12">
      <h3 class="text-lg text-body font-semibold mb-4">
        You might be interested in:
      </h3>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="/" class="link">Recent posts</a>
        <a href="/about" class="link">About</a>
        <a href="https://github.com" target="_blank" class="link">GitHub</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors;
}

.btn {
  @apply px-4 py-2 rounded transition-colors;
}
</style>
