<template>
	<main class="markdown-dashboard">
		<MdEditor v-model="text" class="markdown"/>
		<form @submit.prevent="handleSave"></form>
	</main>
	
</template>

<script setup>
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const text = ref('# Hello Editor')

console.log(text.value)

</script>

<style scoped>

main{
	min-height: 100vh;
	margin: auto;
}

</style>