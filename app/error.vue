<script setup lang="ts">
// 获取错误信息
const props = defineProps({
  error: Object,
})

// 根据错误状态码设置不同的消息
function getErrorMessage(statusCode: number) {
  switch (statusCode) {
    case 404:
      return {
        title: 'Page not found',
        message: 'The page you\'re looking for doesn\'t exist or has been moved.',
        suggestion: 'Check the URL or browse from the homepage.',
      }
    case 500:
      return {
        title: 'Server error',
        message: 'Something went wrong on our end.',
        suggestion: 'Please try again later or contact support if the problem persists.',
      }
    default:
      return {
        title: 'Something went wrong',
        message: 'An unexpected error occurred.',
        suggestion: 'Please try again or go back to the homepage.',
      }
  }
}

const statusCode = props.error?.statusCode || 500
const errorInfo = getErrorMessage(statusCode)

// SEO 设置
useHead({
  title: `${statusCode} - ${errorInfo.title} | Lazy's Webblog`,
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})

// 清除错误状态的函数
const handleError = () => clearError({ redirect: '/' })

// 重新加载页面的函数
function reloadPage() {
  if (import.meta.client) {
    window.location.reload()
  }
}
</script>

<template>
  <div class="bg-white flex min-h-screen items-center justify-center dark:bg-gray-900">
    <div class="container text-center max-w-2xl">
      <!-- 错误状态码 -->
      <div class="mb-8">
        <h1 class="text-6xl text-gray-300 font-bold mb-4 md:text-8xl dark:text-gray-700">
          {{ statusCode }}
        </h1>
        <div class="mx-auto bg-gray-300 h-px w-16 dark:bg-gray-700" />
      </div>

      <!-- 错误信息 -->
      <div class="mb-8">
        <h2 class="text-2xl text-body font-bold mb-4 md:text-3xl">
          {{ errorInfo.title }}
        </h2>
        <p class="text-lg text-muted mb-2">
          {{ errorInfo.message }}
        </p>
        <p class="text-muted">
          {{ errorInfo.suggestion }}
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-col gap-4 items-center justify-center sm:flex-row">
        <button
          class="btn-primary"
          aria-label="Go to homepage"
          @click="handleError"
        >
          Go to homepage
        </button>

        <button
          v-if="statusCode === 500"
          class="btn text-muted hover:text-body"
          aria-label="Try again"
          @click="reloadPage"
        >
          Try again
        </button>

        <button
          v-else
          class="btn text-muted hover:text-body"
          aria-label="Go back to previous page"
          @click="$router.go(-1)"
        >
          ← Go back
        </button>
      </div>

      <!-- 额外信息（仅在开发环境显示） -->
      <div v-if="$dev && props.error" class="mt-12 p-4 text-left border rounded bg-gray-50 dark:bg-gray-800">
        <details>
          <summary class="text-sm text-muted font-medium mb-2 cursor-pointer">
            Debug information (dev only)
          </summary>
          <pre class="text-xs text-muted overflow-auto">{{ props.error }}</pre>
        </details>
      </div>

      <!-- 简洁的页脚 -->
      <footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="text-sm text-muted">
          <a href="/" class="link">Lazy's Webblog</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* 确保错误页面有合适的最小高度 */
.min-h-screen {
  min-height: 100vh;
}

/* 按钮样式 */
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors;
}

.btn {
  @apply px-4 py-2 rounded transition-colors;
}
</style>
