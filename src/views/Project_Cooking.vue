<template>
	<main class="cooking-layout">
		<div
			class="project" 
			v-for="recipe in articleStore.recipeItems.recipes"
			:key="recipe.id"
		>
			<div class="project-info">
				<h2 class="project-title fs-secondary-heading">{{ recipe.title }}</h2>
				<div class="project-items">
					<p class="tools"><span>Tools:</span> {{ recipe.tools }}</p>
					<ul class="ratios">
						<li
							v-for="formula in recipe.formulas"
							:key="formula.id"
						>
							<span>{{ formula.ingredient }}:</span> {{ formula.value }}
						</li>
					</ul>
				</div>
				<p>{{ recipe.description }}</p>
			</div>
			<div class="project-image">
				<CycleInstance
					:imageArray="getImageArray(recipe.imageNames)"
				/>
			</div>
		</div>
	</main>
</template>

<script setup>
import { useCycleList } from '@vueuse/core'
import { useGeneralStore } from '@/stores/appStore'
import CycleInstance  from '@/components/CycleInstance.vue'

// Store 

const articleStore = useGeneralStore()

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
	--col-count: 8;
	display: grid;
	grid-template-columns: minmax(6rem, 1.25fr) repeat(var(--col-count), minmax(0, 6rem)) minmax(1rem, 1fr);
	gap: 2rem;
	margin: var(--space-m-l) 0;
}

.project{
	display: grid;
	grid-template-columns: subgrid;
	grid-column: 2 / span 7;
	gap: 1rem;
	padding: 1rem;
	/* background-color: var(--young-orange-0); */
	border: .5px solid var(--young-orange-4);
	border-radius: 20px;

	.project-info{
		display: grid;
		grid-auto-flow: row;
		grid-column: 1 / span 4;
		gap: 1rem;
		padding-right: 1rem;
		border-right: .5px solid var(--young-orange-4);

		.project-items{
			display: grid;
			grid-auto-flow: row;
			gap: .5rem;

			span{
				font-weight: 600;
				color: var(--monza-8);
			}

			ul{
				margin: 0;
				padding: 0;
			}

			> * {
				font-size: var(--fs-note);
			}
		}
	}

	.project-image{
		grid-column: span 3;
		cursor: pointer;

		img{
			width: 100%;
			height: 100%;
			object-fit: cover;
			/* padding: 0 .5rem; */
		}
	}

}
</style>