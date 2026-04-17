<template>
	<main class="reading-layout">
		<section class="article-section">
			<div class="article-color" data-background="bg-science" :class="{'section-hilight': isSec}"></div>
			<div class="article-subject">
				<p class="subject-title">Science</p>
				<span>&</span>
				<p class="subject-title">Computation</p>
			</div>
			<div class="article-grid"
				@mouseenter="handleSectionColor"
				@mouseleave="handleSectionColor"
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

const isSec = ref(false)

const handleSectionColor = () => {
	isSec.value = !isSec.value
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
		grid-column: span 3;
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: max-content;

		.article-color{
			grid-column: 1 / 2;
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
			/* padding-block: 1rem; */

			> *{
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
		}
	}
}

[data-background="bg-science"]{
	background-color: var(--lemon-burst-2);
}


.article-color.section-hilight{
	background-color: var(--lime-3);
	filter: saturate(1.5);
}


</style>

