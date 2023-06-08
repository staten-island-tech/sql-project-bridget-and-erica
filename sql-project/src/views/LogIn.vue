<template>
  <div class="container">
    <h1>Login</h1>
    <div class="form">
      <div class="inputs">
        <input type="email" id="email" placeholder="Email" v-model="email" />
        <input type="password" id="password" placeholder="Password" v-model="password" />
      </div>
      <p class="message">{{ message }}</p>
      <div class="buttons">
        <!-- when logging in, show orders link -->
        <button @click="loginAndCheck()">Login</button>
      </div>
      <div class="createAccount">
        <p>Don't have an account yet? Create one</p>
        <router-link class="createAccountLink" to="/SignUp">here!</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { supabase } from '../clients/supabase'

import { useLoggedStore } from '../stores/logged'
import { storeToRefs } from 'pinia'

import { useOrdersStore } from '../stores/orders'

const ordersStore = useOrdersStore()
const loggedStore = useLoggedStore()
const { logged } = storeToRefs(loggedStore)

let email = ref('')
let password = ref('')
let message = ref('')

async function login() {
  try {
    if (!email.value || !password.value) {
      message.value = 'Please provide both your email and password.'
    }
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) {
      console.error(error)
      message.value = 'Error logging in.'
    } else {
      message.value = 'Login successful!'
      email.value = ''
      password.value = ''

      loggedStore.logged = true
    }
  } catch (err) {
    message.value = 'Error logging in.'
    console.log(err)
  }
}

async function loginAndCheck() {
  await login();
  await ordersStore.getCarts()
  ordersStore.toggleOrders();
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

h1 {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #020102;
  margin-bottom: 1.5rem;
}

.buttons {
  margin-top: 1rem;
}

button {
  cursor: pointer;
  font-weight: 700;
  font-family: 'Noto Sans', sans-serif;
  transition: all 0.2s;
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

.createAccount {
  margin-top: 1rem;
  font-family: 'Noto Sans', sans-serif;
}

.createAccount p {
  margin-bottom: 0.5rem;
}

.createAccountLink {
  color: #020102;
  font-weight: 700;
  text-decoration: underline;
}

.inputs {
  font-family: 'Noto Sans', sans-serif;
  display: flex;
  flex-direction: column;
}

.inputs input {
  font-family: 'Noto Sans', sans-serif;
  padding: 10px 12px;
  font-size: 1.2rem;
  border-radius: 5px;
  margin-top: 1rem;
}

.inputs input:focus {
  outline: none;
}
</style>
