<template>
	<footer class="footer">

		<div class="footer-container">
			<div class="footer-layout">
				<div class="footer-logo">
					<router-link :to="{name: 'one'}">
						<h1 class="logo">J</h1>
					</router-link>
					<ul class="social-list">
						<li>
							<a aria-label="linkedin" href="https://www.linkedin.com/in/jason-rudokas-08856610/" target="_blank">
								<svg class="social-icon">
  									<use href="../assets/images/social-icons.svg#linkedin"></use>
								</svg>
							</a>
						</li>
						<li>
							<a aria-label="github" href="https://github.com/cedric43-2718" target="_blank">
								<svg class="social-icon">
  									<use href="../assets/images/social-icons.svg#github"></use>
								</svg>
							</a>
						</li>
						<li>
							<a aria-label="instagram" href="https://www.instagram.com/" target="_blank">
								<svg class="social-icon">
  									<use href="../assets/images/social-icons.svg#instagram"></use>
								</svg>
							</a>
						</li>
					</ul>
				</div>
				<div>
					<nav class="footer-nav fs-secondary-nav">
						<ul>
							<li>
								<router-link :to="{name: 'one'}">One</router-link>
							</li>
							<li>
								<router-link :to="{name: 'about'}">About</router-link>
							</li>
							<li>
								<router-link :to="{name: 'projects'}">Projects</router-link>
							</li>
						</ul>
					</nav>
				</div>
				<div class="footer-info fs-note">
					<span class="name">Jason Rudokas</span>
					<span class="location">Waltham, Massachusetts</span>
					<span class="email">jrudokas@gmail.com</span>
				</div>
			</div>
		</div>
	</footer>
</template>



<style scoped>

.footer{
	margin-top: auto;
	padding: 2rem 0;
	background-color: var(--deepslate-7);
	opacity: .9;
	color: var(--mountain-0);
}

.footer-container{
	--max-width: var(--fluid-640-1600);
	--padding: 1rem;

	width: min(var(--max-width), 100% - (var(--padding) * 2));
	margin-inline: auto;
}

.footer-layout{
	display: grid;
	gap: 1rem;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
}

.footer-logo{

	display: flex;
	flex-direction: column;
	
	& h1 {
		color: var(--goldenrod-2);
		width: max-content;
	}

	& h1:is(:hover, :focus){
		color: var(--mountain-0);
	}
	
}

.social-list{
	padding: 0;
	display: flex;
	gap: .5rem;
}

.social-icon{
	width: 2.5rem;
	aspect-ratio: 1;
	fill: var(--goldenrod-2);
}

.social-list a:is(:hover, :focus) .social-icon{
	fill: var(--mountain-0);
}

.footer-info{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	gap: .5rem;

}


</style>