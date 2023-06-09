<template>
  <div class="categories">
    <h2>Category</h2>
    <hr />
    <button @click="filter('All')">All</button>
    <button @click="filter('Fruits')">Fruits</button>
    <button @click="filter('Vegetables')">Vegetables</button>
    <button @click="filter('Dairy')">Dairy</button>
    <button @click="filter('Bakery')">Bakery</button>
    <button @click="filter('Meat')">Meat</button>
  </div>
  <div class="sort">
    <h2>Sort</h2>
    <hr />
    <form class="sortButtons"></form>
    <button @click="sort('All')">All</button>
    <button @click="sort('LowtoHigh')">Low to High</button>
    <button @click="sort('HightoLow')">High to Low</button>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/product'

const productsStore = useProductStore()

async function filter(selection) {
  //this function filters the items!! (what a descriptive function amiright)
  if (selection == 'All') {
    productsStore.filtered = productsStore.product //if the selection is all, then the filtered products are simply all the products
  } else {
    //otherwise, we most on to filtering the items based on the categories
    //if the product's category_id matches the value of the selection, then it will be considered a filtered product
    //category_id uses foregin keys!! (references the 'categories' table)
    const filteredProducts = productsStore.product.filter(
      (product) => product.category_id == selection
    )
    productsStore.filtered = filteredProducts
  }
}

function sort(selection) {
  if (selection == 'All') {
    //if the sorting is 'All', then the products will return as usual
    productsStore.filtered = productsStore.product
  } else if (selection == 'LowtoHigh') {
    const sortedProducts = [] //array to house sorted products
    productsStore.product.forEach((product) => sortedProducts.push(product)) //push each product into the 'sortedProducts' array
    //*not pushing it into this array would modify the original array, which is not desirable
    sortedProducts.sort((a, b) => {
      //within the 'sortedProducts' array, sort the products from low to high
      return a.price - b.price
    })
    productsStore.filtered = sortedProducts //the filtered products are the products in the array, with respect to their order
  }
  if (selection == 'HightoLow') {
    const sortedProducts = [] //array to house sorted products
    productsStore.product.forEach((product) => sortedProducts.push(product))
    sortedProducts.sort((a, b) => {
      //within the 'sortedProducts' array, sort the products from high to low
      return b.price - a.price
    })
    productsStore.filtered = sortedProducts //the filtered products are the products in the array, with respect to their order
  }
}
</script>

<style scoped>
h2 {
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  margin-left: 0.2rem;
}

hr {
  width: 5rem;
  height: 2px;
  background: #000;
  margin: 0.3rem 0 0.3rem 0;
}

button {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0.2rem 0 0.2rem 0;
  background: transparent;
  border: none;

  cursor: pointer;
}

button:hover {
  background-color: #d5d5d5;
}

.sort {
  margin-top: 1.5rem;
}

.sort,
.categories {
  display: flex;
  flex-direction: column;
}
</style>
