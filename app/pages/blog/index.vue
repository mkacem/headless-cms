<script setup lang="ts">
// const { data: home } = await useAsyncData(() => queryCollection('content').path('/blog').all())
const { data: posts } = await useAsyncData('blog', () => queryCollection('blog').all())
// useSeoMeta({
//   title: home.value?.title,
//   description: home.value?.description
// })
</script>

<template>
 <h1>Blog</h1>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
    </li>
  </ul>
</template>