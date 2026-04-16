<template>
	<main class="reading-layout">
		<section class="article-section">
			<div class="article-color" :class="{'section-hilight': isSec1}"></div>
			<div class="article-subject">
				<p class="subject-title">Science</p>
				<span>&</span>
				<p class="subject-title">Computation</p>
			</div>
			<div class="article-grid"
				@mouseenter="handleSection1Color"
				@mouseleave="handleSection1Color"
			>
				<ul class="articles-list">
					<li class="article-title">A Mathematical Theory of Computation
						<ul class="article-info">
							<li>Shannon, Claude E.</li>
							<li>1948</li>
						</ul>
					</li>
					<li class="article-title">On the Decrease of Entropy in a Thermodynamic System by the Intervention of Intelligent Beings
						<ul class="article-info">
							<li>Szilard, Leo</li>
							<li>1929</li>
						</ul>
					</li>
			
				</ul>
			</div>
		</section>
	</main>
</template>

<script setup>

import { ref } from 'vue'

const isSec1 = ref(false)
const isSec2 = ref(false)
const isSec3 = ref(false)
const isSec4 = ref(false)

const handleSection1Color = () => {
	isSec1.value = !isSec1.value
}

const handleSection2Color = () => {
	isSec2.value = !isSec2.value
}

const handleSection3Color = () => {
	isSec3.value = !isSec3.value
}

const handleSection4Color = () => {
	isSec4.value = !isSec4.value
}

</script>

<style scoped>

.reading-layout{
	display: grid;
	grid-template-columns: 2rem 20ch 1fr;
	gap: 2rem;
	margin-top: 0;
	margin-bottom: var(--space-m-l);

	.article-section{
		display: grid;
		grid-template-columns: subgrid;

		.article-color{
			grid-column: 1 / 2;
			background-color: var(--deep-forest);
			transition: background-color .5s ease-in-out;
			border-radius: 0 8px 8px 0;
		}

		.article-subject{
			grid-column: 2 / 3;
			text-align: center;
			font-size: var(--fs-tertiary-heading);
			font-weight: var(--fw-semi-bold);
		}

		.article-grid{
			--col-count: 2;

			grid-column: 3 / 4;
			display: grid;
			grid-template-columns: 1rem repeat(var(--col-count), 1fr) 1rem;
			gap: 1rem;
			padding-block: 1rem;
		}
	}
}

/* .subject{
	text-align: center;
	margin-top: 2rem;
} */

/* .articles-grid{
	margin-top: 1rem;
} */


/* .articles-grid{
	--col-count: 2;
	display: grid;
	grid-template-columns: 1rem repeat(var(--col-count), 1fr) 1rem;
	gap: 1rem;
	padding-block: 1rem;
} */

.articles-grid > *{
	grid-column: 2 / span 2;
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
}

.articles-list > li{
	font-size: var(--fs-note);
}

.article-info li {
	font-size: var(--fs-small-note);
	list-style: circle;
	line-height: 1.5;
}

.article-info > li::marker{
	color: var(--carrot-4);
	font-size: 20px;
}

/* .s-1-color{
	grid-row: 1;
	grid-column: 1 / 2;
	margin-top: 2rem;
	background-color: var(--deep-forest);
	transition: background-color .5s ease-in-out;
	border-radius: 0 8px 8px 0;
} */

/* .s-1{
	grid-row: 1;
	grid-column: 2 / 3;
} */

.ag-1{
	grid-row: 1;
	grid-column: 3 / 4;
}



.article-color.section-hilight{
	background-color: var(--lime-3);
	filter: saturate(1.5);
}




</style>

