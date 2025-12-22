<script setup lang="ts">
  const route = useRoute()
// const { data: home } = await useAsyncData(() => queryCollection('content').path('/blog').all())
const { data:post } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

// useSeoMeta({
//   title: home.value?.title,
//   description: home.value?.description
// })
</script>

<template>
  <NuxtLink to="/blog">Back to Blog</NuxtLink>
 <h1>Post {{ post?.title }} </h1>
<p>{{ post?.description }}</p>

<hr />
{{ post?.body }}
<div v-html="post?.body" />
</template>