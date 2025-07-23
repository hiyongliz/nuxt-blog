<script setup lang="ts">
// SEO 设置
useHead({
  title: '404 - Page not found | Lazy\'s Webblog',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})

// 设置响应状态码
setResponseStatus(404)
</script>

<template>
  <div class="text-center py-16">
    <!-- 404 标题 -->
    <div class="mb-8">
      <h1 class="text-6xl md:text-8xl font-bold text-gray-300 dark:text-gray-700 mb-4">
        404
      </h1>
      <div class="w-16 h-px bg-gray-300 dark:bg-gray-700 mx-auto" />
    </div>

    <!-- 错误信息 -->
    <div class="mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-body mb-4">
        Page not found
      </h2>
      <p class="text-muted text-lg mb-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <p class="text-muted">
        Check the URL or browse from the homepage.
      </p>
    </div>

    <!-- 导航链接 -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a 
        href="/"
        class="btn-primary"
      >
        Go to homepage
      </a>
      
      <button 
        @click="$router.go(-1)"
        class="btn text-muted hover:text-body"
      >
        ← Go back
      </button>
    </div>

    <!-- 可能感兴趣的链接 -->
    <div class="mt-12">
      <h3 class="text-lg font-semibold text-body mb-4">
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
