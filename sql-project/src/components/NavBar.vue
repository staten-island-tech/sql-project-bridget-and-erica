<template>
<<<<<<< HEAD
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/LogIn">Login</RouterLink>
        <div class="toggleCart">
            <img src="/shopping-cart.svg" width="25" height="25" @click="toggleCart" />
            <CartDetails v-show="openCart" />
        </div>
    </nav>
</template>

<script>
import CartDetails from './CartDetails.vue';

export default {
    name: "NavBar",
    components: {
        CartDetails, 
    },
    data() {
        return {
            openCart: false,
        };
    },
    methods: {
        toggleCart() {
            this.openCart = !this.openCart;
        },
    },
};
</script>

=======
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/LogIn">Login</RouterLink>
    <router-link alt="shopping-cart" to="/"
      ><img src="/shopping-cart.svg" width="25" height="25"
    /></router-link>
  </nav>
</template>

>>>>>>> e06659da7495b345743ac693ab584187fce9a4bb
<style scoped>
nav {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
</style>
