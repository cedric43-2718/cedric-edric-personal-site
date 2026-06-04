<template>
	<main v-if="isArticleList" class="article-container">
		<!-- these will be created in a v-for loop: v-for="article in articleStore.articleList" -->
		<ul class="article-list"> 
			<li v-for="article in articleStore.latestBlobs" :key="article.name" class="article">
				<router-link :to="{name: 'articles', params: {articleId: article.name}}">{{ article.name }}</router-link>
			</li>
		</ul>
	</main>
	<RouterView/>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGeneralStore } from '@/stores/appStore'

const route = useRoute()
const articleStore = useGeneralStore()
const isArticleList = computed(() => route.path === '/list-articles')

// write a function that gets a list of articles sorted by date with basic info to display

onMounted(async () => {
	articleStore.callGetBlobs('markdown-files')
})

</script>


<style scoped>

.article-container{
	display: grid;
	place-content: center;
	min-height: 100vh;

	.article-list{
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: (auto-fit, minmax(250px, 1fr));
		align-content: center;
		justify-content: center;
		gap: 4rem;
		margin-inline: 2rem;
		margin-block: auto;
		/* margin-top: 15vh;
		margin-bottom: 35vh; */

		.article{
			/* --col-count: 6; */
			display: grid;
			grid-template-columns: 12rem;
			grid-template-rows: auto;
			gap: 1rem;
			padding: 4rem;
			border: .5px solid var(--young-orange-4);
			border-radius: 20px;
			box-shadow: 2px 4px 15px 5px rgba(0,0,0,0.1);
			justify-content: center;
		}
	}
}

</style>