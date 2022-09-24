import axios from 'axios'

export default {
   namespaced: true,
   state: {
      iuran: [],
   },
   getters: {
      getIuran(state) {
         return state.iuran
      },
   },
   mutations: {
      setIuran(state, data) {
         state.iuran = data.iuran
      },
   },
   actions: {
      /**
       * save iuran data
       * @param {object} iuran data
       */
      async add({}, credentials) {
         return new Promise((resolve, reject) => {
            axios
               .post('iuran', credentials)
               .then((response) => {
                  console.log(response.data)
                  resolve()
               })
               .catch((err) => {
                  console.log(err)
                  reject()
               })
         })
      },
      async getAll({ commit }) {
         return new Promise((resolve, reject) => {
            axios.get('iuran').then((response) => {
               resolve(commit('setIuran', response.data))
            })
         })
      },
   },
}
