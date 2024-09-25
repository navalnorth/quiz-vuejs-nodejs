import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import register from "../views/register.vue"
import login from "../views/login.vue"
import profileAdmin from "../views/profileAdmin.vue"
import creationQuiz from '@/views/creationQuiz.vue'
import updateQuiz from '../views/updateQuiz.vue'
import profileUser from '../views/profileUser.vue'
import quizsUser from '../views/quizsUser.vue'
import { useStore } from 'vuex'

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
    component: profileAdmin,
    meta: { requiresAuth: true, requiresAdmin: true  }
  },
  {
    path: '/creationQuiz',
    name: 'creationQuiz',
    component: creationQuiz,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/updateQuiz/:id_quiz',
    name: 'updateQuiz',
    component: updateQuiz,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/profileUser',
    name: 'profileUser',
    component: profileUser,
    meta: { requiresAuth: true }
  },
  {
    path: '/quizUser/:id_quiz',
    name: 'quizsUser',
    component: quizsUser,
    meta: { requiresAuth: true }
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



router.beforeEach((to, from, next) => {
  const store = useStore();
  const isLoggedIn = store.getters.isLoggedIn;
  const isAdmin = store.getters.isAdmin;

  if (['/', '/register', '/'].includes(to.path)) {
    next(); 
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/');
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      next('/'); 
    } else {
      next();
    }
  } else {
    next();
  }
})



export default router
