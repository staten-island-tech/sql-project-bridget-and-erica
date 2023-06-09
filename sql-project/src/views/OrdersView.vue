<template>
  <div class="carts__both">
    <div class="carts notPurchased">
        <h2>(not) Purchased Carts</h2>
      <OrderCard :cart=newOrders />
    </div>
    <div class="carts purchased">
      <h2>Purchased Carts</h2>
      <OrderCard :cart=purchased />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import OrderCard from '../components/OrderCard.vue';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore()

let orders = ref(cartStore.userOrders)
let purchased = ref([])
let newOrders = ref([])

async function getPurchased() {
  purchased.value = cartStore.userOrders.filter((order) => order.processed == true)
  let purchasedIDs = purchased.value.map((order) => order.order_id)
  newOrders.value = orders.value.filter((order) => !purchasedIDs.includes(order.order_id))
}

// when orders view is mounted, get carts
onMounted(async () => {
  await getPurchased()
})
</script>

<style scoped>
h2 {
  width: 100%;
  text-align: center;
}
.carts {
  border: 1px solid black;
  width: 80%;
  padding: 1rem;
}
.carts__both {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
