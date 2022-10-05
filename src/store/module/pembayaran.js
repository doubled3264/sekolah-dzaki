import axios from 'axios'

export default {
   namespaced: true,
   state: {
      tagihan: [],
      riwayat: [],
   },
   getters: {
      getTagihan(state) {
         return state.tagihan
      },
      getRiwayat(state) {
         return state.riwayat
      },
   },
   mutations: {
      setTagihan(state, data) {
         state.tagihan = data
      },
      setRiwayat(state, data) {
         state.riwayat = data
      },
   },
   actions: {
      async getSpecific({ commit }, credentials) {
         return new Promise((resolve, reject) => {
            console.log(credentials)
            axios
               .post('pembayaran/specific', credentials)
               .then((response) => {
                  console.log(response.data)
                  resolve(commit('setTagihan', response.data.collection))
               })
               .catch((err) => {
                  reject(err.data)
               })
         })
      },
      async getAllById({ commit }, credentials) {
         return new Promise((resolve, reject) => {
            console.log(credentials)
            axios
               .post('pembayaran/list', credentials)
               .then((response) => {
                  console.log(response.data)
                  resolve(commit('setRiwayat', response.data.collection))
               })
               .catch((err) => {
                  reject(err.data)
               })
         })
      },
   },
}
