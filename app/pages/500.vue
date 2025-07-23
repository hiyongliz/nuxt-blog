<script setup lang="ts">
// SEO 设置
useHead({
  title: '500 - Server error | Lazy\'s Webblog',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})

// 设置响应状态码
setResponseStatus(500)
</script>

<template>
  <div class="text-center py-16">
    <!-- 500 标题 -->
    <div class="mb-8">
      <h1 class="text-6xl md:text-8xl font-bold text-gray-300 dark:text-gray-700 mb-4">
        500
      </h1>
      <div class="w-16 h-px bg-gray-300 dark:bg-gray-700 mx-auto" />
    </div>

    <!-- 错误信息 -->
    <div class="mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-body mb-4">
        Server error
      </h2>
      <p class="text-muted text-lg mb-2">
        Something went wrong on our end.
      </p>
      <p class="text-muted">
        Please try again later or contact support if the problem persists.
      </p>
    </div>

    <!-- 操作按钮 -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a 
        href="/"
        class="btn-primary"
      >
        Go to homepage
      </a>
      
      <button 
        @click="window.location.reload()"
        class="btn text-muted hover:text-body"
      >
        Try again
      </button>
    </div>

    <!-- 联系信息 -->
    <div class="mt-12">
      <p class="text-sm text-muted">
        If this error persists, please 
        <a href="mailto:hello@example.com" class="link">contact support</a>
      </p>
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
