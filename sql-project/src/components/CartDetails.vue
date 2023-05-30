<template>
    <div class="main">
        <h2>Your Cart</h2>
        <hr />
        <div class="total">
            <hr />
            <!-- display calculated total price -->
            <p>Total: ${{ totalPrice() }}</p>
        </div>
        <div class="items">
            <!-- display each unique item, with its amount and name -->
            <li v-for="item in getUniqueItems()" :key="item.id">{{ itemQuantity(item) }} {{ item.name }} </li>
        </div>
        <div class="buttons">
            <button>Checkout</button>
            <button @click="store.$reset">Clear Cart</button>
        </div>
        
    </div>
</template>

<script setup>
// import stores
import { useCartStore } from '../stores/cart';
const store = useCartStore()

// function that takes each item in the cart and adds the prices, only to 2 decimals
function totalPrice() {
    let price = 0
    store.cart.forEach((item) => price += item.price)
    return price.toFixed(2)
}

// function that takes the item's id and checks how many in the cart have that id, using that number as the quantity for the item
function itemQuantity(item) {
    let quantity = store.cart.filter((cartItem) => cartItem.id == item.id).length
    return quantity
}

// function that checks when you add an item, if it's id is unique; if not, add the id and name to their arrays; returns unique items (so that cart wont display every item in cart)
function getUniqueItems() {
    const uniqueItems = [];
    const uniqueItemIds = [];

    store.cart.forEach((item) => {
        if (uniqueItemIds.includes(item.id) == false) {
            uniqueItemIds.push(item.id);
            uniqueItems.push(item);
        }
    });

    return uniqueItems
}
</script>

<style scoped>
h2,
p,
li {
    font-family: 'Open Sans', sans-serif;
    margin: 5px 0;
}

.main {
    width: 20rem;
    height: 30rem;
    position: fixed;
    right: 1rem;
    top: 3rem;
    margin: 1rem;
    padding: 1rem;
    background-color: #ffeccc;
    border-radius: 10px;
    border: 2px solid black;
}

button {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    text-align: center;
    background: #fbba7d;
    border-radius: 81px;
    width: 7rem;
    height: 2.3125rem;
    border: none;
}

.buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
}
</style>
