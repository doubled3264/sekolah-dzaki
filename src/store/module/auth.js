import axios from 'axios'

function storeToken(token) {
  axios.defaults.headers.common['Authorization'] = token
  localStorage.setItem('token', token)
}

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
      console.log(token)
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
    async register({ }, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post('auth/register', credentials)
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            console.log(err)
            reject(err.data)
          })
      })
    },
    async signIn({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post('auth/login', credentials)
          .then((response) => {
            storeToken(response.data.data.token)
            commit('setToken', response.data.data.token)
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    async getAccess({ commit }) {
      await axios
        .get('auth/admin-info')
        .then((response) => {
          console.log(response)
          commit('setUser', response.data.data.adminData)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // async signIn({ dispatch }, credentials) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post('auth/login', credentials)
    //       .then((response) => {
    //         resolve(dispatch('attempt', response.data.data.token))
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //         reject(err.data)
    //       })
    //   })
    // },
    // async attempt({ commit, state }, token) {
    //   if (token) {
    //     commit('setToken', token)
    //   }
    //   if (!state.token) {
    //     return
    //   }

    //   await axios
    //     .get('auth/admin-info')
    //     .then((response) => {
    //       commit('setUser', response.data.data)
    //     })
    //     .catch(() => {
    //       commit('setToken', null)
    //       commit('setUser', null)
    //     })
    // },
    // async signOut({ commit }) {
    //   return axios
    //     .post('auth/signOut')
    //     .then(() => {
    //       commit('setToken', null)
    //       commit('setUser', null)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    async invitationCheck({ }, invitationCode) {
      return new Promise((resolve, reject) => {
        axios
          .post('auth/invitation-check', invitationCode)
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
}
