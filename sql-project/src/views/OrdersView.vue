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
let purchased = ref([])

async function getPurchased() {
  let { data: orders, error } = await supabase.from('orders').select('*').eq('processed', true)
  purchased.value.push(orders)
  console.log(purchased.value)
}

// when orders view is mounted, get carts
onMounted(async () => {
  carts.value = ordersStore.carts
  getPurchased()
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
}
</style>
