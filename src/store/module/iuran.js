import axios from 'axios'

export default {
   namespaced: true,
   state: {},
   getters: {},
   mutations: {},
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
   },
}
