import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../clients/supabase'

export const useOrdersStore = defineStore(
  'orders',
  () => {
    // reactive array for user's carts and reactive bool for is user has orders
    let carts = ref([])
    let showOrders = ref(false)

    // reset function
    function reset() {
      carts.value = []
      showOrders.value = false
    }

    // function to check if user has orders
    function toggleOrders() {
      if (carts.value.length > 0) {
        showOrders.value = true
      } else {
        showOrders.value = false
      }
    }

    async function getCarts() {
      // get user auth id
      const {
        data: { user }
      } = await supabase.auth.getUser()
      const uuid = user.id

      // get all orders that have user id equal to previous user auth id
      let { data: orders, error } = await supabase.from('orders').select('*').eq('user_id', uuid)
      if (error !== null) {
        console.log(error)
      }
      carts.value = orders
    }

    return { carts, showOrders, reset, toggleOrders, getCarts }
  },
  { persist: true }
)
