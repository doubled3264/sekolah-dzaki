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
               .post('variant-iuran', credentials)
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
