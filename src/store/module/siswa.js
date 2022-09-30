import axios from 'axios'

export default {
   namespaced: true,
   state: {
      siswa: {
         all: {},
         allSimple: {},
         single: {},
      },
   },
   getters: {
      getSiswa(state) {
         return state.siswa
      },
      getAllSimple(state) {
         return state.siswa.allSimple
      },
      getSingle(state) {
         return state.siswa.single
      },
   },
   mutations: {
      setSiswa(state, data) {
         state.siswa = data.siswa
      },
      setAllSimple(state, data) {
         state.siswa.allSimple = data.collection
      },
      setSingle(state, data) {
         state.siswa.single = data.collection
      },
   },
   actions: {
      /**
       * get all siswa data
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
       * get all simple siswa data
       */
      async getAllSimple({ commit }, credentials) {
         return new Promise((resolve, reject) => {
            axios
               .post('siswa/simple', credentials)
               .then((response) => {
                  resolve(commit('setAllSimple', response.data))
               })
               .catch((err) => {
                  reject(err.data)
               })
         })
      },
      async getSingle({ commit }, credentials) {
         return new Promise((resolve, reject) => {
            axios
               .post('siswa/single', credentials)
               .then((response) => {
                  resolve(commit('setSingle', response.data))
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
