<template>
    <div class="main">
        <h2>Your Cart</h2>
        <hr />
        <div class="total">
            <hr />
            <p>Total:</p>
        </div>
        <button>Checkout</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usDollar: new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }),
        };
    },
}
</script>

<style scoped>
h2,
p {
    font-family: 'Open Sans', sans-serif;
}

.main {
    width: 20rem;
    height: 30rem;
    position: fixed;
    right: 1rem;
    top: 3rem;
    margin: 1rem;
    padding: 1rem;
    background-color: #ffeccc;
    border-radius: 10px;
}

button {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    text-align: center;
    background: #fbba7d;
    border-radius: 81px;
    width: 7rem;
    height: 2.3125rem;
    border: none;
}
</style>
