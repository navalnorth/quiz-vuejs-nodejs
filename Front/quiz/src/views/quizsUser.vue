<template>
    <div class="w-full">
        <form class="flex flex-col justify-center items-center">
            <div>
                <p class="text-center mb-3 w-96 text-6xl">{{ monQuiz.nom_quiz }}</p>
            </div>

            <div class="flex justify-center mb-5">
                <Progress :value="QuestionIndex" :max="monQuiz.questions.length - 1" />
            </div>
            <div v-if="state === 'reponses'">
                <div>
                    <p class="text-center mb-2 w-96 text-3xl">{{ currentQuestion.nom_question }}</p>
                </div>

                <div class="flex flex-col justify-center items-center">
                    <label class="text-xl mb-2">Réponses :</label>
                    <div class="flex flex-col space-y-2">
                        <reponseUser v-for="(reponse, index) in currentQuestion.reponses" :key="index" :index="index"
                            :reponse="reponse" :disabled="repondu" :selectedReponse="selectionReponse"
                            :correctAnswer="Number(currentQuestion.reponse_correcte)"
                            @reponse-selectionnee="choisirReponse" />
                    </div>
                </div>

                <div class="w-full flex justify-center px-10">
                    <button :disabled="!repondu" @click.prevent="suivant"
                        class="px-5 py-2.5 mt-10 border-2 border-cyan-700 bg-white text-black rounded-3xl w-32">
                        Suivant
                    </button>
                </div>
            </div>

            <div>
                <Recap 
                    v-if="state === 'recap'"
                    :score="currentScore"
                    :questions="monQuiz.questions.length"
                />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Quiz } from "../types/config";
import { useRoute } from "vue-router";
import Progress from "../components/progress.vue";
import reponseUser from "../components/reponseUser.vue";
import Recap from '@/components/recap.vue';
import { jwtDecode } from 'jwt-decode';

const route = useRoute();
const QuestionIndex = ref<number>(0)
const selectionReponse = ref<number | null | any>(null);
const state = ref('reponses')
const currentScore = ref(0)

const monQuiz = ref<Quiz>({
    nom_quiz: '',
    isActive: false,
    questions: [
        {
            nom_question: '',
            reponses: ['', ''],
            reponse_correcte: 0,
        }
    ]
})



const currentQuestion = computed(() => monQuiz.value.questions[QuestionIndex.value])
const isLastQuestion = computed(() => QuestionIndex.value === monQuiz.value.questions.length - 1)
const repondu = computed(() => selectionReponse.value !== null)



const incrementScore = () => {
    currentScore.value++
}

const choisirReponse = (index: number) => {
    selectionReponse.value = index;

    if (index === Number(currentQuestion.value.reponse_correcte)) {
        incrementScore();
    }
}



const suivant = () => {
    if (!isLastQuestion.value) {
        QuestionIndex.value++
        selectionReponse.value = null
    } else {
        state.value = 'recap'
    }
}



const fetchQuiz = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/quiz/updateQuiz/${route.params.id_quiz}`, {
            method: 'GET',
        });
        if (!response.ok) {
            console.error('Erreur lors de la récupération du quiz:');
            return;
        }
        const data = await response.json();
        
        if (!data.quiz) {
            console.error('Aucun quiz trouvé !');
            return;
        }

        try {
            const quiz: any = jwtDecode(data.quiz);
            if (!quiz || !quiz.quiz) {
                console.error('Le décodage du quiz a échoué ou le quiz est manquant.');
                return;
            }
            monQuiz.value = quiz.quiz;
        } catch (decodeError) {
            console.error('Erreur lors du décodage du JWT:', decodeError);
        }

    } catch (error) {
        console.error('Erreur durant la récupération du quiz:', error);
    }
}


onMounted(() => {
    fetchQuiz()
})
</script>
