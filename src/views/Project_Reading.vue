<template>
	<main class="reading-layout">
		<div class="s-1-color"></div>
		<div class="subject s-1">
			<p class="subject-title">Science</p>
			<span>&</span>
			<p class="subject-title">Computation</p>
		</div>
		<div class="articles-grid ag-1">
			<ul class="articles-list">
				<li class="article-title">A Mathematical Theory of Computation
					<ul class="article-info">
						<li>Shannon, Claude E.</li>
						<li>1948</li>
					</ul>
				</li>
				<li class="article-title">On the Decrease of Entropy in a Thermodynamic System by the Intervention of Intelligent Beings
					<ul class="article-info">
						<li>Szilard, Leo</li>
						<li>1929</li>
					</ul>
				</li>
				
			</ul>
		</div>
		<div class="s-2-color"></div>
		<div class="subject s-2">
			<p class="subject-title">Economics</p>
		</div>
		<div class="articles-grid ag-2">
			<ul class="articles-list">
				<li class="article-title">Political Aspects of Full Employment
					<ul class="article-info">
						<li>Kalecki, Michal</li>
						<li>1943</li>
					</ul>
				</li>
				<li class="article-title">Increasing Returns and Economic Geography
					<ul class="article-info">
						<li>Krugman, Paul</li>
						<li>1991</li>
					</ul>
				</li>
				<li class="article-title">The Two Growth Rates of the Economy
					<ul class="article-info">
						<li>Adamou, A., Berman, Y., Peters, O.</li>
						<li>2020</li>
					</ul>
				</li>
				<li class="article-title">The Ergodicity Problem in Economics
					<ul class="article-info">
						<li>Peters, Ole</li>
						<li>2019</li>
					</ul>
				</li><li class="article-title">The Role of Entropy in the Development of Economics
					<ul class="article-info">
						<li>Jakimowicz, Aleksander</li>
						<li>2020</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="s-3-color"></div>
		<div class="subject s-3">
			<p class="subject-title">Climate</p>
			<span>&</span>
			<p class="subject-title">Energy</p>
		</div>
		<div class="articles-grid ag-3">
			<ul class="articles-list">
				<li class="article-title">Global Warming of 1.5 &deg;C
					<ul class="article-info">
						<li>The Intergovernmental Panel on Climate Change</li>
						<li>2018</li>
					</ul>
				</li>
				<li class="article-title">Trajectories of the Earth System in the Anthropocene
					<ul class="article-info">
						<li>Steffen, Will, et al.</li>
						<li>2018</li>
					</ul>
				</li>
				<li class="article-title">Pathways Study: Evaluation of Pathways to a Future Grid
					<ul class="article-info">
						<li>Analysis Group, Inc.</li>
						<li>2022</li>
					</ul>
				</li>
				<li class="article-title">Time for a Market Upgrade? A Review of Wholesale Electricity Market Designs for the Future
					<ul class="article-info">
						<li>Resources for the Future</li>
						<li>2024</li>
					</ul>
				</li><li class="article-title">Clean, Reliable, Affordable: The Value of Multi-Day Storage in New England
					<ul class="article-info">
						<li>Form Energy</li>
						<li>2023</li>
					</ul>
				</li>
				<li class="article-title">Economics of Grid-Scale Energy Storage in Wholesale Electricity Markets
					<ul class="article-info">
						<li>Karaduman, Ömer</li>
						<li>2021</li>
					</ul>
				</li><li class="article-title">Resource Adequacy for the Energy Transition: A Critical Periods Reliability Framework and its Applications in Planning and Markets
					<ul class="article-info">
						<li>Energy + Environmental Economics</li>
						<li>2025</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="s-4-color"></div>
		<div class="subject s-4">
			<p class="subject-title">Mathematics</p>
			<span>&</span>
			<p class="subject-title">Forecasting</p>
		</div>
		<div class="articles-grid ag-4">
			<ul class="articles-list">
				<li class="article-title">Forecasting at Scale
					<ul class="article-info">
						<li>Taylor, S. J., Letham, B.</li>
						<li>2017</li>
					</ul>
				</li>
				<li class="article-title">Short-term load forecasting based on a semi-parametric additive model
					<ul class="article-info">
						<li>Fan, S., Hyndman, R. J.</li>
						<li>2010</li>
					</ul>
				</li>
				<li class="article-title">Density Forecasting for Long-Term Peak Electricity Demand
					<ul class="article-info">
						<li>Hyndman, R. J., Fan, S.</li>
						<li>2009</li>
					</ul>
				</li>
			</ul>
		</div>
	</main>
</template>

<style scoped>

.reading-layout{
	display: grid;
	grid-template-columns: 2rem 20ch 1fr;
	gap: 1rem;
	margin-top: 0;
	margin-bottom: var(--space-m-l);
}

.subject{
	text-align: center;
	margin-top: 2rem;
}

.articles-grid{
	margin-top: 1rem;
}

.subject {
	font-size: var(--fs-tertiary-heading);
	font-weight: var(--fw-semi-bold);
}

.articles-grid{
	--col-count: 2;
	display: grid;
	grid-template-columns: 1rem repeat(var(--col-count), 1fr) 1rem;
	gap: 1rem;
	padding-block: 1rem;
}

.articles-grid > *{
	grid-column: 2 / span 2;
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
}

.articles-list > li{
	font-size: var(--fs-note);
}

.article-info li {
	font-size: var(--fs-small-note);
	list-style: circle;
	line-height: 1.5;
}

.article-info > li::marker{
	color: var(--carrot-4);
	font-size: 20px;
}

.s-1-color{
	grid-row: 1;
	grid-column: 1 / 2;
	margin-top: 2rem;
	background-color: var(--deep-forest);
	opacity: 40%;
}

.s-1{
	grid-row: 1;
	grid-column: 2 / 3;
}

.ag-1{
	grid-row: 1;
	grid-column: 3 / 4;
}

.s-2-color{
	grid-row: 2;
	grid-column: 1 / 2;
	margin-top: 2rem;
	background-color: var(--lemon-burst-2);
	opacity: 40%;
}

.s-2{
	grid-row: 2;
	grid-column: 2 / 3;
}

.ag-2{
	grid-row: 2;
	grid-column: 3 / 4;
}

.s-3-color{
	grid-row: 3;
	grid-column: 1 / 2;
	margin-top: 2rem;
	background-color: var(--bluemaine-filter);
}

.s-3{
	grid-row: 3;
	grid-column: 2 / 3;
}

.ag-3{
	grid-row: 3;
	grid-column: 3 / 4;
}

.s-4-color{
	grid-row: 4;
	grid-column: 1 / 2;
	margin-top: 2rem;
	background-color: var(--monza-filter);
}

.s-4{
	grid-row: 4;
	grid-column: 2 / 3;
}

.ag-4{
	grid-row: 4;
	grid-column: 3 / 4;
}

</style>

