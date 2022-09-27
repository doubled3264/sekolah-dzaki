import axios from 'axios'

export default {
   namespaced: true,
   state: {
      siswa: {},
   },
   getters: {
      getSiswa(state) {
         return state.siswa
      },
   },
   mutations: {
      setSiswa(state, data) {
         state.siswa = data.siswa
      },
   },
   actions: {
      /**
       * get siswa data
       */
      async getAll({ commit }) {
         return new Promise((resolve, reject) => {
            axios
               .get('siswa')
               .then((response) => {
                  console.log(response.data)
                  resolve(commit('setSiswa', response.data))
               })
               .catch((err) => {
                  reject(err.data)
               })
         })
      },
      /**
       * save siswa data
       * @param {object} credentials siswa data
       */
      async add({}, credentials) {
         return new Promise((resolve, reject) => {
            axios
               .post('siswa', credentials)
               .then((response) => {
                  resolve(response.data)
               })
               .catch((err) => {
                  reject(err.data)
               })
         })
      },
   },
}
