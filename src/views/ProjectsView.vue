<template>
	
	<nav class="gallery-nav" :class="{ project: isProjectRoot}">
		<ul v-if="!isProjectRoot">
			<router-link class="aci" v-if="!displayArt" to="/projects/aci-explorer">
				<svg class="project-icon palette">
					<use href="/public/project-icons.svg#palette"></use>
				</svg>
			</router-link>
			<router-link class="reading" v-if="!displayKnowledge" to="/projects/knowledge">
				<svg class="project-icon book">
					<use href="/public/project-icons.svg#books"></use>
				</svg>
			</router-link>
			<router-link class="cooking" v-if="!displayCooking" to="/projects/cooking">
				<svg class="project-icon tools">
					<use href="/public/project-icons.svg#tools-kitchen-3"></use>
				</svg>
			</router-link>
		</ul>
	</nav>
	<div v-if="isProjectRoot" class="fluid-grid-container">
		<main v-if="isProjectRoot" >
			<!-- Art -->
				<div class="link-container p1-link">
					<div class="frosted-circle">
						<router-link class="aci" to="/projects/aci-explorer">
							<svg class="project-icon palette">
								<use href="/public/project-icons.svg#palette"></use>
							</svg>
						</router-link>
					</div>
				</div>
				<div class="p1-title title">
					<h2 class="fs-tertiary-heading">Art Institute of Chicago Explorer</h2>
				</div>
				<p class="p1-description fs-note wrapper">This was a lot of fun to build. It is a little application that reaches out
				to API endpoints developed by the Art Institute of Chicago. You can search the full text of all the peices
				in their digital collection and the app will consume a set of results and display a picture of the peice, the
				artist name, title of the work and a description of the peice. I made the the core parts of this a long time
				ago when I was first learning how to use async / await functions. I'm glad it's finnaly been put to good use. 
				Be sure to fool around with the scatterplot. I made it interactive as a way to "scroll"
				through a subset of the returned art peices.
				</p>
			<!-- Books -->
				<div class="link-container p2-link">
					<div class="frosted-circle">
						<router-link class="reading" to="/projects/knowledge">
							<svg class="project-icon book">
								<use href="/public/project-icons.svg#books"></use>
							</svg>
						</router-link>
					</div>
				</div>
				<div class="p2-title title">
					<h2 class="fs-tertiary-heading">Knowledge</h2>
				</div>
				<p class="p2-description fs-note wrapper">This section is a list of articles, books and essays that have made a lasting impression in the course of my thought.
				Each domain operates differently of course. Books are just books I've really enjoyed while some of the articles - particularly ones related to climate and energy - impact how I think about my professional work on a day to day basis.
				</p>
			<!-- Cooking -->
				<div class="link-container p3-link">
					<div class="frosted-circle">
						<router-link class="cooking" to="/projects/cooking">
							<svg class="project-icon tools">
								<use href="/public/project-icons.svg#tools-kitchen-3"></use>
							</svg>
						</router-link>
					</div>
				</div>
				<div class="p3-title title">
					<h2 class="fs-tertiary-heading">Baking</h2>
				</div>
				<p class="p3-description fs-note wrapper">I've been cooking and baking since I was a kid and grew up working in
				kitchens. It's been a real joy to live with and continue learning about such a delicoius domain of knowledge.
				A few recent projects displayed here. I want to make this into an area where friends and family
				can log in to and post recipes and have their own collections of recipes - the King Arthur Baking 
				website is an incredibly well designed example of this.</p>
		</main>
	</div>

	<RouterView />

</template>

<script setup>

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isProjectRoot = computed(() => route.path === '/projects/')

const displayArt = computed(() => route.path === '/projects/aci-explorer')
const displayKnowledge = computed(() => route.path === '/projects/knowledge')
const displayCooking = computed(() => route.path === '/projects/cooking')

console.log(route.name)

</script>

<style scoped>

@property --radiate-deg{
	syntax: '<angle>';
	inherits: true;
	initial-value: -90deg;
}

@property --gradient-glow {
  syntax: '<color>#';
  initial-value:  hsl(202, 32%, 80%), hsl(202, 32%, 60%), hsl(202, 32%, 50%), hsl(202, 32%, 40%), hsl(202, 32%, 70%); 
  /* initial-value:  hsl(168, 76%, 80%),  hsl(168, 76%, 70%), hsl(168, 76%, 60%), hsl(168, 76%, 50%), hsl(168, 76%, 70%);  */
  inherits: false;
}

.gallery-nav{
	display: grid;
	grid-template-columns: 1rem repeat(4, 1fr) 1rem;
	/* align-items: center; */
	padding: .5rem 0;
	border-top: .5px solid var(--teak);
}

.gallery-nav.project{
	border: none;
	padding: 0;
	margin: 0;
}

.gallery-nav > ul{
	grid-column: 5 / span 1;
	display: grid;
	grid-auto-flow: column;
	justify-items: end;
	color: var(--deepslate-7);
}

.gallery-nav > router-link {
	cursor: pointer;
	user-select: none;
}

.gallery-nav .project-icon{
	aspect-ratio: 1;
	width: var(--space-l);
	color: var(--teak);
}

.fluid-grid-container{
	max-width: var(--grid-max-width);
	padding-inline: var(--grid-gutter);
	margin-inline: auto;
	margin-block: var(--space-xl-2xl);
}


main{

	display: grid;
	/* grid-template-columns: minmax(1rem, 1fr) repeat(var(--grid-columns), minmax(0, 10rem)) minmax(1rem, 1fr); */
	grid-template-columns: repeat(var(--grid-columns), minmax(0, 10rem));
	grid-template-rows: auto auto auto;
	column-gap: var(--grid-gutter);
	row-gap: calc(var(--grid-gutter) * (1 + var(--grid-scale-factor)));

	>  * {
		display: grid;
		align-items: center;
	}

	.project-icon {
		padding: 0;
		aspect-ratio: 1;
		width: 3rem;	
	}

	.link-container{
		width: max-content;
	}

	.p1-link{
		grid-row: 1;
		grid-column: 2 / 4;
		justify-self: center;

		svg{
			margin-top: 0rem;
		}
	}

	.p1-title{
		grid-row: 1;
		grid-column: 4 / span 3;
	}

	.p1-description{
		grid-row: 1;
		grid-column: 7 / 12;
	}

	.p2-link{
		grid-row: 2;
		grid-column: 2 / 4;
		justify-self: center;

		svg{
			margin-top: 0rem;
		}
	}

	.p2-title{
		grid-row: 2;
		grid-column: 4 / span 3;
	}

	.p2-description{
		grid-row: 2;
		grid-column: 7 / 12;
	}

	.p3-link{
		grid-row: 3;
		grid-column: 2 / 4;
		justify-self: center;

		svg{
			margin-top: 0rem;
		}
	}

	.p3-title{
		grid-row: 3;
		grid-column: 4 / span 3;
	}

	.p3-description{
		grid-row: 3;
		grid-column: 7 / 12;
	}

	.frosted-circle{
		grid-row: 1;
		grid-column: 1;
		position: relative;
		display: grid;
		place-items: center;
		isolation: isolate;
		width: 100%;
		height: auto;
		padding: var(--fluid-14-32) var(--fluid-14-32);
		background: 
			linear-gradient(var(--moon-papper) 0 0) padding-box,
			conic-gradient(from var(--radiate-deg), var(--gradient-glow)) border-box;
		filter: saturate(75%);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
		border: 2px solid transparent; 
		border-radius: 50%;
		animation: radiate 7s infinite linear;
		transition: filter .5s ease-in-out, --gradient-glow .5s ease-in-out;

		a svg {
			width: var(--fluid-20-48);
			color: var(--young-orange-5);
		}

		a {
			opacity: .2;
			transition: opacity .5s ease-in;
		}

	}

	.frosted-circle:hover{
		--gradient-glow: var(--lemon-burst-1), var(--young-orange-3), var(--old-orange-4), var(--scarlet-4), var(--lemon-burst-2);
		filter: saturate(180%);	
	}

	.frosted-circle:hover a,
	.frosted-circle:focus a{
		color: var(--young-orange-5);
		opacity: 1;
	}

	.frosted-circle::before,
	.frosted-circle::after{
		content: "";
		position: absolute;
		border-radius: inherit;
		
	}	

	.frosted-circle::before{
		z-index: -1;
		background: var(--moon-papper);
		inset: .5rem;
		filter: blur(.75rem);
		scale: 1.1;
	}

	.frosted-circle::after{
		z-index: -2;
		inset: -1rem;
		background: conic-gradient(from var(--radiate-deg), var(--gradient-glow));
		filter: blur(2rem);
		opacity: .5;
		transition: --gradient-glow .5s ease-in-out;	
	}

	.frosted-circle:hover::after{
		--gradient-glow: var(--lemon-burst-1), var(--young-orange-3), var(--old-orange-4), var(--scarlet-4), var(--lemon-burst-2);
	}

	a{
		width: fit-content;
	}

	

}

@keyframes radiate{
	100%{
		--radiate-deg: 270deg;
	}
}

</style>