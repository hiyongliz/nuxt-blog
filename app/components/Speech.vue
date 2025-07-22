<script setup lang="ts">
const props = defineProps<{
  author?: string
  datetime?: string
}>()
</script>

<template>
  <div class="prose">
    <slot />
    <div flex="~" gap-1 items-center mb-2>
      <div i-carbon:subtract-large />
      <span font-bold text="#0303bb">
        {{ props.author }}
      </span>
    </div>
    <div mb-4>{{ datetime }}</div>
  </div>
</template>
