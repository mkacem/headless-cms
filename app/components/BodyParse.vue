<template>
  <ContentRenderer :value="bodyParse" v-if="typeof body == 'object'"/>
  <MDC v-else :value="bodyParse"/>
</template>
<script setup lang="ts">
  const props = defineProps({
    body: {
      type: [String, Object],
      required: true
    }
  })
  const bodyParse = computed(() => {
    if(!useNuxtApp().$i18n) {
      return props.body
    } else if(typeof props.body == 'object') {
      const parse= JSON.stringify(props.body).replace(/"href":"\//ig,'"href":"/'+useNuxtApp().$i18n.locale.value+'/')
      return JSON.parse(parse)
    }else{
      return props.body.replace(/\]\(\//ig,'](/'+useNuxtApp().$i18n.locale.value+'/')
    }  
 })
</script>