<template>

	<dialog 
		ref="modalRef" 
		class="modal"
		@click="handleClose"
	>
		<slot/>
	</dialog>

</template>

<script setup>

import { ref } from 'vue'

const modalRef = ref(null)

const showModal = () => modalRef.value?.showModal()
const closeModal = () => modalRef.value?.close()

defineExpose({
	show: showModal,
	close: closeModal
})

function handleClose(e) {
	if(e.currentTarget === e.target) {
		closeModal()
	}
}

</script>


<style scoped>

.modal{
	background: var(--young-orange-0);
	padding: 4rem;
	border-radius: 10px;
	border: 1px solid var(--young-orange-4);
	position: fixed;
  	top: 50%;
  	left: 50%;
  	transform: translate(-200%, -50%);

	button{
		background: var(--deepslate-6);
		color: var(--young-orange-2);
		border: 0;
		border-radius: 6px;
		font-size: var(--fs-600);
		cursor: pointer;
		transition: background .5s ease-in-out;

		&:hover,
		&:focus-visible{
			background: var(--deepslate-5);
		}
	}
}

</style>