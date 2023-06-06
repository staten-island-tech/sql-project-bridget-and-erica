<template>
  <div class="main">
    <h2>Your Cart</h2>
    <hr />
    <div class="total">
      <!-- display calculated total price -->
      <p>Total: ${{ totalPrice() }}</p>
    </div>
    <div class="items">
      <!-- display each unique item, with its amount and name -->
      <div class="item" v-for="item in getUniqueItems()" :key="item.id">
        {{ itemQuantity(item) }} {{ item.name }} <button @click="increment(item)">+</button>
        <button @click="decrement(item)">-</button>
      </div>
    </div>
    <div class="buttons">
      <!-- user will only be able to checkout if they are logged in -->
      <router-link
        class="checkout"
        v-if="logged"
        to="/Orders"
        @click="sendCart(); ordersStore.toggleOrders()"
      >
      <!-- if logged in: on click, send cart to supabase and to store, make sure orders can be seen, and go to orders page -->
      Checkout
      </router-link>
      <button class="clearCart" @click="store.$reset">Clear Cart</button>
    </div>
    <div class="login">
      <!-- this referral to login will only show if the logged state is false (user is not logged in) -->
      <router-link v-if="!logged" to="/LogIn">Login to Checkout</router-link>
    </div>
  </div>
</template>

<script setup>
// import stores
import { supabase } from '../clients/supabase'
import { useCartStore } from '../stores/cart'
import { useLoggedStore } from '../stores/logged'
import { storeToRefs } from 'pinia'
import { useOrdersStore } from '../stores/orders'

const loggedStore = useLoggedStore()
const { logged } = storeToRefs(loggedStore)
const store = useCartStore()
const ordersStore = useOrdersStore()

// function that takes each item in the cart and adds the prices, only to 2 decimals
function totalPrice() {
  let price = 0
  store.cart.forEach((item) => (price += item.price))
  return price.toFixed(2)
}

// function that takes the item's id and checks how many in the cart have that id, using that number as the quantity for the item
function itemQuantity(item) {
  let quantity = store.cart.filter((cartItem) => cartItem.id == item.id).length
  return quantity
}

// adds the item to the cart again
function increment(item) {
  store.cart.push(item)
}

// finds if the item is in the cart, if it is, get rid of it
function decrement(item) {
  const index = store.cart.findIndex((cartItem) => cartItem.id === item.id)
  if (index !== -1) {
    store.cart.splice(index, 1)
  }
}

// function that checks when you add an item, if it's id is unique; if not, add the id and name to their arrays; returns unique items (so that cart wont display every item in cart)
function getUniqueItems() {
  const uniqueItems = []
  const uniqueItemIds = []

  store.cart.forEach((item) => {
    if (uniqueItemIds.includes(item.id) == false) {
      uniqueItemIds.push(item.id)
      uniqueItems.push(item)
    }
  })

  return uniqueItems
}

async function sendCart() {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  const uuid = user.id
  if (store.cart.length != 0) {
    const { error } = await supabase
      .from('orders')
      .insert([{ user_id: uuid, cart: store.cart, order_total: totalPrice() }])
    console.log(error)
  } else {
    alert('Nothing in cart')
  }
}
</script>

<style scoped>
h2,
p,
li,
a {
  font-family: 'Open Sans', sans-serif;
  margin: 5px 0;
}

.item {
  display: flex;
  margin-bottom: 10px;
}

.checkout {
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
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login {
  margin-top: 1rem;
  text-align: center;
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
  overflow: auto;
}

.clearCart {
  margin-top: 0.4rem;
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
  text-decoration: none;
  cursor: pointer;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

a {
  text-decoration: underline;
  color: black;
}
</style>
