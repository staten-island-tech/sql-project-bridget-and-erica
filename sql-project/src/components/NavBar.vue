<template>
    <nav>
      <div class="left">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/LogIn">Login</RouterLink>
      </div>
      <div class="right">
        <div class="logOut">
          <button v-if="loggedStore.logged" @click="loggedStore.logOut">Sign Out</button>
        </div>
        <div class="toggleCart">
          <img src="/shopping-cart.svg" width="25" height="25" @click="toggleCart()" />
        </div>
      </div>
    </nav>
    <div class="cartDetails">
      <CartDetails v-show="openCart" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CartDetails from './CartDetails.vue'
import { useLoggedStore } from '../stores/logged';
const loggedStore = useLoggedStore()
let openCart = ref(false)
function toggleCart() {
  openCart.value = !openCart.value
}
</script>

<style scoped>
nav {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
  padding: 1rem 0rem 1rem 0rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: white;
}

nav a {
  font-size: 1.2rem;
  display: flex;
  color: #fbba7d;
  justify-content: center;
  padding: 0 1rem;
  margin: 0.5rem;
  width: fit-content;
  white-space: nowrap;
  text-decoration: none;
}

nav a:first-of-type {
  border: none;
}

nav a.router-link-active {
  text-decoration: #fbba7d underline;
}

nav a.router-link-exact-active:hover {
  text-decoration: #fbba7d underline;
  transition: all 1s ease;
}

nav a:hover {
  opacity: 60%;
  transition: all 1s ease;
}

button {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  background: #fbba7d;
  border-radius: 81px;
  width: 5rem;
  border: none;
  padding: 0.5rem;
  margin-right: 1rem;

  cursor: pointer;
}

.cartDetails {
  z-index: 1;
}

.left {
  display: flex;
  align-items: center;
}

.right {
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

.toggleCart {
  cursor: pointer;
}
</style>
