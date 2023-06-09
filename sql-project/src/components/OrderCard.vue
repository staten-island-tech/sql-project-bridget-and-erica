<template>
    <div class="orders">
        <!-- create a div for every order in user's carts -->
        <div class="order" v-for="order in props.cart" :key="order.id">
            <div class="cart">
                <!-- show unique order_id -->
                <p>Your Order ID: {{ order.order_id }}</p>
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
import { supabase } from '../clients/supabase'

const props = defineProps({
    cart: Array,
})

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
    if (data !== null) {
            console.log(data)
        }
}
</script>

<style scoped>
.orders {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Set three columns with equal width */
    justify-content: space-around;
    justify-items: center;
}

.order {
    border: 1px black solid;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    width: 25vw;
    height: 20vh;
}

.processed {
    text-align: center;
}

.cart {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    height: 80%;
}

.items {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
}
</style>
