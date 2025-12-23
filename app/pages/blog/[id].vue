<<script setup lang="ts">
const route = useRoute()

// Use a more stable key for useAsyncData to prevent hydration issues
const { data: post } = await useAsyncData(`blog-${route.params.id}`, () => {
  return queryCollection('blog').path('/blog/' + route.params.id).first()
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


// --- 2. Pagination state variables ---
const page = ref(1);
const itemsPerPage = 2; // You can change this to 10, 20, etc.
const paginatedPeople = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return post.value?.meta?.data_points?.slice(start, end);
});
</script>

<template>
  <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-4 gap-3 sm:gap-4">
    <NuxtLink :to="$localePath('/blog')" class="inline-block mb-4 text-blue-600 hover:text-blue-800">
      ← Back to Blog
    </NuxtLink>
    
    <article v-if="post">
      <header class="mb-6">
        <h1 class="text-3xl font-bold mb-2">{{ post.meta['title_'+$i18n.locale] || post.title}}</h1>
        <p v-if="post.meta['description_'+$i18n.locale] || post.description" class="text-gray-600 text-lg">{{ post.meta['description_'+$i18n.locale] || post.description}}</p>
        <p v-if="post.date" class="text-sm text-gray-500 mt-2">{{ new Date(post.date).toLocaleDateString() }}</p>
      </header>
<pre>{{ post }}</pre>
      <div class="prose max-w-none">
        <ContentRenderer v-if="post.meta['body_'+$i18n.locale] || post.body" :value="post.meta['body_'+$i18n.locale] || post.body" />
        <div v-else-if="post.content" v-html="post.content"></div>
        <p v-else class="text-gray-500">No content available.</p>
        <template v-if="post?.meta?.data_points">
          <LineChart :chart-data="{'labels': post?.meta?.data_points.map(dp => dp.label), 'datasets':[{'data': post?.meta?.data_points.map(dp => dp.value)}]}" />
          <UTable :data="paginatedPeople" class="flex-1" />
  
          <!-- A simple footer for spacing and centering -->
          <div class="mt-6 flex justify-center">
            <!-- The UPagination component drives the 'page' ref -->
            <UPagination v-model:page="page" :items-per-page="2" :total="post?.meta?.data_points.length" />
          </div>
              
        </template>
      </div>
      
      

    </article>
    
    <div v-else class="text-center py-8">
      <p class="text-gray-500">Loading post...</p>
    </div>
  </div>
</template>>