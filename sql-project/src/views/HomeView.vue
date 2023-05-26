<template>
  <main>
    <div class="sideMenu">
      <SideMenu />
    </div>
    <ProductCard v-for="product in products" :product="product" :key="product.id" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from "../clients/supabase";
import ProductCard from '../components/ProductCard.vue';
import SideMenu from '../components/SideMenu.vue';

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
