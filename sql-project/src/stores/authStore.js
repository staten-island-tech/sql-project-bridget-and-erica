import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const loggedIn = ref(false)
    const cart = ref([])

    const supabase = createClient(
        import.meta.env.VITE_SUPAURL,
        import.meta.env.VITE_SUPAKEY
    )

    console.log(supabase)

    onMounted(async () => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(event, session)
            user.value = session ? session.user : null
            loggedIn.value = !!user.value

            if (loggedIn.value) {
                //check if there are existing orders for the user
                const { data: orders, error } = await supabase
                    .from('orders')
                    .select('cart')
                    .eq('user_id', user.value.id)

                if (error) {
                    console.error('Error fetching existing orders:', error)
                    return
                }
                //takes cart items from existing orders, and adds them to the existing cart
                const existingCartItems = orders.map(orders => orders.cart); //turns the cart items into an array
                cart.value = +existingCartItems;
                alert("items from your previous order have been added to this order");
                console.log(existingCartItems);
            }
        })
    })

    return { user, loggedIn, cart }
}, { persist: true })
