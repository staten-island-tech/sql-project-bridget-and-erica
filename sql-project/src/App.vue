<template>
    <NavBar />
    <RouterView />
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
body{
  display: flex;
  flex-direction: column;
}
h1 {
  font-size: 4rem;
}
</style>
