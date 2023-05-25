<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/LogIn">Login</RouterLink>
        <router-link alt="shopping-cart" to="/"><img src="/shopping-cart.svg" width="25" height="25" /></router-link>
    </nav>
</template>
  
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
    color: #FBBA7D;
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
    text-decoration: #FBBA7D underline;
}

nav a.router-link-exact-active:hover {
    text-decoration: #FBBA7D underline;
    transition: all 1s ease;
}

nav a:hover {
    opacity: 60%;
    transition: all 1s ease;
}
</style>