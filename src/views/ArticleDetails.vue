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
		<img :src="pitaImages['pita-done']" alt="" class="pita-main">
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
				Place a heavy-duty baking sheet upside down on the bottom rack of the oven and remove all the other racks when starting the pre-heat. The Pita will be baked right on this. Before dividing the dough 
				spread vegetable oil with a silicone brush all over the work surface you will place the pita on to proof.</p>
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
					<li>Use a plastic bench scraper to mix the ingredients in the large mixing bowl until the dough comes together into a rough mass.</li>
					<li>Let the dough rest under the bowl for 10 - 15 minutes.</li>
					<li>Work the dough into a ball with the plastic bench scraper.</li>
					<li>Strengthen the dough using the slap and fold method for 5 - 7 minutes. Shape the dough dough back into a ball with the bench scraper periodically.</li>
					<li>Coat the inside of a 3 - 4 quart container with about 3 tablespoons of vegetable oil.</li>
					<li>Place the dough in the container, brush with the oil in the container, press it down and refrigerate the dough for at least 4 hours.</li>
					<img :src="pitaImages['pita-kneading']" alt="pita dough after kneading" class="pita-kneading">
				</ol>
			</div>
		</section>
		<section class="article-directions">
			<div class="shaping">
				<h2>Shaping & Baking</h2>
				<ol class="shaping-list">
					<li>Divide and shape the dough into 8 portions between 120 and 128 grams each. Work one portion at a time.</li>
					<li>Lightly dust an area near your scale with flour and roll each piece of dough into a ball under a cupped hand. Place each dough ball onto the oiled counter and space evenly with as much space between the balls as possible.</li>
					<img :src="pitaImages['pita-dividing1']" alt="" class="pita-dividing-1">
					<li>After all the dough is divided and shaped lightly oil one hand and flatten each ball into a rough disc. I do this in two passes.</li>
					<li>Let the dough rest on the counter for 20 min. Preheat the oven now with the overturned baking sheet on the bottom rack.</li>
					<img :src="pitaImages['pita-dividing2']" alt="" class="pita-dividing-2">
					<li>Brush a rolling pin with oil and roll each rough disc into a more refined disc shape - doesn't have to be perfect. The discs should be around 1/8th of an inch thick. Let the discs rest for 15 min.</li>
					<li>Transfer the dough to the baking sheet 2 or three pieces at a time by picking one up and placing it in the plam of an upturned hand and turning it over onto the baking sheet in the oven. Make sure you brush that hand with a bit of oil.</li>
					<li>Bake the pitas for 4:45 - 5:30 minutes. I use an 8 inch offset spatchula to slide under the dough and get out of the oven. The first batch will probably stick a bit, but the offset spatchula gets right under them if you work with the tool at a brisk pace with just a little bit of force.</li>
					<li>Transfer to a cooling rack.</li>
					<img :src="pitaImages['pita-dividing3']" alt="" class="pita-dividing-3">
					<li>Enjoy those pita after 30 minutes or so.</li>
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
	}
	// author: {
	// 	required: true
	// },
	// date: {
	// 	required: true
	// }
})

// image rendering

const pitaImages = ref({
	'pita-done': new URL('../assets/images/pita-done.jpeg', import.meta.url).href,
	'pita-kneading': new URL('../assets/images/pita-kneading.jpeg', import.meta.url).href,
	'pita-dividing1': new URL('../assets/images/pita-dividing1.jpeg', import.meta.url).href,
	'pita-dividing2': new URL('../assets/images/pita-dividing2.jpeg', import.meta.url).href,
	'pita-dividing3': new URL('../assets/images/pita-dividing3.jpeg', import.meta.url).href
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

.pita-main{
	max-width: 100%;
	max-height: 35vh;
	object-fit: cover;
	border-radius: 3px;
	justify-self: center;
}

.end{
	justify-self: center;
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
	
}

.article-grid > *{
	grid-column: content;
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

		img{
			display: inline;
		}

		h2{
			font-weight: 500;
			margin-bottom: 1ch;
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

.article-directions{

	img{
		display: inline;
	}

	.shaping{
		align-content: start;

		h2{
			font-weight: 500;
			margin-bottom: 1ch;
		}
		
	}
}

</style>