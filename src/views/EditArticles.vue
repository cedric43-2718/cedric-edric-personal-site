<template>
	<main class="dashboard-container">
		<!-- <MdEditor v-model="editorContent" @on-save="handleSave" class="markdown-container"/> -->
		<MdEditor v-model="editorContent" class="markdown-container"/>
		<div class="form-container">
			<form @submit.prevent="handleSubmit" class="form">
				<div class="article-info">
					<div class="form-group name-group">
						<label for="name">Author Name</label>
						<input type="text" required id="name" name="author_name" v-model.lazy="articleData.metaData.authorName">
					</div>
					<div class="form-group title-group">
						<label for="title">Title</label>
						<input type="text" required id="title" name="title" v-model.lazy="articleData.metaData.title">
					</div>
					<!-- <div class="form-group tags-group">
						<label for="tags">Tags</label>
						<input type="text" id="tags" name="tags" v-model.lazy="tags">
					</div> -->
				</div>
				<div class="form-group">
					<label for="description">Description</label>
					<textarea name="description" id="description" v-model.lazy="articleData.metaData.description"></textarea>
				</div>
				<button :disabled="isInvalid" class="grid-full-span">Submit</button>
			</form>
		</div>
	</main>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useGeneralStore } from '@/stores/appStore'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const articleStore = useGeneralStore()

const isInvalid = computed(() => {
  return articleData.metaData.authorName.trim() === '' || articleData.metaData.title.trim() === '' || articleData.metaData.description.trim() === '';
});


// capturing editor values

const editorContent = ref('# Hello Editor')

const articleData = reactive(
	{ 
		metaData: {
			authorName: '',
			title: '',
			description: '',
			date: new Date().toISOString()
		},
		fileName: 'file1a.md',		
		content: editorContent.value
	});

// store interface to to call postMkdToStorage

const handleSubmit = () => {
	articleStore.passContentToApi(articleData)
	console.log(articleData)
}

</script>

<style scoped>

.dashboard-container{
	display: grid;
	grid-template-rows: auto 1fr;
	gap: 2rem;
	min-height: 100vh;
	margin: 1rem;
	
	.form-container{
		padding: 2rem;
		/* position: relative; */
		background: var(--young-orange-0);
		border: .5px solid var(--young-orange-4);
		border-radius: 15px;
		/* max-inline-size: 1200px; */
		inline-size: 40%;
		/* margin-inline: auto; */
		justify-self: center;
		margin-block: auto;


		.form{
			display: grid;
			gap: 2rem;
			max-inline-size: 800px;
			margin-inline: auto;

			.form-group{
				display: grid;
				margin-bottom: 2ch;

				input{
					background: var(--young-orange-0);
				}

				textarea{
					box-sizing: content-box;
					height: 6lh;
					margin-top: 1rem;
				}

				input, 
				textarea{
					border: none;
					outline: none;
					border-bottom: 1px solid var(--deepslate-6);
					padding: .5em 1em;

					&:focus-visible{
						border-bottom: 2px solid var(--lime-7);
					}
  				}	
			}

			.name-group,
			.title-group,
			.tags-group{
				justify-self: center;	
				inline-size: 50%;
			}
		}
	}

	button{
		justify-self: end;
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

	button:disabled{
		background: var(--deepslate-1);
		color: var(--young-orange-0);
		cursor: not-allowed;
	}

}

</style>