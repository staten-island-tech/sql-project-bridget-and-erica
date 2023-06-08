<template>
    <div class="orders">
        <!-- create a div for every order in user's carts -->
        <div class="order" v-for="order in carts" :key="order.id">
            <!-- show unique order_id -->
            <p>Your Order ID: {{ order.order_id }}</p>
            <!-- create a p tag for every item in its respective cart (will display quantity and name) -->
            <p v-for="item in cartInterpreter(order.cart)" :key="item.id">{{ item }}</p>
            <!-- update cart's processed status -->
            <button @click="pay(order.order_id)">Purchase</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../clients/supabase'
import { useOrdersStore } from '../stores/orders.js'
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
