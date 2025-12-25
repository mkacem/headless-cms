<script setup lang="ts">
// const { data: home } = await useAsyncData(() => queryCollection('content').path('/blog').all())
// const { data: pages } = await useAsyncData('pages', () => queryCollection('pages').all())
const { data: pages } = await useAsyncData(() => queryCollection('pages').path('/pages/hostory/history/').all())
//pages/pages/hostory/history/_index.md
// useSeoMeta({
//   title: home.value?.title,
//   description: home.value?.description
// })
</script>

<template>
  <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-4 gap-3 sm:gap-4">
    <h1>pages</h1>

    {{ pages }}
    <!-- <ul>
      <li v-for="post in posts" :key="post.id">
        <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
      </li>
    </ul> -->
  </div>
</template>