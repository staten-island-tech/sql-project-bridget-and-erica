<template>
  <NavBar />
  <RouterView />
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
import { supabase } from './clients/supabase';
import { onMounted } from 'vue';

import { useLoggedStore } from './stores/logged';
import { useCartStore } from './stores/cart';
const cartStore = useCartStore()

// function that checks the auth session, if null session, logged false in the store
async function checkSession() {
  const { data, error } = await supabase.auth.getSession()
  if (data.session == null) {
    useLoggedStore().logged = false
  }
  if (error !== null) {
    console.log(error)
  }
}

onMounted(async () => {
  await checkSession()
  cartStore.toggleOrders()
})

</script>
