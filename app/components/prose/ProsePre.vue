<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div class="code-simple">
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>

<style scoped>
.code-simple {
  @apply my-4;
}

.code-simple pre {
  @apply bg-gray-50 dark:bg-gray-900;
  @apply border border-gray-200 dark:border-gray-700;
  @apply rounded p-4;
  @apply overflow-x-auto;
  @apply text-sm;
  @apply font-mono;
  @apply leading-relaxed;
}

.code-simple :deep(pre code) {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: 400;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}

.code-simple :deep(pre code::before),
.code-simple :deep(pre code::after) {
  content: none;
}
</style>
