<template>

	<main class="article-grid">
		<div class="article">
			<div v-if="htmlContentLoading">Loading...</div>
			<div v-else v-html="htmlContent" class="markdown-container"></div>	
		</div>
	</main>

</template>

<script setup>

import { ref, computed, reactive, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useGeneralStore } from '@/stores/appStore'

const articleStore = useGeneralStore()
const htmlContentLoading = ref(true)
const htmlContent = ref('')

const props = defineProps({
	articleId: String
})

onMounted(async () => {
	await articleStore.callGetMkd(props.articleId)
	htmlContent.value = articleStore.htmlFromMkdFile
	htmlContentLoading.value = articleStore.isMkdLoading
})

console.log(props.articleId)

</script>

<style scoped>

.article-grid{

	--padding-inline: 2rem;
	--content-max-width: 80ch;
	--breakout-max-width: 95ch;

	--breakout-size: calc((var(--breakout-max-width) - var(--content-max-width)) / 2);

	display: grid;
	grid-template-columns: 
		1em [full-width-start] minmax(var(--padding-inline), 1fr) [breakout-start] minmax(0, var(--breakout-size)) 
		[content-start] min(100% - (var(--padding-inline) *2), var(--content-max-width)) [content-end] minmax(0, var(--breakout-size))
		[breakout-end] minmax(var(--padding-inline), 1fr) [full-width-end] 1em;
	grid-template-rows: max-content;
	align-content: start;
	margin-top: 2em;
	
}

.article-grid > *{
	grid-column: content;
}

.article{
	display: grid;
}

</style>