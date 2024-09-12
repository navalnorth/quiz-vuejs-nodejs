<template>
  <div class="min-h-screen bg-cyan-100 flex flex-col justify-center items-center">
  <Logo />
    <RouterView />

</div>
  

</template>

<script setup lang="ts">
import Logo from "./components/Logo.vue"




</script>

<style>

@tailwind base;
@tailwind components;
@tailwind utilities;

</style>