<template>
    <p class="text-4xl">Quizz à faire</p>
    <div>
        <button class="py-2.5 mx-4 my-10 border-2 border-cyan-700 bg-white text-black rounded-3xl w-32">
            Mes notes
        </button>
        <button @click="deconnexion"
            class="py-2.5 mx-4 my-10 border-2 border-cyan-700 bg-red-500 text-white rounded-3xl w-32">
            Se déonnecter
        </button>
    </div>

    <div class="flex flex-wrap justify-center">
        <button class="px-20 py-4 bg-cyan-700 text-white rounded-3xl hover:bg-cyan-950 m-4"
            v-for="(quiz, index) in listQuizActive" :key="quiz.id_quiz" :title="quiz.nom_quiz"
            @click="CommencerQuiz(quiz.id_quiz)">
            <div class="flex flex-col">
                <span class="mx-20"> Quiz n° {{ (index + 1).toString() }} :</span>
                {{ quiz.nom_quiz }}
            </div>
        </button>
    </div>
</template>


<script setup lang="ts">
import type { listQuizActive } from "../types/config"
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useStore } from "vuex";

const router = useRouter()
const store = useStore()

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
    } catch (err) { console.error('Erreur durant l\'ffichage de la liste de quiz: ', err) }
}

onMounted(() => {
    afficheListActive()
})


const deconnexion = () => {
    store.dispatch('logout')
    router.push('/')
}
</script>