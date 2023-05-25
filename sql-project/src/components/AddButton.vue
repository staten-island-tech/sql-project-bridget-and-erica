<template>
    <button>Add to Cart</button>
</template>
  
<script>

export default {
    name: "AddButton",
    props: {
        product: Object,
    },
};
</script>


<style scoped>
button:hover {
    transform: scale(1.04);
}

button{
font-family: 'Open Sans', sans-serif;
font-size: 16px;
font-weight: 400;
line-height: 22px;
text-align: center;
background: #FBBA7D;
border-radius: 81px;
width: 9rem;
height: 2.3125rem;
border: none;
}
</style>

