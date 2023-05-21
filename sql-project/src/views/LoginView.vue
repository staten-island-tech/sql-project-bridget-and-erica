<template>
	<h1>Login</h1>
	<div class="inputs">
		<label for="email">Email:</label>
		<input type="email" id="email" v-model="email">
		<label for="password">Password:</label>
		<input type="password" id="password" v-model="password">
	</div>
	<p class="message">{{ message }}</p>
	<div class="buttons">
		<button @click="create">Create Account</button>
		<button @click="login">Login</button>
	</div>
</template>
  
<script setup>
import { ref } from "vue";
import { supabase } from "../clients/supabase";

//makes the elements reactive
let email = ref("");
let password = ref("");
let message = ref("");

async function create() {
	try {
		if (!email.value || !password.value) {
			message.value = "Please provide both your email and password.";
			return;
		}
		const { user, error } = await supabase.auth.create({
			email: email.value,
			password: password.value,
		});
		if (error) {
			console.error(error);
		} else {
			console.log(user);
			message.value = "Sign-up successful!";
		}
	} catch (err) {
		message.value = "Error signing up";
		console.log(err);
	}
}

async function login() {
	try {
		if (!email.value || !password.value) {
			message.value = "Please provide both your email and password.";
			return;
		}
		const { user, error } = await supabase.auth.signIn({
			email: email.value,
			password: password.value,
		});
		if (error) {
			console.error(error);
		} else {
			console.log(user);
			message.value = "Login successful!";
		}
	} catch (err) {
		message.value = "Error logging in";
		console.log(err);
	}
}

</script>
  
<style scoped>

.inputs {
	display: flex;
	flex-direction: column;
}
input {
	font-size: 1.5rem;
}

.buttons {
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
}

button {
	margin-bottom: 1em;
	padding: 1em 2em 1em 2em;
}
</style>
  