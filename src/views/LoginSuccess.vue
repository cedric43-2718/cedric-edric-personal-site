<template>
	<main class="login-success">
		<h1>You are logged in</h1>
		<p>Welcome to the article creation part of this site. The Markdown editor allows you to create new articles and upload images you might want to include. 
		Article content will be posted to a backend storage container and then displayed in the Articles section of this site.</p>
		<a href="https://cedricedric.net/.auth/logout?post_logout_redirect_uri=https://cedricedric.net">Logout</a>
		<router-link :to="{name: 'edit-articles'}">Markdown Editor</router-link>
		<div v-if="generalStore.showAuthMessage" class="auth-error">
				<p>You need to have the site editor role added to your authorization profile. Contact Jason to get access.</p>
		</div>
	</main>
</template>

<script setup>

import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getUserInfo } from '@/composables/getAuthInfo'
import { useGeneralStore } from '@/stores/appStore'

const route = useRoute()
const generalStore = useGeneralStore()

onMounted(async () => {
	await generalStore.callGetCsv('jrudokas@gmail.com', 'editor')
	console.log(generalStore.userRoleExists)
})

</script>

<style scoped>

main{
	min-height: 100vh;
	margin: auto;
}

.login-success{
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;
	align-content: center;
	justify-items: center;
	max-width: 50rem;

	h1{
		margin: auto;
	}
}

.auth-error{
	padding: 1rem;
	border: 1px solid var(--monza-7);
	background: hsla(12, 98%, 50%, .2);
	border-radius: 10px;
	margin: auto;

	p{
		color: var(--deepslate-8);
		text-align: center;
	}
}

a{
	text-decoration-line: underline;
	text-decoration-color: var(--young-orange-4);
	text-decoration-style: double;
	text-decoration-thickness: .5px;
	text-underline-offset: 2px;
	margin-bottom: 1rem;
}

a:is(:hover){
	color: var(--old-orange-3);
}

</style>