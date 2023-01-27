import axios from 'axios'

export default {
   namespaced: true,
   state: {
      admin: '',
   },
   getters: {
      getAdmin: (state) => {
         return state.admin
      },
   },
   mutations: {
      setAdmin: (state, data) => {
         state.admin = data
      },
   },
   actions: {
      async getAll({ commit }) {
         await axios
            .get('admin')
            .then((response) => {
               commit('setAdmin', response.data.data)
            })
            .catch((error) => {
               console.log(error)
            })
      },
   },
}
