import axios from 'axios'

export default {
   namespaced: true,
   state: {
      invitation: [],
   },
   getters: {
      get: (state) => {
         return state.invitation
      },
   },
   mutations: {
      set: (state, data) => {
         state.invitation = data
      },
   },
   actions: {
      async invitationCheck({}, invitationCode) {
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
      async get({ commit }) {
         await axios
            .get('auth/get-invitation')
            .then((response) => {
               commit('set', response.data.data)
            })
            .catch((err) => {
               console.log(err)
            })
      },
   },
}
