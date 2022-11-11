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
               .post('auth/login', credentials)
               .then((response) => {
                  console.log(response.data)
                  resolve(dispatch('attempt', response.data.data.token))
               })
               .catch((error) => {
                  console.log(error)
                  reject(error.data)
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
            .get('auth/admin-info')
            .then((response) => {
               commit('setUser', response.data.data)
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
