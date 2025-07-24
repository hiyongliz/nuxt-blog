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
      <h1 class="text-3xl text-body font-bold mb-3 md:text-4xl">
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
        <div class="text-muted">
          <a href="/" class="link-accent flex items-center">
            <span class="i-carbon-arrow-left mr-1" />
            cd ..
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>
