import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  getters: {
    authenticated(state) {
      return state.token && state.user
    },
    user(state) {
      return state.user
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, data) {
      console.log(data)
      state.user = data
    },
    logout(state) {
      state.token = null
      state.user = null
    },
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post('auth/login/pegawai', credentials)
          .then((response) => {
            resolve(dispatch('attempt', response.data.token))
          })
          .catch((error) => {
            console.log(error.data)
          })
      })
    },
    async attempt({ commit, state }, token) {
      if (token) {
        commit('setToken', token)
      }

      if (!state.token) {
        return
      }

      await axios
        .get('auth/info/pegawai')
        .then((response) => {
          console.log(response.data)
          commit('setUser', response.data)
        })
        .catch((error) => {
          commit('setToken', null)
          commit('setUser', null)
        })
    },
    async signOut({ commit }) {
      return axios
        .post('auth/signOut')
        .then((response) => {
          commit('setToken', null)
          commit('setUser', null)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
