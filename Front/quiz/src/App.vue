<template>
  <div class="min-h-screen bg-cyan-100 flex flex-col justify-center items-center">
  <Logo />
    <RouterView />

</div>
  

</template>

<script setup lang="ts">
import { useStore } from "vuex";
import Logo from "./components/Logo.vue"
import { onMounted } from "vue";

const store = useStore()

onMounted(() => {
  store.dispatch('checkAuth')
})


</script>

<style>

@tailwind base;
@tailwind components;
@tailwind utilities;

</style>