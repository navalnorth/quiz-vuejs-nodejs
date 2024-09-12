<template>

    <div>
        <tableQuiz v-for="(quiz, index) in quizList"  :title="quiz.nom_quiz" :id="quiz.id_quiz"
        @delete="deleteQuiz(index)" />
    </div>

</template>

<script setup lang="ts">
import tableQuiz from "../components/tableQuiz.vue"
import type { quizlist } from "../types/config"
import { ref, onMounted } from 'vue';



let quizList = ref<quizlist[]>([])

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
    } catch (err) {
        console.error('Erreur durant la création de la liste de quiz: ', err);
    }
}

onMounted(() => {
    listQuiz()
})

</script>
