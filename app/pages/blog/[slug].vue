<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})
</script>

<template>
  <!-- Render the blog post as Prose & Vue components -->
  <div py-6>
    <div text-4xl font-bold mb-4>
      {{ post.title }}
    </div>
    <ContentRenderer :value="post" class="prose" />
  </div>
</template>
