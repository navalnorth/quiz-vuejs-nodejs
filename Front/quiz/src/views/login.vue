<template>

  <form class="flex justify-center items-center mt-20 gap-2.5 flex-col" type="submit">
    <input type="email" placeholder="email@hotmail.com" v-model="email" required
      class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700">
    <input type="password" placeholder="Mot de passe" v-model="password" required
      class="px-5 py-2.5 rounded-3xl ring-1 ring-cyan-700">
    <p>Vous n'avez pas de compte <router-link to="/register" class="text-blue-600">Inscrivez-vous !</router-link></p>
    <button type="button" @click="verify"
      class="px-5 py-2.5 bg-cyan-700 text-white border-none rounded-3xl hover:bg-cyan-950"
      >Se connecter</button>
  </form>
  <div class="text-red-600 my-10 text-center">
    <p v-for="erreur in erreurs">
      {{ erreur }}
    </p>
  </div>

</template>


<script setup lang="ts">
import { useStore } from 'vuex'
import { ref, computed } from 'vue';
import { useRouter } from "vue-router";
import {Token} from "../types/config";

const store = useStore()
const router = useRouter()

const email = ref('admin@admin.com')
const emailValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const password = ref('admin')

const erreurs = ref<string[]>([])




const verify = (event: any) => {

  event.preventDefault()
  erreurs.value = []



  if (!email.value.length) {
    erreurs.value.push('Le champ email est obligatoire !')
  } else if (!emailValid.test(email.value)) {
    erreurs.value.push('votre email n\'est pas valide !')
  }

  if (!password.value.length) {
    erreurs.value.push('Le champ mot de passe est obligatoire !');
  }

  if (erreurs.value.length === 0) {
    login();
  }
}



const setTokenStore = (token: Token) => {
  if (token && token.token) {
    try {
      const user = JSON.parse(atob(token.token.split('.')[1]))

      store.commit('setUser', user)
      store.commit('setToken', token.token)
      store.commit('createToken', token.token)

      if (user.role == "admin") {
      router.push('/profileAdmin')
    } else {
      router.push('/profileUser')
    }

    } catch (error) {
      console.error('Erreur lors du traitement du token:', error)
    }
  } else {
    console.error('Token ou structure de réponse invalide')
  }
}

const login = async () => {
  const data = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, /',
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      console.error('Erreur lors de la connexion:', response.statusText);
      erreurs.value.push('Email ou mot de passe invalides !')
      return;
    }

    const result = await response.json();

    if (result && result.token) {
      setTokenStore(result);
    } else {
      console.error('Réponse de l\'API invalide:', result);
    }
  } catch (err) {
    console.error('Erreur durant la connexion: ', err);
  }
};




</script>
