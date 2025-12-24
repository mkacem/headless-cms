<script setup lang="ts">
  const route = useRoute()
  const { data: menu } = await useAsyncData(`menus-footer-menu`, () => {
    return queryCollection('menus').path('/menus/footer-menu').first()
  })
  const localePath = useLocalePath()
  const items = computed(() => menu.value?.meta?.menu_items && menu.value?.meta?.menu_items.map(e=>
    ({
      label: e["label_"+useNuxtApp().$i18n.locale.value] || e.label,
      icon: e.icon,
      to: localePath(e.path),
      target: e.target,
      disabled: e.disabled || false,  
      active: (e.path!='/' && route.path.startsWith(localePath(e.path))) || route.path === localePath(e.path)
    })
  ) || [])
  console.log(items.value)
</script>

<template>
  <ul class="text-center w-full max-w-(--ui-container) mx-auto">
    <li v-for="item in items" class="inline">
      <a :href="item.to">{{ item.label }} </a>
      | 
    </li>
  </ul>
</template>

