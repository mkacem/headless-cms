<template>
  <div class="lg:flex">
    
    <div class="controls ml-auto flex gap-2 lg:basis-1/3">
      <h2>Latest Blog Posts {{ activeIndex }}</h2>
      <button @click="prev">=Previous</button>
      <button @click="next">Next=</button> 
    </div>
    <div class="carousel lg:basis-2/3">
      <UCarousel 
        ref="carousel"
        v-slot="{ item }" 
        :items="posts" 
        :watch-resize="true"
        class="w-full mx-auto"
        :ui="{
          item: 'lg:basis-[40%] ps-0',
          container: 'ms-0 p-2 gap-3 items-stretch'
        }"
        @select="onSelect"
        :breakpoints="{
          '(min-width: 1024px)': {
            slidesToScroll: 2
          }
        }"
      >
        <UBlogPost
          :title=" item?.meta['title_'+$i18n.locale] || item.title"
          :image="item?.meta?.featured_image" :alt="item?.meta['title_'+$i18n.locale] || item.title"
          :date="item?.meta?.date"
          :authors="item?.meta?.authors"
          :to="$localePath(item.path)"
          :ui="{
            root: 'h-full',
          }"
        >
          <template #description>
            <p class="line-clamp-2">{{ item?.meta['description_'+$i18n.locale] || item.description }}</p>
          </template>
        </UBlogPost>
        <!-- <img :src="item?.meta?.featured_image" :alt="item?.meta['title_'+$i18n.locale] || item.title" class="w-full h-48 object-cover mb-4" />
        <h3>{{ item?.meta['title_'+$i18n.locale] || item.title }}</h3>
        <p class="line-clamp-2">{{ item?.meta['description_'+$i18n.locale] || item.description }}</p>
        <ULink  :to="$localePath(item.path)">{{ $t('READ_MORE') }}</ULink> -->
      </UCarousel>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { it } from '@nuxt/ui/runtime/locale/index.js'

  const { data: data } = await useAsyncData('blog', () => queryCollection('blog').all())
  const posts = computed(() => data.value?.filter(e=>e?.meta?.featured_image && e?.meta?.featured_image !='').sort((a:any,b:any) => new Date(b?.meta?.date) - new Date(a?.meta?.date)).slice(0, 8) || [])

  const carousel = useTemplateRef('carousel')
  const activeIndex = ref(0)

const prev = () => {
  if(activeIndex.value > 0)
  activeIndex.value--
  select(activeIndex.value)
}
const next = () => {
  if(activeIndex.value < posts.value.length -1)
  activeIndex.value++
  select(activeIndex.value)
}
const onSelect = (index: number) => {
  activeIndex.value = index
}

const select = (index: number) => {
  activeIndex.value = index
  carousel.value?.emblaApi?.scrollTo(index)
}
</script>