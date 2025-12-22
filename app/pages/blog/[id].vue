<script setup lang="ts">
  const route = useRoute()
// const { data: home } = await useAsyncData(() => queryCollection('content').path('/blog').all())
const { post } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})
// useSeoMeta({
//   title: home.value?.title,
//   description: home.value?.description
// })
</script>

<template>
 <h1>Post {{ post?.title }} </h1>
<p>{{ post?.description }}</p>
</template>