<template>
    <div class="w-full m-8">
        <h2 class="text-4xl m-4 flex justify-center">Création d'un nouveau Quiz</h2>

        <form @submit.prevent="clique" class="flex flex-col justify-center items-center">
            <div>
                <input
                    class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700 m-2 w-96"
                    v-model="monQuiz.nom_quiz"
                    placeholder="Nom du nouveau Quiz"
                />
            </div>
            <div>
                <input
                    class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700 m-2 w-96"
                    placeholder="Nom de la question"
                    v-model="currentQuestion.nom_question"
                    :id="'question-' + QuestionIndex"
                />
            </div>

            <div class="flex flex-col justify-center items-center my-4">
                <label>Vos réponses</label>

                <div v-for="(reponse, index) in currentQuestion.reponses" :key="index" class="flex items-center mt-4 flex-col">
                    <input
                        class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700 mb-2 w-96"
                        placeholder="Ecrivez votre réponse"
                        v-model="reponse.nom_question"
                    />
                    <input
                        type="radio"
                        v-model="currentQuestion.reponse_correcte"
                        :value="index"
                        :name="'correct' + QuestionIndex"
                    />
                </div>
            </div>

            <button @click.prevent="reponsePlus"
                class="px-5 py-2.5 bg-green-700 text-white border-none rounded-3xl hover:bg-green-950 w-32 m-10">
                Ajouter
            </button>
            <div class="w-full flex justify-between px-10">
                <button class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 w-32"
                    @click.prevent="precedent" :disabled="QuestionIndex === 0">
                    Précedent
                </button>
                <button class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 w-32"
                    @click.prevent="suivant">
                    Suivant
                </button>
            </div>

            <button class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950 w-32" type="submit">
                Créer
            </button>
        </form>

        <div class="text-red-600 my-10 text-center">
            <p v-for="erreur in erreurs" :key="erreur">{{ erreur }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const erreurs = ref<string[]>([]);

const monQuiz = ref({
    nom_quiz: '',
    questions: [
        {
            nom_question: '',
            reponses: [{ nom_question: '' }],
            reponse_correcte: '',
        }
    ]
});



const QuestionIndex = ref(0);

const currentQuestion = computed(() => monQuiz.value.questions[QuestionIndex.value]);
const isLastQuestion = computed(() => QuestionIndex.value === monQuiz.value.questions.length - 1);



const suivant = () => {
    if (isLastQuestion.value) {
        addQuestion();
    }
    QuestionIndex.value++;
}

const precedent = () => {
    if (QuestionIndex.value > 0) {
        QuestionIndex.value--;
    }
}



const addQuestion = () => {
    monQuiz.value.questions.push({
        nom_question: '',
        reponses: [{ nom_question: '' }],
        reponse_correcte: ''
    });
}



const reponsePlus = () => {
    currentQuestion.value.reponses.push({ nom_question: '' });
}



const clique = async () => {
    erreurs.value = [];

    if (!monQuiz.value.nom_quiz || monQuiz.value.questions.some(q => !q.nom_question || !q.reponses.length || q.reponse_correcte === '')) {
        erreurs.value.push('Tous les champs sont obligatoires');
        return;
    }

    await CreationQuiz();

    monQuiz.value.nom_quiz = '';
    monQuiz.value.questions = [{ nom_question: '', reponses: [{ nom_question: '' }], reponse_correcte: '' }];
    QuestionIndex.value = 0;
}



const props = defineProps({
    id: Number
})





const CreationQuiz = async () => {
    const data = {
        nom_quiz: monQuiz.value.nom_quiz
    };

    try {
        const response = await fetch('http://localhost:3000/api/quiz/creationQuiz', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.error('Erreur lors de la création du quiz');
            return;
        }

        const result = await response.json();
        const id_quiz = result.quizid;

        for (const question of monQuiz.value.questions) {
            const dataQuestion = {
                nom_question: question.nom_question,
                reponses: question.reponses,
                reponse_correcte: question.reponse_correcte
            };

            const response2 = await fetch(`http://localhost:3000/api/quiz/${id_quiz}/creationQuestion`, {
                method: 'POST',
                body: JSON.stringify(dataQuestion),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response2.ok) {
                console.error('Erreur lors de l\'envoi des questions');
                return;
            }
        }

        monQuiz.value.nom_quiz = '';
        monQuiz.value.questions = [{ nom_question: '', reponses: [{ nom_question: '' }], reponse_correcte: '' }];
        QuestionIndex.value = 0;
    } catch (err) {
        console.error('Erreur durant la création du quiz:', err);
    }
}

</script>
