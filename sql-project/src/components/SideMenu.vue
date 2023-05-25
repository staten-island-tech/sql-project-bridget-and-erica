<template>
    <div class="categories">
        <h2>Category</h2>
        <hr>
        <button type="submit">All</button>
        <button type="submit">Fruits</button>
        <button type="submit">Vegetables</button>
        <button type="submit">Dairy</button>
        <button type="submit">Bakery</button>
        <button type="submit">Meat</button>
    </div>
    <div class="sort">
        <h2>Sort</h2>
        <hr>
        <button type="submit">All</button>
        <button type="submit">Low to High </button>
        <button type="submit">High to Low </button> 
    </div>
</template>

<script>
export default {
    name: "SideMenu"
};
</script>

<style scoped>
h2 {
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: left;
    margin-left: 0.2rem;
}

hr {
    width: 10%;
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
}

.sort {
    margin-top: 1.5rem;
}

.sort, .categories{
    display: flex;
    flex-direction: column;
}
</style>