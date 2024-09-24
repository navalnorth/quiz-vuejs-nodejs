<template>

        <progress class="barre" :value="value" :max="max" />

</template>

<script setup lang="ts">
defineProps({
    value: Number,
    max: Number
})
</script>

<style scoped>
.barre {
    width: 450px;
    height: 6px;
    border-radius: 40px;
    appearance: none;
}
.barre::-webkit-progress-bar {
    border-radius: 40px;
    background-color: white;
}
.barre::-webkit-progress-value {
    border-radius: 40px;
    background-color: #0e7490;
}
</style>
