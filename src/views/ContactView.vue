<template>

	<main class="contact">
		<div class="form-container">
			<div v-if="isSending" class="status sending"></div>
			<div v-if="isSent" class="status sent"></div>
			<div v-if="emailError" class="email-error" style="margin-bottom: 2rem;">
				<p>There was a problem sending your email.</p>
			</div>

			<form @submit.prevent="handleSubmit">
				<div class="form-group">
					<label for="f-name">First Name</label>
					<input type="text" required id="f-name" name="first_name" v-model.lazy="firstName">
				</div>

				<div class="form-group">
					<label for="l-name">Last Name</label>
					<input type="text" required id="l-name" name="last_name" v-model.lazy="lastName">
				</div>

				<div class="form-group grid-full-span">
					<label for="email">Email</label>
					<input type="email" required id="email" name="email" v-model.lazy="email">
				</div>

				<div class="form-group grid-full-span">
					<label for="message">Message</label>
					<textarea name="message" id="message" required v-model.lazy="message"></textarea>
				</div>

				<button :disabled="isInvalid" class="grid-full-span">Submit</button>
			</form>
		</div>
		<div class="message-container">
			<h1>Drop Me A Line!</h1>
			<p>Definately interested in chatting about web design, climate and energy policy, forecasting, baking...
			I'll get back to you soon to keep the conversation going.</p>
			<p>Cheers, Jason</p>
		</div>
	</main>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const message = ref('')

const isSending = ref(false)
const isSent = ref(false)
const emailError = ref(false)

const isInvalid = computed(() => {
  return firstName.value.trim() === '' || lastName.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '';
});

// const formData = reactive(
// 	{ 
// 		email: '',
// 		message: '',
// 		firstName: '',
// 		lastName: ''
// 	});

const handleSubmit = async  () => {
	
	isSending.value = true
	isSent.value = false

	try{
		const response = await fetch("/api/handleContact", {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({firstName: firstName.value, lastName: lastName.value, email: email.value, message: message.value }) 
		})

		const data = await response.json()

		if(response.ok){
			console.log('email sent')
			isSent.value = true
		} else {
			console.log('email failed', data)
		}
	} catch(error) {
		console.error('error sending email', error)
		emailError.value = true
	} finally{
		isSending.value = false
		email.value = ''
		message.value = ''
		firstName.value = ''
		lastName.value = ''
	}

}

</script>


<style scoped>

main{
	display: grid;
	grid-template-rows: 15vh 1fr 25vh;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 1rem;
	
	@media(width < 1100px){
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: 1fr;
		justify-items: center;
		align-items: center;
	}
}

.message-container{
	grid-row: 2;
	grid-column: 2;
	justify-self: center;
	margin-block: auto;
	display: grid;
	justify-items: center;
	gap: 2rem;
	max-inline-size: 600px;
	
	@media(width < 1100px){
		grid-row: 1 / 2;
		grid-column: 1;
		margin-block: unset;
	}

}

.grid-full-span{
	grid-column: 1 / -1;
}

.form-container{
	grid-row: 2;
	grid-column: 1;
	padding: 2rem;
	position: relative;
	background: var(--young-orange-0);
	border: .5px solid var(--young-orange-4);
	border-radius: 15px;
	max-inline-size: 800px;
	/* margin-inline: auto; */
	justify-self: center;
	margin-block: auto;

	@media(width < 1100px){
		grid-row: 2 / 3;
		grid-column: 1;
		margin-bottom: 6rem;
		/* margin-block: unset;  */
	}

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

	button:disabled{
		background: var(--deepslate-1);
		color: var(--young-orange-0);
		cursor: not-allowed;
	}

	.status{
		position: absolute;
		top: 1rem;
		left: 1rem;
		width: 1rem;
		height: 1rem;
		border-radius: 100%;
	}

	.status.sending{
		background: var(--young-orange-4);
	}

	.status.sent{
		background: var(--lime-5);
	}

	.email-error{
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

}

</style>