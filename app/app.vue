<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <NuxtLoadingIndicator color="#4ade80" :height="2" />
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  line-height: 1.6;
}

html.dark {
  color-scheme: dark;
}

body {
  background: var(--bg);
  color: var(--fg);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

/* 简洁的加载指示器 */
.nuxt-loading-indicator {
  background: #2563eb !important;
  height: 2px !important;
}
</style>
