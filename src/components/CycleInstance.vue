<template>
	<div class="image-container">
		<img :src="currentImage" alt="recipe picture">
		<button 
			class="next-image" 
			@click="handleNextImage"
			data-icon="book"
		></button>
	</div>
</template>

<script setup>

import { useCycleList } from '@vueuse/core'

const props = defineProps(['imageArray'])

const {  state: currentImage, next: nextImage } = useCycleList(props.imageArray)

const handleNextImage = () => {
	nextImage()
}

</script>

<style scoped>

.image-container{
	display: flex;
	flex-direction: column;
	align-items: center;

	img{
		border-radius: 10px;
	}

	.next-image{
		display: inline-flex;
		gap: .5rem;
		justify-content: center;
		align-items: center;
		margin-top: .5rem;
		background: var(--goldenrod-0);
		color: var(--deepslate-7);
		border: none;
		padding-inline: .5rem;
		padding-block: .5rem;
		border-radius: 20px;
		cursor: pointer;
		transition: background .5s ease-in-out;

		&:hover, &:active{
			background: var(--goldenrod-2);
		}

		&[data-icon="book"]::before{
			content: '';
			background-image: url('@/assets/images/book-open.svg');
			width: 32px;
			height: 32px;

		}
	}
}

</style>