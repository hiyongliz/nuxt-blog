<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () => queryCollection('blog').all())
</script>

<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id" border-b border-gray-300>
        <Speech v-if="post.meta.type === 'speech'" :author="post.meta.author" :datetime="post.date">
          <ContentRenderer :value="post" class="speech" />
        </Speech>

        <div v-else :to="post.path" flex="~ col" gap-4 my-4>
          <a text-3xl font-bold :href="post.path">{{ post.title }}</a>
          <img src="https://7.isyangs.cn/24/680072e87a129-24.webp" alt="">
          <div>{{ post.description }}</div>
          <div>{{ post.date }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
