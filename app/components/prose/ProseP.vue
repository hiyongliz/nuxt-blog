<template>
  <p class="prose">
    <slot />
  </p>
</template>

<style scoped>
.prose {
  color: var(--fg);
  max-width: var(--prose-max-width);
  font-size: 1rem;
  line-height: 1.75;
}
</style>
