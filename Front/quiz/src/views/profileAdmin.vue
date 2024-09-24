<template>
    <div>
        <div class="flex justify-center">
            <button 
                @click="pushCreation"
                class="px-5 py-2.5 mt-10 border-2 border-cyan-700 bg-white text-black rounded-2xl w-32">
                Créer Quiz
            </button>
        </div>
        &nbsp; &nbsp;
        <div class="flex flex-wrap justify-center m-2">
            <tableQuiz v-for="(quiz, index) in quizList" :key="quiz.id_quiz" :title="quiz.nom_quiz" :id="quiz.id_quiz"
                :active="!!quiz.isActive" @delete="deleteQuiz(index)" />
        </div>
    </div>



</template>

<script setup lang="ts">

import { useRouter } from "vue-router";
import tableQuiz from "../components/tableQuiz.vue"
import type { quizlist } from "../types/config"
import { ref, onMounted } from 'vue';

let quizList = ref<quizlist[]>([])

const router = useRouter()


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

</script>
