<script setup lang="ts">
const props = defineProps<{
  author?: string
  datetime?: string
}>()
</script>

<template>
  <blockquote class="speech-quote">
    <div class="prose">
      <slot />
    </div>
    <footer class="speech-attribution">
      — <cite>{{ props.author || 'Anonymous' }}</cite><span v-if="props.datetime" class="speech-date">{{ props.datetime }}</span>
    </footer>
  </blockquote>
</template>

<style scoped>
.speech-quote {
  margin: 0;
  padding: 0;
  border: none;
  font-style: italic;
  color: var(--fg-muted);
  background: none;
  line-height: 1.6;
}

.speech-quote :deep(p) {
  margin: 0 0 1em 0;
  line-height: inherit;
  color: inherit;
}

.speech-quote :deep(p:last-of-type) {
  margin-bottom: 0.75em;
}

.speech-attribution {
  font-style: normal;
  font-size: 0.875rem;
  color: var(--fg-muted);
  text-align: right;
}

.speech-attribution cite {
  font-style: normal;
  font-weight: normal;
}

.speech-date {
  margin-left: 0.5rem;
  opacity: 0.8;
}

.speech-date::before {
  content: ', ';
  margin-right: 0;
}
</style>
