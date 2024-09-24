<template>
    <button
        :class="classes"
        @click="selectionnerReponse"
        :disabled="disabled"
        class="px-40 py-3 text-center text-white rounded-3xl w-32 bg-cyan-700 flex justify-center"
    >
        {{ reponse }}
    </button>
</template>



<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    index: {
        type: Number,
        required: true
    },
    reponse: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    selectedReponse: {
        type: Number,
        default: null
    },
    correctAnswer: {
        type: Number,
        required: true,
    }
})



const classes = computed(() => ({
    'right': props.disabled && props.index === props.correctAnswer,
    'wrong': props.disabled && props.index !== props.correctAnswer && props.index === props.selectedReponse 
}))



const emit = defineEmits(['reponse-selectionnee'])

const selectionnerReponse = () => { 
    emit('reponse-selectionnee', props.index)
    }
</script>



<style scoped>
.right {
    background-color: rgb(54, 204, 54);
}
.wrong {
    background-color: rgb(206, 68, 68);
}
</style>
