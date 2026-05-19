<template>
    <HeaderEl></HeaderEl>
    <RouterView />
    <FooterEl></FooterEl>
</template>


<script setup>

import { RouterView, useRoute } from 'vue-router'
import HeaderEl from './components/HeaderEl.vue'
import FooterEl from './components/FooterEl.vue'

</script>


<style>

#app{
  min-height: 100vh;
}

</style>
