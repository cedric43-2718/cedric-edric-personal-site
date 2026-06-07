<template>
	<main v-if="!articleStore.isMkdLoading" class="article-grid">
		<section class="full-width article-info">
			<div class="full-width-left js-center">
				<h2 class="article-author">{{ articleStore.articleMeta?.author }}</h2>
				<p>{{ formatDate(articleStore.articleMeta?.date) }}</p>
			</div>
			<div class="full-width-content as-start js-start">
				<h1 class="article-title">{{ articleStore.articleMeta?.title }}</h1>
			</div>
		</section>
		<div v-html="htmlContent" class="markdown-container"></div>	
	</main>
</template>

<script setup>

import { ref, computed, reactive, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useGeneralStore } from '@/stores/appStore'
import { formatDate } from '@/composables/formatDate'

const articleStore = useGeneralStore()
const htmlContentLoading = ref(true)
const htmlContent = ref('')

const props = defineProps({
	id: String
})

onMounted(async () => {
	await articleStore.callGetMkd(props.id)
	htmlContent.value = articleStore.htmlFromMkdFile
	htmlContentLoading.value = articleStore.isMkdLoading
})


</script>

<style scoped>

/* core styles and typography */

ol li{
	line-height: 1.5;
	list-style-type: decimal-leading-zero;
	margin-bottom: 1.5ch;
}

ol li::marker{
	font-size: var(--fs-700);
	font-weight: 200;
}

section img{
	border-radius: 3px;
	justify-self: center;
}

h2{
	font-weight: 500;

	&:not(.article-author){
		margin-bottom: 1ch;
	}
}

/* utility layout classes */

.article-grid > .breakout {
	grid-column: breakout;
}

.article-grid > .full-width{
	grid-column: full-width-start / content-end;
	display: grid;
	grid-template-columns: subgrid;
	

	div {
		display: grid;
	}
}

.full-width-left{
	grid-column: full-width-start / content-start;

	&.js-start{
		justify-self: start;
	}

	&.js-center{
		justify-self: center;
	}

	&.js-end{
		justify-self: end;
	}

	&.as-start{
		align-self: start;
	}

	&.as-center{
		align-self: center;
	}

	&.as-end{
		align-self: end;
	}
}

.full-width-content{
	grid-column: content;

	&.js-start{
		justify-self: start;
	}

	&.js-center{
		justify-self: center;
	}

	&.js-end{
		justify-self: end;
	}

	&.as-start{
		align-self: start;
	}

	&.as-center{
		align-self: center;
	}

	&.as-end{
		align-self: end;
	}
}

/* Core Layout */

.article-grid{

	--padding-inline: 2rem;
	--content-max-width: 80ch;
	--breakout-max-width: 95ch;

	--breakout-size: calc((var(--breakout-max-width) - var(--content-max-width)) / 2);

	display: grid;
	grid-template-columns: 
		1em [full-width-start] minmax(var(--padding-inline), 1fr) [breakout-start] minmax(0, var(--breakout-size)) 
		[content-start] min(100% - (var(--padding-inline) *2), var(--content-max-width)) [content-end] minmax(0, var(--breakout-size))
		[breakout-end] minmax(var(--padding-inline), 1fr) [full-width-end] 1em;
	grid-template-rows: max-content;
	align-content: start;
	margin-top: 2em;
	
}

.article-grid > *{
	grid-column: content;
}

/* article layout */

.article-info{
	border-bottom: .5px solid var(--teak);

	.full-width-left {

		.article-author{
			font-weight: 500;
		}
		
		@media(width <= 1366px) {
			grid-row: 1;
			grid-column: 4 / 5;
			justify-self: end;
		}
	}

	.article-title{
		font-size: var(--fs-1000);
		font-weight: 200;
	}

	.full-width-content{
		@media(width <= 1366px) {
			grid-row: 1;
			grid-column: 2 / 3;
			justify-self: center;
		}
	}

}

.full-width.article-info{
	@media(width <= 1366px) {
		grid-column: 4 / 5;
		grid-template-columns: auto auto 1fr;
	}
}

/* markdown container and children styling */

.markdown-container{
	display: grid;
	margin-top: 2ch;

	&:deep(h2),
	&:deep(h1){
		font-weight: 400;
		font-size: var(--fs-700);
		text-transform: capitalize;
		line-height: 1.3;
		margin-block: .5ch;
	}

	&:deep(p){
		line-height: 1.4;
	}

	&:deep(p):not(:has(+ h1, + h2)) {
		margin-bottom: 1ch;
	}

	&:deep(li){
		/* line-height: 1.5; */
		list-style-type: decimal-leading-zero;
		/* margin-bottom: 1.5ch; */
	}
}

</style>