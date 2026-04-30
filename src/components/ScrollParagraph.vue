<template>
	<div ref="target" :class="{'is-visible': animateParagraph}">
		<p><slot></slot></p>
	</div>
</template>

<script setup>

import { ref, onMounted, onUnmounted, computed } from 'vue'

const target = ref(null)
const animateParagraph = ref(false)
const emit = defineEmits(['paragraph-visible'])

// const isMobile = ref(false)

// const threshold = computed(() => {
// 	return isMobile.value ? 0.5 : 0.2
// })

// observer callback, the square brackets are for destructuring

const observerCallback = ([entry]) => {
	if (entry.isIntersecting){
		animateParagraph.value = true
		emit('paragraph-visible', animateParagraph.value)
		// stop observing after appearence
		// observer.unobserve(entry.target)
	} else{
		animateParagraph.value = false
		emit('paragraph-visible', animateParagraph.value)
	}
}

// observer options

const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: .5
}

// create new observer

const observer = new IntersectionObserver(observerCallback, observerOptions)

// initiate observer within lifecycle

onMounted(() => {
	// isMobile.value = window.innerWidth < 800
	if(target.value){
		observer.observe(target.value)
	}
})

onUnmounted(() => {
	if(target.value){
		observer.unobserve(target.value)
	}
})

</script>

<style scoped>

div{
	opacity: 0;
	transition: opacity 1s ease-in-out;
}

div.is-visible{
	opacity: 1;
}

</style>