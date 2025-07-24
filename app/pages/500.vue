<script setup lang="ts">
// SEO 设置
useHead({
  title: '500 - Server error | Lazy\'s Webblog',
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})

// 设置响应状态码
setResponseStatus(500)
</script>

<template>
  <div class="py-16 text-center">
    <!-- 500 标题 -->
    <div class="mb-8">
      <h1 class="text-6xl text-gray-300 font-bold mb-4 md:text-8xl dark:text-gray-700">
        500
      </h1>
      <div class="mx-auto bg-gray-300 h-px w-16 dark:bg-gray-700" />
    </div>

    <!-- 错误信息 -->
    <div class="mb-8">
      <h2 class="text-2xl text-body font-bold mb-4 md:text-3xl">
        Server error
      </h2>
      <p class="text-lg text-muted mb-2">
        Something went wrong on our end.
      </p>
      <p class="text-muted">
        Please try again later or contact support if the problem persists.
      </p>
    </div>

    <!-- 操作按钮 -->
    <div class="flex flex-col gap-4 items-center justify-center sm:flex-row">
      <a
        href="/"
        class="btn-primary"
      >
        Go to homepage
      </a>

      <button
        class="btn text-muted hover:text-body"
        @click="window.location.reload()"
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
