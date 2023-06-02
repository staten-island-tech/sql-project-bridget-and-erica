<template>
  <main>
    <section class="homeView">
      <section class="titleDecor">
        <div class="shingles">
          <img src="/shingles.svg" class="imgShingles" />
        </div>
        <div class="groceries">
          <h1 class="groceryText">groceries :)</h1>
        </div>
      </section>

      <section class="homeContent">
        <div class="sideMenu">
          <SideMenu />
        </div>
        <div class="productCards">
          <ProductCard
            v-for="product in productsStore.product"
            :product="product"
            :key="product.id"
            @addToCart="addToCart"
          />
        </div>
      </section>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { supabase } from '../clients/supabase'
import ProductCard from '../components/ProductCard.vue'
import SideMenu from '../components/SideMenu.vue'
//import stores
import { useCartStore } from '../stores/cart.js'
import { useProductStore } from '../stores/product'
const cartStore = useCartStore()
const productsStore = useProductStore()
async function getProducts() {
  const { data } = await supabase.from('products').select()
  productsStore.product = data
}
// when AddButton is clicked -> ProductCard emits product -> product pushed to store's cart
function addToCart(product) {
  cartStore.cart.push(product)
}
function logIn() {
  loggedStore.logged = true
  console.log(loggedStore.logged)
}
onMounted(() => {
  getProducts()
})
</script>

<style>
main {
  width: 100vw;
}
.homeView {
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow: hidden;
  align-items: center;
}

.shingles {
  width: 100%;
  overflow: hidden;
}

.homeContent {
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 3rem 5rem;
}

.groceries {
  width: 798px;
  height: 304px;
  border: 10px #fbba7d solid;
  border-radius: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem;

  background-color: #fffcf2;
}

.groceryText {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 78px;

  text-align: center;

  color: #fbba7d;
}

.productCards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.titleDecor {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  background-color: #ffeccc;
}

.imgShingles {
  overflow: hidden;
}

.sideMenu {
  width: 20%;
  margin-top: 0.8rem;
}
</style>
