<template>
  <div class="container">
    <h1>Create Account</h1>
    <div class="form">
      <div class="inputs">
        <input type="email" id="email" placeholder="Email" v-model="email" />
        <input type="password" id="password" placeholder="Password" v-model="password" />
      </div>
      <p class="message">{{ message }}</p>
      <div class="buttons">
        <button @click="create">Sign Up</button>
      </div>
      <div class="login">
        <p>Already have an account? Login</p>
        <router-link class="loginLink" to="/LogIn">here!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { supabase } from '../clients/supabase'

//makes the elements reactive
let email = ref('')
let password = ref('')
let message = ref('')

async function create() {
  try {
    if (!email.value || !password.value) {
      message.value = 'Please provide both your email and password.'
      return
    }
    const { user, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })
    if (error) {
      console.error(error)
      message.value = error
    } else {
      console.log(user)
      message.value = 'Sign-up successful!'
      email.value = ''
      password.value = ''
    }
  } catch (err) {
    message.value = 'Error signing up'
    console.log(err)
  }
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

.login {
  margin-top: 1rem;
  font-family: 'Noto Sans', sans-serif;
}

.login p {
  margin-bottom: 0.5rem;
}

.loginLink {
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
