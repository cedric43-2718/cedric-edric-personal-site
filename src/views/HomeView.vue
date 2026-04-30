<template>
	
	<main>
		<css-doodle class="doodle-leaves" use="var(--rule-leaves)">
		</css-doodle>
		<div class="arrow" :class="{'is-visible': !isParagraphVisible}">
			<div class="scroll-icon">
				<!-- <use xlink:href="../assets/images/scroll-down.svg#caret-double-down"></use> -->
				<svg xmlns="http://www.w3.org/2000/svg" fill="#0000" viewBox="0 0 256 256">
					<path d="M213.66,130.34a8,8,0,0,1,0,11.32l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,204.69l74.34-74.35A8,8,0,0,1,213.66,130.34Zm-91.32,11.32a8,8,0,0,0,11.32,0l80-80a8,8,0,0,0-11.32-11.32L128,124.69,53.66,50.34A8,8,0,0,0,42.34,61.66Z"></path>
				</svg>
			</div>
		</div>

	<ScrollParagraph class="scroll-paragraph" @paragraph-visible="consumeVisibility">
		<div class="flow scroll-wrapper">
			<h1 class="wrapper fs-secondary-heading">A bit about my work:</h1>
			<p class="wrapper">Hi. My name is Jason. I'm an integrated resources analyst at the <a href="https://www.rmld.com/" target="_blank" rel="noopener noreferrer">Reading Municipal Light Department</a>. I develop forecasting methodologies and workflows
				to predict hourly, monthly and long-term patterns in electricity demand and distributed energy resources. I've been working in the energy and climate field for over 15 years and began my professional career at the <a href="https://www.nescaum.org/" target="_blank" rel="noopener noreferrer">Northeast States for Coordinated Air Use
				Management</a> where I built economy-wide energy models used to identify patterns of technology adoption consistent with state and regional climate 
				mitigation targets. If you are interested, a detailed overview of my professional career can be found on my <a href="https://www.linkedin.com/in/jason-rudokas-08856610/" target="_blank" rel="noopener noreferrer">linkedin</a> page. 
			</p>
			<h2 class="wrapper">A bit about this site:</h2>
			<p class="wrapper">I've been learning about building websites for a few years now and this site is a project 
				I've been meaning to complete for a long time. It's such an interesting domain of knowledge.
				The whole site is made from scratch - from the styling to the interactive elements used in other parts of the site. 
				I talk about the site in a little more detail in the about section. The code for this site is on <a href="https://github.com/cedric43-2718/cedric-edric-personal-site.git" target="_blank" rel="noopener noreferrer">github</a>. That said there really are
				some masters of the craft out there and awesome teachers as well. <a href="https://www.youtube.com/kevinpowell" target="_blank" rel="noopener noreferrer">Kevin Powell's</a> resources on css and design have been incredibly helpful.
			</p>
		</div>
	</ScrollParagraph>

	</main>

	
</template>

<script setup>

import { ref } from 'vue'
import 'css-doodle'
import ScrollParagraph from '@/components/ScrollParagraph.vue';

const isParagraphVisible = ref(false)

function consumeVisibility(value){
	isParagraphVisible.value = value
}

</script>

<style scoped>


main{
	display: grid;
	place-items: center;

	.arrow{
		opacity: 0;
		/* font-size: 5rem; */
		/* color: var(--deepslate-6); */
		transition: opacity 1s ease-in-out;
		margin-top: var(--space-l);

		.scroll-icon {
			padding: 0;
			aspect-ratio: 1;
			width: var(--space-xl);
			stroke: var(--deepslate-6);	
		}
	}

	.arrow.is-visible{
		opacity: 1;
	}


	@media(width <= 800px){
		h1{
			font-weight: 600;
			font-size: var(--fs-600);
		}

		h2{
			font-weight: 600;
			font-size: var(--fs-600);
		}
	}

}

	


.doodle-leaves
{
	margin-top: var(--space-l-xl);
	width: var(--fluid-400-1200);
	height: var(--fluid-400-1200);

	@media(width <= 800px){
		margin-top: var(--space-s-m);
		width: var(--fluid-180-400);
		height: var(--fluid-180-400);
		margin-inline: auto;
	}
}

.doodle-leaves{
	grid-row: 1;
	grid-column: 1;
}

.scroll-paragraph{
	margin-bottom: 2rem;
}

css-doodle{

	--rule-leaves: (

		--xval: 10;
		--yval: 16;
		--range: 3;

		:doodle {
			@grid: 30x30;
			@size: 100% 100%;
		}
		
		@random(.6) {
			background:
				radial-gradient(20px 20px at @rand(10px) @rand(10px), @p(var(--deep-forest), var(--emerald),
				var(--bluemaine)), #0000 @rand(10px, 30px));
			animation: move ease-in-out @r(5s, 10s) @r(-0.1s, -1s) infinite;
			border-radius: 100%;
		}

		@match((x > $(xval - range) && x < $(xval + range)) && (y > $(yval - range) && y < $(yval + range))){
			background: var(--bluemaine-filter);
			/* border-radius: 50%; */
			opacity: .2; 
			/* clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); */
		}
		
		@keyframes move {
			0%,
			40%,
			100% {
				transform: scale(@r(.1, .9)) translateY(@r(1px, 3px));
			}
			20% {
				transform: scale(@r(.1, .3)) translateY(@r(3px, 6px));
			}
			80% {
				transform: scale(@r(.7, .9)) translateY(@r(-2px, 1px));
			}
		}
	);
}

</style>