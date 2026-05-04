<template>
	<main class="login-success">
		<h1>You are logged in</h1>
		<p>This page is here for testing authentication. It's going to become a markdown editor with live preview that can be used to post articles and such to this site over the next few weeks or so.</p>
		<a href="/.auth/logout?post_logout_redirect_uri=https://cedricedric.net">Logout</a>
	</main>
</template>

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

</style>