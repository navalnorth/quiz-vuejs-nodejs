import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.role = user.role; 
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', user.role);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    },
  },
  actions: {
    login({ commit }, token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        commit('setToken', token);
        commit('setUser', decodedToken);
      } catch (error) {
        console.error('Invalid token', error);
        commit('clearAuth');
      }
    },
    logout({ commit }) {
      commit('clearAuth');
    },
    checkAuth({ commit, state }) {
      if (state.token) {
        const decodedToken = JSON.parse(atob(state.token.split('.')[1]));
        const isExpired = decodedToken.exp && decodedToken.exp <= Math.floor(Date.now() / 1000);

        if (isExpired) {
          commit('clearAuth');
        } else {
          commit('setUser', decodedToken);
        }
      }
    },
  },
  getters: {
    user: (state) => state.user,
    token: (state) => state.token,
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
  },
});