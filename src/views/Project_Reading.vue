<template>
	<main class="reading-layout">
		<section 
			class="article-section"
			v-for="(subject, index) in articleStore.articleItems.subjects"
			:key="index"
		>
			<div class="article-color" :data-background="subject.color" :class="{'section-hilight': activeIndex === index}"></div>
			<div class="article-subject">
				<div v-if="getSubjectLen(subject.subject)">
					<p class="subject-title">{{ subject.subject[0] }}</p>
					<span>&</span>
					<p class="subject-title">{{ subject.subject[1] }}</p>
				</div>
				<p v-else class="subject-title">{{ subject.subject[0] }}</p>
			</div>
			<div class="article-grid"
				@mouseenter="handleMouseEnter(index)"
				@mouseleave="handleMouseLeave"
			>
				<ul 
					class="articles-list"
					v-for="article in subject.articles"
					:key="article.id"
				>
					<li class="article-title">{{ article.title }}
						<ul class="article-info">
							<li>{{ article.info[0] }}</li>
							<li>{{ article.info[1] }}</li>
						</ul>
					</li>
				</ul>
			</div>
		</section>
	</main>
</template>

<script setup>

import { ref } from 'vue'
import { useGeneralStore } from '@/stores/appStore'

const articleStore = useGeneralStore()
console.log(articleStore.articleItems.subjects.articles)

// logic to handle subject title cases

const isTwoElement = ref(false)

function getSubjectLen(subjectEl){
	return subjectEl.length === 2
}

// dynamic colors

const activeIndex = ref(null)

const handleMouseEnter = (index) => {
  activeIndex.value = index
}

const handleMouseLeave = () => {
  activeIndex.value = null
}

</script>

<style scoped>

.reading-layout{
	display: grid;
	grid-template-columns: 2rem 20ch 1fr;
	grid-template-rows: auto;
	gap: 4rem;
	margin-top: 0;
	margin-bottom: var(--space-m-l);

	.article-section{
		grid-column: span 3;
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: max-content;

		.article-color{
			grid-column: 1 / 2;
			transition: background-color 1s ease-in-out;
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
	background-color: var(--deep-forest);
}

[data-background="bg-economics"]{
	background-color: var(--bluemaine);
}

[data-background="bg-climate"]{
	background-color: var(--lemon-burst-2);
}

[data-background="bg-math"]{
	background-color: var(--monza-filter);
}


.article-color.section-hilight{
	background-color: var(--lime-3);
	filter: saturate(1.5);
}



</style>

