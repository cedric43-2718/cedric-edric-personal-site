<template>

	<main class="article-details">
		<div class="details-container">
			<h1>{{ article.title }}</h1>
			<p>Author: {{ article.author }}, Published: {{ article.date }}</p>
			<p>{{ article.description }}</p>
		</div>
	</main>

</template>


<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '@/stores/appStore'

const recipeStore = useGeneralStore()

onMounted(() => {
	recipeStore.fetchRecipes()
	// recipeStore.fetchRecipe(id)
})

</script>


<style scoped>

.article-details{
	display: grid;
	place-content: center;

	.details-container{
		display: grid;
		padding: 2rem;
	}
}

</style>