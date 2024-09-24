import { createStore } from 'vuex'
import type { User } from "../types/config"

export default createStore({
  state: {
    token: null as string | null,
    user: null as User | null,
  },
  getters: {
    estAuthentifie(state) {
      return !!state.token;
    },
    estAdmin(state) {
      return state.user && state.user.role === 'admin';
    },
    estUser(state) {
      return state.user && state.user.role === 'user';
    }
  },
  mutations: {
    setToken (state, token: string) {
      state.token = token;
    },
    setUser (state, user: User) {
      state.user = user;
    },
    createToken (state, token: string) {
      localStorage.setItem('token', token);
    }
  },
  actions: {
  },
  modules: {
  }
});
