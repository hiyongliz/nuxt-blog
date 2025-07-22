<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () => queryCollection('blog').all())
</script>

<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id" border-b>
        <Speech v-if="post.meta.type === 'speech'" :author="post.meta.author">
          <ContentRenderer :value="post" class="speech"  />
        </Speech>

        <NuxtLink :to="post.path" v-else>
          <ContentRenderer :value="post" class="prose" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
