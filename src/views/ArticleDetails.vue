<template>
	<main v-if="!articleStore.isMkdLoading" class="article-grid">
		<section class="full-width article-info">
			<div class="full-width-left js-center">
				<h2 class="article-author">{{ articleStore.articleMeta?.author }}</h2>
				<p>{{ formatDate(articleStore.articleMeta?.date) }}</p>
			</div>
			<div class="full-width-content as-start js-start">
				<h1 class="article-title">{{ articleStore.articleMeta?.title }}</h1>
			</div>
		</section>
		<div v-html="htmlContent" class="markdown-container"></div>
		<div class="response-divider"></div>
		<section class="comment-section">
			<h2 class="title" v-if="comments">Comments</h2>
			<ol v-for="comment in articleStore.articleComments" :key="comment.commentId" class="comment-list" v-if="comments">
				<li class="comment">
					<div class="content-container">
						<div class="comment-info">
							<p class="author fs-note">{{ comment.authorName }}</p>
							<p class="date fs-note">{{ formatDate(comment.postDate) }}</p>
						</div>
						<div class="comment-content">
							<p>{{ comment.content }}</p>
						</div>
					</div>
				</li>
			</ol>
			<div class="response-container">
				<h2 class="form-title">Leave a Comment</h2>
				<div class="form-container">	
					<form @submit.prevent="handleSubmit" class="form">
						<div class="form-fields">
							<div class="comment-content">
								<div class="form-group comment-group">
									<label for="description">Comment</label>
									<textarea name="comment" required id="comment" v-model.lazy="commentData.content"></textarea>
								</div>
							</div>
							<div class="author-info">
								<div class="form-group name-group">
									<label for="name">Name</label>
									<input type="text" required id="name" name="author_name" v-model.lazy="commentData.authorName">
								</div>
								<div class="form-group title-group">
									<label for="title">Email</label>
									<input type="email" required id="email" name="author_email" v-model.lazy="commentData.authorEmail">
								</div>	
							</div>
						</div>
						<div class="form-controls">
							<div class="btn-container">
								<button :disabled="isInvalid" class="submit">Post Comment</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	</main>
</template>

<script setup>

import { ref, computed, reactive, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useGeneralStore } from '@/stores/appStore'
import { v4 as uuidv4 } from 'uuid'
import { formatDate } from '@/composables/formatDate'

const props = defineProps({
	id: String
})

// current article refs

const articleStore = useGeneralStore()
const htmlContentLoading = ref(true)
const htmlContent = ref('')

// comment related refs and reactive data

const comments = computed(() => articleStore.articleComments.length > 0)

const isInvalid = computed(() => {
  return commentData.authorName.trim() === '' || commentData.content.trim() === '' || commentData.authorEmail.trim() === '';
});

const commentData = reactive(
	{
		commentId: uuidv4(),
		content: '',
		authorName: '',
		authorEmail: '',
		postDate: new Date().toISOString()
	}
)

const handleSubmit = async () => {
	if(!commentData.content.trim() || !commentData.authorName || !commentData.authorEmail) {
		console.error("Comment information is missing required information")
		return
	}

	await articleStore.callUploadComment(commentData, props.id)
	await articleStore.callGetComments(props.id)


	commentData.content = ''
	commentData.authorName = ''
	commentData.authorEmail = ''
	commentData.postDate = ''

}

onMounted(async () => {
	
	await articleStore.callGetMkd(props.id)
	htmlContent.value = articleStore.htmlFromMkdFile
	htmlContentLoading.value = articleStore.isMkdLoading

	await articleStore.callGetComments(props.id)
	// console.log("Article:", articleStore.articleComments[0].authorEmail)

})


</script>

<style scoped>

/* core styles and typography */

ol li{
	line-height: 1.5;
	list-style-type: decimal-leading-zero;
	margin-bottom: 1.5ch;
}

ol li::marker{
	font-size: var(--fs-700);
	font-weight: 200;
}

section img{
	border-radius: 3px;
	justify-self: center;
}

h2{
	font-weight: 500;

	&:not(.article-author){
		margin-bottom: 1ch;
	}
}

/* utility layout classes */

.article-grid > .breakout {
	grid-column: breakout;
}

.article-grid > .full-width{
	grid-column: full-width-start / content-end;
	display: grid;
	grid-template-columns: subgrid;
	

	div {
		display: grid;
	}
}

.full-width-left{
	grid-column: full-width-start / content-start;

	&.js-start{
		justify-self: start;
	}

	&.js-center{
		justify-self: center;
	}

	&.js-end{
		justify-self: end;
	}

	&.as-start{
		align-self: start;
	}

	&.as-center{
		align-self: center;
	}

	&.as-end{
		align-self: end;
	}
}

.full-width-content{
	grid-column: content;

	&.js-start{
		justify-self: start;
	}

	&.js-center{
		justify-self: center;
	}

	&.js-end{
		justify-self: end;
	}

	&.as-start{
		align-self: start;
	}

	&.as-center{
		align-self: center;
	}

	&.as-end{
		align-self: end;
	}
}

/* Core Layout */

.article-grid{

	--padding-inline: 2rem;
	--content-max-width: 80ch;
	--breakout-max-width: 95ch;

	--breakout-size: calc((var(--breakout-max-width) - var(--content-max-width)) / 2);

	display: grid;
	grid-template-columns: 
		1em [full-width-start] minmax(var(--padding-inline), 1fr) [breakout-start] minmax(0, var(--breakout-size)) 
		[content-start] min(100% - (var(--padding-inline) *2), var(--content-max-width)) [content-end] minmax(0, var(--breakout-size))
		[breakout-end] minmax(var(--padding-inline), 1fr) [full-width-end] 1em;
	grid-template-rows: max-content;
	align-content: start;
	margin-top: 2em;
	
}

.article-grid > *{
	grid-column: content;
}

/* article layout */

.article-info{
	border-bottom: .5px solid var(--teak);

	.full-width-left {

		.article-author{
			font-weight: 500;
		}
		
		@media(width <= 1366px) {
			grid-row: 1;
			grid-column: 4 / 5;
			justify-self: end;
		}
	}

	.article-title{
		font-size: var(--fs-1000);
		font-weight: 200;
	}

	.full-width-content{
		@media(width <= 1366px) {
			grid-row: 1;
			grid-column: 2 / 3;
			justify-self: center;
		}
	}

}

.full-width.article-info{
	@media(width <= 1366px) {
		grid-column: 4 / 5;
		grid-template-columns: auto auto 1fr;
	}
}

/* markdown container and children styling */

.markdown-container > * + * {
	margin-block-start: var(--markdown-flow, 1em);
}

.markdown-container{
	display: grid;
	margin-top: 2ch;

	&:deep(h1){
		font-size: var(--fs-800);
	}

	&:deep(h2){
		font-size: var(--fs-700);
	}

	&:deep(h2),
	&:deep(h1){
		font-weight: 400;
		text-transform: capitalize;
		line-height: 1.3;
		/* margin-block: .5ch; */
	}

	&:deep(p){
		line-height: 1.4;
	}

	&:deep(p):not(:has(+ h1, + h2)) {
		/* margin-bottom: 1ch; */
	}

	&:deep(li){
		/* line-height: 1.5; */
		list-style-type: decimal-leading-zero;
		/* margin-bottom: 1.5ch; */
	}

	&:deep(img){
		max-width: 600px;
		object-fit: cover;
		justify-self: center;
	}
}

.response-divider{
	height: 6px;
	width: 100%;
	margin-top: var(--space-xl);
	border: .5px solid var(--accent-1);
	border-radius: 8px;
	box-shadow: 1px 1px 15px 2px hsla(28, 80%, 50%, .15);

}

.comment-section{

	margin: var(--space-xl) 0;


	ol li{
		line-height: 1.5;
		list-style-type: none;
		margin-bottom: 1.5ch;
	}

	.title{
		text-align: center;

	}

	.comment-list{
		margin: 0;
		padding: 0;

		.comment{
			border-top: 1px solid var(--teak);
			margin-right: 1rem;

			.content-container{
				display: grid;
				grid-template-columns: 25% 1fr;

				.comment-info{

				}

				.comment-content{
					background: var(--young-orange-0a);
					border-radius: 1rem;

					p{
						padding: 1rem;
					}

				}
			}
		}

	}

	.response-container{

		margin-top: var(--space-xl);

		.form-title{
			text-align: center;
		}

		.form-container{

			display: grid;
			grid-template-columns: repeat(var(--grid-columns), 1fr);
			background: var(--surface-3);
			padding: 2rem;
			border-radius: 8px;
		

			.form{
				
				display: grid;
				grid-column: 2 / 12;
				gap: 2rem;
				padding: 2rem;
				background: var(--surface-3);

				.form-fields{
					display: grid;
					grid-template-columns: repeat(12, 1fr);
					margin-bottom: 2ch;

					.comment-content,
					.author-info{
						display: grid;
						grid-template-columns: subgrid;
						grid-column: 1 / -1;
					}

					.comment-content {
						margin-bottom: 2ch;
					}

					.form-group{
						display: grid;
						grid-column: 2 / span 10;
						
						label{
							margin-bottom: 1ch;
						}

						input{
							border: 1px solid var(--deepslate-0);
							border-radius: 6px;
							box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
						}

						textarea{
							box-sizing: content-box;
							height: 6lh;
							margin-top: 1rem;
						}

						input, 
						textarea{
							border: 1px solid var(--deepslate-0);
							border-radius: 6px;
							box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
							padding: .5em 1em;

						}
						
					}

					.form-group:not(:last-of-type){
						margin-bottom: 2ch;
					}
				}
				
				.form-controls{
					display: grid;
					grid-template-columns: repeat(12, 1fr);

					.btn-container{
						grid-column: 2 / span 10;
						display: flex;
						justify-content: end;
					}
				}

			}
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

}


</style>