import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    user: null,
  },
  getters: {
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    },
    createToken ( state , token) {
      localStorage.setItem('token', token)
    }
  },
  actions: {
    
  },
  modules: {
  }
})
