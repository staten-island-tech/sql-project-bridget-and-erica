<template>
  <main>
    <h1>home page :)</h1>

  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from "../clients/supabase";

async function getproducts() {
  const { data } = await supabase.from('products').select()
  console.log(data)
}

onMounted(() => {
  getproducts()
})
</script>
