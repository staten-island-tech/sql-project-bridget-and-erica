<template>
  <!-- tell ProductCard when button clicked -->
  <button @click="$emit('add-click')">Add to Cart</button>
</template>

<script>
export default {
  name: 'AddButton'
}
</script>

<style scoped>
button:hover {
  transform: scale(1.04);
  transition: all ease-in-out 0.1s;
}

button {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  background: #fbba7d;
  border-radius: 81px;
  width: 9rem;
  height: 2.3125rem;
  border: none;

  cursor: pointer;
}

button:active {
  transform: scale(1);
  transition: all ease-in-out 0.1s;
  cursor: initial;
}
</style>
