<template>
	<MdEditor v-model="editorContent" @on-save="handleSave"/>
</template>

<script setup>
import { ref } from 'vue'
import { useGeneralStore } from '@/stores/appStore'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

// capturing editor values

const editorContent = ref('# Hello Editor')

// store interface to emulate fetch api

const articleStore = useGeneralStore()

const handleSave = async () => {
	try {
		await articleStore.postContent(editorContent.value)
		console.log('succesfully passed to store', editorContent)
	} catch(error) {
		console.error('passing to store failed', error)
	}
}


</script>

<style scoped>

main{
	min-height: 100vh;
	margin: auto;
}

</style>