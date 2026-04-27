<template>
	<main v-if="article" class="flow article-grid">
		<section class="full-width article-info">
			<div class="full-width-left js-center">
				<h2 class="article-author">Jason Rudokas</h2>
				<p>Oct 12, 2025</p>
			</div>
			<div class="full-width-content as-start js-start">
				<h1 class="article-title">Pita Bread</h1>
			</div>
		</section>
		<img src="https://unsplash.it/1600/400" alt="">
		<section class="full-width article-intro">
			<div class="full-width-left js-end">
				<div class="equipment">
					<ul class="equipment-list fs-note">
						<li>Large Mixing Bowl</li>
						<li>Medium Eating Bowl</li>
						<li>3 - 4 Quart Container</li>
						<li>Plastic Bench Scraper</li>
						<li>475 deg Oven</li>
						<li>Heavy-Duty Half Sheet Pan</li>
					</ul>
				</div>
			</div>
			<div class="full-width-right">
				<p>This is a great recipe to work into a Saturday or Sunday Morning. It's easy to mix and can ferment in the refrigerator all day long or even up to a few days.
				The shaping and baking part is a bit of a process, but if you keep thing tight and organized it moves right along and there isn't really any multi-thing corrdination to juggle.
				</p>
				<p><span class="tips">A few tips:</span> This is a fairly wet dough. If you are kneading / strengthening the dough by hand - my prefered method - your hands are meant to get sticky with dough. Just go with it and use the bench scraper to shape the dough into a ball frequently.
				Place a heavy-duty baking sheet upside down on the bottom rack of the oven and remove all the other racks when starting the pre-heat. The Pita will be baked right on this.</p>
			</div>
		</section>
		<section class="full-width article-content">
			<div class="full-width-left js-end">
				<div class="ingredients">
					<ul class="ingredients-list fs-note">
						<li><div><span class="i-1">A</span>AP White Flour - 380g</div></li>
						<li><div><span class="i-1">A</span>Wheat Flour - 155g</div></li>
						<li><div><span class="i-3">C</span>Warmish Water 393g</div></li>
						<li><div><span class="i-1">A</span>Salt - 3 tsp</div></li>
						<li><div><span class="i-2">B</span>Instant Yeast - 2.5 tsp</div></li>
						<li><div><span class="i-3">C</span>Olive Oil - 2.5 tbl</div></li>
						<li><div><span class="i-3">C</span>Honey - 35g</div></li>
					</ul>
				</div>
			</div>
			<div class="full-width-right">
				<h2>Preparation</h2>
				<ol class="prep">
					<li>Place <span class="i-1">A</span> ingredients in a large bowl and mix ingredients with a fork.</li>
					<li>Place <span class="i-2">B</span> into the large bowl and mix with a fork.</li>
					<li>Place <span class="i-3">C</span> ingredients into the large bowl.</li>
				</ol>
				<h2>Mixing & Fermentation</h2>
				<ol class="mixing">
					<li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, blanditiis.</li>
					<li>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</li>
					<li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
				</ol>
				<h2>Shaping & Baking</h2>
				<ol class="shaping">
					<li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus tenetur quae, non eum cum quo nulla nesciunt adipisci unde ut autem, asperiores dolores accusamus aliquid facere esse tempora. Quo, exercitationem.</li>
					<li>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</li>
					<li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
				</ol>
			</div>
		</section>
		
	</main>
	
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '@/stores/appStore'

const recipeStore = useGeneralStore()

const props = defineProps({
	id: {
		required: true
	},
	author: {
		required: true
	},
	date: {
		required: true
	}
})

const article = ref(null)

onMounted(() => {
	recipeStore.fetchRecipe(props.id)
		.then((response) => {
			console.log("response", response)
			article.value = response
		})
		.catch((error) => {
			console.log("error", error)
		}) 
})

</script>


<style scoped>

/* utility layout classes */

.flow > * + * {
  margin-top: var(--flow-spacing, 2em);
}

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

/*  main layout */

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
	
	/* height: 100vh; */
	
}

.article-grid > *{
	grid-column: content;
}

img.full-width {
  width: 100%;
  max-height: 45vh;
  object-fit: cover;
}

/* article styles */

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

.article-intro{
	.full-width-left {

		.equipment{

			margin-right: 5ch;

			ul {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				gap: 1ch;

				@media (width <= 1560px) {
					flex-direction: row;
					justify-content: space-evenly;
				}
			}

			ul li {
				list-style: circle;
				line-height: 2;
			}

			ul li::marker{
				color: var(--carrot-4);
				font-size: 20px;
			}
		}

		@media (width <= 1560px) {
			grid-column: content;
			grid-row: 2;
			/* margin-bottom: 2ch; */
		}
	}

	.full-width-right{
		span {
			color: var(--ultramarine-5);
			font-weight: 500;
		}
	}

	.full-width-right{
		@media (width <= 1560px) {
			grid-column: content;
			grid-row: 1;
		}
	}
}

.article-content{

	.full-width-left{

		.ingredients {

			margin-right: 6ch;

			ul {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				gap: 2ch;

				@media (width <= 1560px) {
					flex-direction: row;
					justify-content: space-evenly;
				}
			} 

			ul li {
				list-style: none;
			}

			li div{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
			}

		}

		@media (width <= 1560px) {
			grid-column: content;
			grid-row: 1;
			margin-bottom: 2ch;
		}

	}

	.full-width-right{
		align-content: start;

		h2{
			font-weight: 500;
			margin-bottom: 1ch;
		}

		ol li{
			line-height: 1.5;
			list-style-type: decimal-leading-zero;
			margin-bottom: 1.5ch;
		}

		ol li::marker{
			font-size: var(--fs-700);
			font-weight: 200;
		}

		span{
			margin: 0;
		}
		
	}

	.full-width-right{
		@media (width <= 1560px) {
			grid-column: content;
			grid-row: 2;
		}
	}

	span{
		font-size: var(--fs-500);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-right: 1ch;
		height: 3ch;
		width: 3ch;
		border-radius: 100%;
	}

	.i-1{
		border: 1.5px solid var(--ultramarine-3);
	}

	.i-2{
		border: 1.5px solid var(--young-orange-3);
	}

	.i-3{
		border: 1.5px solid var(--old-orange-4);
	}

}

</style>