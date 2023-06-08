<template>
  <div class="inputs">
    <div class="name">
      <input type="text" placeholder="Insert Name" />
    </div>
    <div class="DOB">
      <input type="date" placeholder="Insert Name" />
    </div>
  </div>
  <div class="process"></div>
</template>

<script>
export default {}
</script>

<style scoped>
h1,
h2 {
  font-size: 2rem;
}

input {
  width: 15vw;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
