<template>
<div class="my-4">
    <div class="flex flex-col text-center">
        <p>{{ title }}</p>
    </div>

    <div class="mx-4 my-2 flex items-center justify-center items-align">

        <button class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 mx-2"
            @click="modifierQuiz">Modifier</button>

        <button class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 mx-2"
            @click="deleteQuiz">Supprimer</button>

        <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" @click="changementFlag" @change="flag" v-model="isToggleActive" 
            >
            <div
                class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600">
            </div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
        </label>
    </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const isToggleActive = ref(false) 



const props = defineProps({
    title: String,
    id: Number,
    active: Boolean,
})



const modifierQuiz = async () => {
    router.push(`/updateQuiz/${props.id}`)
}



const emit = defineEmits([
    'delete'
])
const emitDelete = () => {
    emit('delete');
}

const deleteQuiz = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/quiz/delete/${props.id}`, {
            method: 'DELETE',
        })
        if (response.ok) { 
            emitDelete() 
        }
    } catch (error) { console.error('Erreur pour supprimer le quiz:', error) }
}



onMounted(() => {
    isToggleActive.value = !!props.active
})

const changementFlag = () => {
    isToggleActive.value = !isToggleActive.value
}

const flag = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/quiz/isActive/${props.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                isActive: isToggleActive.value,
                id_quiz: props.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            console.error('Erreur lors de la modification du quiz')
            return
        }
    } catch (error) {
        console.error('Erreur durant la modification du quiz: ', error);
    }
}





</script>

<style scoped>
</style>