<template>
	<main class="login-success">
		<h1>You are logged in</h1>
		<a href="/.auth/logout/google?post_login_redirect_uri=https://cedricedric.net">Login</a>
	</main>
</template>

<style scoped>

main{
	min-height: 100vh;
}

.login-success{
	display: grid;
	place-content: center;

	h1{
		margin: auto;
	}
}

</style>