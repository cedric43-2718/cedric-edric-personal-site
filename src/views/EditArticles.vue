<template>
	<div class="fluid-grid-container">
		<main class="dashboard-container">
			<!-- <MdEditor v-model="editorContent" @on-save="handleSave" class="markdown-container"/> -->
			<MdEditor language="en-US" v-model="articleData.content" @on-save="handleSave" class="markdown-container"/>
			
			<form @submit.prevent="handleSubmit" class="form">
				<div class="form-fields">
					<div class="article-meta">
						<div class="form-group name-group">
							<label for="name">Author Name</label>
							<input type="text" required id="name" name="author_name" v-model.lazy="articleData.metaData.authorName">
						</div>
						<div class="form-group title-group">
							<label for="title">Title</label>
							<input type="text" required id="title" name="title" v-model.lazy="articleData.metaData.title">
						</div>
						<div class="form-group file-group">
							<label for="upload">Upload Images</label>
							<div class="file-controls">
								<input type="file" accept="image/*" id="filename" name="filename" class="file-button" @change="handleFileChange">
								<button @click="uploadImage">Upload</button>
							</div>
							<!-- <div class="fileurls">
								<ol class="url-list">
									<li class="fs-note" v-for="imageUrl in publicImageUrlList">{{ imageUrl }}</li>
								</ol>
							</div> -->
						</div>
						<div class="form-group preview-group">
							<label for="title">Preview Image</label>
							<select name="preview-image" id="preview-image" class="select" v-model="articleData.metaData.previewImage">
								<option disabled value="">Select a preview image</option>
								<option v-for="(imageUrl, index) in publicImageUrlList" :key="index" :value="imageUrl">
									{{ imageUrl }}
								</option>
							</select>
						</div>
					</div>
					<div class="description-meta">
						<div class="form-group description-group">
							<label for="description">Description</label>
							<textarea name="description" id="description" v-model.lazy="articleData.metaData.description"></textarea>
						</div>
					</div>
				</div>
				<div class="form-controls">
					<router-link class="test-articles" :to="{name: 'list-articles'}">Articles</router-link>
					<button :disabled="isInvalid || !isSaved" class="submit">Submit</button>
				</div>
			</form>
			<div class="image-library">
				<h2>Image Library</h2>
				<p>Click on an image to copy image source to clipboard.</p>
			</div>
			<div v-if="articleStore.latestBlobs.length > 0" class="image-preview">
				<li v-for="image in articleStore.latestBlobs" :key="image.name" class="image-card">
					<img :src="image.publicImageUrl" alt="Uploaded asset" @click="handleImageClick"/>
				</li>
			</div>
		</main>
	</div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUpdated } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useGeneralStore } from '@/stores/appStore'
import { MdEditor } from 'md-editor-v3'
import { v4 as uuidv4 } from 'uuid'
import 'md-editor-v3/lib/style.css'

const articleStore = useGeneralStore()

const isSaved = ref(false)
const isInvalid = computed(() => {
  return articleData.metaData.authorName.trim() === '' || articleData.metaData.title.trim() === '' || articleData.metaData.description.trim() === '';
});

// capturing editor values

const editorContent = ref('')
const contentToSubmit = ref('')

// update editorContent (v, h) could pass h for html as well

const handleSave = async (v, h) => {
	articleData.content = v
	console.log("saving...", v)
	isSaved.value = true
	return "Saved Markdown"
}

// store interface to to call postMkdToStorage

const articleData = reactive(
	{ 
		content: '',
		metaData: {
			authorName: '',
			title: '',
			description: '',
			date: new Date().toISOString(),
			previewImage: ''
		},
		articleId: uuidv4(),		
	});


const handleSubmit = async () => {
	if(!articleData.content || !articleData.content.trim()) {
		console.error("Markdown content is empty")
		return
	}
	await articleStore.callUploadMkd(articleData)
	console.log("template:", articleData)
}

// Image uploading .................................................................
// upload image directly to storage container

const selectedFile = ref(null)
const uploadedImageUrl = ref('')
const publicImageUrlList = ref([])

const handleFileChange = (event) => {
	selectedFile.value = event.target.files[0]
}

const uploadImage = async () => {
	if(!selectedFile.value) return

	try {
		await articleStore.callGetSASUrl(selectedFile.value.name, selectedFile.value.type)

		await fetch(articleStore.sasUploadUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': selectedFile.value.type,
        		'x-ms-blob-type': 'BlockBlob' // Required by Azure
			},
			body: selectedFile.value
		})

		uploadedImageUrl.value = articleStore.sasImageUrl
		publicImageUrlList.value.push(articleStore.ImageUrl)
		console.log(uploadedImageUrl.value)
		console.log(articleStore.ImageUrl)

		console.log('image succesfully uploaded')
		articleStore.callGetBlobs('image-files')

	} catch(err){
		console.error('upload failed: ', err)
	}

}

const handleImageClick = async (event) => {
	console.log(event.target.src)
	const imgSrc = event.target.src;
  
	try {
	await navigator.clipboard.writeText(imgSrc);
	alert('Image source copied to clipboard:');
	} catch (err) {
	console.error('Failed to copy: ', err);
	}
}

onMounted(async () => {
	articleStore.callGetBlobs('image-files')
})



</script>

<style scoped>

.fluid-grid-container{
	max-width: var(--grid-max-width-A);
  	padding-inline: var(--grid-gutter-A);
  	margin-inline: auto;


}

.dashboard-container{
	display: grid;
	grid-template-columns: repeat(var(--grid-columns), minmax(0, 10rem));
	grid-template-rows: auto auto auto;
	justify-items: center;
	column-gap: var(--grid-gutter);
	row-gap: 2rem;
	min-height: 100vh;
	margin-block: 1rem;

	.markdown-container{
		grid-column: 1 / -1;
		height: 75vh;

	}
	
	.form{
		grid-column: 4 / 10;
		display: grid;
		gap: 2rem;
		padding: 2rem;
		background: var(--young-orange-0);
		border: .5px solid var(--young-orange-4);
		border-radius: 15px;

		.form-fields{
			display: grid;
			grid-template-columns: repeat(12, 1fr);

			.article-meta,
			.description-meta{
				display: grid;
				grid-template-columns: subgrid;
				grid-column: 1 / -1;
			}

			.description-meta{
				margin-top: 4ch;
			}

			.form-group{
				display: grid;
				grid-column: 2 / span 10;
				/* margin-bottom: 2ch; */

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
				
				textarea{
					border: 1px solid var(--deepslate-0);
					border-radius: 6px;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
				}
			}

			.form-group:not(:last-of-type){
				margin-bottom: 2ch;
			}

			.file-group{

				label{
					margin-bottom: 1ch;
				}

				justify-self: center;
				margin-bottom: 0;

				.file-controls{
					display: flex;
					align-items: center;
					justify-content: space-around;

					input{
						max-width: 75%;
						margin-inline: 0;
						padding-inline: 0;
					}
				}

				input{
					border: none;
				}
			}

			.preview-group{

				label{
					margin-bottom: 1ch;
				}

				.select{
					appearance: none;
  					-webkit-appearance: none;
  					-moz-appearance: none;

					width: 100%;
					max-width: 500px;
					padding: 12px 40px 12px 16px; /* Extra right padding prevents text overlapping the arrow */
					font-size: .75rem;
					color: var(--teak);
					cursor: pointer;
					
					/* Visual styling */
					background-color: #ffffff;
					border: 1px solid var(--deepslate-0);
					border-radius: 6px;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
				}
			}
		}
		
		.form-controls{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

	}

	.image-library{
		grid-column: 4 / 10;
		text-align: center;
	}

	.image-preview{
		grid-column: 4 / 10;
		display: grid;
		grid-auto-flow: dense;
  		grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
		justify-items: center;
		gap: 1rem;
		/* margin-top: 1rem; */
		max-width: 1900px;

		img{
			width: 200px;
			height: 200px;
			object-fit: cover;
			cursor: pointer;
		}

	}

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

	button:disabled{
		background: var(--deepslate-1);
		color: var(--young-orange-0);
		cursor: not-allowed;
	}

	button.submit{
		justify-self: end;
	}

	input[type="file"]::file-selector-button {
		background: var(--deepslate-6);
		color: var(--young-orange-2);
		border: 0;
		border-radius: 6px;
		font-size: var(--fs-600);
		cursor: pointer;
		padding: .5rem;
		margin-right: 2ch;
	}


}

</style>