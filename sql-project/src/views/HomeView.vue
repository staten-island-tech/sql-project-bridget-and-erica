<template>
  <main>
    <h1>home page :)</h1>
    <ProductCard />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from "../clients/supabase";
import ProductCard from '../components/ProductCard.vue';

async function getproducts() {
  const { product } = await supabase.from('products').select()
  console.log(product)
}

onMounted(() => {
  getproducts()
})
</script>
