<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)))
</script>

<template>
  <h2 :id="props.id" class="lzh2">
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
    >
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<style scoped>
.lzh2 {
  color: var(--fg);
  font-weight: 600;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3;
}
</style>
