<template>

    <div class="flex m-4 h-full">
            <p>{{ title }}</p>
            &nbsp; &nbsp;
           <button class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 mx-2"
                @click="modifierQuiz">Modifier</button>
            <button class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 mx-2"
                @click="deleteQuiz">Supprimer</button>
    </div>

</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter()

const props = defineProps({
    title: String,
    key: Number,
    id: Number
})

const emit = defineEmits([
    'delete',
    'update'
])
const emitDelete = () => {
    emit('delete');
}



const modifierQuiz = async () => {
    router.push(`/updateQuiz/${props.id}`)
}

const deleteQuiz = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/quiz/delete/${props.id}`, {
            method: 'DELETE',
        })

        if (response.ok) 
            { emitDelete() } 
    } catch (error) 
        { console.error('Erreur pour supprimer le quiz:', error) }
}



</script>

