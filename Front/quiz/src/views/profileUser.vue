<template>
    <p class="text-4xl">Quizz à faire</p>

    <button class="px-5 py-2.5 mt-10 border-2 border-cyan-700 bg-white text-black rounded-3xl w-32">
        Mes notes
    </button>

    <div class="flex flex-wrap justify-center m-4 text-center">
        <button 
        class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 m-2"
        v-for="(quiz, index) in listQuizActive"
        :key="quiz.id_quiz"
        :title="quiz.nom_quiz"
        @click="CommencerQuiz(quiz.id_quiz)"
        >
        {{quiz.nom_quiz}}
    </button>
    </div>
</template>


<script setup lang="ts">
import type { listQuizActive } from "../types/config"
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router= useRouter()

let listQuizActive = ref<listQuizActive[]>([])



const CommencerQuiz = (id: number) => {
    router.push(`/quizUser/${id}`)
}

const afficheListActive = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/quiz/isActive`, {
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
        
        listQuizActive.value = data.results;
    } catch (err) {console.error('Erreur durant l\'ffichage de la liste de quiz: ', err)}
}

onMounted(() => {
    afficheListActive()
})

</script>