<template>
	<main class="gallery-fluid-container">
		<div class="gallery-fluid-grid">
			<div class="gallery-info">
				<div class="input-container">
					<h2>Search For Art</h2>
					<input v-model.lazy="searchTerm" type="text" placeholder="search term">
				</div>
				<div class="plot-wrapper">
					<div class="plot-info">
						<p class="fs-note fw-semibold">Selected Search Results</p>
					</div>
					<div class="plot-container">
						<PlotEl v-if="loaded" :options="plotOptions" class="bee" @mousedown="handleSelect($event)"/>
					</div>
				</div>
				<div class="button-container">
					<button class="button-more" @click="modalTarget.show()">Open Notes</button>
				</div>
			</div>
			<div class="gallery-display">
				<section class="image-wrapper">
					<!-- <img src="https://www.artic.edu/iiif/2/831a05de-d3f6-f4fa-a460-23008dd58dda/full/843,/0/default.jpg" crossorigin="anonymous"> -->
					<img 
						:src="imageSrc"
						@load="onImageLoad"
						alt="aci artwork image"
					>
				</section>
				<section class="image-info-wrapper">
					<p class="fw-semibold">{{ imageTitle }}</p>
					<p class="fw-semibold">{{ artistTitle }}</p>
					<div class="divider"></div>
					<p class="fs-note">{{ imageDescription }}</p>
				</section>	
			</div>
		</div>
		<div class="modal-container">
			<Modal ref="modalTarget">
				<h2 class="fs-tertiary-heading">Art Institute of Chicago Explorer</h2>
				<p class="fs-note"><span class="fw-semibold">Search:</span> The app searches the full text of all information stored on a very large collection of works and returns a set of results based on the search term. 
				So, for example, it's not really meant to look up every work the <a href="https://www.artic.edu/" target="_blank" rel="noopener noreferrer">AIC</a> has in it's digital collection by Edward Ruscha. 
				I think it's a fun way put in random words like "electric" or whatever and see what you get.
				The results are limited to the first 20 works that also have an image.</p>
				<p class="fs-note"><span class="fw-semibold">Graph:</span> The orange point is the first work displayed after a search term is submitted. 
				The dots plotted represent other works returned by the search. If you click on one of the dots the work displayed will update.</p>
				<p class="fs-note"><span class="fw-semibold">Documentation:</span> <a href="https://api.artic.edu/docs/#introduction" target="_blank" rel="noopener noreferrer">Art Institute of Chicago API</a></p>
				<form method="dialog">
					<button class="close-button" data-icon="close"></button>
				</form>
			</Modal>
		</div>
	</main>
</template>

<script setup>

import { ref, computed, inject, onMounted, onUnmounted, onUpdated, watchEffect, render } from 'vue'
import { useRoute } from 'vue-router'
import * as Plot from "@observablehq/plot"
import PlotEl from '../components/PlotEl.js'
import Modal from '../components/Modal.vue'

const route = useRoute()

// modal 

const modalTarget = ref(null)

// ACI related variables and logic

const searchTerm = ref('')
const filteredDataContainer = ref([])
const loaded = ref(false)
const isLoading = ref(false)
const error = ref(null)

let displayScore = ref('')
let displayYear = ref('')
let imageTitle = ref('')
let artistTitle = ref('')
let imageDescription = ref('')

// proxy image loading

const imageId = ref('')
const imageLoaded = ref(false)

const imageSrc = computed(() => imageId.value ? `https://func-cedric-edric-contactapi-d6adccexftctabaw.eastus-01.azurewebsites.net/api/proxyACIImage?imageId=${encodeURIComponent(imageId.value)}` : '')
// const imageSrc = computed(() => imageId.value ? `http://localhost:7071/api/proxyACIImage?imageId=${encodeURIComponent(imageId.value)}` : '')

const onImageLoad = () => {
	imageLoaded.value = true
}

// ploting logic

const plotOptions = ref({
	data: null,
	marks: []
})


function renderPlot(data) {

	const scores = data.map(i => {
		return i.score
	})
	const maxScore = Math.max(...scores)
	const dataRev = data.map(i => {
		return {
			...i,
			maxVal: i.score === maxScore ? 1 : 0
		}
	})
	// console.log(dataRev)
	plotOptions.value = {
		data: data,
		marks: [
			Plot.dot(
				dataRev,
				{
					x: "year",
					y: "score",
					fill: (d) => d.maxVal,
					r: 5,
					channels: { title: "title" },
					tip: {
						format: {
							title: true
						}
					}
				}	
			),
		Plot.text(
			data, 
			{
				x: "year",
				y: "score",
				fill: "none",
				text: (d) => d.imageId,
				pointerEvents: "fill"
			})
		],
		x: {type: "point", tickFormat: "d", label: null},
		height: 300,
		width: 450,
		style: {
			fontSize: 14
		},
		color: {
    		domain: [0, 1],
    		range: ["#1f77b4", "#ff7f0e"] 
  		}
	}

}


// function to set request result fields

const setCurrentWork = (item) => {
	imageId.value = item.imageId
	imageTitle.value = item.title
	artistTitle.value = item.artistTitle
	displayYear.value = item.year
	displayScore.value = item.score.toFixed(1)
	imageDescription.value = (item.description || '').replace(/(<([^>]+)>)/gi, "")
}

// core api request

const getWorks = async (input, work_count) => {

	if(!input) {
		filteredDataContainer.value = []
		return
	}

	// console.log(filteredDataContainer.value)
	isLoading.value = true
	error.value = null
	imageLoaded.value = false

	try{

		const url = `https://api.artic.edu/api/v1/artworks/search?q=${input}&limit=${work_count}&fields=id,title,artist_display,artist_title,category_titles,term_titles,subject_id,theme_titles,artwork_type_title,date_display,date_start,date_end,main_reference_number,image_id,description,short_description`;
		const res = await fetch(url)
		const data = await res.json()

		filteredDataContainer.value = data.data
			.map((i, index) => ({
				index: index,
				score: i._score,
				year: i.date_end,
				imageId: i.image_id,
				title: i.title,
				artistTitle: i.artist_title,
				description: i.description
			}))
			.filter((item) => item.description && item.description.length < 1200)
		
		if(filteredDataContainer.value.length) {
			setCurrentWork(filteredDataContainer.value[0])
			renderPlot(filteredDataContainer.value)	
		} else {
			imageId.value = ''
		}

	} catch(err) {
		error.value = 'Failed to fetch data'
      	console.error(err)
	} finally {
		isLoading.value = false
		loaded.value = true
	}
}

const handleSelect = (e) => {

	if(e.target.tagName === 'text') {
		let selectedTitle = filteredDataContainer.value.filter((el) => el.imageId === e.target.innerHTML)[0].title
		let selectedArtist = filteredDataContainer.value.filter((el) => el.imageId === e.target.innerHTML)[0].artistTitle
		let selectedYear = filteredDataContainer.value.filter((el) => el.imageId === e.target.innerHTML)[0].year
		let selectedScore = filteredDataContainer.value.filter((el) => el.imageId === e.target.innerHTML)[0].score
		let selectedDescription = filteredDataContainer.value.filter((el) => el.imageId === e.target.innerHTML)[0].description
		// console.log(filteredDataContainer.value.filter((el) => el.imageId === e.target.innerHTML)[0])
		imageId.value = e.target.innerHTML
		imageTitle.value = selectedTitle
		artistTitle.value = selectedArtist
		displayScore.value = selectedScore.toFixed(1)
		displayYear.value = selectedYear
		imageDescription.value = selectedDescription.replace(/(<([^>]+)>)/gi, "")
	}
}

watchEffect(() => {
	filteredDataContainer.value = []
	loaded.value = false
  	getWorks(searchTerm.value, 20)
})

onMounted(() => {
	getWorks('window', 20)
	// console.log(route.path)
})

</script>

<style scoped>


input::placeholder{
	font-size: 1rem;
	padding-left: 1rem;
}

.gallery-fluid-container{
	display: block;
	max-width: var(--grid-max-width);
	padding-inline: var(--grid-gutter);
	margin-inline: auto;
	margin: var(--space-m-l) 0;
}

.gallery-fluid-grid{
	display: grid;
	grid-template-columns: repeat(var(--grid-columns), minmax(0, 10rem));
	column-gap: var(--grid-gutter);
	row-gap: calc(var(--grid-gutter) * (1 + var(--grid-scale-factor)));

	/* Gallery Info */

	.gallery-info{
		display: grid;
		grid-column: 1 / span 4;

		.input-container{
			display: grid;
			place-items: center;

			input {
				margin: 0 1rem;
				padding: .5rem 0;
				border-radius: 5px;
				outline: none;
				border: none;
				border-bottom: 1px solid var(--monza-filter);
			}
		}
		
		.plot-wrapper{
			display: grid;
			justify-items: center;

			.plot-info{
				align-self: end;
				margin-bottom: var(--space-2xs);
			}
			
			.plot-container {
				user-select: none;
				justify-self: center;
				align-self: start;
				cursor: pointer;
			}
		}
		
		.button-container{
			display: grid;
			place-items: center;
			align-content: start;

			.button-more{
				justify-self: center;
				display: inline-flex;
				justify-content: center;
				align-items: center;
				background: var(--goldenrod-1);
				color: var(--deepslate-7);
				border: none;
				padding-inline: 1rem;
				border-radius: 20px;
				cursor: pointer;
				transition: background .5s ease-in-out;

				&:hover, &:focus{
					background: var(--goldenrod-2);
				}
			}
		}
	}

	/* Gallery Display */

	.gallery-display{
		display: grid;
		grid-column: 5 / 13;
		grid-template-columns: subgrid;
		border-left: .5px solid var(--young-orange-4);
		padding: var(--space-m);

		.image-wrapper{
			grid-column: 2 / -2;
			user-select: none;
			place-items: center;
		}

		.image-wrapper > img{
			height: 50vh;
			object-fit: cover;
		}

		.image-info-wrapper{
			grid-column: 1 / -1;
			margin-top: var(--space-xs-s);

			.divider{
				margin-block: var(--space-xs);
				margin-inline-end: var(--space-3xl);
				border-bottom: .5px solid var(--young-orange-4);
			}
		}
	}

}

.modal-container{

	& > [open] {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 1rem;
	
	}
	.modal-component{

		h2{
			margin-inline: auto;
			color: var(--ultramarine-8);
		}

		p{
			max-width: 50rem;

			margin-inline-end: auto;

			a{
				text-decoration-line: underline;
				text-decoration-color: var(--accent-1);
				text-decoration-style: double;
				text-decoration-thickness: .5px;
				text-underline-offset: 2px;
			}
		}

		.close-button {
			display: inline-flex;
			border: 0;
			background: none;
			border-radius: 6px;
			font-size: var(--fs-600);
			cursor: pointer;
			transition: background .5s ease-in-out;

			&[data-icon="close"]::before{
				content: '';
				background-image: url("../assets/images/close.svg");
				width: 32px;
				height: 32px;
			}
		}
	}

}

dialog::backdrop{
	background-color: rgba(0, 0, 0, 0.1); 
  	backdrop-filter: blur(8px) saturate(150%); 
}




</style>