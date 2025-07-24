<script setup lang="ts">
import DarkToggle from '~/components/DarkToggle.vue'

// Import the composable
const { skipToContent } = useFocusManagement()

// Handle skip link click
const handleSkipLink = () => {
  skipToContent('main-content')
}
</script>

<template>
  <div class="bg-white min-h-screen dark:bg-gray-900">
    <!-- Skip navigation link for keyboard users -->
    <a href="#main-content" class="skip-link" @click.prevent="handleSkipLink">
      Skip to main content
    </a>
    
    <!-- 简洁的头部 -->
    <header class="bg-white dark:bg-gray-900" role="banner">
      <div class="py-4 container">
        <div class="flex items-center justify-between">
          <!-- 网站标题 -->
          <h1 class="text-body text-4xl font-bold font-sans">
            <a href="/" class="link-subtle">Lazy's Webblog</a>
          </h1>

          <!-- 简单的导航 -->
          <nav class="flex items-center space-x-4" role="navigation" aria-label="Main navigation">
            <a href="/about" class="link-subtle">About</a>
            <a href="https://github.com/hiyongliz" target="_blank" class="link-subtle" aria-label="GitHub">
              <div class="i-carbon-logo-github h-4 w-4" />
            </a>
            <DarkToggle />
          </nav>
        </div>
      </div>
      <div border-b border-gray-200 container dark:border-gray-700 />
    </header>

    <!-- 主要内容 -->
    <main id="main-content" class="py-8 container" tabindex="-1">
      <slot />
    </main>

    <!-- 简洁的页脚 -->
    <footer class="mt-6" role="contentinfo">
      <div class="py-6 container">
        <div class="text-muted text-sm text-center">
          <p>
            © 2025 Lazy's Webblog •
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="link">
              CC BY-NC-SA 4.0
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
