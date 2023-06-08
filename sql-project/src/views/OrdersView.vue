<template>
  <div class="orders">
    <!-- create a div for every order in user's carts -->
    <div class="order" v-for="order in carts" :key="order.id">
      <div class="cart">
        <!-- show unique order_id -->
        <p>ID: {{ order.order_id }}</p>
        <!-- create a p tag for every item in its respective cart (will display quantity and name) -->
        <div class="items">
          <li v-for="item in cartInterpreter(order.cart)" :key="item.id">{{ item }}</li>
        </div>
      </div>
      <div class="processed">
        <!-- update cart's processed status -->
        <button v-if="!order.processed" @click="pay(order.order_id)">Purchase</button>
        <p v-if="order.processed">Purchased!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../clients/supabase'
import { useOrdersStore } from '../stores/orders.js'

let ordersStore = useOrdersStore()
let carts = ref([])

// function to get user's uuid and get every cart that they have ordered

function cartInterpreter(cart) {
  // arrays for unique items and ids
  const uniqueItems = []
  const uniqueItemIds = []

  // for each item in the cart, get the quantity of the item and if the item is unique, push the id to ids and push the quantity and name to unique items
  cart.forEach((item) => {
    let quantity = cart.filter((cartItem) => cartItem.id == item.id).length
    if (uniqueItemIds.includes(item.id) == false) {
      uniqueItemIds.push(item.id)
      uniqueItems.push(`${quantity} ${item.name}`)
    }
  })
  // return unique items
  return uniqueItems
}

// function to update processed status of cart
async function pay(order_id) {
  const { data } = await supabase
    .from('orders')
    .update({ processed: true })
    .eq('order_id', order_id)
    console.log(data)
}

// when orders view is mounted, get carts
onMounted(async () => {
  carts.value = ordersStore.carts
})
</script>

<style scoped>
.orders {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.order {
  border: 1px black solid;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 20vh;
}

li {
  font-size: 16px;
}

.items {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
}

.cart {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  height: 80%;
  
}

.processed {
  text-align: center;
}</style>
