<template>
  <li flex="~" gap-2 items-center>
    <div h-2 w-2 />
    <div class="prose">
      <slot />
    </div>
  </li>
</template>

<style scoped>
.prose {
  color: var(--fg);
  max-width: var(--prose-max-width);
  font-size: 1rem;
  line-height: 1.75;
}
</style>
