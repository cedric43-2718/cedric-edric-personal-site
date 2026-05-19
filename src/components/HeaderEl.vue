<template>
	<header class="header" ref="primaryHeader">
		<router-link :to="{name: 'one'}">
			<h1 class="logo">J</h1>
		</router-link>
		<nav>
			<button
				v-if="!isDarkMode"
				class="button-theme"
				data-icon="theme-glasses"
				@click="handleTheme"
				></button>
			<button
				v-else
				class="button-theme"
				data-icon="theme-sun"
				@click="handleTheme"
				></button>
			<ul ref="ulRef">
				<li v-for="section in store.sections" :key="section.id" class="fs-main-nav">
					<router-link v-if="!renderRoute(section.title)" v-on:mouseleave="handleMouseLeave" v-on:mouseover="handleMouseOver" :to="{name: `${section.title.toLowerCase()}`}">
						{{ section.title }}
					</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script setup>

import { ref, onMounted, inject, computed, watchEffect, watch} from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useGeneralStore } from '@/stores/appStore'
import Project_ACI from '@/views/Project_ACI.vue'

const store = useGeneralStore()
const route = useRoute()

// globals

const ulRef = ref(null)
const primaryHeader = ref(null)

// render routes based on screen size

const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => (windowWidth.value < 800 ? true : false))

const renderRoute = (name) => {
	return name === 'Projects' && isMobile.value
}

onMounted(() => {
	windowWidth.value = window.innerWidth
})

// current project 

const currentRoute = computed(() => route.path)

watchEffect(() => {
	console.log(currentRoute.value)
})

// theme selector

const currentTheme = inject('theme')
const isDarkMode = ref(false)

const handleTheme = () => {
	isDarkMode.value = !isDarkMode.value
}

watch(isDarkMode, (val) => {
	if(val) {
		document.body.classList.add('darkmode')
		store.keyCount = store.keyCount += 1;
		console.log("add", isDarkMode.value)
	} else {
		document.body.classList.remove('darkmode')
		store.keyCount = store.keyCount += 1;
		console.log("remove", isDarkMode.value)
	}
})


// sticky nav intersection observer

const scrollWatcher = document.createElement('div')
scrollWatcher.setAttribute('data-scroll-watcher', '')

onMounted(() => {
	const liEls = document.querySelectorAll('li')
	primaryHeader.value.before(scrollWatcher)
	const navObserver = new IntersectionObserver((entries) => {
		// console.log(entries)
		primaryHeader.value.classList.toggle('sticking', !entries[0].isIntersecting)
		liEls.forEach((el) => {
			el.classList.toggle('sticking', !entries[0].isIntersecting)
		})
		if (!entries[0].isIntersecting) {
			document.documentElement.style.setProperty('--before-display', 'none')
		} else {
			document.documentElement.style.setProperty('--before-display', 'block')
		}

	}, { rootMargin: "100px 0px 0px 0px" })

	navObserver.observe(scrollWatcher)

})


// Radio Handlers

const handleMouseOver = (event) => {

	let ulRect = ulRef.value.getBoundingClientRect()
	let ulXend = ulRect.width + ulRect.x
	let liX_window = event.clientX
	let liX_offset = event.offsetX
	let dialTo = (liX_window - liX_offset - 15) - ulRect.x
	document.documentElement.style.setProperty('--radio-dial', dialTo + 'px')
	ulRef.value.classList.add('active')
}

const handleMouseLeave = (event) => {
	ulRef.value.classList.remove('active')
}

</script>

<style scoped>

.header {
	position: sticky;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: .5rem 0;
	background-color: var(--surface-1);
	transition: background 500ms;

	@media(width <= 800px){
		justify-content: center;
	}

	& h1 {
		color: var(--heading-1);
		transition: color .5s ease-in-out;
	}

	& h1:is(:hover, :focus){
		color: var(--hover-1);
	}

	& .logo{
		padding-left: 2rem;

		@media(width <= 800px){
			padding-left: 0;
			margin-right: 1rem;
			margin-left: .5rem;
		}	

	}

	a:hover,
	a:focus{
		color: var(--heading-2);
	}
}

.header.sticking {
	background: hsl(202, 32%, 15%, .5);
}

.header.sticking > h1 {
	color: transparent;
	transition: color 500ms;
}

nav {

	/* position: relative; */
	width: fit-content;
	anchor-name: --hovered-navitem;
	isolation: isolate;
	display: flex;


	&::after{
		content: '';
		position: absolute;
		z-index: -1;
		top: calc(anchor(bottom) - 10px);
		left: calc(anchor(left) + 1rem);
		right: calc(anchor(right) + 1rem);
		bottom: calc(anchor(bottom) + 10px);
		/* height: 4px; */
		background: var(--nav-window);
		border-radius: 15px;

		position-anchor: --hovered-navitem;
		transition: 300ms;
	}

	&:has(a:hover)::after{
		top: calc(anchor(top));
		left: calc(anchor(left));
		right: calc(anchor(right));
		bottom: calc(anchor(bottom));

		@supports(corner-shape: squircle){
			border-radius: 50%;
			corner-shape: squircle;
		}
	}

	ul{
		/* --render-link: v-bind(displayValue); */

		display: flex;
		flex-grow: 1;
		padding-inline: 0;

	}

	li:hover{
		anchor-name: --hovered-navitem;
	}

	& ul>li {
		padding: 0 2rem;
		color: var(--text-1);
		transition: all 500ms;

		@media(width <= 800px){
			padding: 0 .5rem;
			font-size: var(--fs-500);
		}
	}

	& ul>li.sticking {
		padding: 0 .75rem;
		font-size: var(--fs-small-note);
	}
}

.button-theme{
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border: none;
	background: transparent;
	/* background: var(--goldenrod-0);
	color: var(--deepslate-7); */
	/* border: 1px sold var(--deepslate-1); */
	padding-inline: 1.5rem;
	padding-block: .5rem;
	border-radius: 20px;
	cursor: pointer;

	&[data-icon="theme-glasses"]::before{
		content: '';
		background-image: url("../assets/images/sunglasses.svg");
		width: 32px;
		height: 32px;

	}

	&[data-icon="theme-sun"]::before{
		content: '';
		background-image: url("../assets/images/sun.svg");
		width: 32px;
		height: 32px;

	}
}


</style>