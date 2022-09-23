import axios from 'axios'

export default {
   namespaced: true,
   state: {},
   getters: {},
   mutations: {},
   actions: {
      /**
       * save siswa data
       * @param {object} siswa data
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
