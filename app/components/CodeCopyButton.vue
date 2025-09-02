<script setup lang="ts">
interface Props {
  code: string
}

const props = defineProps<Props>()

const copied = ref(false)
const copyTimeout = ref<NodeJS.Timeout | null>(null)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    
    // 清除之前的定时器
    if (copyTimeout.value) {
      clearTimeout(copyTimeout.value)
    }
    
    // 2秒后重置状态
    copyTimeout.value = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
    // 降级方案：使用旧的API
    try {
      const textArea = document.createElement('textarea')
      textArea.value = props.code
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      copied.value = true
      
      copyTimeout.value = setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (fallbackErr) {
      console.error('Fallback copy also failed:', fallbackErr)
    }
  }
}

// 清理定时器
onUnmounted(() => {
  if (copyTimeout.value) {
    clearTimeout(copyTimeout.value)
  }
})
</script>

<template>
  <button
    class="copy-button"
    :class="{ copied }"
    :aria-label="copied ? '已复制' : '复制代码'"
    @click="copyCode"
  >
    <div v-if="!copied" class="i-carbon-copy h-4 w-4" />
    <div v-else class="i-carbon-checkmark h-4 w-4" />
    <span class="copy-text">{{ copied ? '已复制' : '复制' }}</span>
  </button>
</template>

<style scoped>
.copy-button {
  @apply absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs;
  @apply bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600;
  @apply text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600;
  @apply rounded transition-all duration-200 opacity-0 group-hover:opacity-100;
  @apply focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.copy-button.copied {
  @apply bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300;
  @apply border-green-300 dark:border-green-700;
}

.copy-text {
  @apply hidden sm:inline;
}

/* 确保在小屏幕上也能看到按钮 */
@media (max-width: 640px) {
  .copy-button {
    @apply opacity-100;
  }
}
</style>