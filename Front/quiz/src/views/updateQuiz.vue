<template>
    <div class="w-full">
        <h2 class="text-4xl m-2 flex justify-center">Modification de votre Quiz</h2>

        <form @submit.prevent="clique" class="flex flex-col justify-center items-center">
            <div>
                <input class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700 m-2 w-96" v-model="monQuiz.nom_quiz"
                    placeholder="Nom du nouveau Quiz" />
            </div>
            <div>
                <input class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700 m-2 w-96" placeholder="Nom de la question"
                    v-model="currentQuestion.nom_question" :id="'question-' + QuestionIndex" />
            </div>

            <div class="flex flex-col justify-center items-center my-4">
                <button @click.prevent="reponsePlus"
                    class="px-5 py-2.5 bg-green-700 text-white border-none rounded-3xl hover:bg-green-950 w-32 m-2">
                    Ajouter
                </button>

                <div v-for="(reponse, index) in currentQuestion.reponses" :key="index"
                    class="flex items-center mt-2 flex-col">
                    <input class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700 mb-2 w-96"
                        placeholder="Ecrivez votre réponse" v-model="currentQuestion.reponses[index]" />
                    <input type="radio" v-model="currentQuestion.reponse_correcte" :value="index" v-bind:checked="isRadioChecked(index)"/>
                </div>
            </div>
            <div class="w-full flex justify-between px-10">
                <button class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 w-32"
                    @click.prevent="precedent" :disabled="QuestionIndex === 0">
                    Précedent
                </button>

                <div class="text-red-600 text-center">
                    <p v-for="erreur in erreurs" :key="erreur">{{ erreur }}</p>
                </div>

                <button class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 w-32"
                    @click.prevent="suivant">
                    Suivant
                </button>
            </div>

            

            <button class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 w-32"
                type="submit">
                Modifier
            </button>
        </form>


    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Quiz } from "../types/config";
import type { formatedQeustion } from "../types/config";
import { useRoute, useRouter } from "vue-router";
import { jwtDecode } from 'jwt-decode';

const route = useRoute()
const router = useRouter()

const erreurs = ref<string[]>([]);

const monQuiz = ref<Quiz>({
    nom_quiz: '',
    isActive: false,
    questions: [
        {
            nom_question: '',
            reponses: ['', '', '', ''],
            reponse_correcte: 0,
        }
    ]
});



const QuestionIndex = ref(0);

const currentQuestion = computed(() => monQuiz.value.questions[QuestionIndex.value]);
const isLastQuestion = computed(() => QuestionIndex.value === monQuiz.value.questions.length - 1);


const isRadioChecked = (r: any) => {
    if ( r == currentQuestion.value.reponse_correcte) {
        return true
    }
}

const suivant = () => {
    erreurs.value = []
    if (!validerQuestion()) return;

    if (isLastQuestion.value) {
        addQuestion();
    }
    QuestionIndex.value++;
}




const precedent = () => {
    erreurs.value = []
    if (!validerQuestion()) return
    if (QuestionIndex.value > 0) {
        QuestionIndex.value--;
    }
}



const addQuestion = () => {
    erreurs.value = [];
    if (!validerQuestion()) return;
    monQuiz.value.questions.push({
        nom_question: '',
        reponses: ['', '', '', ''],
        reponse_correcte: 0
    });

}



const reponsePlus = () => {
    currentQuestion.value.reponses.push('');
}


const validerQuestion = () => {
    const { nom_question, reponses, reponse_correcte } = currentQuestion.value

    if (!monQuiz.value.nom_quiz) {
        erreurs.value.push('Le nom du quiz est obligatoire.');
        return false;
    }

    if (!nom_question) {
        erreurs.value.push('Le nom de la question est obligatoire.');
        return false;
    }

    if (reponses.length < 2 || reponses.some(rep => !rep)) {
        erreurs.value.push('Chaque question doit avoir au moins deux réponses valides.');
        return false;
    }

    if (reponse_correcte === null || undefined) {
        erreurs.value.push('Une réponse correcte doit être sélectionnée.');
        return false;
    }

    return true;
}



const clique = async () => {
    erreurs.value = []
    if (!validerQuestion()) return
    await modifierQuiz()
}



const modifierQuiz = async () => {
    try {
        const formatedQuestion: formatedQeustion[] = monQuiz.value.questions.map((q) => ({
            nom_question: q.nom_question,
            reponses: q.reponses,
            reponse_correcte: q.reponse_correcte
        }))
        const response = await fetch(`http://localhost:3000/api/quiz/updateQuiz/${route.params.id_quiz}`, {
            method: 'PUT',
            body: JSON.stringify({
                nom_quiz: monQuiz.value.nom_quiz,
                questions: formatedQuestion
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
        router.push('/profileAdmin')
    } catch (error) {
        console.error('Erreur durant la modification du quiz: ', error);
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
        console.log(data);
        
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