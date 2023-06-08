<template>
<OrderCard />
  <div class="purchased">
    <h2>Purchased Carts</h2>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../clients/supabase'
import { useOrdersStore } from '../stores/orders.js'
import OrderCard from '../components/OrderCard.vue';

let ordersStore = useOrdersStore()
let carts = ref([])

carts.value = ordersStore.carts

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
}

// when orders view is mounted, get carts
onMounted(async () => {
  
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
  width: 20vw;
}
</style>
