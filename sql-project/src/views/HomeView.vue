<template>
  <main>
    <div class="homeView">
      <div class="shingles">
        <img src="/shingles.svg" height="233" width="1957" alt="">
      </div>
      <div class="groceries">
        <h1 class="groceryText">
          groceries :)
        </h1>
      </div>
      <div class="homeContent">
        <div class="sideMenu">
          <SideMenu />
        </div>
        <div class="productCards">
          <ProductCard v-for="product in products" :product="product" :key="product.id" />
        </div>
      </div>

    </div>


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

<style>
.homeView {
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow: hidden;
}

.shingles {
  width: 100%;
  overflow: hidden;
}

.homeContent {
  display: flex;
  flex-direction: row;
}

.groceryText {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 78px;
  border: 10px  #FBBA7D solid;
  border-radius: 55% ;
  text-align: center;
  width: 798px;
height: 304px;
  color:  #FBBA7D;
}
</style>