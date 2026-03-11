<template>
	<main class="gallery-fluid-container">
		<div class="gallery-fluid-grid">
			<div class="gallery-info">
				<div class="input-container">
					<h2 class="text-accent-2001">Search For Art</h2>
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
				<div class="plot-data">
					<div>
						<p>Score: <span>{{ displayScore }}</span></p>
						<p>Year: <span>{{ displayYear }}</span></p>
					</div>
				</div>
			</div>
			<div class="gallery-display">
				<section class="image-wrapper">
					<img :src="`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`">
				</section>
				<section class="image-info-wrapper">
					<p class="fw-semibold">{{ imageTitle }}</p>
					<p class="fw-semibold">{{ artistTitle }}</p>
					<div class="divider"></div>
					<p class="fs-note">{{ imageDescription }}</p>
				</section>	
			</div>
		</div>
	</main>
</template>

<script setup>

import { ref, computed, inject, onMounted, onUnmounted, onUpdated, watchEffect, render } from 'vue'
import { useRoute } from 'vue-router'
import * as Plot from "@observablehq/plot"
import PlotEl from '../components/PlotEl.js'

const route = useRoute()

const searchTerm = ref('')
const filteredDataContainer = ref([])
const loaded = ref(false)
const isLoading = ref(false)
const error = ref(null)

let aciTerms = ref(null)
let displayScore = ref('')
let displayYear = ref('')
let imageTitle = ref('')
let artistTitle = ref('')
let imageDescription = ref('')
let imageId = ref('')

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
	console.log(dataRev)
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

const getWorks = async (input, work_count) => {

	if(!input) {
		filteredDataContainer.value = []
		return
	}

	console.log(filteredDataContainer.value)
	isLoading.value = true
	error.value = null

	try{
		const url = `https://api.artic.edu/api/v1/artworks/search?q=${input}&limit=${work_count}&fields=id,title,artist_display,artist_title,category_titles,term_titles,subject_id,theme_titles,artwork_type_title,date_display,date_start,date_end,main_reference_number,image_id,description,short_description`;
		const res = await fetch(url)
		const data = await res.json()
		console.log(data.pagination.total)
		data.data.map((i, index) => {	
			let obj = {}
			obj["results"] = data.pagination.total
			obj["index"] = index
			obj["score"] = i._score
			obj["year"] = i.date_end
			obj["imageId"] = i.image_id
			obj["title"] = i.title
			obj["artistDisplay"] = i.artist_display
			obj["artistTitle"] = i.artist_title
			obj["description"] = i.description
			if((obj["description"] != null) && (obj["description"].length < 1200)) {
				filteredDataContainer.value.push(obj)
			}
		})

	} catch(err) {
		error.value = 'Failed to fetch data'
      	console.error(err)
	} finally {
		isLoading.value = false
		loaded.value = true
		aciTerms.value = filteredDataContainer.value[0].results
		imageId.value = filteredDataContainer.value[0].imageId
		imageTitle.value = filteredDataContainer.value[0].title
		artistTitle.value = filteredDataContainer.value[0].artistTitle
		displayYear.value = filteredDataContainer.value[0].year
		displayScore.value = filteredDataContainer.value[0].score.toFixed(1)
		let description = filteredDataContainer.value[0].description
		imageDescription.value = description.replace(/(<([^>]+)>)/gi, "")

		renderPlot(filteredDataContainer.value)	
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
	console.log(route.path)
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
		
		.plot-data{
			display: grid;
			place-items: center;
		}
	}

	/* Gallery Display */

	.gallery-display{
		display: grid;
		grid-column: 5 / 13;
		grid-template-columns: subgrid;
		border-left: .5px solid var(--teak);
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
				border-bottom: .5px solid var(--teak);
			}
		}
	}

}

</style>