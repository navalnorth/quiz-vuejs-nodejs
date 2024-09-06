<template>


    <form action="submit" class="flex flex-col justify-center items-center gap-5 mt-14">
        <input type="text" placeholder="Nom"  v-model="name" class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700">
        <input type="text" placeholder="Prénom"  v-model="firstname" class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700">
        <input type="email" placeholder="email@hotmail.com"  v-model="email" class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700">
        <input type="password" placeholder="Mot de passe"  v-model="password" class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700">
        <input type="password" placeholder="Vérifier le mot de passe"  v-model="password2" class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700">
        <button @click="verify" class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950">S'enregistrer</button>
    </form>
    <div class="text-red-600 my-10 text-center">
        <p v-for="erreur in erreurs">
            {{ erreur }}
        </p>
    </div>

    <RouterView />
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const name = ref('')

const firstname = ref('')

const email = ref('')
const emailValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const password = ref('')
const password2 = ref('')

const erreurs = ref([])



const verify = (event) => {

    event.preventDefault()
    erreurs.value = []

    if (!name.value.length) {
        erreurs.value.push('Le champ nom est obligatoire !')
    } else if (name.value.length <= 2) {
        erreurs.value.push('Votre nom est trop court !')
    } 

    if (!firstname.value.length) {
        erreurs.value.push('Le champ prénom est obligatoire !')
    } else if (firstname.value.length <= 2) {
        erreurs.value.push('Votre Pprénom est trop court !')
    }

    if (!email.value.length) {
        erreurs.value.push('Le champ email est obligatoire !')
    } else if (!emailValid.test(email.value)) {
        erreurs.value.push('votre email n\'est pas valide !')
    }

    if (!password.value.length) {
        erreurs.value.push('Le champ mot de passe est obligatoire !');
    } else if (password.value !== password2.value) {
        erreurs.value.push('Vos mots de passe ne concordent pas !')
    }

    if (erreurs.value.length === 0) {
        register();
    }
}

const register = async () => {
    const data = {
        name: name.value,
        firstname: firstname.value,
        email: email.value,
        password: password.value,
    };

    try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json',
            },
            
        });

        if (!response.ok) {
            console.error('erreur');
            return;
        }

        router.push('/')

    } catch (err) {
        console.error('Erreur durant l\'inscription : ', err);
    }
};







</script>