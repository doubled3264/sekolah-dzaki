import axios from 'axios'

export default {
   namespaced: true,
   state: {
      catatan: {},
   },
   getters: {
      getCatatan(state) {
         return state.catatan
      },
   },
   mutations: {
      setCatatan(state, data) {
         state.catatan = data.collection
      },
   },
   actions: {
      async getSpecific({ commit }, credentials) {
         return new Promise((resolve, reject) => {
            axios
               .post('catatan/specific', credentials)
               .then((response) => {
                  console.log(response.data)
                  resolve(commit('setCatatan', response.data))
               })
               .catch((err) => {
                  reject(err.data)
               })
         })
      },
      async add({}, credentials) {
         return new Promise((resolve, reject) => {
            axios
               .post('catatan', credentials)
               .then((response) => {
                  resolve(response.data)
               })
               .catch((err) => {
                  reject(err.data)
               })
         })
      },
      async remove({}, credentials) {
         return new Promise((resolve, reject) => {
            axios
               .delete('catatan', {data: credentials})
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
