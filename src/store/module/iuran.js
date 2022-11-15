import axios from 'axios'

export default {
   namespaced: true,
   state: {
      iuran: {
         list: null,
         single: null,
      },
   },
   getters: {
      getList(state) {
         return state.iuran.list
      },
      getSingle(state) {
         return state.iuran.single
      },
   },
   mutations: {
      setList(state, data) {
         state.iuran.list = data
      },
      setSingle(state, data) {
         state.iuran.single = data
      },
   },
   actions: {
      async getAllUmum({ commit }) {
         return new Promise((resolve, reject) => {
            axios.get('iuran/umum').then((response) => {
               resolve(commit('setIuran', response.data))
            })
         })
      },
      /**
       * save iuran data
       * @param {object} iuran data
       */
      async create({}, credentials) {
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
      /**
       * get all iuran data
       */
      async getList({ commit }) {
         return new Promise((resolve, reject) => {
            axios
               .get('iuran')
               .then((response) => {
                  console.log(response.data)
                  resolve(commit('setList', response.data.data))
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
      async getSingle({ commit }, credentials) {
         await axios
            .get(`iuran/${credentials}`)
            .then((response) => {
               console.log(response.data.data)
               commit('setSingle', response.data.data)
            })
            .catch((err) => console.log(err))
      },
   },
}
