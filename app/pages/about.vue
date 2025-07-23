<script setup lang="ts">
// SEO 设置
useHead({
  title: 'About - Lazy\'s Webblog',
  meta: [
    { name: 'description', content: 'About Lazy\'s Webblog - A personal blog sharing thoughts, ideas, and technical notes.' },
    { property: 'og:title', content: 'About - Lazy\'s Webblog' },
    { property: 'og:description', content: 'About Lazy\'s Webblog - A personal blog sharing thoughts, ideas, and technical notes.' },
  ],
})
</script>

<template>
  <div>
    <!-- 页面标题 -->
    <header class="mb-8">
      <h1 class="text-body text-2xl font-bold mb-4 md:text-3xl">
        About
      </h1>
    </header>

    <!-- 关于内容 -->
    <div class="max-w-none prose">
      <p>
        Hi there! Welcome to my corner of the internet. This is where I document my journey
        as a developer, share interesting discoveries, and occasionally ramble about things
        that catch my attention.
      </p>

      <!-- 页脚返回链接 -->
      <footer class="pt-6">
        <div class="text-muted text-sm">
          <a href="/" class="link">← Back to home</a>
        </div>
      </footer>
    </div>
  </div>
</template>
