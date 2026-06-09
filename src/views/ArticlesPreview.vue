<template>
	<main v-if="isArticlePreview" class="cooking-layout">
		<div
			class="project" 
			v-for="recipe in articleStore.recipeItems.recipes"
			:key="recipe.id"
			:id="recipe.id"
		>
			<h2 class="project-title fs-primary-heading">{{ recipe.title }}</h2>
			<div class="project-preview">
				<div class="project-items">
					
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
						@click.self="navToRecipe(recipe.id)"
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
		<div class="loader-grid" v-if="!loadedBlobs">
			<div class="project">
				<div class="project-title skeleton skeleton-title"></div>
				<div class="project-preview">
					<div class="project-items">
						<div class="project-info">
							<div class="skeleton skeleton-info"></div>
							<div class="skeleton skeleton-info"></div>
						</div>
					</div>
					<div class="description">
						<div class="skeleton skeleton-text"></div>
						<div class="skeleton skeleton-text"></div>
						<div class="skeleton skeleton-text"></div>
						<div class="skeleton skeleton-text"></div>
					</div>
					<div class="nav-button">
						<div class="skeleton skeleton-button"></div>
					</div>
				</div>
				<div class="project-image">
					<div class="skeleton skeleton-image"></div>
				</div>
			</div>
		</div>
		<div class="loader-grid" v-if="!loadedBlobs">
			<div class="project">
				<div class="project-title skeleton skeleton-title"></div>
				<div class="project-preview">
					<div class="project-items">
						<div class="project-info">
							<div class="skeleton skeleton-info"></div>
							<div class="skeleton skeleton-info"></div>
						</div>
					</div>
					<div class="description">
						<div class="skeleton skeleton-text"></div>
						<div class="skeleton skeleton-text"></div>
						<div class="skeleton skeleton-text"></div>
						<div class="skeleton skeleton-text"></div>
					</div>
					<div class="nav-button">
						<div class="skeleton skeleton-button"></div>
					</div>
				</div>
				<div class="project-image">
					<div class="skeleton skeleton-image"></div>
				</div>
			</div>
		</div>
		<div
			class="project" 
			v-for="article in articleStore.latestBlobs"
			:key="article.name"
			v-show="loadedBlobs"
		>
			<h2 class="project-title fs-primary-heading">{{ article.metaData.title }}</h2>
			<div class="project-preview">
				<div class="project-items">
					<div class="project-info">
						<p class="fs-tertiary-heading">{{ article.metaData.author }}</p>
						<p class="fs-note">{{ formatDate(article.metaData.date) }}</p>
					</div>
				</div>
				<div class="description">
					<p>{{ article.metaData.description }}</p>
				</div>
				<div class="nav-button">
					<button
						class="button-more"
						data-icon="newspaper"
						@click.self="navToArticle(article.name)"
						>Read More</button>
				</div>
			</div>
			<div class="project-image">
				<img :src="article.metaData.previewImage" @load="onImageLoad" alt="article preview image">
			</div>
		</div>
	</main>
	<RouterView/>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCycleList } from '@vueuse/core'
import { useGeneralStore } from '@/stores/appStore'
import CycleInstance  from '@/components/CycleInstance.vue'
import { formatDate } from '@/composables/formatDate'

// Store 

const articleStore = useGeneralStore()

// Routing to specific ids

const router = useRouter()
const route = useRoute()
// const hasArticle = ref(true)

const navToRecipe = (articleId) => {
	router.push({
		name: 'recipe-details',
		params: { id: articleId}
	})
}

const navToArticle = (articleId) => {
	router.push({
		name: 'article-details',
		params: { id: articleId}
	})
}

const isArticlePreview = computed(() => route.path === '/articles')

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

// store interface to call getFilesFromStorage

const searchTerm = ref('')

const handleSearchSubmit = () => {
	articleStore.passSearchTermToApi(searchTerm.value)
}

// getting markdown blobs from storage

const loadedBlobs = ref(false)

const onImageLoad = () => {
	loadedBlobs.value = true
}

onMounted(async () => {
	await articleStore.callGetBlobs('markdown-files')
})

</script>


<style scoped>

main{
	margin-top: 0;
	margin-bottom: 4rem;
}

.cooking-layout{
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
	align-content: center;
	justify-content: center;
	gap: 4rem;
	max-width: 1400px;
	margin-inline: auto;
	margin-top: 5rem;
	margin-bottom: 10rem;
	
	
	@media (width <= 1480px) {
		grid-template-columns: .65fr;
		grid-auto-flow: row;
		margin: 2rem;
		gap: 2rem;
	}
}


.project{
	--col-count: 7;
	display: grid;
	grid-template-columns: repeat(var(--col-count), minmax(0, 6rem));
	/* grid-template-columns: repeat(auto-fit, minmax(200px, 100%)); */
	gap: 1rem;
	padding: 1rem;
	border: .5px solid var(--young-orange-4);
	border-radius: 20px;
	box-shadow: 2px 4px 15px 5px rgba(0,0,0,0.1);
	transition: transform .5s ease-in-out;

	.project-title{
		grid-column: 1 / -1;
	}

	.skeleton{
		opacity: .7;
		animation: skeleton-loader 1s linear infinite alternate;
	}

	.skeleton-title{
		width: 95%;
		height: 40px;
		border-radius: 10px;
		margin-bottom: 2ch;
	}

	.project-preview{
		display: grid;
		grid-template-rows: 1fr minmax(0, 250px) 7ch;
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
			align-self: end;
		}

		.skeleton-info{
			width: 95%;
			height: 30px;
			border-radius: 10px;
		}

		.skeleton-info:nth-child(1){
			margin-bottom: .5ch;
		}

		.skeleton-info:nth-child(2){
			margin-bottom: 2ch;
		}

		.skeleton-text{
			width: 95%;
			height: 30px;
			border-radius: 10px;
		}

		.skeleton-text:not(:last-of-type){
			margin-bottom: 1.5ch;
		}

		.skeleton-button{
			width: 10rem;
			height: 2rem;
			border-radius: 20px;
		}

	}

	.project-image{
		display: grid;
		grid-column: span 3;

		.image-container{
			justify-content: space-between;
		}

		img{
			height: 200px;
			min-width: 100%;
			object-fit: cover;
			border-radius: 10px;
		}

		.skeleton-image{
			height: 200px;
			min-width: 100%;
			border-radius: 10px
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

@keyframes skeleton-loader {
	0% {
		background-color: hsl(46, 99%, 80%);
	}
	100% {
		background-color: hsl(46, 99%, 90%);
	}
}
</style>