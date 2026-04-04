<template>
	<main class="cooking-layout">
		<div class="project">
			<div class="project-info">
				<h2 class="project-title fs-secondary-heading">Pita Bread</h2>
				<div class="project-items">
					<p class="tools"><span>Tools:</span> Large Bowl, Medium Bowl, Plastic Bench Scraper</p>
					<ul class="ratios">
						<li><span>Flour:</span> 530g - 540g</li>
						<li><span>Water:</span> 385g - 390g</li>
						<li><span>Others:</span> Salt, Yeast, Olive Oil, Honey</li>
					</ul>
				</div>
				<p>I've been making this once a week for the past 3 years. It can ferment in the fridge for days - one to two is best - so the workflow is easy to integrate into a day. This has a great floavor and structure. I love the Angel brand Pita, but this is better.</p>
			</div>
			<div class="project-image" @click="nextPita()">
				<img :src="currentPita" />
			</div>
		</div>
		<div class="project">
			<div class="project-info">
				<h2 class="project-title fs-secondary-heading">Chocolate Babka</h2>
				<div class="project-items">
					<p class="tools"><span>Tools:</span> Large Bowl, Medium Bowl (2), Plastic Bench Scraper, Sharp Knife 8"</p>
					<ul class="ratios">
						<li><span>Flour:</span> 750g</li>
						<li><span>Water:</span> 240g - 260g</li>
						<li><span>Butter:</span> 142g</li>
						<li><span>Others:</span> 2 Eggs, Yeast, Sugar, Dry Milk, Cinnamon, Vanilla, Filling Ingredients</li>
					</ul>
				</div>
				<p>I've been wanting to make one of these since my brother sent me one from NYC on my birthday a couple years ago</p>
			</div>
			<div class="project-image" @click="nextBabka()">
				<img :src="currentBabka" />
			</div>
		</div>
	</main>
</template>

<script setup>
import { useCycleList } from '@vueuse/core'

const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}.jpeg`, import.meta.url).href
}

// const images = ['../assets/images/Babka0.jpeg', '../assets/images/Babka1.jpeg', '../assets/images/Babka2.jpeg']
const babkaImages = [getImageUrl('Babka0'), getImageUrl('Babka1'), getImageUrl('Babka2')]
const pitaImages = [getImageUrl('pita1'), getImageUrl('pita2'), getImageUrl('pita3')]

const {  state: currentBabka, next: nextBabka } = useCycleList(babkaImages)
const {  state: currentPita, next: nextPita } = useCycleList(pitaImages)
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