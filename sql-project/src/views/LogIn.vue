<template>
	<div class="container">
		<h1>Login</h1>
		<div class="inputs">
			<label for="email">Email:</label>
			<input type="email" id="email" v-model="email">
			<label for="password">Password:</label>
			<input type="password" id="password" v-model="password">
		</div>
		<p class="message">{{ message }}</p>
		<div class="buttons">
			<button @click="login">Login</button>
			<p>Don't have an account yet? Create one here!</p>
			<router-link class="createAccount" to="/SignUp">Create Account</router-link>
		</div>
	</div>
</template>
	
<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { supabase } from "../clients/supabase";

let email = ref("");
let password = ref("");
let message = ref("");

async function login() {
	try {
		if (!email.value || !password.value) {
			message.value = "Please provide both your email and password.";
			return;
		}
		const { user, error } = await supabase.auth.signInWithPassword({
			email: email.value,
			password: password.value,
		});
		if (error) {
			console.error(error);
		} else {
			console.log(user);
			message.value = "Login successful!";
			email.value = "";
			password.value = "";
		}
	} catch (err) {
		message.value = "Error logging in";
		console.log(err);
	}
}
</script>
	
<style scoped>
h1 {
	font-family: 'Nunito Sans', sans-serif;
	font-size: 4rem;
	font-weight: 700;
	color: #020102;
	text-align: center;
}

.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

button,
.createAccount {
	cursor: pointer;
	font-weight: 700;
	font-family: 'Noto Sans', sans-serif;
	transition: all .2s;
	padding: 8px 20px;
	border-radius: 100px;
	background: var(--yellow);
	border: 1px solid transparent;
	display: flex;
	align-items: center;
	font-size: 16px;
	max-width: fit-content;
	color: #020102;
}

button:active {
	transform: scale(0.95);
}

.inputs {
	font-family: 'Noto Sans', sans-serif;
	display: flex;
	flex-direction: column;
	width: fit-content;
	margin: 0.8rem;
	background-color: #f6f4f4;
}

.inputs input {
	font-family: 'Noto Sans', sans-serif;
	padding: 10px 12px;
	font-size: 1.2rem;
	border-radius: 5px;
}

.inputs input:focus {
	outline: none;
}
</style>
  