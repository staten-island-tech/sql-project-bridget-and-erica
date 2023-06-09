import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore(
  'product',
  () => {
    // reactive array for product
    const product = ref([])

    return { product }
  },
  { persist: true }
)
