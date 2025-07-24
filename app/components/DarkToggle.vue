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
    class="text-gray-600 p-1 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
    :aria-label="color.value === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
    :aria-pressed="color.value === 'dark'"
    role="switch"
    @click="toggleDark"
  >
    <div class="i-carbon-sun dark:i-carbon-moon h-4 w-4" />
  </button>
</template>
