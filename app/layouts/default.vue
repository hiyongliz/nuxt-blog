<script setup lang="ts">
import DarkToggle from '~/components/DarkToggle.vue';
</script>

<template>
  <div class="bg-white min-h-screen dark:bg-gray-900">
    <!-- 简洁的头部 -->
    <header class="bg-white dark:bg-gray-900" role="banner">
      <div class="container py-4">
        <div class="flex items-center justify-between">
          <!-- 网站标题 -->
          <h1 class="text-4xl text-body font-bold font-sans">
            <a href="/" class="link-subtle">Lazy's Weblog</a>
          </h1>

          <!-- 简单的导航 -->
          <nav class="flex items-center space-x-4" role="navigation" aria-label="Main navigation">
            <a href="/about" class="link-subtle">About</a>
            <a href="/tags" class="link-subtle">Tags</a>
            <a href="https://github.com/hiyongliz" target="_blank" class="link-subtle" aria-label="GitHub">
              <div class="i-carbon-logo-github h-4 w-4" />
            </a>
            <DarkToggle hover:cursor-pointer />
          </nav>
        </div>
      </div>
      <div container border-b border-gray-200 dark:border-gray-700 />
    </header>

    <!-- 主要内容 -->
    <main id="main-content" class="container py-8" tabindex="-1">
      <slot />
    </main>

    <!-- 简洁的页脚 -->
    <footer class="mt-6" role="contentinfo">
      <div class="container py-6">
        <div class="text-sm text-muted text-center">
          <p>
            © 2025 Lazy's Weblog •
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="link">
              CC BY-NC-SA 4.0
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
