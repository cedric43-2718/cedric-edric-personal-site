<template>
	<main v-if="isArticleList" class="article-container">
		<ul class="article-list">
			<li class="article">
				<router-link :to="{name: 'articles', params: {articleId: 'post-456.md'}}">Article 1</router-link>
			</li>
			<li class="article">
				<router-link :to="{name: 'articles', params: {articleId: 'post-456.md'}}">Article 2</router-link>
			</li>
			<li class="article">
				<router-link :to="{name: 'articles', params: {articleId: 'post-456.md'}}">Article 3</router-link>
			</li>
		</ul>
	</main>
	<RouterView/>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const isArticleList = computed(() => route.path === '/list-articles')

</script>


<style scoped>

.article-container{
	display: grid;
	place-content: center;
	min-height: 100vh;

	.article-list{
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: (auto-fit, minmax(200px, 1fr));
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
			grid-template-columns: 1fr;
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