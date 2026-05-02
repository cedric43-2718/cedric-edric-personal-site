<template>

	<dialog 
		ref="modalRef" 
		class="modal-component"
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
	console.log("current-target", e.currentTarget)
	console.log("target", e.target)
}

</script>


<style scoped>

.modal-component{

	background: var(--young-orange-0);
	padding: 1rem;
	padding-bottom: 0;
	border-radius: 10px;
	border: 1px solid var(--young-orange-4);
	position: fixed;
  	top: 50%;
  	left: 50%;
  	transform: translate(-80%, -80%);
}

</style>