<template>
	<main class="cooking-layout">
		<div class="project">
			<div class="project-info">
				<h2 class="project-title fs-secondary-heading">Pita Bread</h2>
				<div class="project-items">
					<p class="tools"><span>Tools:</span> Large Bowl, Medium Bowl, Plastic Bench Scraper</p>
					<ul class="ratios">
						<li><span>Flour:</span> 530g - 540g</li>
						<li><span>Water:</span> 385g - 390g</li>
						<li><span>Others:</span> Salt, Yeast, Olive Oil, Honey</li>
					</ul>
				</div>
				<p>I've been making this once a week for the past 3 years. It can ferment in the fridge for days - one to two is best - so the workflow is easy to integrate into a day. This has a great floavor and structure. I love the Angel brand Pita, but this is better.</p>
			</div>
			<div class="project-images">
				<!-- <img src="../assets/images/pita3.jpeg" alt=""> -->
				<img src="../assets/images/pita2.jpeg" alt="">
				<img src="../assets/images/pita1.jpeg" alt="">
			</div>
		</div>
		<div class="project">
			<div class="project-info">
				<h2 class="project-title fs-secondary-heading">Chocolate Babka</h2>
				<div class="project-items">
					<p class="tools"><span>Tools:</span> Large Bowl, Medium Bowl (2), Plastic Bench Scraper, Sharp Knife 8"</p>
					<ul class="ratios">
						<li><span>Flour:</span> 750g</li>
						<li><span>Water:</span> 240g - 260g</li>
						<li><span>Butter:</span> 142g</li>
						<li><span>Others:</span> 2 Eggs, Yeast, Sugar, Dry Milk, Cinnamon, Vanilla, Filling Ingredients</li>
					</ul>
				</div>
				<p>I've been wanting to make one of these since my brother sent me one from NYC on my birthday a couple years ago</p>
			</div>
			<div class="project-images">
				<img src="../assets/images/Babka0.jpeg" alt="">
				<img src="../assets/images/Babka1.jpeg" alt="">
				<img src="../assets/images/Babka2.jpeg" alt="">
			</div>
		</div>
	</main>
</template>

<script setup>

</script>


<style scoped>

main{
	margin-top: 0;
	margin-bottom: 4rem;
}

.cooking-layout{
	--col-count: 8;
	display: grid;
	grid-template-columns: minmax(1rem, 1fr) repeat(var(--col-count), minmax(0, 10rem)) minmax(1rem, 1fr);
	gap: 2rem;
	margin: var(--space-m-l) 0;
}

.project{
	display: grid;
	grid-template-columns: subgrid;
	grid-column: 2 / span 8;
	gap: 1rem;
	padding-block: 1rem;

	.project-info{
		display: grid;
		grid-auto-flow: row;
		grid-column: 1 / span 3;
		gap: 1rem;
		padding-right: 1rem;
		border-right: .5px solid var(--teak);

		.project-items{
			display: grid;
			grid-auto-flow: row;
			gap: .5rem;

			span{
				font-weight: 600;
				color: var(--monza-8);
			}

			ul{
				margin: 0;
				padding: 0;
			}

			> * {
				font-size: var(--fs-note);
			}
		}
	}

	.project-images{
		display: grid;
		justify-items: center;
		grid-column: 4 / 10;
		gap: .5rem;
		padding: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		grid-auto-flow: dense;

		img{
			max-height: 400px;
			/* padding: 0 .5rem; */
		}
	}

}

</style>