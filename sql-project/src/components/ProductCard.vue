<template>
  <div class="productCard">
    <h3>{{ product.name }}</h3>
    <p>{{ product.category_id }}</p>
    <p>{{ usDollar.format(product.price) }}</p>
    <div class="button">
      <!-- when button clicked, add product object to cart -->
      <AddButton @add-click="addToCart"/>
    </div>
  </div>
</template>

<script>
import AddButton from './AddButton.vue'

export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  data() {
    return {
      usDollar: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    }
  },
  components: { AddButton },
  methods: {
    addToCart() {
      // add product object to cart
      this.$emit('addToCart', this.product)
    }
  }
}
</script>

<style scoped>
template {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button {
  top: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.productCard {
  background: #ffeccc;
  border-radius: 10px;
  margin: 1rem;
  padding: 1.25rem;
  display: inline-block;
  width: 15.5rem;
  height: 11.25rem;
  line-height: 0.5rem;
}

h3 {
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  text-align: left;
}

p {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
}
</style>
