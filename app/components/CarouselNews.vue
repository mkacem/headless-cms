<template>
  <div class="lg:flex gap-3">
    
    <div class="carousel-left-side controls ml-auto text-center lg:text-left flex gap-2 flex-col lg:basis-1/3">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center">{{ $t('LATEST_BLOG_POSTS') }}</h2>
      <div class="my-auto flex gap-3">
        <UButton @click="prev" size="xl" trailing-icon="i-lucide-chevron-left" :disabled="disablePrev" class="rounded-full my-auto"></UButton>
        <UButton @click="next" size="xl" trailing-icon="i-lucide-chevron-right" :disabled="disableNext" class="rounded-full my-auto"></UButton> 
        
      </div>
      <div class="mt-auto">
        <ULink :to="$localePath('/blog')" class=" p-3 font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-base gap-2 text-inverted hover:text-inverted bg-primary hover:bg-primary/75 active:bg-primary/75 rounded-lg my-auto text-sm font-medium">{{ $t('VIEW_ALL_POSTS') }} </ULink>  
      </div>
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
          :image="(/^\//.test(item?.meta?.featured_image)?$config.app.baseURL:'') + item?.meta?.featured_image"
          :authors="item?.meta?.authors"
          :ui="{
            root: 'h-full',
          }"
        >
          <template #date>        
            <NuxtTime
              :datetime="new Date(item?.meta?.date)"
              :locale="isocode"
            />
          </template>
          <template #description>
            <p class="line-clamp-2">{{ item?.meta['description_'+$i18n.locale] || item.description }}</p>
          </template>
          <template #footer>
            <div class="mt-2 text-end py-3 px-10">
              <ULink :to="$localePath(item.path)">{{ $t('READ_MORE') }} -></ULink>
            </div>
          </template>
        </UBlogPost>
      </UCarousel>      
    </div>
  </div>
</template>

<script setup lang="ts">
  const locales = useNuxtApp().$i18n.localeProperties
  const isocode = computed(() => locales.value.language)
  const  disableNext = ref(false)
  const  disablePrev = ref(true)
  const carousel = useTemplateRef('carousel')

  const { data: data } = await useAsyncData('blog', () => queryCollection('blog').all())
  const posts = computed(() => data.value?.filter(e=>e?.meta?.featured_image && e?.meta?.featured_image !='').sort((a:any,b:any) => new Date(b?.meta?.date) - new Date(a?.meta?.date)).slice(0, 8) || [])

  

const prev = () => {
  carousel.value?.emblaApi?.scrollPrev()
}
const next = () => {  
  carousel.value?.emblaApi?.scrollNext()
}
const onSelect = (index: number) => {
  setTimeout(() => {
    if(carousel.value?.emblaApi?.slidesInView().includes(posts.value.length -1)){
      disableNext.value = true
    } else {
      disableNext.value = false
    }
    if(carousel.value?.emblaApi?.slidesInView().includes(0)){
      disablePrev.value = true
    } else {
      disablePrev.value = false
    }

  }, 300)
  
}

</script>
<style scoped>
.carousel-left-side {
  padding-left: calc((100vw - var(--ui-container)) / 2);
}
</style>