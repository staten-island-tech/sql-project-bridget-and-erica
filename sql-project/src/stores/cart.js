import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../clients/supabase'

export const useCartStore = defineStore(
  'cart',
  () => {
    // reactive array for cart
    const user = ref(null)
    const loggedIn = ref(false)
    const cart = ref([])
    const showOrders = ref(false)
    const userOrders = ref([])

    // reset function
    function $reset() {
      cart.value = []
    }

    // function to check if user has orders
    function toggleOrders() {
      if (userOrders.value.length > 0) {
        showOrders.value = true
      } else {
        showOrders.value = false
      }
    }

    onMounted(async () => {
      supabase.auth.onAuthStateChange(async (event, session) => {
        user.value = session ? session.user : null
    
        if (user.value) {
          try {
            // check if there are existing orders for the user
            const { data: orders, error: fetchError } = await supabase
              .from('orders')
              .select()
              .eq('user_id', user.value.id)
    
     
            // Add the items from existing orders to the cart
            const existingCartItems = orders.flatMap((order) => order.cart)
            console.log(existingCartItems)
            cart.value = cart.value.concat(existingCartItems)
            toggleOrders()
        
            alert("Items from your previous order have been added to this order")
            console.log(cart)
          } catch (error) {
            console.error('Error fetching existing orders:', error)
          }
        }
      })
    })

    return { user, loggedIn, cart, showOrders, userOrders, toggleOrders, $reset }
  },
  { persist: true }
)
