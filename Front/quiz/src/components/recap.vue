<template>
    <div class="flex flex-col items-center">
    <p class="text-2xl">Resultats de votre Quiz</p>
    <p>
        Votre score est de : {{score}} / {{ questions }}
    </p>

    <p>
        {{ hasWon ? succes : echec }}
    </p>
    
    <button @click="retour" class="px-8 py-3 mt-14 text-center text-white rounded-xl bg-cyan-700 flex justify-center">
        Retour au profil
    </button>
</div>

</template>



<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import confetti from 'canvas-confetti'

const router = useRouter()

const retour = () => {
    router.push('/profileUser')
}

const props = defineProps({
    score: {
        type: Number,
        required: true,
    },
    questions: {
        type: Number,
        required: true,
    }
})

const scoreMinimum = computed(() => props.questions * 0.5)

const hasWon = computed(() => props.score >= scoreMinimum.value )

const succes = 'Féliciations ! Vous êtes cultivé/e'
const echec = 'Dommage ! Revenez plus instruit/e :('

onMounted(() => {
    if (hasWon.value)
    confetti()
})
</script>