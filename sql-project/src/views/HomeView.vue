<template>
  <main>
    <h1>home page :)</h1>
    <ProductCard v-for="product in products" :product="product" :key="product.id" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js'
import ProductCard from '../components/ProductCard.vue';

const products = ref([]);

async function getProducts() {
  const { data } = await supabase.from('products').select();
  products.value = data;
  console.log(products.value);
}

onMounted(() => {
  getProducts();
});
</script>
