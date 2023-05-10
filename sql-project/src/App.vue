<template>
  <div class="navBar">
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
h1 {
  font-size: 4rem;
}
</style>