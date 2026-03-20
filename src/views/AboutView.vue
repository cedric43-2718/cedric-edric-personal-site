<template>
	
	<main>
		<div class="info">
			<img class="photo" src="../assets/images/JRPic.jpg" alt="Picture of Jason">
		</div>
		<div class="flow">
			<div class="wrapper">
				<h2>Education</h2>
				<p>When I encounted ways to bring partial equilibrium systems into a general framework while studying economics at The University of New Hampshire
				- using tools like IS-LM - I realized that a deep interest of mine was building models of complex systems. The language of model building and dynamics being mathematics I decided to 
				pursue a second undergraduate degree in mathematics with a concentration in statistics. Complexity and dynamic systems remained an interest throughout college and does
				so to this day. At any rate after finishing my math and econ undergraduate degrees I completed a graduate degree in economics. 
				College was great - a deeply enriching experience. Learning has remained an ever present source of motivation for me.
				</p>
			</div>

			<div class="wrapper">
				<h2>Energy Policy & Modeling</h2>
				<p>Near the end of my graduate work I was involved with a research project in collaboration with the organization 
				<a href="https://www.nescaum.org/" target="_blank" rel="noopener noreferrer">Northeast States for Coordinated Air Use Management</a> (NESCAUM). After the project was 
				finished NESCAUM offered me a position as an energy system modeler and policy analyst. I spent 12 very fufilling years at NESCAUM 
				building energy and air quality modeling tools to help States develop climate and air quality policies. The position cultivated 
				in me a lifelong fascination with how analytical frameworks can be developed to model the physical and economic dynamics of 
				complex energy systems and provide valuable insights both for providing reliable energy services on a minute by minute 
				basis and for formulating long term energy and climate policies.
				</p>
			</div>

			<div class="wrapper">
				<h2>Climate Activisim</h2>
				<p>Most of the work I was doing at NESCAUM was related to developing clean technology deployment pathways consistent net zero decarbonization 
				goals. Needless to say we were then and still are today very far from decarbonization trajectories that are <a href="https://www.ipcc.ch/report/ar6/wg3/figures/summary-for-policymakers/figure-spm-5/" target="_blank" rel="noopener noreferrer">consistent</a>
				with limiting global temperature increase to 1.5 or 2 degrees C over the next 75 years. I began to follow the  
				work the IPCC was doing to track our progress towards limiting global temperature - especially <a href="https://www.ipcc.ch/sr15/" target="_blank" rel="noopener noreferrer">The Special Report</a> on 1.5 
				degrees C. I felt more and more pulled towards chaneling my energy into helping to make people aware of the alarming implications of the
				trajectory our climate system is on. So I switched gears in my life and joined up with a group of friends to help build <a href="https://xrboston.org/" target="_blank" rel="noopener noreferrer">Extinction Rebellion Boston</a> as
				the coordinator of the Art and Design Team. This was some of the most interesting and fufilling work of my life.  
				</p>
			</div>
			
			<div class="wrapper">
				<h2>Website</h2>
				<p>I started learning about building websites during the pandemic and I've been dabbling with various projects ever since. 
				It's about time I've got one of these pushed live. This site is 
				built entirely using <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue 3</a> in the composition dialect. The layout and design is all custom css. The current site is a 
				Single Page Application that uses client side routing. A few notable integrations are <a href="https://css-doodle.com/" target="_blank" rel="noopener noreferrer">css-doodle</a> 
				and <a href="https://observablehq.com/plot/" target="_blank" rel="noopener noreferrer">Observable Plot </a>. My plan is to recast this project into a Nuxt site that includes a blogging feature
				using Nuxt/Content and also incorporates some features that rely on server side rendering. The testing I've done with Nuxt so far makes me really excited to continue exploring this meta-framework.
				</p>
			</div>
			<div class="wrapper">
				<h2>Programing</h2>
				<p>I've loved programming since I learned logo as a kid in elementary school. I'm not a software engineer, but I love 
				writing programs to solve analytical problems and design websites. This	is a list of languages and frameworks that I use in my professional work and personal projects on a daily basis.
				<ul>
					<li>R</li>
					<li>Python</li>
					<li>SQL - Postgres, SQL Server</li>
					<li>Apache Spark / Databricks</li>
					<li>Javascript - Vue</li>
					<li>CSS</li>
				</ul>
				</p>
			</div>


		</div>

	</main>
	
</template>

<script setup>

import { ref } from 'vue'

</script>

<style scoped>


main{

	display: grid;
	grid-template-columns: 2.5em var(--space-3xl) 1fr;
	/* place-items: center; */
	margin: 2rem 0;

	.info{

		display: grid;
		grid-column: 2 / span 1;
		height: 100%;
		

		.photo{
			height: var(--space-3xl);
			width: var(--space-3xl);
			border-radius: 50%;
			border: 1px solid black;

		}
	}

	.flow {
		display: grid;
		grid-column: 3 / span 1;

		.wrapper{
			--element-max-width: var(--fluid-400-1000);
		}
	}


}

p > a {
	text-decoration-line: underline;
  	text-decoration-color: var(--carrot-4);
  	text-decoration-style: double;
  	text-decoration-thickness: .5px;
  	text-underline-offset: 2px;
}

ul li {
	list-style: circle;
}

ul > li::marker{
	color: var(--carrot-4);
	font-size: 20px;
}

</style>