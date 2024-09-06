import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import register from "../views/register.vue"
import login from "../views/login.vue"
import profileAdmin from "../views/profileAdmin.vue"
import creationQuiz from '@/views/creationQuiz.vue'

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
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
