<template>

	<main v-if="article" class="article-details">
		<div class="details-container">
			<h1>{{ article.title }}</h1>
			<p>Author: {{ article.author }}, Published: {{ article.date }}</p>
			<p>{{ article.description }}</p>
		</div>
	</main>
	<!-- <div v-else>Loading...</div> -->
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '@/stores/appStore'

const recipeStore = useGeneralStore()

const props = defineProps({
	id: {
		required: true
	}
})

const article = ref(null)
// const id = ref("61f7ae57-bb72-45b0-a371-5dbf2470d939")

onMounted(() => {
	recipeStore.fetchRecipe(props.id)
		.then((response) => {
			console.log("response", response)
			article.value = response
		})
		.catch((error) => {
			console.log("error", error)
		}) 
})

</script>


<style scoped>

.article-details{
	display: grid;
	place-content: center;
	border: .5px solid var(--carrot-5);

	.details-container{
		display: grid;
		padding: 2rem;
		max-inline-size: 800px;
	}
}

</style>