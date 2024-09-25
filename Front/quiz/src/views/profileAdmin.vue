<template>
        <div class="flex justify-center">
            <button 
                @click="pushCreation"
                class="px-4 py-2.5 mx-4 mb-10 border-2 border-cyan-700 bg-white text-black rounded-3xl">
                Créer Quiz
            </button>
            <button @click="deconnexion"
                class="px-4 py-2.5 mx-4 mb-10 border-2 border-cyan-700 bg-red-500 text-white rounded-3xl">
                Se déonnecter
            </button>
        </div>
        &nbsp; &nbsp;
        <div class="flex flex-wrap justify-center mb-4">
            <tableQuiz v-for="(quiz, index) in quizList" :key="quiz.id_quiz" :title="quiz.nom_quiz" :id="quiz.id_quiz"
                :active="!!quiz.isActive" @delete="deleteQuiz(index)" />
        </div>


</template>

<script setup lang="ts">

import { useRouter } from "vue-router";
import tableQuiz from "../components/tableQuiz.vue"
import type { quizlist } from "../types/config"
import { ref, onMounted } from 'vue';
import { useStore } from "vuex";

const store = useStore()
const router = useRouter()

let quizList = ref<quizlist[]>([])



const pushCreation = () => {
    router.push('/creationQuiz')
}

const deleteQuiz = (index: number) => {
    quizList.value.splice(index, 1)
}

const listQuiz = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/quiz/listQuiz', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, /',
            },
        });
        if (!response.ok) {
            console.error('erreur');
            return;
        }
        const data = await response.json();
        quizList.value = data.quiz;
    } catch (err) { console.error('Erreur durant la création de la liste de quiz: ', err) }
}

onMounted(() => {
    listQuiz()
})

const deconnexion = () => {
    store.dispatch('logout')
    router.push('/')
}
</script>
