import axios from 'axios'

export default {
   namespaced: true,
   state: {},
   getters: {},
   mutations: {},
   actions: {
      async add({}, credentials) {
         return new Promise((resolve, reject) => {
            axios
               .post('siswa', credentials)
               .then((response) => {
                  console.log(response)
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
