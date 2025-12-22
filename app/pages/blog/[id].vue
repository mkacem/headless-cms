<script setup lang="ts">
const route = useRoute()

// Use a more stable key for useAsyncData to prevent hydration issues
const { data: post } = await useAsyncData(`blog-${route.params.id}`, () => {
  return queryCollection('blog').path(route.path).first()
})

// Ensure post exists, redirect if not
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found'
  })
}

// Set SEO meta after ensuring post exists
useSeoMeta({
  title: post.value?.title,
  description: post.value?.description
})
</script>

<template>
  <div>
    <NuxtLink to="/blog" class="inline-block mb-4 text-blue-600 hover:text-blue-800">
      ← Back to Blog
    </NuxtLink>
    
    <article v-if="post">
      <header class="mb-6">
        <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
        <p v-if="post.description" class="text-gray-600 text-lg">{{ post.description }}</p>
        <p v-if="post.date" class="text-sm text-gray-500 mt-2">{{ new Date(post.date).toLocaleDateString() }}</p>
      </header>

      <div class="prose max-w-none">
        <ContentRenderer v-if="post.body" :value="post.body" />
        <div v-else-if="post.content" v-html="post.content"></div>
        <p v-else class="text-gray-500">No content available.</p>
      </div>
    </article>
    
    <div v-else class="text-center py-8">
      <p class="text-gray-500">Loading post...</p>
    </div>
  </div>
</template>