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
const windowWidth = ref(window.innerWidth)
let observer = null

// create a rective threshold based on screen size 

const threshold = computed(() => (windowWidth.value < 800 ? 0 : 0.5))

// inittiate observer. this will be called when the component is monted and will test for the screen size

const initObserver = () => { 

	if (observer) observer.disconnect()
	
	observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting){
				animateParagraph.value = true
				emit('paragraph-visible', animateParagraph.value)
			} else{
				animateParagraph.value = false
				emit('paragraph-visible', animateParagraph.value)
			}
		},
		{
			root: null,
			rootMargin: '0px',
			threshold: threshold.value
		}
	)

	if(target.value) observer.observe(target.value)
}

// initiate observer within lifecycle

onMounted(() => {
	initObserver()
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