<script setup lang="ts">
import type { container } from '#build/ui'

  const route = useRoute()
  const { data: menu } = await useAsyncData(`menus-main-menu`, () => {
    return queryCollection('menus').path('/menus/main-menu-header').first()
  })
  const localePath = useLocalePath()
  // const items = computed(() => menu.value?.meta?.menu_items && menu.value?.meta?.menu_items.map(e=>
  //   ({
  //     label: e["label_"+useNuxtApp().$i18n.locale.value] || e.label,
  //     icon: e.icon,
  //     to: localePath(e.path),
  //     target: e.target,
  //     disabled: e.disabled || false,  
  //     active: (e.path!='/' && route.path.startsWith(localePath(e.path))) || route.path === localePath(e.path)
  //   })
  // ) || [])
  const items = computed(() => menu.value?.meta?.section_menu && menu.value?.meta?.section_menu.map(e=> {
    let o:any =  {
      label: e["label_"+useNuxtApp().$i18n.locale.value] || e.label,
      icon: e.icon,      
      disabled: e.disabled || false,  
      active: (e.path!='/' && route.path.startsWith(localePath(e.path))) || route.path === localePath(e.path)
    }
    if(!e.to){
      o.to = localePath(e.path)
      o.target = e.target
    }
    if(e.section_menu){
      o.slot = 'docs' as const
      o.children = e.section_menu
    }
    return o
  }) || [])
</script>

<template>
  <!-- <UNavigationMenu :items="items" /> -->
   <UNavigationMenu
    :items="items"
    :ui="{
      root:'static',
      content: 'sm:w-auto',
      childList: 'sm:w-96',
      childLinkDescription: 'text-balance line-clamp-2'
    }"
    class="w-full justify-center"
  >
    <template #docs-content="{ item }">
      <div style="width:100%;" class="flex">
        <div class="col-4">          
          <ul class="grid gap-2 p-4">
            <li v-for="child in item.children.filter(e=>e.position=='left')">     
              <h3 class="font-medium text-highlighted">
                {{ child["label_"+$i18n.locale] || child.label }}
              </h3>
              <UBlogPost 
                v-for="subchild in child.section_menu_items" 
                :description="subchild['menu_description_'+$i18n.locale] || subchild.menu_description "
                :ui="{
                  description: 'line-clamp-3',
                  body:'sm:p-3',
                  footer:'text-end p-2 pt-0',
                  title: 'flex items-center gap-2'
                }"
              >
                <template #title>
                  <img v-if="subchild.menu_featured_image" :src="(/^\//.test(subchild.menu_featured_image)?$config.app.baseURL:'') + subchild.menu_featured_image" width="30"/>
                  {{ subchild['label_'+$i18n.locale] || subchild.label }}
                </template>
                <template v-if="subchild.path" #footer>
                  <ULink :to="$localePath(subchild.path)">{{ $t('READ_MORE') }} <UIcon name="i-lucide-arrow-right" /></ULink>
                </template>
              </UBlogPost>
            </li>
          </ul>
        </div>
        <div class="col-8">
          <ul class="flex gap-2 p-4 ">
            <li v-for="child in item.children.filter(e=>e.position=='center')">     
              <h3 class="">
                {{ child["label_"+$i18n.locale] || child.label }}
              </h3>
              <div class="flex gap-3">
                <UBlogPost 
                  v-for="subchild in child.section_menu_items" 
                  :image="subchild.menu_featured_image"
                  :description="subchild['menu_description_'+$i18n.locale] || subchild.menu_description "
                  :ui="{
                    root:'ring-0 p-0 flex-shrink-0 lg:max-w-[50%]',
                    description: 'line-clamp-3',
                    body:'sm:p-0',
                    footer:''
                  }"
                >
                  <template #header>
                    <img v-if="subchild.menu_featured_image" :src="(/^\//.test(subchild.menu_featured_image)?$config.app.baseURL:'') + subchild.menu_featured_image" />
                    <h4 style="position: relative; transform: translateY(-150%);" class="text-white">{{ subchild['label_'+$i18n.locale] || subchild.label }}</h4>
                  </template>
                    
                  <template #body>
                    <body-parse :body="subchild['menu_body_'+$i18n.locale] || subchild.menu_body" />
                  </template>
                  <template v-if="subchild.path" #footer>
                    <ULink :to="$localePath(subchild.path)">{{ $t('READ_MORE') }} <UIcon name="i-lucide-arrow-right" /></ULink>
                  </template>
                </UBlogPost>
              </div>
            </li>
          </ul>
        </div>      
      </div>
    </template>
  </UNavigationMenu>
  
</template>

