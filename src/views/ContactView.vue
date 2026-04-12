<template>

	<main class="contact">
		<div class="form-container">
			
			<h1>Contact Me</h1>

			<form>
				<div class="form-group">
					<label for="f-name">First Name</label>
					<input type="text" required id="f-name" name="first_name">
				</div>

				<div class="form-group">
					<label for="l-name">Last Name</label>
					<input type="text" required id="l-name" name="last_name">
				</div>

				<div class="form-group grid-full-span">
					<label for="email">Email</label>
					<input type="email" required id="email" name="email">
				</div>

				<div class="form-group grid-full-span">
					<label for="message">Message</label>
					<textarea name="message" id="message" required></textarea>
				</div>

				<button class="grid-full-span">Submit</button>
			</form>
		</div>
	</main>
</template>


<style scoped>

main{
	display: grid;
	grid-template-rows: 15vh 1fr 25vh;
	grid-template-columns: repeat(2, 1fr);
	/* justify-items: center; */
}

.grid-full-span{
	grid-column: 1 / -1;
}

.form-container{
	grid-row: 2;
	grid-column: 1;
	padding: 2rem;
	background: var(--young-orange-0);
	border: .5px solid var(--young-orange-4);
	border-radius: 15px;
	max-inline-size: 800px;
	/* margin-inline: auto; */
	justify-self: center;
	margin-block: auto;

	h1{
		margin-bottom: 2rem;
		font-weight: 400;
		letter-spacing: 5px;
	}

	form{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;

	/* @media(width < 800px){
		grid-template-columns: 1fr;
	} */
  }

  .form-group{
	display: grid;
  }

  input{
	background: var(--young-orange-0);
  }

  textarea{
	box-sizing: content-box;
	height: 6lh;
	margin-top: 1rem;
  }

  input, 
  textarea{
	border: none;
	outline: none;
	border-bottom: 1px solid var(--deepslate-6);
	padding: .5em 1em;

	&:focus-visible{
		border-bottom: 2px solid var(--lime-7);
	}
  }

  button{
	justify-self: end;
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

}

</style>