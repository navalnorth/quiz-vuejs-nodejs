import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import register from "../views/register.vue"
import login from "../views/login.vue"
import profileAdmin from "../views/profileAdmin.vue"
import creationQuiz from '@/views/creationQuiz.vue'
import updateQuiz from '../views/updateQuiz.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/profileAdmin',
    name: 'profileAdmin',
    component: profileAdmin
  },
  {
    path: '/creationQuiz',
    name: 'creationQuiz',
    component: creationQuiz
  },
  {
    path: '/updateQuiz/:id_quiz',
    name: 'updateQuiz',
    component: updateQuiz
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
