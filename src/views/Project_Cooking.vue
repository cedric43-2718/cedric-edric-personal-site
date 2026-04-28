<template>
	<main v-if="isProjectCooking" class="cooking-layout">
		<div
			class="project" 
			v-for="recipe in recipeStore.recipeItems.recipes"
			:key="recipe.id"
			:id="recipe.id"
		>
			<div class="project-preview">
				<div class="project-items">
					<h2 class="project-title fs-primary-heading">{{ recipe.title }}</h2>
					<div class="project-info">
						<p class="fs-tertiary-heading">{{ recipe.author }}</p>
						<p class="fs-note">{{ recipe.date }}</p>
					</div>
					<ul class="recipe-tags">
          				<li class="tag fs-note"
							v-for="tag in recipe.tags"
							:key="tag"
						>
						{{ tag }}</li>
        			</ul>
				</div>
				<div class="description">
					<p>{{ recipe.description }}</p>
				</div>
				<div class="nav-button">
					<button
						class="button-more"
						data-icon="newspaper"
						@click.self="navToArticle(recipe.id)"
						:disabled="hasArticle(recipe.hasArticle)"
						>Read More</button>
				</div>
			</div>
			<div class="project-image">
				<CycleInstance
					:imageArray="getImageArray(recipe.imageNames)"
				/>
			</div>
		</div>
	</main>
	<RouterView/>
</template>

<script setup>

import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCycleList } from '@vueuse/core'
import { useGeneralStore } from '@/stores/appStore'
import CycleInstance  from '@/components/CycleInstance.vue'

// Store 

const recipeStore = useGeneralStore()

// Routing to specific ids

const router = useRouter()
const route = useRoute()
// const hasArticle = ref(true)

const navToArticle = (articleId) => {
	router.push({
		name: 'article-details',
		params: { id: articleId}
	})
}

const isProjectCooking = computed(() => route.path === '/projects/cooking')

const hasArticle = (article) => {
	return article === false
}

// Image Carosel

const getImageUrl = (name) => {
    return new URL(`../assets/images/${name}.jpeg`, import.meta.url).href
}

function getImageArray(imageArray){
	let renderArray = []
	imageArray.forEach(image => renderArray.push(getImageUrl(image)))
	return renderArray
}

</script>


<style scoped>

main{
	margin-top: 0;
	margin-bottom: 4rem;
}

.cooking-layout{
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: (auto-fit, minmax(200px, 1fr));
	align-content: center;
	justify-content: center;
	gap: 4rem;
	margin-inline: 2rem;
	
	@media (width <= 1480px) {
		grid-auto-flow: row;
		margin: 2rem;
		gap: 2rem;
	}
}

.project{
	--col-count: 7;
	display: grid;
	grid-template-columns: repeat(var(--col-count), minmax(0, 6rem));
	gap: 1rem;
	padding: 1rem;
	border: .5px solid var(--young-orange-4);
	border-radius: 20px;
	box-shadow: 2px 4px 15px 5px rgba(0,0,0,0.1);
	transition: transform .5s ease-in-out;

	.project-preview{
		display: grid;
		grid-template-rows: 1fr minmax(0, 250px) 2rem;
		align-items: start;
		grid-column: 1 / span 4;
		padding-right: 1rem;
		border-right: .5px solid var(--young-orange-4);


		.project-items{
			display: grid;
			gap: 1rem;

			.recipe-tags{
				display: flex;
				flex-wrap: wrap;
				gap: 1rem;
				justify-content: flex-start;
				margin: 0;
				padding-block: .5rem;
		
				.tag{
					background: var(--deepslate-5);
					color: var(--mountain-0);
					width: 6rem;
					margin: 0;
					border-radius: 20px;
					text-align: center;
				}
			}

		}

		.description{
			margin-top: 1rem;
		}

		.nav-button{
			display: grid;
			place-self: center;
		}

	}

	.project-image{
		display: grid;
		grid-column: span 3;

		.image-container{
			justify-content: space-between;
		}

	}

	.button-more{
		display: inline-flex;
		gap: .5rem;
		justify-content: center;
		align-items: center;
		background: var(--goldenrod-0);
		color: var(--deepslate-7);
		border: none;
		padding-inline: 1.5rem;
		padding-block: .5rem;
		border-radius: 20px;
		cursor: pointer;
		transition: background .5s ease;

		&:hover, &:focus{
			background: var(--goldenrod-2);
		}

		&[data-icon="newspaper"]::before{
			content: '';
			background-image: url("../assets/images/newspaper.svg");
			width: 32px;
			height: 32px;

		}
	}

}

.project:hover{
	transform: scale(1.01);
}
</style>