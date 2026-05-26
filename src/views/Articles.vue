<template>

	<main class="article-grid">
		<div class="article">
			<h2>Article Title</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
			Non odit dignissimos quasi culpa est. Quae molestiae amet sapiente, ex ut pariatur? Sequi officiis obcaecati quod.</p>
		</div>
	</main>

</template>

<script setup>

</script>

<style scoped>

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

.article{
	display: grid;
}

</style>