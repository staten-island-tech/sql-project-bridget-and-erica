<template>
    <nav class="navTab">
        <router-link to="/">home</router-link>
        <router-link to="/LoginView">Login</router-link>
        <router-link alt="shopping-cart" to="/CartView"><img src="/shopping-cart.svg" width="25"
                height="25" /></router-link>
    </nav>
</template>
  
<style scoped>
.navTab {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.navTab a:hover {
    transform: scale(1.05, 1.05);
}
</style>