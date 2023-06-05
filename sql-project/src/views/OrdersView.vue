<template>
  <div class="orders">
    <div class="order" v-for="order in carts" :key="order.id">
        <p>{{order.order_id}}</p>
      <p v-for="item in cartInterpreter(order.cart)"> {{ item }}</p>
      <button @click="pay(order.order_id)">Purchase</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../clients/supabase'

let carts = ref([])

async function getCarts() {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  const uuid = user.id

  let { data: orders, error } = await supabase.from('orders').select('*').eq('user_id', uuid)
  
  orders.forEach((order) => carts.value.push(order))
}

function cartInterpreter(cart) {

  const uniqueItems = []
  const uniqueItemIds = []

  cart.forEach((item) => {
    let quantity = cart.filter((cartItem) => cartItem.id == item.id).length
    if (uniqueItemIds.includes(item.id) == false) {
      uniqueItemIds.push(item.id)
      uniqueItems.push(`${quantity} ${item.name}`)
    }
  })
  return uniqueItems
}

async function pay(order_id) {
    const { data } = await supabase
        .from('orders')
        .update({ processed: true })
        .eq('order_id', order_id);
}

onMounted( async () => {
  await getCarts()
})
</script>

<style scoped>
.orders {
    display: flex;

}
.order {
    border: 1px black solid;
    padding: 1rem;

    display: flex;
    flex-direction: column;
}
</style>
