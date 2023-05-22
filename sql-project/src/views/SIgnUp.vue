<template>
    <div class="container">
        <h1>Create Account</h1>
        <div class="inputs">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password">
        </div>
        <p class="message">{{ message }}</p>
        <div class="buttons">
            <button @click="create">Sign Up</button>
            <p>Already have an account? Login here!</p>
            <router-link class="login" to="/LogIn">Login</router-link>
        </div>
    </div>
</template>
  
<script setup>
import { RouterLink } from "vue-router";
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
        const { user, error } = await supabase.auth.signUp({
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
.login {
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
  