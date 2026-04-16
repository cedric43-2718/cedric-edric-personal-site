<template>
<div class="s-2-color" :class="{'section-hilight': isSec2}"></div>
		<div class="subject s-2">
			<p class="subject-title">Economics</p>
		</div>
		<div class="articles-grid ag-2"
			@mouseenter="handleSection2Color"
			@mouseleave="handleSection2Color"
		>
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
		<div class="s-3-color" :class="{'section-hilight': isSec3}"></div>
		<div class="subject s-3">
			<p class="subject-title">Climate</p>
			<span>&</span>
			<p class="subject-title">Energy</p>
		</div>
		<div class="articles-grid ag-3"
			@mouseenter="handleSection3Color"
			@mouseleave="handleSection3Color"
		>
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
		<div class="s-4-color" :class="{'section-hilight': isSec4}"></div>
		<div class="subject s-4">
			<p class="subject-title">Mathematics</p>
			<span>&</span>
			<p class="subject-title">Forecasting</p>
		</div>
		<div class="articles-grid ag-4"
			@mouseenter="handleSection4Color"
			@mouseleave="handleSection4Color"
		>
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
</template>

<style>
.s-2-color{
	grid-row: 2;
	grid-column: 1 / 2;
	margin-top: 2rem;
	background-color: var(--lemon-burst-2);
	/* opacity: 40%; */
	transition: background-color .5s ease-in-out;
	border-radius: 0 8px 8px 0;
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
	transition: background-color .5s ease-in-out;
	border-radius: 0 8px 8px 0;
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
	transition: background-color .5s ease-in-out;
	border-radius: 0 8px 8px 0;
}

.s-4{
	grid-row: 4;
	grid-column: 2 / 3;
}

.ag-4{
	grid-row: 4;
	grid-column: 3 / 4;
}

.s-2-color.section-hilight{
	background-color: var(--lime-3);
	filter: saturate(1.5);
}

.s-3-color.section-hilight{
	background-color: var(--lime-3);
	filter: saturate(1.5);
}

.s-4-color.section-hilight{
	background-color: var(--lime-3);
	filter: saturate(1.5);
}


</style>