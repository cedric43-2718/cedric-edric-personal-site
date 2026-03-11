<template>

   
      <HeaderEl></HeaderEl>
      <RouterView />
      <FooterEl></FooterEl>
  
    


</template>


<script setup>

import { RouterView, useRoute } from 'vue-router'
import { ref, provide, computed, onUpdated, watchEffect } from 'vue'
import HeaderEl from './components/HeaderEl.vue'
import FooterEl from './components/FooterEl.vue'

// provide and inject setup to display current project link in the header



// const currentProjectRoute = ref('')
// provide('current-project', currentProjectRoute.value)


// const updateRouteName = (routeName) => {
// 	currentProjectRoute.value = routeName
// }
// provide('update-project-route', updateRouteName)







// ['aaa', 'vvvv'].contains("")

</script>


<style>

#app{
  min-height: 100vh;
}

</style>
