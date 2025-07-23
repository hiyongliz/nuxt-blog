<script setup lang="ts">
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#111827' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    class="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
    @click="toggleDark"
    :aria-label="color.value === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
  >
    <div class="i-carbon-sun dark:i-carbon-moon w-4 h-4" />
  </button>
</template>
